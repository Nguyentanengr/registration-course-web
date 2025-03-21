

import { useSelector } from 'react-redux';
import { SelectedAreaContainer } from './SelectedArea.styled';
import { useEffect, useState } from 'react';

const SelectedArea = ({ sessionList }) => {
    const [numberCourse, setNumberCourse] = useState(0);
    const [numberCredits, setNumberCredits] = useState(0)

    useEffect(() => {
        let credits = 0;
        sessionList.forEach((each) => {
            credits += each.credits;
        });

        setNumberCourse(sessionList.length);
        setNumberCredits(credits)
    }, [sessionList]);

    return (
        <SelectedAreaContainer>
            <div className="title">
                Danh sách môn học đã đăng ký: <span>{numberCourse} môn, {numberCredits} tín chỉ</span>
            </div>
            <div className="table-container">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Lớp</th>
                            <th>Nhóm</th>
                            <th>Số TC</th>
                            <th>Ngày đăng ký</th>
                            <th>Thời khóa biểu</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessionList.map((session) => (
                            <tr>
                                <td>{session.id}</td>
                                <td>{session.nameCourse}</td>
                                <td>{session.class}</td>
                                <td>{session.group}</td>
                                <td>{session.credits}</td>
                                <td>{session.registerDate}</td>
                                <td>{session.startDate + " - " + session.endDate}</td>
                                <td>
                                    <div className={session.status}>
                                        {session.status === "pending" ? "Chờ duyệt" : "Đã duyệt"}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </SelectedAreaContainer>
    );
};

export default SelectedArea;