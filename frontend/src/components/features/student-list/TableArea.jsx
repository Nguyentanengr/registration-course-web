import { useEffect, useRef, useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import SelectOption from '../../commons/SelectOption';
import { TableAreaContainer } from './TableArea.styled';
import ListStudent from './ListStudent';
import { useDispatch, useSelector } from 'react-redux';
import { addCheckedSectionId, removeCheckedSectionId, setCheckedSectionId, setSearchKey } from '../../../stores/slices/studentListSlice';


const sectionList = [
    {
        sectionId: "10001",
        courseId: "INT1339",
        courseName: "Lập trình C++",
        classId: "D22CQCQN02-N",
        group: 1,
        year: 2024,
        semester: 1,
        students: "65"
    },
    {
        sectionId: "10004",
        courseId: "INT1342",
        courseName: "Trí tuệ nhân tạo",
        classId: "D22CQCQN02-N",
        group: 1,
        year: 2024,
        semester: 1,
        students: "70"
    },
    {
        sectionId: "10005",
        courseId: "INT1343",
        courseName: "Công nghệ phần mềm",
        classId: "D22CQCQN02-N",
        group: 1,
        year: 2024,
        semester: 1,
        students: "88"
    }
];

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
        sections,
        checkedSectionIds,
    } = useSelector((state) => state.studentList);

    const handleSingleCheckBox = (sectionId) => {
        const isChecked = singleCBoxRefs.current[sectionId].checked;
        if (isChecked) {
            // Thêm sectionId vào danh sách chọn
            dispatch(addCheckedSectionId(sectionId));
        } else {
            // Xóa sectionId khỏi danh sách chọn & hủy allCheckBox
            dispatch(removeCheckedSectionId(sectionId));
            allCBoxRef.current.checked = false;
        }
    };

    const handleAllCheckBox = () => {
        const isChecked = allCBoxRef.current.checked;
        if (isChecked) {
            // Gỡ tât cả id chọn trước đó && thêm toàn bộ
            dispatch(setCheckedSectionId(sections.map((se) => se.sectionId)));
            // Bật tất cả single checkbox lên
            singleCBoxRefs.current.forEach((el) => { if (el) el.checked = true });
        } else {
            // Xóa tất cả id trong danh sách
            dispatch(setCheckedSectionId([]));
            // Tắt tất cả single checkbox
            singleCBoxRefs.current.forEach((el) => { if (el) el.checked = false })
        }
    };

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            // Gọi API tìm dữ liệu theo lớp - năm - học kì - key search.
        }
    };

    const handleCheckStudentList = (section) => {
        if (!onSee) {
            setSelectedSection(section);
            setOnSee(!onSee);   
        }
    }

    useEffect(() => {
        console.log(checkedSectionIds)
    }, [checkedSectionIds]);

    return (
        <TableAreaContainer>
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
                                <Icons.SearchIcon />
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
                        <button className={`excel wrap-center ${checkedSectionIds.length > 0 ? 'active' : ''}`}>
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
                            {sections.map((section, index) => (
                                <tr
                                    className='body-row'
                                    key={index}
                                >
                                    <td>
                                        <label className="custom-checkbox">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleSingleCheckBox(section.sectionId)}
                                                ref={(el) => singleCBoxRefs.current[section.sectionId] = el}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </td>
                                    <td>{section.sectionId}</td>
                                    <td>{section.courseId} <br /> <span>
                                        {section.courseName}
                                    </span></td>
                                    <td>{section.classId}</td>
                                    <td>{section.groupNumber}</td>
                                    <td>{section.year}</td>
                                    <td>{section.semester}</td>
                                    <td>{section.students}</td>
                                    <td>
                                        <div className="action-box">
                                            <div className="see wrap-center" onClick={() => handleCheckStudentList(section)}>
                                                <Icons.Eye />
                                            </div>
                                            <div className="down wrap-center">
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
                <ListStudent setOnSee={setOnSee} section={selectedSection} />
            </div>}
        </TableAreaContainer>
    );
};

export default TableArea;