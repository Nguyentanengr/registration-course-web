import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../../../assets/icons/Icon';
import { RegisterAreaContainer } from './RegisterArea.styled';
import { dowEngToVie } from '../../../stores/slices/scheduleSlice';
import { convertToDayMonthYear } from '../schedule/FilterArea';
import { useEffect, useRef, useState } from 'react';
import { postRegister } from '../../../apis/registerApi';
import Alert from '../../commons/Alert';
import { addRegisteredSession, removeRegisteredSession, setPostError } from '../../../stores/slices/registerSlice';
import { fetchRegisterOpenSection } from '../../../apis/openSectionApi';


export const convertToDateTimeString = (date) => {
    const pad = (n) => n.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // getMonth() trả 0-11
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());

    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
};

const RegisterArea = ({ }) => {

    const dispatch = useDispatch();
    const [checkedState, setCheckedState] = useState({});
    const { openSessions } = useSelector((state) => state.register.listOpenSession);
    const { listOpenSession, postError } = useSelector((state) => state.register);
    const { myInfo } = useSelector((state) => state.studentInfo);

    const handleOnClickRow = (e) => {

    }

    // Kiểm tra chồng lịch giữa các học phần đã đăng ký và chưa đăng ký
    const isOverlap = (openSessionId) => {
        return false;
    }

    // Đăng ký và hủy đăng ký
    const handleRegister = (e, openSession) => {
        const isChecked = e.target.checked;

        const status = isChecked ? 'ENROLLED' : 'CANCELLED';
        const studentId = myInfo.studentId;

        dispatch(postRegister({
            studentId: studentId,
            openSessionId: openSession.openSessionId,
            status: status
        }))
            .unwrap()
            .then((action) => {

                if (isChecked) {
                    // Thêm học phần vào trong danh sách registered
                    const addOpenSection = {
                        openSessionId: openSession.openSessionId,
                        status: openSession.status,
                        sessionInfo: openSession.sessionInfo,
                        registerAt: convertToDateTimeString(new Date()),
                    }
                    dispatch(addRegisteredSession(addOpenSection));
                } else {
                    // Gỡ học phần khỏi danh sách registered
                    dispatch(removeRegisteredSession(openSession.openSessionId));
                }
                setCheckedState(prev => ({
                    ...prev,
                    [openSession.openSessionId]: isChecked
                }));

                const user = JSON.parse(localStorage.getItem('user'));
                dispatch(fetchRegisterOpenSection({ accountId: user.userId, filterType: 0 }));
            });
    };

    // Kiểm tra hết giờ thời gian thực

    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if (!listOpenSession.endTime) return;
        const checkExpiration = () => {
            const now = new Date();
            const end = new Date(listOpenSession.endTime);
            setIsExpired(now >= end);
        };
        checkExpiration(); // kiểm tra ngay khi load

        const interval = setInterval(() => {
            checkExpiration();
        }, 1000); // kiểm tra mỗi giây

        return () => clearInterval(interval);
    }, [listOpenSession.endTime]);

    useEffect(() => {
        const initChecked = {};
        openSessions.forEach((session) => {
            initChecked[session.openSessionId] = session.isRegistered;
        });
        setCheckedState(initChecked);
    }, [openSessions]);

    useEffect(() => {
        if (postError) {
            const timeout = setTimeout(() => {
                dispatch(setPostError(null));
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [postError]);

    return (
        <RegisterAreaContainer>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr className='head-row'>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Lớp</th>
                            <th>Nhóm</th>
                            <th>Số TC</th>
                            <th>Số lượng</th>
                            <th>Còn lại</th>
                            <th>Thời khóa biểu</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {openSessions.map((openSession) => (
                            <tr
                                className={
                                    `body-row ${isExpired ? 'expired' : ''} ${openSession.empty === 0 ? 'empty' : ''} ${openSession.isAble ? '' : 'disable'} ${isOverlap(openSession.openSessionId) ? 'overlap' : ''}`

                                }
                                key={openSession.openSessionId}
                                onClick={handleOnClickRow}
                            >
                                <td>{openSession.sessionInfo.courseInfo.courseId}</td>
                                <td>{openSession.sessionInfo.courseInfo.courseName}</td>
                                <td>{openSession.sessionInfo.classId}</td>
                                <td>{openSession.sessionInfo.groupNumber}</td>
                                <td>{openSession.sessionInfo.courseInfo.credits}</td>
                                <td>{openSession.sessionInfo.maxStudents}</td>
                                <td>{openSession.empty}</td>
                                <td>
                                    {openSession.sessionInfo.schedules.map((sc, index) => {
                                        return <div className='sc' key={index}>
                                            {dowEngToVie[sc.dayOfWeek]}, <span className='period'>Tiết {sc.startPeriod} - {sc.endPeriod}</span>
                                            <br />
                                            {convertToDayMonthYear(sc.startDate)} - {convertToDayMonthYear(sc.endDate)}
                                        </div>
                                    })}
                                </td>
                                <td>
                                    <label
                                        className={
                                            `custom-checkbox ${isExpired ? 'expired' : ''} ${openSession.empty === 0 ? 'empty' : ''} ${openSession.isAble ? '' : 'disable'}  ${isOverlap(openSession.openSessionId) ? 'overlap' : ''}`
                                        }
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checkedState[openSession.openSessionId] || false}
                                            onChange={(e) => handleRegister(e, openSession)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='note-container'>
                <div className='span-container'>
                    <div className='span bold'></div>
                    <div className='text'>
                        Trùng lịch
                    </div>
                </div>
                <div className='span-container'>
                    <div className='span light'></div>
                    <div className='text'>
                        Hết số lượng
                    </div>
                </div>
                <div className='span-container'>
                    <div className='span dark'></div>
                    <div className='text'>
                        Chưa đủ điều kiện
                    </div>
                </div>
            </div>
            {postError && <Alert message={postError.message || 'Đã có lỗi xảy ra'} />}
        </RegisterAreaContainer>
    );
};

export default RegisterArea;