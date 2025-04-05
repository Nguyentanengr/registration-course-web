

import { useEffect, useRef, useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import { SectionAreaContainer } from './SectionArea.styled';

const data = [
    {
        id: '10001',
        subject: 'INT1339',
        name: 'Lập trình C++',
        class: 'D22CQCNO2-N',
        group: 1,
        year: 2025,
        semester: 2,
        studentRange: '20 - 100',
        sessions: '2 buổi'
    },
    {
        id: '10002',
        subject: 'INT1340',
        name: 'Cơ sở dữ liệu',
        class: 'D22CQCNO1-N',
        group: 2,
        year: 2025,
        semester: 2,
        studentRange: '15 - 80',
        sessions: '1 buổi'
    },
    {
        id: '10003',
        subject: 'INT1341',
        name: 'Lập trình web',
        class: 'D22CQCNO3-N',
        group: 1,
        year: 2025,
        semester: 1,
        studentRange: '25 - 90',
        sessions: '1 buổi'
    },
    // thêm nhiều dòng nữa nếu cần...
];

const SectionArea = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [activePopupId, setActivePopupId] = useState(null);
    const popupRefs = useRef({});

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handleChangePerPage = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // reset về page 1 khi đổi size
    };

    // Toggle popup cho từng hàng
    const togglePopup = (id) => {
        setActivePopupId(activePopupId === id ? null : id); // Nếu popup đang mở thì đóng, nếu không thì mở
    };

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

    const sectionList = [
        {
            id: '10001',
            courseId: 'INT1339',
            nameCourse: 'Thực tập cơ sở',
            class: 'D22CQCN02-N',
            group: '01',
            credits: 3,
            year: 2025,
            semester: 1,
            quantity: '20-100',
            lessons: '2 Buổi',
            status: 'Đang mở',
        },
        {
            id: '10002',
            courseId: 'INT1229',
            nameCourse: 'Nhập môn trí tuệ nhân tạo',
            class: 'D22CQCN02-N',
            group: '01',
            credits: 3,
            year: 2025,
            semester: 1,
            quantity: '20-100',
            lessons: '2 Buổi',
            status: 'Chưa mở',
        },
        {
            id: '10003',
            courseId: 'INT1367',
            nameCourse: 'An toàn bảo mật hệ thống thông tin',
            class: 'D22CQCN02-N',
            group: '01',
            credits: 3,
            year: 2025,
            semester: 1,
            quantity: '20-100',
            lessons: '2 Buổi',
            status: 'Đang dạy',
        },
        {
            id: '10004',
            courseId: 'INT2139',
            nameCourse: 'Lập trình web',
            class: 'D22CQCN02-N',
            group: '01',
            credits: 3,
            year: 2025,
            semester: 1,
            quantity: '20-100',
            lessons: '2 Buổi',
            status: 'Đang mở',
        },
        {
            id: '10005',
            courseId: 'INT1309',
            nameCourse: 'Cơ sở dữ liệu',
            class: 'D22CQCN02-N',
            group: '01',
            credits: 3,
            year: 2025,
            semester: 1,
            quantity: '20-100',
            lessons: '2 Buổi',
            status: 'Đang dạy',
        },
    ];



    return (
        <SectionAreaContainer>
            <div className="table-container">
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
                        {sectionList.map((section) => (
                            <tr
                                className='body-row'
                                key={section.id}
                            >
                                <td>{section.id}</td>
                                <td>{section.courseId} <br /> <span>{section.nameCourse}</span></td>
                                <td>{section.class}</td>
                                <td>{section.group}</td>
                                <td>{section.credits}</td>
                                <td>{section.year}</td>
                                <td>{section.semester}</td>
                                <td>{section.quantity}</td>
                                <td>{<span className="lessons">{section.lessons}</span>}</td>
                                <td>{<span
                                    className={`status ${section.status === 'Đang mở' ? 'open' : section.status === 'Chưa mở' ? 'not-open' : 'active'}`}
                                >{section.status}
                                </span>}
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
                <div className="pagination">
                    <span>
                        Hiển thị {Math.min((currentPage - 1) * itemsPerPage + 1, data.length)} đến{" "}
                        {Math.min(currentPage * itemsPerPage, data.length)} trong tổng số {data.length} lớp học phần
                    </span>

                    <div className="controls">
                        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>«</button>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>‹</button>
                        <button className="current">{currentPage}</button>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
                        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>»</button>

                        <select value={itemsPerPage} onChange={handleChangePerPage}>
                            {[5, 10, 20].map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </SectionAreaContainer>
    );
};

export default SectionArea;