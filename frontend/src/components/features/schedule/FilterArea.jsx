import { useEffect, useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import { FilterAreaContainer } from './FilterArea.styled';
import SelectOption from '../../commons/SelectOption';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentByAccount } from '../../../apis/studentApi';
import { setSelectedWeek, setSemesterYear } from '../../../stores/slices/timeTableSlice';
import { fetchTimeTable } from '../../../apis/timeTableApi';


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

export const convertToDayMonthYear = (dateStr) => {
    if (dateStr) {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }
    return '';
};

export const convertToYearMonthDay = (dateStr) => {
    if (dateStr) {
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month}-${day}`;
    }
    return '';
}



const FilterArea = () => {
    const dispatch = useDispatch();
    const { myInfo } = useSelector((state) => state.studentInfo);
    const { semesterYear, timeTables, selectedWeek } = useSelector((state) => state.timeTable);
    const [courses, setCourses] = useState([]); // mảng chứa id - name
    const [selectedCourse, setSelectedCourse] = useState(null);

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

    const handleClickPrev = () => {
        if (selectedWeek != null && selectedWeek > 0) {
            dispatch(setSelectedWeek(selectedWeek - 1));
        }
    };
    const handleClickNext = () => {
        if (selectedWeek != null && selectedWeek < timeTables.length - 1) {
            dispatch(setSelectedWeek(selectedWeek + 1));
        }
    };

    const getSemesterYearList = (studentId) => {
        let arr = [];
        if (studentId) {
            const startYear = parseInt('20' + studentId.substring(1, 3));
            for (let i = 0; i < 5; i++) {
                for (let j = 1; j <= 3; j++) {
                    arr.push({
                        year: startYear + i,
                        semester: j
                    });
                }
            }
        }
        console.log(arr);

        return arr;
    };

    const convertSemesterToText = (semester) => {
        if (semester) {
            return `Học kì ${semester.semester} năm học ${semester.year} - ${semester.year + 1}`;
        }
        return '';
    }

    const revertTextToSemester = (text) => {
        const arr = text.split(' ');
        return {
            year: parseInt(arr[5]),
            semester: parseInt(arr[2]),
        }
    };

    const revertTextToCourse = (text) => {
        if (text && typeof text === 'string') {
            const parts = text.split(' - ');
            if (parts.length === 2) {
                return {
                    courseId: parts[0].trim(),
                    courseName: parts[1].trim(),
                };
            }
        }
        return null; // Trả về null nếu text không hợp lệ
    };



    const getTimeTable = (id) => {
        console.log('get timetable');
        console.log(timeTables);
        console.log(id);
        if (timeTables.length != 0 && id != null && id <= timeTables.length) {
            return convertToDayMonthYear(timeTables[id].startDate) + " - " + convertToDayMonthYear(timeTables[id].endDate);
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
        if (timeTables.length != 0 && selectedWeek != null) {
            // Xếp các buổi học trong tuần theo ngày
            timeTables[selectedWeek].timetables.forEach((t) => {
                if (selectedCourse) {
                    if (t.courseId === selectedCourse.courseId) {
                        timetable[t.dayOfWeek].push(t);
                    }
                } else {
                    timetable[t.dayOfWeek].push(t);
                }
            });

            // Sắp xếp lại các buổi học trong ngày theo tiết học
            for (let day in timetable) {
                timetable[day].sort((a, b) => a.startPeriod - b.startPeriod);
            }

            console.log(timetable);
            setTimetableOnDay(timetable);

            // Tiếp theo, selected week chỉ chứa thông tin startDate và endDate
            // Convert sang ngày tháng cụ thể : 'MONDAY': '22-12-2020'
            let startDate = new Date(timeTables[selectedWeek].startDate); // yyyy-mm-dd

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
        } else {
            setTimetableOnDay({
                "MONDAY": [],
                "TUESDAY": [],
                "WEDNESDAY": [],
                "THURSDAY": [],
                "FRIDAY": [],
                "SATURDAY": [],
                "SUNDAY": [],
            });
            setDayOfWeek({
                "MONDAY": "", // value: 02/04/2025
                "TUESDAY": "",
                "WEDNESDAY": "",
                "THURSDAY": "",
                "FRIDAY": "",
                "SATURDAY": "",
                "SUNDAY": "",
            });
        }
    }, [selectedWeek, selectedCourse, semesterYear]);

    // khi giao diện bật lên, gọi api lấy dữ liệu sinh viên
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch(fetchStudentByAccount({ accountId: user.userId }))
            .unwrap()
            .then((objectResponse) => {
                dispatch(setSemesterYear({
                    semester: objectResponse.data.currentSemester,
                    year: objectResponse.data.currentYear,
                }));
            });
    }, []);

    // Cập nhật selectedCourse khi courses thay đổi


    useEffect(() => {
        // Gọi API khi semester year thay đổi
        if (semesterYear) {
            dispatch(fetchTimeTable({
                studentId: myInfo.studentId,
                semester: semesterYear.semester,
                year: semesterYear.year,
            }));
            setSelectedCourse(null);
        }
    }, [semesterYear]);

    useEffect(() => {

        console.log("timeTables");
        console.log(timeTables);

        if (timeTables.length == 0) {
            dispatch(setSelectedWeek(null));
        } else {
            let week = 0;
            const now = new Date();
            const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            // Chọn tuần học ở thời điểm hiện tại. 
            timeTables.forEach((t, index) => {
                const start = new Date(t.startDate);
                const end = new Date(t.endDate);
                const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
                const endDateOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate());
                if (startDateOnly <= nowDateOnly && nowDateOnly <= endDateOnly) {
                    week = index;
                }
            });
            // Nếu không có thì trả về tuần đầu tiên
            console.log("selectedWeek", week);
            dispatch(setSelectedWeek(week));
        }

        // lọc ra tất cả môn khác nhau có trong lịch học. 
        const courseMap = new Map();

        timeTables.forEach(week => {
            week.timetables.forEach(item => {
                const key = item.courseId + '::' + item.courseName;
                if (!courseMap.has(key)) {
                    courseMap.set(key, {
                        courseId: item.courseId,
                        courseName: item.courseName
                    });
                }
            });
        });

        setCourses(Array.from(courseMap.values()));
    }, [timeTables]);

    useEffect(() => {
        console.log("selectedCourse");
        console.log(selectedCourse);
    }, [selectedCourse]);

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
                            <div className="text">Mã sinh viên: <span>{myInfo.studentId}</span></div>
                        </div>
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.FlatUser />
                            </div>
                            <div className="text">Tên: <span>{myInfo.studentName}</span></div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.Registration />
                            </div>
                            <div className="text">Ngành học: <span>{myInfo.majorName}</span></div>
                        </div>
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.BookMark />
                            </div>
                            <div className="text">Tổng số tín chỉ tích lũy: <span>{myInfo.accumulateCredits} tín chỉ</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="filter-control">
                <div className="filter-box">
                    <div className="semester-filter">
                        <SelectOption
                            options={getSemesterYearList(myInfo.studentId).map(convertSemesterToText)}
                            value={convertSemesterToText(semesterYear)}
                            onSelect={(value) => dispatch(setSemesterYear(revertTextToSemester(value)))}
                        />
                    </div>
                    <div className="course-filter">
                        <SelectOption
                            options={courses.map(c => c.courseId + ' - ' + c.courseName)}
                            value={selectedCourse ? selectedCourse.courseId + ' - ' + selectedCourse.courseName : null}
                            onSelect={(value) => setSelectedCourse(revertTextToCourse(value))}
                            placeHolder='Lọc theo môn học'
                        />
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