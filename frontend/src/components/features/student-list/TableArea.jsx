import { useEffect, useRef, useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import SelectOption from '../../commons/SelectOption';
import { TableAreaContainer } from './TableArea.styled';
import ListStudent from './ListStudent';
import { useDispatch, useSelector } from 'react-redux';
import { addCheckedSectionId, removeCheckedSectionId, setCheckedSectionId, setSearchKey } from '../../../stores/slices/studentListSlice';
import { fetchComformOpenSection } from '../../../apis/openSectionApi';
import CircleSpinner from '../../commons/CircleSpinner';
import { exportStudentsByOpenSections } from '../../../apis/exportApi';
import { toast, ToastContainer } from 'react-toastify';

const TableArea = () => {
    const [onSee, setOnSee] = useState(false);
    const [selectedSection, setSelectedSection] = useState({});
    const singleCBoxRefs = useRef([]);
    const allCBoxRef = useRef(null);
    const dispatch = useDispatch();
    const {
        filterClassId,
        filterYear,
        filterSemester,
        searchKey,
        openSections,
        checkedSectionIds,
        seLoading,
    } = useSelector((state) => state.studentList);

    const handleSingleCheckBox = (openSectionId) => {
        const isChecked = singleCBoxRefs.current[openSectionId].checked;
        if (isChecked) {
            // Thêm sectionId vào danh sách chọn
            dispatch(addCheckedSectionId(openSectionId));
        } else {
            // Xóa sectionId khỏi danh sách chọn & hủy allCheckBox
            dispatch(removeCheckedSectionId(openSectionId));
            allCBoxRef.current.checked = false;
        }
    };

    const handleExportFile = (openSectionIds) => {
        console.log("openSectionIds");
        console.log(openSectionIds);

        dispatch(exportStudentsByOpenSections({ openSessionIds: openSectionIds }))
            .unwrap()
            .then((action) => {
                // action chứa { fileName, success }
                console.log("Tải file thành công");
            })
            .catch((error) => {
                console.error("Error exporting file:", error);
                toast.error(error.message || "Đã có lỗi xảy ra khi tải file!");
            });
    };


    const handleAllCheckBox = () => {
        const isChecked = allCBoxRef.current.checked;
        if (isChecked) {
            // Gỡ tât cả id chọn trước đó && thêm toàn bộ
            dispatch(setCheckedSectionId(openSections.map((se) => se.openSessionId)));
            // Bật tất cả single checkbox lên
            singleCBoxRefs.current.forEach((el) => { if (el) el.checked = true });
        } else {
            // Xóa tất cả id trong danh sách
            dispatch(setCheckedSectionId([]));
            // Tắt tất cả single checkbox
            singleCBoxRefs.current.forEach((el) => { if (el) el.checked = false });
        }
    };

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            // Gọi API tìm dữ liệu theo lớp - năm - học kì - key search.
            const classId = filterClassId ? filterClassId : '';
            const year = filterYear ? filterYear : '';
            const semester = filterSemester ? filterSemester : '';
            dispatch(fetchComformOpenSection({
                searchKey: searchKey,
                classId: classId,
                year: year,
                semester: semester
            }));
        }
    };



    const handleCheckStudentList = (openSection) => {
        if (!onSee) {
            console.log(openSection);
            setSelectedSection(openSection);
            setOnSee(!onSee);
        }
    }

    useEffect(() => {
        console.log(checkedSectionIds)
        // Tắt tất cả single checkbox
        if (checkedSectionIds.length === 0) {
            allCBoxRef.current.checked = false;
            singleCBoxRefs.current.forEach((el) => { if (el) el.checked = false });
        }
    }, [checkedSectionIds]);

    return (
        <TableAreaContainer>
            <ToastContainer
                position="top-right" // Vị trí thông báo
                autoClose={3000} // Tự động đóng sau 3 giây
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="tool-bar">
                <div className="left">
                    <div className="select-all wrap-center">
                        <label className="custom-checkbox">
                            <input
                                type="checkbox"
                                onChange={handleAllCheckBox}
                                ref={allCBoxRef}
                            />
                            <span className="checkmark"></span>
                            Chọn tất cả
                        </label>
                    </div>
                </div>
                <div className="right wrap-center">
                    <div className="search-container wrap-center">
                        <div className="input-container wrap-center">
                            <div className="icon wrap-center">
                                {seLoading ? <CircleSpinner size={15} color='#575757' /> : <Icons.SearchIcon />}
                            </div>
                            <input
                                type="text"
                                placeholder='Tìm kiếm lớp học phần ...'
                                spellCheck={false}
                                value={searchKey}
                                onChange={(e) => dispatch(setSearchKey(e.target.value))}
                                onKeyDown={handleEnterSearch}
                            />
                        </div>
                    </div>
                    <div className="excel-btn">
                        <button
                            className={`excel wrap-center ${checkedSectionIds.length > 0 ? 'active' : ''}`}
                            onClick={() => handleExportFile(checkedSectionIds)}
                        >
                            <div className="icon wrap-center">
                                <Icons.File />
                            </div>
                            <p>Xuất file {checkedSectionIds.length == 0 ? '' : `(${checkedSectionIds.length})`}</p>
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-section">
                <div className="table-container">
                    <table className='table'>
                        <thead>
                            <tr className='head-row'>
                                <th></th>
                                <th>Mã lớp</th>
                                <th>Môn học</th>
                                <th>Lớp</th>
                                <th>Nhóm</th>
                                <th>Năm học</th>
                                <th>Học kỳ</th>
                                <th>Số SV</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openSections.map((openSection, index) => (
                                <tr
                                    className='body-row'
                                    key={index}
                                >
                                    <td>
                                        <label className="custom-checkbox">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleSingleCheckBox(openSection.openSessionId)}
                                                ref={(el) => singleCBoxRefs.current[openSection.openSessionId] = el}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </td>
                                    <td>{openSection.sessionId}</td>
                                    <td>{openSection.courseId} <br /> <span>
                                        {openSection.courseName}
                                    </span></td>
                                    <td>{openSection.classId}</td>
                                    <td>{openSection.groupNumber}</td>
                                    <td>{openSection.year}</td>
                                    <td>{openSection.semester}</td>
                                    <td>{openSection.students}</td>
                                    <td>
                                        <div className="action-box">
                                            <div className="see wrap-center" onClick={() => handleCheckStudentList(openSection)}>
                                                <Icons.Eye />
                                            </div>
                                            <div
                                                className="down wrap-center"
                                                onClick={() => handleExportFile([openSection.openSessionId])}
                                            >
                                                <Icons.Download />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {onSee && <div className='pop-up-container wrap-center'>
                <ListStudent setOnSee={setOnSee} openSection={selectedSection} />
            </div>}
        </TableAreaContainer>
    );
};

export default TableArea;