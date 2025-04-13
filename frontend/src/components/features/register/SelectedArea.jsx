

import { useDispatch, useSelector } from 'react-redux';
import { SelectedAreaContainer } from './SelectedArea.styled';
import { useEffect, useState } from 'react';
import { convertToDayMonthYear } from '../schedule/FilterArea';
import { dowEngToVie } from '../../../stores/slices/scheduleSlice';
import { convertToDateTime } from '../student-list/ListStudent';
import { fetchRegisteredOpenSection } from '../../../apis/openSectionApi';


export const convertStatusConform = (status) => {
    switch(status) {
        case 'OPEN':
        case 'CLOSE':
            return 'Đang duyệt';
        case 'CANCEL':
            return 'Đã bị hủy';
        default: 
            return 'Đã xác nhận';
    }
};

const SelectedArea = ({ sessionList }) => {

    const dispatch = useDispatch();
    const [numberCourse, setNumberCourse] = useState(0);
    const [numberCredits, setNumberCredits] = useState(0)
    const { registeredSections } = useSelector((state) => state.register);


    useEffect(() => {
        let credits = 0;
        registeredSections.forEach((each) => {
            credits += each.sessionInfo.courseInfo.credits;
        });

        setNumberCourse(registeredSections.length);
        setNumberCredits(credits)
    }, [registeredSections]);

    // Tự động gọi api khi tải trang
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch(fetchRegisteredOpenSection({ accountId : user.userId }));
    }, []);

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
                        {registeredSections.map((openSession, index) => (
                            <tr key={index}>
                                <td>{openSession.sessionInfo.courseInfo.courseId}</td>
                                <td>{openSession.sessionInfo.courseInfo.courseName}</td>
                                <td>{openSession.sessionInfo.classId}</td>
                                <td>{openSession.sessionInfo.groupNumber}</td>
                                <td>{openSession.sessionInfo.courseInfo.credits}</td>
                                <td>{convertToDateTime(openSession.registerAt)}</td>
                                <td>
                                    {openSession.sessionInfo.schedules.map((sc) => {
                                        return <div className='sc'>
                                            {dowEngToVie[sc.dayOfWeek]}, <span className='period'>Tiết {sc.startPeriod} - {sc.endPeriod}</span>
                                            <br />
                                            {convertToDayMonthYear(sc.startDate)} - {convertToDayMonthYear(sc.endDate)}
                                        </div>
                                    })}
                                </td>
                                <td>
                                    <div className={openSession.status === 'CLOSE' || openSession.status === 'OPEN' ? 'light'
                                        : openSession.status === 'CANCEL' ? 'dark' : 'highlight'
                                    }>
                                        {convertStatusConform(openSession.status)}
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