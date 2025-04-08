import { useEffect, useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import { FilterAreaContainer } from './FilterArea.styled';
import SelectOption from '../../commons/SelectOption';


export const timeMap = {
    1: { start: "7:00", end: "7:45" },
    2: { start: "7:50", end: "8:35" },
    3: { start: "8:40", end: "9:25" },
    4: { start: "9:30", end: "10:15" },
    5: { start: "10:20", end: "11:05" },
    6: { start: "11:10", end: "11:55" },
    7: { start: "12:00", end: "12:45" },
    8: { start: "12:50", end: "13:35" },
    9: { start: "13:40", end: "14:25" },
    10: { start: "14:30", end: "15:15" },
    11: { start: "15:20", end: "16:05" },
    12: { start: "16:10", end: "16:55" },
};

const toVieDay = {
    "MONDAY": "Thứ 2", 
    "TUESDAY": "Thứ 3",
    "WEDNESDAY": "Thứ 4",
    "THURSDAY": "Thứ 5",
    "FRIDAY": "Thứ 6",
    "SATURDAY": "Thứ 7",
    "SUNDAY": "Chủ nhật",
};
const toEngDay = {
    "Thứ 2": "MONDAY", 
    "Thứ 3": "TUESDAY",
    "Thứ 4": "WEDNESDAY",
    "Thứ 5": "THURSDAY",
    "Thứ 6": "FRIDAY",
    "Thứ 7": "SATURDAY",
    "Chủ nhật": "SUNDAY",
};

const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
]



