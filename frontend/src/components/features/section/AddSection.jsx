import { useEffect, useRef, useState } from 'react';
import { AddSectionContainer } from './AddSection.styled';
import SelectOption from '../../commons/SelectOption';
import { useDispatch, useSelector } from 'react-redux';
import { addSchedule, resetScheduleState, setClassId, setCourseId, setGroup, setMinStudents, setMaxStudents, setSemester, setYear, setYears, setSchedules, removeSchedule, resetSectionForm, resetAddSectionState, resetTeacherAndPlace } from '../../../stores/slices/sectionSlice';
import CounterBox from '../../commons/CounterBox';
import { Icons } from '../../../assets/icons/Icon';
import DatePicker from '../../commons/DatePicker';
import { fetchActiveClassIds } from '../../../apis/classApi';
import { fetchCourseBySemester } from '../../../apis/courseApi';
import { addDayOfWeek, addEndDate, addEndPeriod, addPlaceId, addStartDate, addStartPeriod, addTeacherId, dowEngToVie, dowVieToEng, resetScheduleForm, resetScheduleOnSection } from '../../../stores/slices/scheduleSlice';
import { fetchTeacherForCourse } from '../../../apis/teacherApi';
import { fetchAllPlaces } from '../../../apis/placeApi';
import { convertToDayMonthYear, convertToYearMonthDay } from '../schedule/FilterArea';
import { createSection, fetchSections } from '../../../apis/sectionApi';
import Alert from '../../commons/Alert';


