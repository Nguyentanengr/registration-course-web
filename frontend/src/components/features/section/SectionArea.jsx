

import { useEffect, useRef, useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import { SectionAreaContainer } from './SectionArea.styled';
import { useDispatch, useSelector } from 'react-redux';
import { removeSection, setCurrentPage, setItemPerPage } from '../../../stores/slices/sectionSlice';
import Alert from "../../commons/Alert";
import ScheduleDialog from './ScheduleDialog';
import { deleteSection } from '../../../apis/sectionApi';
import ConfirmDelete from './ConfirmDelete';


const convertStatus = (status) => {
    switch (status) {
        case 'PENDING':
            return 'Đang chờ';
        case 'OPEN':
            return 'Đang mở';
        case 'CLOSE':
            return 'Đã đóng';
        case 'CANCEL':
            return 'Đã hủy';
        case 'CONFIRM':
            return 'Đã xác nhận';
        case 'TEACHING':
            return 'Đang dạy';
        case 'COMPLETED':
            return 'Đã hoàn thành';
        case 'CREATED':
            return 'Đã tạo';
    }
}

const SectionArea = () => {

    const popupRefs = useRef({});
    const dispatch = useDispatch();
    const { loading, error, currentPage, totalPage
        , itemPerPage, itemPerPages, sections, deleteError } = useSelector((state) => state.section);
    const [activePopupId, setActivePopupId] = useState(null);
    const [isSchedule, setIsSchedule] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [deletedSection, setDeletedSection] = useState(null);

    // Khi tăng giảm page 
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPage) {
            dispatch(setCurrentPage(page));
        }
    };

    // Khi thay đổi số lượng trên một page
    const handleChangePerPage = (e) => {
        dispatch(setItemPerPage(parseInt(e.target.value)));
        dispatch(setCurrentPage(1));
    };

    // Toggle thao tác cho từng hàng
    const togglePopup = (id) => {
        console.log(id);
        setActivePopupId(activePopupId === id ? null : id); // Nếu popup đang mở thì đóng, nếu không thì mở
    };

    // Xử lý khi xem lịch hoc 
    const handeClickSchedule = (section) => {
        setSelectedSection(section);
        setIsSchedule(!isSchedule);
    };

    // Xử lý khi xóa hàng

    const handleClickDelete = (sectionId) => {
        setDeletedSection(sectionId);
        setIsDelete(!isDelete);
    }

    const handleOnDelete = () => {
        console.log(deletedSection);
        dispatch(deleteSection({ sessionId: deletedSection }))
            // sau khi xóa thành công thì xóa ở client
            .unwrap()
            .then((action) => {
                dispatch(removeSection(deletedSection))
            })
            .catch((error) => {
                setActivePopupId(null);
            })
    };

    useEffect(() => {
        console.log("Sections data:", sections);
        // Kiểm tra xem có section nào thiếu sessionId không
        const invalidSections = sections.filter(section => !section.sessionId);
        if (invalidSections.length > 0) {
            console.warn("Found sections with missing sessionId:", invalidSections);
        }
    }, [sections]);

    // Xử lý click ra ngoài để đóng popup
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Nếu không có popup nào đang mở, không cần kiểm tra
            if (!activePopupId) return;

            // const isClickOutsideAllPopups = Object.values(popupRefs.current).every(
            //     (ref) => ref && !ref.contains(e.target)
            // );
            const isClickOutsideAllPopups = popupRefs.current[activePopupId] &&
                !popupRefs.current[activePopupId].contains(e.target);

            console.log("Click target:", e.target);
            console.log("popupRefs.current:", popupRefs.current);
            console.log("Is click outside all popups?", isClickOutsideAllPopups);

            if (isClickOutsideAllPopups) {
                setActivePopupId(null); // Đóng popup nếu nhấp ra ngoài
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activePopupId]);



    return (
        <SectionAreaContainer>
            {deleteError != null && <Alert message='Đã có lỗi xảy ra' />}
            {sections.length == 0 && <div className='not-found'>
                <div className="icon wrap-center">
                    <Icons.Info />
                </div>
                <div className="note">
                    <div className="h4">Không tìm thấy kết quả</div>
                    <small>Không có lớp học phần nào được tìm thấy.</small>
                </div>
            </div>}
            {sections.length > 0 && <div className="table-container">
                <table className='table'>
                    <thead>
                        <tr className='head-row'>
                            <th>Mã lớp</th>
                            <th>Tên môn học</th>
                            <th>Lớp</th>
                            <th>Nhóm</th>
                            <th>Số TC</th>
                            <th>Năm học</th>
                            <th>Học kì</th>
                            <th>Số SV</th>
                            <th>Lịch học</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>

                        {sections.map((section) => (
                            <tr
                                className='body-row'
                                key={section.sessionId}
                            >
                                <td>{section.sessionId}</td>
                                <td>{section.courseInfo.courseId} <br /> <span>{section.courseInfo.nameCourse}</span></td>
                                <td>{section.clazzId}</td>
                                <td>{section.groupNumber}</td>
                                <td>{section.courseInfo.credits}</td>
                                <td>{section.year}</td>
                                <td>{section.semester}</td>
                                <td>{section.minStudents} - {section.maxStudents}</td>
                                <td>{<span className="lessons" onClick={() => handeClickSchedule(section)}>{section.scheduleIds.length} buổi</span>}</td>
                                <td>
                                    {convertStatus(section.status)}
                                </td>
                                <td>
                                    <div className="box">
                                        <div className="wrap" ref={(el) => (popupRefs.current[section.sessionId] = el)}>
                                            <div
                                                className="wrap-center"
                                                onClick={() => togglePopup(section.sessionId)}

                                            >
                                                <Icons.More />
                                            </div>
                                            {activePopupId === section.sessionId && <div className="popup">

                                                <div className={`item ${section.status === 'PENDING' ? '' : 'disable'}`}>
                                                    <div className="icon">
                                                        <Icons.Edit />
                                                    </div>
                                                    <div className="action-name">
                                                        Chỉnh sửa
                                                    </div>
                                                </div>
                                                <div className="item">
                                                    <div className="icon">
                                                        <Icons.Clock />
                                                    </div>
                                                    <div className="action-name">
                                                        Cập nhật lịch học
                                                    </div>
                                                </div>
                                                <div
                                                    className={`item ${section.status === 'PENDING' || section.status === 'CREATED' ? '' : 'disable'}`}
                                                    onClick={() => handleClickDelete(section.sessionId)}
                                                >
                                                    <div className="icon">
                                                        <Icons.Trash />
                                                    </div>
                                                    <div className="action-name">
                                                        Xóa
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>}
            {sections.length > 0 && <div className="pagination">
                <span>
                    Hiển thị trang {currentPage} trong tổng số {totalPage} trang
                </span>

                <div className="controls">
                    <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>«</button>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>‹</button>
                    <button className="current">{currentPage}</button>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPage}>›</button>
                    <button onClick={() => handlePageChange(totalPage)} disabled={currentPage === totalPage}>»</button>

                    <select value={itemPerPage} onChange={handleChangePerPage}>
                        {itemPerPages.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            </div>}

            {isSchedule && <div className='pop-up-container wrap-center'>
                <ScheduleDialog setIsSchedule={setIsSchedule} section={selectedSection} />
            </div>}
            {isDelete && <div className='pop-up-container wrap-center'>
                <ConfirmDelete
                    setIsDelete={setIsDelete}
                    message="Bạn có chắc chắn muốn xóa lớp học phần này? Hành động này không thể hoàn tác."
                    onDelete={handleOnDelete}
                />
            </div>}
        </SectionAreaContainer>
    );
};

export default SectionArea;