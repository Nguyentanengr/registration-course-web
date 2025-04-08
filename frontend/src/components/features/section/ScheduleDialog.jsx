import { useEffect, useRef } from 'react';
import { ScheduleDialogContainer } from './ScheduleDialog.styled';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../../../assets/icons/Icon';
import { dowEngToVie, resetScheduleOnSection } from '../../../stores/slices/scheduleSlice';
import { timeMap } from '../schedule/FilterArea';
import { fetchScheduleOnSection } from '../../../apis/scheduleApi';

const ScheduleDialog = ({ setIsSchedule, section }) => {

    const dispatch = useDispatch();
    const thisRef = useRef(null);
    const { loadingScheduleOnSection, schedulesOnSection } = useSelector((state) => state.schedule);

    // Nếu click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (thisRef.current && !thisRef.current.contains(e.target)) {
                console.log("conte");
                setIsSchedule(false);

                // Xóa sạch state liên quan đến schedule
                dispatch(resetScheduleOnSection())
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Khi dialog hiện lên ngay lập tức gọi api
    useEffect(() => {
        console.log(section);
        dispatch(fetchScheduleOnSection( { sessionId: section.sessionId }));
    }, [section, dispatch]);

    return (
        <ScheduleDialogContainer ref={thisRef}>
            <div className="header">
                <div className="title">
                    <div className="icon wrap-center">
                        <Icons.Registration />
                    </div>
                    <div className="text">
                        Chi tiết lịch học {section.courseInfo.courseId} - {section.courseInfo.courseName}
                    </div>
                </div>
                <div className="detail-title">
                    <div className="group">
                        <div className="icon wrap-center">
                            <Icons.House />
                        </div>
                        <div className="small-text">Mã lớp: {section.sessionId}</div>
                    </div>
                    <div className="group">
                        <div className="icon wrap-center">
                            <Icons.Group />
                        </div>
                        <div className="small-text">Nhóm: {section.groupNumber}</div>
                    </div>
                    <span>{section.scheduleIds.length} buổi học</span>
                </div>
            </div>
            <div className="body">
                {schedulesOnSection.map((sc, index) => {
                    return (<div className="lesson" key={index}>
                        <div className="title">
                            <div className="day">
                                <div className="icon wrap-center">
                                    <Icons.Schedule />
                                </div>
                                <div className="day-text">
                                    Buổi {index + 1}: {dowEngToVie[sc.dayOfWeek]}
                                </div>
                            </div>
                            <span>Tiết {sc.startPeriod} - {sc.endPeriod}</span>
                        </div>
                        <div className="row">
                            <div className="group">
                                <div className="icon wrap-center">
                                    <Icons.Clock />
                                </div>
                                <small>
                                    Thời gian: {timeMap[sc.startPeriod].start} - {timeMap[sc.startPeriod].end} đến {timeMap[sc.startPeriod].start} - {timeMap[sc.startPeriod].end}
                                </small>
                            </div>
                            <div className="group">
                                <div className="icon wrap-center">
                                    <Icons.FlatUser />
                                </div>
                                <small>
                                    Giảng viên: {sc.teacherName}
                                </small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="group">
                                <div className="icon wrap-center add">
                                    <Icons.Address />
                                </div>
                                <small>
                                    Phòng học: {sc.placeId}
                                </small>
                            </div>
                            <div className="group">
                                <div className="icon wrap-center">
                                    <Icons.Registration />
                                </div>
                                <small>
                                   Môn học: {section.courseInfo.courseName}
                                </small>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </ScheduleDialogContainer>
    );
};

export default ScheduleDialog;