const AddSection = ({ setIsAdding }) => {

    // Variable
    const thisRef = useRef();
    const dispatch = useDispatch();
    const { postLoading, postError, courses, years, semesters, classIds, dayOfWeeks, periods, teachers, places } = useSelector((state) => state.section);
    const { classId, year, semester, courseId, groupNumber, minStudents, maxStudents, schedules }
        = useSelector((state) => state.section.addSectionForm);
    const { loading, filters, filter, currentPage, itemPerPage, searchKey }
        = useSelector((state) => state.section);
    const { addScheduleForm } = useSelector((state) => state.schedule);
    const { addSectionForm } = useSelector((state) => state.section);
    const [canAddSchedule, setCanAddSchedule] = useState(false);
    const [canAddSection, setCanAddSection] = useState(false);
    const [errors, setErrors] = useState({
        students: '',
        periods: '',
        dates: '',
        overlap: '',
    });

    // Function 

    const handleClickCancel = () => {
        setIsAdding(false);
        resetAllState();
    };
    const handleClickConfirm = () => {
        if(validateAddSection()) {
            console.log("dispatch section");
            dispatch(createSection({section: addSectionForm}))
                .unwrap()
                .then((action) => {
                    // Xóa state, đóng form.
                    resetAllState();
                    setIsAdding(false);
                    dispatch(fetchSections({ filter, searchKey, currentPage, itemPerPage }));
                })
                .catch((error) => {

                });
        }
    };

    const resetAllState = () => {
        dispatch(resetSectionForm());
        dispatch(resetAddSectionState());
        dispatch(resetScheduleForm());
    }

    const mapToSelectCourseItem = (courses) => {
        const targets = courses.map((course) => {
            return `${course.courseId} - ${course.courseName}`;
        });
        return targets;
    };

    const convertCourseId = (string) => {
        return string && string != '' ? string.split(" ")[0] : null;
        // lấy chuỗi đầu tiên 'INT1423' trong 'INT1423 - Lập trình C++'
    };
    const convertTeacherId = (string) => {
        return string && string != '' ? string.split(" ")[0] : null;
        // lấy chuỗi đầu tiên 'T30GVCN138' trong 'T30GVCN138 - Đặng Thị Ngọc'
    };

    // Kiểm tra thông tin đầu vào
    // Hàm validate số sinh viên
    const validateStudents = () => {
        if (minStudents <= 0) {
            return 'Số sinh viên tối thiểu phải lớn hơn 0';
        }
        if (maxStudents > 200) {
            return 'Số sinh viên tối đa không được vượt quá 200';
        }
        if (minStudents > maxStudents) {
            return 'Số sinh viên tối thiểu phải nhỏ hơn hoặc bằng số sinh viên tối đa';
        }
        return '';
    };

    // Hàm validate tiết học
    const validatePeriods = () => {
        if (addScheduleForm.startPeriod > addScheduleForm.endPeriod) {
            return 'Tiết bắt đầu phải nhỏ hơn hoặc bằng tiết kết thúc';
        }
        if (addScheduleForm.startPeriod < 1 || addScheduleForm.startPeriod > 12) {
            return 'Tiết bắt đầu phải nằm trong khoảng từ 1 đến 12';
        }
        if (addScheduleForm.endPeriod < 1 || addScheduleForm.endPeriod > 12) {
            return 'Tiết kết thúc phải nằm trong khoảng từ 1 đến 12';
        }
        return '';
    };

    // Hàm validate ngày
    const validateDates = () => {
        if (!addScheduleForm.startDate || !addScheduleForm.endDate) {
            return 'Ngày bắt đầu và ngày kết thúc không được để trống';
        }
        const startDate = new Date(addScheduleForm.startDate);
        const endDate = new Date(addScheduleForm.endDate);
        const now = new Date();
        if (startDate < now) {
            return 'Ngày áp dụng không thể trong quá khứ';
        }
        if (startDate > endDate) {
            return 'Ngày bắt đầu phải trước hoặc bằng ngày kết thúc';
        }
        return '';
    };

    // Hàm validate chồng lịch
    const validateOverlap = () => {
        if (addScheduleForm.dayOfWeek && addScheduleForm.startDate && addScheduleForm.endDate) {
            const newStartDate = new Date(addScheduleForm.startDate);
            const newEndDate = new Date(addScheduleForm.endDate);
            const newStartPeriod = addScheduleForm.startPeriod;
            const newEndPeriod = addScheduleForm.endPeriod;
            const newDayOfWeek = addScheduleForm.dayOfWeek;

            for (const schedule of schedules) {
                const existingStartDate = new Date(schedule.startDate);
                const existingEndDate = new Date(schedule.endDate);
                const existingStartPeriod = schedule.startPeriod;
                const existingEndPeriod = schedule.endPeriod;
                const existingDayOfWeek = schedule.dayOfWeek;

                if (newDayOfWeek === existingDayOfWeek) {
                    const datesOverlap = newStartDate <= existingEndDate && newEndDate >= existingStartDate;
                    const periodsOverlap = newStartPeriod <= existingEndPeriod && newEndPeriod >= existingStartPeriod;

                    if (datesOverlap && periodsOverlap) {
                        return `Đã có buổi học khác trong khung giờ này`;
                    }
                }
            }
        }
        return '';
    };


    // Hàm validate input
    const validateInput = () => {
        const studentsError = validateStudents();
        const periodsError = validatePeriods();
        const datesError = validateDates();
        setErrors({
            ...errors,
            students: studentsError,
            periods: periodsError,
            dates: datesError,
        });
        return !studentsError && !periodsError && !datesError;
    };
    
    const validateAddSchedule = () => {
        const periodsError = validatePeriods();
        const datesError = validateDates();
        const overlapError = validateOverlap();

        setErrors({
            ...errors,
            periods: periodsError,
            dates: datesError,
            overlap: overlapError,

        });

        return !periodsError && !datesError && !overlapError;
    };


    const validateAddSection = () => {
        const studentError = validateStudents();
        setErrors({
            ...errors,
            students: studentError,
        });
        return !studentError;
    };

    // useEffect để validate real-time
    useEffect(() => {
        validateInput();
    }, [
        minStudents,
        maxStudents,
        addScheduleForm.startPeriod,
        addScheduleForm.endPeriod,
        addScheduleForm.startDate,
        addScheduleForm.endDate,
    ]);

    // Thêm lịch vào học phần
    const handleClickAddSchedule = () => {
        if (validateAddSchedule()) {
            // Thêm vào section form
            dispatch(addSchedule(addScheduleForm));
            setErrors({ ...errors, periods: '', dates: '', overlap: ''});
        }
    };

    const handleDeleteSchedule = (id) => {
        dispatch(removeSchedule(id));
    }

    useEffect(() => {
        if (courseId && schedules.length > 0 && !errors.students) {
            setCanAddSection(true);
        }
        else {
            setCanAddSection(false);
        }
    }, [courseId, schedules, errors.students]);

    useEffect(() => {
        if (addScheduleForm.teacherId && addScheduleForm.placeId
            && !errors.periods && !errors.dates
        ) {
            setCanAddSchedule(true);
        } else {
            setCanAddSchedule(false);
        }
    }, [addScheduleForm.teacherId, addScheduleForm.placeId, errors]);

    // Tải các thông tin khi giao diện bật lên
    useEffect(() => {
        // Lấy danh sách năm tính từ năm hiện tại
        const currentYear = new Date().getFullYear() - 1;
        const yearArray = Array.from({ length: 10 }, (_, i) => currentYear + i);
        dispatch(setYears(yearArray));
        // Lấy danh sách lớp - còn nằm trong niên khóa
        dispatch(fetchActiveClassIds());
        console.log("useEffect 1 : fetchActiveClassIds");

        // Initialize default dates in Redux
        const today = new Date();
        const todayStr = today.toLocaleDateString('en-GB');
        dispatch(addStartDate(convertToYearMonthDay(todayStr)));
        dispatch(addEndDate(convertToYearMonthDay(todayStr)));

        return () => dispatch(resetAddSectionState());
    }, [])

    // Tìm môn học khi thông tin lớp - năm học - học kì thay đổi
    useEffect(() => {
        if (classId && year && semester) {
            dispatch(fetchCourseBySemester({ classId, year, semester }))
        }
    }, [classId, year, semester]);

    // Tìm thông tin giảng viên và phòng học khi môn học được chọn
    useEffect(() => {
        if (courseId && courseId != '') {
            console.log("useEffect 2 : fetchTeacherForCourse");
            console.log("useEffect 2 : fetchAllPlaces");
            dispatch(fetchTeacherForCourse({ courseId }));
            dispatch(fetchAllPlaces());
            // Clear existing schedules when course changes
            // Clear schedules in section form
            dispatch(setSchedules([]));
        } else {
            console.log("reset teacher & place");
            dispatch(resetTeacherAndPlace());
        }
    }, [courseId, dispatch]);

    // Reset courseId khi courses rỗng
    useEffect(() => {
        if (courses.length === 0 && courseId) {
            dispatch(setCourseId('')); // Reset courseId
        }
    }, [courses, courseId, dispatch]);

    // Xử lý khi click ra ngoài
    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (thisRef.current && !thisRef.current.contains(e.target)) {
                setIsAdding(false);
                resetAllState();
            }
        };

        document.addEventListener('mousedown', handleClickOutSide);
        return () => document.removeEventListener('mousedown', handleClickOutSide);
    }, [setIsAdding]);

    useEffect(() => {
        console.log(addSectionForm);
        console.log(addScheduleForm);
    }, [addScheduleForm, addSectionForm]);

    return (
        <AddSectionContainer ref={thisRef}>
            <div className="title-cont">
                <h2>Thêm lớp học phần mới</h2>
                <small>Điền đầy đủ thông tin để tạo lớp học phần mới</small>
            </div>
            <div className="section-1">
                <div className="option-box">
                    <div className="o-title">
                        Lớp sinh viên
                    </div>
                    <div className="select-option">
                        <SelectOption
                            options={classIds}
                            value={classId}
                            onSelect={(value) => dispatch(setClassId(value))}
                        />
                    </div>
                </div>
                <div className="option-box">
                    <div className="o-title">
                        Năm học
                    </div>
                    <div className="select-option">
                        <SelectOption
                            options={years}
                            value={year?.toString()}
                            onSelect={(value) => dispatch(setYear(parseInt(value)))}
                        />
                    </div>
                </div>
                <div className="option-box">
                    <div className="o-title">
                        Học kì
                    </div>
                    <div className="select-option">
                        <SelectOption
                            options={semesters}
                            value={semester?.toString()}
                            onSelect={(value) => dispatch(setSemester(parseInt(value)))}
                        />
                    </div>
                </div>
            </div>
            <div className="section-2">
                <div className="option-box">
                    <div className="o-title">
                        Môn học
                    </div>
                    <div className="select-option">
                        <SelectOption
                            options={mapToSelectCourseItem(courses)}
                            value={courseId ? courses.find(c => c.courseId === courseId) ? `${courseId} - ${courses.find(c => c.courseId === courseId).courseName}` : '' : ''}
                            onSelect={(value) => dispatch(setCourseId(convertCourseId(value)))}
                        />
                    </div>
                </div>
            </div>
            { <span className={`error ${errors.course ? 'visible' : ''}`}>{errors.course}</span>}
            <div className="section-3">
                <div className="counter-box">
                    <div className="c-title">
                        Số thứ tự nhóm
                    </div>
                    <div className="counter">
                        <CounterBox value={groupNumber} onChange={(value) => { dispatch(setGroup(value)) }} />
                    </div>
                </div>
                <div className="counter-box">
                    <div className="c-title">
                        Số sinh viên tối thiểu
                    </div>
                    <div className="counter">
                        <CounterBox value={minStudents} onChange={(value) => { dispatch(setMinStudents(value)) }} />
                    </div>
                </div>
                <div className="counter-box">
                    <div className="c-title">
                        Số sinh viên tối đa
                    </div>
                    <div className="counter">
                        <CounterBox value={maxStudents} onChange={(value) => { dispatch(setMaxStudents(value)) }} />
                    </div>
                </div>
            </div>
            { <span className={`error ${errors.students ? 'visible' : ''}`}>{errors.students}</span>}
            <div className="section-4">
                <div className="header">
                    <div className="h-title">Lịch học</div>
                    <div className="label">
                        <div className="wrap-center">
                            <Icons.FollowPlus />
                        </div>
                        <p>Thêm lịch học</p>
                    </div>
                </div>
                <div className="body">
                    <div className="b-title">
                        <h2>Thêm buổi học mới</h2>
                        <small>Điền thông tin chi tiết cho buổi học</small>
                    </div>

                    <div className="form-1">
                        <div className="dow-option-box">
                            <div className="f-title">
                                Ngày trong tuần
                            </div>
                            <div className="select-option">
                                <SelectOption
                                    options={dayOfWeeks}
                                    value={addScheduleForm.dayOfWeek ? dowEngToVie[addScheduleForm.dayOfWeek] : null}
                                    onSelect={(value) => dispatch(addDayOfWeek(value))}
                                />
                            </div>
                        </div>
                        <div className="box">
                            <div className="sp-option-box">
                                <div className="f-title">
                                    Tiết bắt đầu
                                </div>
                                <div className="select-option">
                                    <SelectOption
                                        options={periods}
                                        value={addScheduleForm.startPeriod}
                                        onSelect={(value) => dispatch(addStartPeriod(value))}
                                    />
                                </div>
                            </div>
                            <div className="ep-option-box">
                                <div className="f-title">
                                    Tiết kết thúc
                                </div>
                                <div className="select-option">
                                    <SelectOption
                                        options={periods}
                                        value={addScheduleForm.endPeriod}
                                        onSelect={(value) => dispatch(addEndPeriod(value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    { <span className={`error ${errors.periods ? 'visible' : ''}`}>{errors.periods}</span>}
                    <div className="form-2">
                        <div className="sd-option-box">
                            <div className="f-title">
                                Ngày bắt đầu
                            </div>
                            <div className='select-option'>
                                <DatePicker
                                    value={addScheduleForm.startDate ? convertToDayMonthYear(addScheduleForm.startDate) : ''}
                                    onChange={(value) => dispatch(addStartDate(convertToYearMonthDay(value)))}
                                />
                            </div>
                        </div>
                        <div className="ed-option-box">
                            <div className="f-title">
                                Ngày kết thúc
                            </div>
                            <div className='select-option'>
                                <DatePicker
                                    value={addScheduleForm.endDate ? convertToDayMonthYear(addScheduleForm.endDate) : ''}
                                    onChange={(value) => dispatch(addEndDate(convertToYearMonthDay(value)))}
                                />
                            </div>
                        </div>
                    </div>
                    { <span className={`error ${errors.dates ? 'visible' : ''}`}>{errors.dates}</span>}
                    <div className="form-3">
                        <div className="te-option-box">
                            <div className="f-title">
                                Giảng viên
                            </div>
                            <div className="select-option">
                                <SelectOption
                                    options={teachers.map((t) => (`${t.teacherId} - ${t.fullname}`))}
                                    value={addScheduleForm.teacherId ? teachers.find(t => t.teacherId === addScheduleForm.teacherId)?.fullname : null}
                                    onSelect={(value) => dispatch(addTeacherId(convertTeacherId(value)))}
                                />
                            </div>
                        </div>
                        <div className="pl-option-box">
                            <div className="f-title">
                                Địa điểm
                            </div>
                            <div className="select-option">
                                <SelectOption
                                    options={places.map((p) => (p.placeId))}
                                    value={addScheduleForm.placeId}
                                    onSelect={(value) => dispatch(addPlaceId(value))}
                                />
                            </div>
                        </div>
                    </div>
                    {<span className={`error ${errors.overlap || errors.empty ? 'visible' : ''}`}>{errors.overlap ||  errors.empty}</span>}
                    <button className={`add-btn ${canAddSchedule ? '' : 'disable'}`} onClick={handleClickAddSchedule} >Thêm vào lịch học</button>
                </div>
            </div>
            <div className="section-5">
                <div className="a-title">
                    Danh sách lịch học đã thêm
                </div>
                <div className="table-container">
                    <table className='table'>
                        <thead>
                            <tr className='head-row'>
                                <th>Thứ</th>
                                <th>Tiết</th>
                                <th>Thời gian</th>
                                <th>Giảng viên</th>
                                <th>Địa điểm</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((sc, index) => (
                                <tr
                                    className='body-row'
                                    key={index}
                                >
                                    <td>{dowEngToVie[sc.dayOfWeek]}</td>
                                    <td>{sc.startPeriod + ' - ' + sc.endPeriod}</td>
                                    <td>{convertToDayMonthYear(sc.startDate) + ' - '} <br /> {convertToDayMonthYear(sc.endDate)}</td>
                                    <td>{sc.teacherId}</td>
                                    <td>{sc.placeId}</td>
                                    <td><div className='trash wrap-center' onClick={() => handleDeleteSchedule(sc.scheduleId)}><Icons.Trash /></div></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="footer">
                <button className="cancel-btn" onClick={handleClickCancel}>Hủy</button>
                <button className={`confirm-btn ${canAddSection ? '' : 'disable'}`} onClick={handleClickConfirm}>{postLoading ? 'Đang tạo..' : 'Xác nhận'}</button>
                {postError && <Alert message={postError.message} />}
            </div>

        </AddSectionContainer>
    );
};

export default AddSection;