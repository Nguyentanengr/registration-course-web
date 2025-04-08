

import { useEffect, useRef, useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import { SectionAreaContainer } from './SectionArea.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setItemPerPage } from '../../../stores/slices/sectionSlice';
import CircleSpinner from "../../commons/CircleSpinner";
import ScheduleDialog from './ScheduleDialog';


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
    }
}

const SectionArea = () => {

    const popupRefs = useRef({});
    const dispatch = useDispatch();
    const { loading, error, currentPage, totalPage, itemPerPage, itemPerPages, sections } = useSelector((state) => state.section);
    const [activePopupId, setActivePopupId] = useState(null);
    const [isSchedule, setIsSchedule] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);

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
        setActivePopupId(activePopupId === id ? null : id); // Nếu popup đang mở thì đóng, nếu không thì mở
    };

    // Xử lý khi xem lịch hoc 
    const handeClickSchedule = ( section ) => {
        setSelectedSection(section);
        setIsSchedule(!isSchedule);
    }

    // Xử lý click ra ngoài để đóng popup
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Kiểm tra nếu click ra ngoài tất cả các popup
            const isClickOutsideAllPopups = Object.values(popupRefs.current).every(
                (ref) => ref && !ref.contains(e.target)
            );

            if (isClickOutsideAllPopups) {
                setActivePopupId(null); // Đóng tất cả popup
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (
        <SectionAreaContainer>
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
                                    <div className="box" ref={(el) => (popupRefs.current[section.id] = el)}>
                                        <div className="wrap-center" onClick={() => togglePopup(section.id)}><Icons.More /></div>
                                        {activePopupId === section.id && <div className="popup">
                                            <div className="item">
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
                                            <div className="item">
                                                <div className="icon">
                                                    <Icons.Trash />
                                                </div>
                                                <div className="action-name">
                                                    Xóa
                                                </div>
                                            </div>
                                        </div>}
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
        </SectionAreaContainer>
    );
};

export default SectionArea;