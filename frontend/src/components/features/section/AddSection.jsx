

import { useEffect, useRef, useState } from 'react';
import { AddSectionContainer } from './AddSection.styled';
import SelectOption from '../../commons/SelectOption';
import { useDispatch, useSelector } from 'react-redux';
import { addSchedule, resetScheduleState, setClassId, setCourseId, setGroup, setMaxStudents, setMinStudents, setSemester, setYear, setYears } from '../../../stores/slices/sectionSlice';
import CounterBox from '../../commons/CounterBox';
import { Icons } from '../../../assets/icons/Icon';
import DatePicker from '../../commons/DatePicker';
import { fetchActiveClassIds } from '../../../apis/classApi';
import { fetchCourseBySemester } from '../../../apis/courseApi';
import { addDayOfWeek, addEndDate, addEndPeriod, addPlaceId, addStartDate, addStartPeriod, addTeacherId, dowEngToVie, dowVieToEng, resetScheduleForm, resetScheduleOnSection } from '../../../stores/slices/scheduleSlice';
import { fetchTeacherForCourse } from '../../../apis/teacherApi';
import { fetchAllPlaces } from '../../../apis/placeApi';
import { convertToDayMonthYear, convertToYearMonthDay } from '../schedule/FilterArea';

const AddSection = ({ setIsAdding }) => {

    // Variable
    const thisRef = useRef();
    const dispatch = useDispatch();
    const { courses, years, semesters, classIds, dayOfWeeks, periods, teachers, places } = useSelector((state) => state.section);
    const { classId, year, semester, courseId, groupNumber, minStudents, maxStudents, schedules }
        = useSelector((state) => state.section.addSectionForm);
    const { addScheduleForm } = useSelector((state) => state.schedule);
    const { addSectionForm } = useSelector((state) => state.section);

    // Function 

    const handleClickCancel = () => {
        setIsAdding(false);
    };
    const handleClickConfirm = () => {
        setIsAdding(false);
    };

    // const handleAddSchedule = () => {
    //     setListSchedule([...listSchedule, schedule]);
    // };

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
    const validateSchedule = () => {
        return true;
    }
    // Thêm lịch vào học phần
    const handleClickAddSchedule = () => {
        if (validateSchedule()) {
            // Thêm vào section form
            dispatch(addSchedule(addScheduleForm));
            // Xóa state
            dispatch(resetScheduleForm);
            // xóa state
            dispatch(resetScheduleState);
        }
    }

    // Tải các thông tin khi giao diện bật lên
    useEffect(() => {

        // Lấy danh sách năm tính từ năm hiện tại
        const currentYear = new Date().getFullYear();
        const yearArray = Array.from({ length: 10 }, (_, i) => currentYear + i);
        dispatch(setYears(yearArray));
        // Lấy danh sách lớp - còn nằm trong niên khóa
        dispatch(fetchActiveClassIds());
        console.log("useEffect 1 : fetchActiveClassIds");
        
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
            dispatch(fetchTeacherForCourse({courseId}));
            dispatch(fetchAllPlaces());
        }
    }, [courseId, dispatch]);

    // Xử lý khi click ra ngoài
    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (thisRef.current && !thisRef.current.contains(e.target)) {
                setIsAdding(false);
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
                        <SelectOption options={classIds} onSelect={(value) => dispatch(setClassId(value))}/>
                    </div>
                </div>
                <div className="option-box">
                    <div className="o-title">
                        Năm học
                    </div>
                    <div className="select-option">
                        <SelectOption options={years} onSelect={(value) => dispatch(setYear(value))}/>
                    </div>
                </div>
                <div className="option-box">
                    <div className="o-title">
                        Học kì
                    </div>
                    <div className="select-option">
                        <SelectOption options={semesters} onSelect={(value) => dispatch(setSemester(value))} />
                    </div>
                </div>
            </div>
            <div className="section-2">
                <div className="option-box">
                    <div className="o-title">
                        Môn học
                    </div>
                    <div className="select-option">
                        <SelectOption options={mapToSelectCourseItem(courses)} onSelect={(value) => dispatch(setCourseId(convertCourseId(value)))}/> {/* value: INT1423 - Lập trình C++ */}
                    </div>
                </div>
            </div>
            <div className="section-3">
                <div className="counter-box">
                    <div className="c-title">
                        Số thứ tự nhóm
                    </div>
                    <div className="counter">
                        <CounterBox init={1} min={0} onChange={(value) => {dispatch(setGroup(value))}} />
                    </div>
                </div>
                <div className="counter-box">
                    <div className="c-title">
                        Số sinh viên tối thiểu
                    </div>
                    <div className="counter">
                        <CounterBox init={20} min={20} onChange={(value) => {dispatch(setMinStudents(value))}} />
                    </div>
                </div>
                <div className="counter-box">
                    <div className="c-title">
                        Số sinh viên tối đa
                    </div>
                    <div className="counter">
                        <CounterBox init={20} min={20} onChange={(value) => {dispatch(setMaxStudents(value))}}/>
                    </div>
                </div>
            </div>
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
                                <SelectOption options={dayOfWeeks} placeholder='Chọn ngày' onSelect={(value) => dispatch(addDayOfWeek(value))} />
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
                                        onSelect={(value) => dispatch(addEndPeriod(value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-2">
                        <div className="sd-option-box">
                            <div className="f-title">
                                Ngày bắt đầu
                            </div>
                            <div className='select-option'>
                                <DatePicker onChange={(value) => dispatch(addStartDate(convertToYearMonthDay(value)))} />
                            </div>
                        </div>
                        <div className="ed-option-box">
                            <div className="f-title">
                                Ngày kết thúc
                            </div>
                            <div className='select-option'>
                                <DatePicker onChange={(value) => dispatch(addEndDate(convertToYearMonthDay(value)))} />
                            </div>
                        </div>

                    </div>
                    <div className="form-3">
                        <div className="te-option-box">
                            <div className="f-title">
                                Giảng viên
                            </div>
                            <div className="select-option">
                                <SelectOption
                                    options={teachers.map((t) => (`${t.teacherId} - ${t.fullname}`))}
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
                                    onSelect={(value) => dispatch(addPlaceId(value))}
                                />
                            </div>
                        </div>
                    </div>
                    <button className="add-btn" onClick={handleClickAddSchedule} >Thêm vào lịch học</button>
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
                                    <td><div className='trash'><Icons.Trash /></div></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="footer">
                <button className="cancel-btn" onClick={handleClickCancel}>Hủy</button>
                <button className="confirm-btn" onClick={handleClickConfirm}>Xác nhận</button>
            </div>
        </AddSectionContainer>
    );
};

export default AddSection;