const FilterArea = () => {

    const [info, setInfo] = useState({
        "studentName": "Phạm Tấn Nguyên",
        "studentId": "N22DCCN156",
        "major": "Ngành công nghệ thông tin",
        "totalCredits": "140",
    });

    const [semesters, setSemester] = useState([
        "Học kì 1 năm học 2024",
        "Học kì 2 năm học 2024",
        "Học kì 3 năm học 2024",
        "Học kì 1 năm học 2025",
        "Học kì 2 năm học 2025",
        "Học kì 3 năm học 2025",
    ]);

    const [courses, setCourse] = useState([
        "Tất cả",
        "Lập trình web",
        "Lập trình C++",
        "Phân tích thiết kế hệ thống",
        "Trí tuệ nhân tạo",
        "Công nghệ phần mềm",
        "Lập trình di dộng",
        "Kiểm thử phần mềm",
        "Cơ sở dữ liệu",
    ]);


    const [schedules, setSchedules] = useState([
        {
            "week": 1,
            "startDate": "2030-12-30",
            "endDate": "2031-01-05",
            "timetables": [
                {
                    "courseId": "INT1339",
                    "courseName": "Nhập môn trí tuệ nhân tạo",
                    "group": 1,
                    "placeId": "2B11",
                    "teacherName": "Bùi Công Túy",
                    "dayOfWeek": "MONDAY",
                    "startPeriod": 1,
                    "endPeriod": 4
                },
                {
                    "courseId": "INT1345",
                    "courseName": "Cơ sở dữ liệu",
                    "group": 1,
                    "placeId": "2B24",
                    "teacherName": "Dương Minh Tuyền",
                    "dayOfWeek": "MONDAY",
                    "startPeriod": 7,
                    "endPeriod": 9,
                },
                {
                    "courseId": "INT1345",
                    "courseName": "Lập trình hướng đối tượng",
                    "group": 1,
                    "placeId": "2A31",
                    "teacherName": "Nguyễn Hoàng thành",
                    "dayOfWeek": "THURSDAY",
                    "startPeriod": 7,
                    "endPeriod": 9,
                },
            ]
        },
        {
            "week": 2,
            "startDate": "2031-01-06",
            "endDate": "2031-01-12",
            "timetables": [
                {
                    "courseId": "INT1339",
                    "courseName": "Nhập môn trí tuệ nhân tạo",
                    "group": 1,
                    "placeId": "2B11",
                    "teacherName": "Bùi Công Túy",
                    "dayOfWeek": "MONDAY",
                    "startPeriod": 1,
                    "endPeriod": 4
                },
                {
                    "courseId": "INT1345",
                    "courseName": "Cơ sở dữ liệu",
                    "group": 1,
                    "placeId": "2B24",
                    "teacherName": "Dương Minh Tuyền",
                    "dayOfWeek": "WEDNESDAY",
                    "startPeriod": 4,
                    "endPeriod": 6,
                },
                {
                    "courseId": "INT1345",
                    "courseName": "Lập trình hướng đối tượng",
                    "group": 1,
                    "placeId": "2A31",
                    "teacherName": "Nguyễn Hoàng thành",
                    "dayOfWeek": "WEDNESDAY",
                    "startPeriod": 7,
                    "endPeriod": 9,
                },
                {
                    "courseId": "INT1345",
                    "courseName": "Cơ sở dữ liệu",
                    "group": 1,
                    "placeId": "2B24",
                    "teacherName": "Dương Minh Tuyền",
                    "dayOfWeek": "WEDNESDAY",
                    "startPeriod": 10,
                    "endPeriod": 12,
                },
                {
                    "courseId": "INT1345",
                    "courseName": "Lập trình hướng đối tượng",
                    "group": 1,
                    "placeId": "2A31",
                    "teacherName": "Nguyễn Hoàng thành",
                    "dayOfWeek": "SATURDAY",
                    "startPeriod": 1,
                    "endPeriod": 4,
                },
            ]
        },
        {
            "week": 3,
            "startDate": "2031-01-13",
            "endDate": "2031-01-19",
            "timetables": [
                {
                    "courseId": "INT1339",
                    "courseName": "Nhập môn trí tuệ nhân tạo",
                    "group": 1,
                    "placeId": "2B11",
                    "teacherName": "Bùi Công Túy",
                    "dayOfWeek": "MONDAY",
                    "startPeriod": 1,
                    "endPeriod": 1
                }
            ]
        },
    ]);

    const [timetableOnDay, setTimetableOnDay] = useState({
        "MONDAY": [],
        "TUESDAY": [],
        "WEDNESDAY": [],
        "THURSDAY": [],
        "FRIDAY": [],
        "SATURDAY": [],
        "SUNDAY": [],
    });

    const [dayOfWeek, setDayOfWeek] = useState({
        "MONDAY": "", // value: 02/04/2025
        "TUESDAY": "",
        "WEDNESDAY": "",
        "THURSDAY": "",
        "FRIDAY": "",
        "SATURDAY": "",
        "SUNDAY": "",
    });


    const [selectedWeek, setSelectedWeek] = useState(0); //id

    const handleClickPrev = () => {
        if (selectedWeek > 0) {
            setSelectedWeek(selectedWeek - 1);
        }
    };
    const handleClickNext = () => {
        if (selectedWeek < schedules.length - 1) {
            setSelectedWeek(selectedWeek + 1);
        }
    };

    const convertDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }

    const getTimeTable = (id) => {
        if (schedules.length != 0) {
            return convertDate(schedules[id].startDate) + " - " + convertDate(schedules[id].endDate);
        }
    };


    // Khi tuần thay đổi -> thay đổi luôn các buổi học theo ngày
    useEffect(() => {
        const timetable = {
            "MONDAY": [],
            "TUESDAY": [],
            "WEDNESDAY": [],
            "THURSDAY": [],
            "FRIDAY": [],
            "SATURDAY": [],
            "SUNDAY": [],
        };
        if (schedules.length != 0) {
            schedules[selectedWeek].timetables.forEach((t) => {
                timetable[t.dayOfWeek].push(t);
            })

            for (let day in timetable) {
                timetable[day].sort((a, b) => a.startPeriod - b.startPeriod);
            }

            console.log(timetable);
            setTimetableOnDay(timetable);

            let startDate = new Date(schedules[selectedWeek].startDate); // yyyy-mm-dd

            // Parse startDate (e.g., "2030-12-30")
            const daysOfWeekOrder = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

            // Calculate dates for each day (Monday to Sunday)
            const newDayOfWeek = { ...dayOfWeek };
            daysOfWeekOrder.forEach((day, index) => {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + index); // Add 0 to 6 days

                // Format as dd/mm/yyyy
                const formattedDate = `${String(currentDate.getDate()).padStart(2, "0")}/${String(currentDate.getMonth() + 1).padStart(2, "0")}/${currentDate.getFullYear()}`;
                newDayOfWeek[day] = formattedDate;
            });
            console.log(newDayOfWeek);
            setDayOfWeek(newDayOfWeek);
        }
    }, [selectedWeek]);

    return (
        <FilterAreaContainer>
            <div className="info">
                <div className="header-info">
                    <h2>Thông tin sinh viên</h2>
                    <small>Xem lịch học cá nhân theo tuần</small>
                </div>

                <div className="box">
                    <div className="left">
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.Hash />
                            </div>
                            <div className="text">Mã sinh viên: <span>{info.studentId}</span></div>
                        </div>
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.FlatUser />
                            </div>
                            <div className="text">Tên: <span>{info.studentName}</span></div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.Registration />
                            </div>
                            <div className="text">Ngành học: <span>{info.major}</span></div>
                        </div>
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.BookMark />
                            </div>
                            <div className="text">Tổng số tín chỉ tích lũy: <span>{info.totalCredits} tín chỉ</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="filter-control">
                <div className="filter-box">
                    <div className="semester-filter">
                        <SelectOption options={semesters} />
                    </div>
                    <div className="course-filter">
                        <SelectOption options={courses} />
                    </div>
                </div>
                <div className="control-box">
                    <button className="control-btn" onClick={handleClickPrev}>
                        <div className="icon wrap-center">
                            <Icons.ArrowLeft />
                        </div>
                        <h6>Tuần trước</h6>
                    </button>
                    <span className='week'>
                        <div className="icon wrap-center">
                            <Icons.Schedule />
                        </div>
                        <h6>{getTimeTable(selectedWeek)}</h6>
                    </span>
                    <button className="control-btn" onClick={handleClickNext}>
                        <h6>Tuần sau</h6>
                        <div className="icon wrap-center">
                            <Icons.ArrowRight />
                        </div>
                    </button>
                </div>
            </div>
            <div className="timetable-container">
                {days.map((day, index) => {
                    return (<div className='day-col' key={index}>
                        <div className="info-day">
                            <h4>{toVieDay[day]}</h4>
                            <span>{dayOfWeek[day]}</span>
                        </div>
                        <div className="lessions">
                            {timetableOnDay[day].length == 0 && <div className='empty'>
                                    Không có lịch học
                            </div>}
                            {timetableOnDay[day].map((t, index) => {
                                return (<div className={`lession ${t.startPeriod <= 6 ? 'light' : 'dark'}`} key={index}>
                                    <h4>{t.courseName}</h4>
                                    <div className="title">
                                        <div className="icon wrap-center">
                                            <Icons.Group />
                                        </div>
                                        <div className="text">
                                            Nhóm {t.group}
                                        </div>
                                    </div>
                                    <div className="title">
                                        <div className="icon wrap-center">
                                            <Icons.Clock />
                                        </div>
                                        <div className="text">
                                            {timeMap[t.startPeriod].start} - {timeMap[t.endPeriod].end} <br /> (Tiết {t.startPeriod} - {t.endPeriod})
                                        </div>
                                    </div>
                                    <div className="title">
                                        <div className="icon wrap-center">
                                            <Icons.Address />
                                        </div>
                                        <div className="text">
                                            Phòng học {t.placeId}
                                        </div>
                                    </div>
                                    <div className="title">
                                        <div className="icon wrap-center">
                                            <Icons.FlatUser />
                                        </div>
                                        <div className="text">
                                            {t.teacherName}
                                        </div>
                                    </div>
                                </div>)
                            })}
                        </div>
                    </div>)
                })}
            </div>
        </FilterAreaContainer>
    );
};

export default FilterArea;