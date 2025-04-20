import { useEffect, useRef, useState } from 'react';
import { EditScheduleDialogContainer } from './EditScheduleDialog.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addSchedule, removeSchedule, resetFetchState, setScheduleForm, setScheduleFormItem, setSchedules } from '../../../stores/slices/editScheduleSlice';
import { fetchScheduleOnSection, updateScheduleOnSection } from '../../../apis/scheduleApi';
import Alert from '../../commons/Alert';
import { dowEngToVie, dowVieToEng } from '../../../stores/slices/scheduleSlice';
import { convertToDayMonthYear, convertToYearMonthDay } from '../schedule/FilterArea';
import { Icons } from '../../../assets/icons/Icon';
import DatePicker from '../../commons/DatePicker';
import SelectOption from '../../commons/SelectOption';
import { fetchTeacherForCourse } from '../../../apis/teacherApi';
import { fetchAllPlaces } from '../../../apis/placeApi';
import ConfirmDelete from './ConfirmDelete';
import { fetchSections } from '../../../apis/sectionApi';

const EditScheduleDialog = ({ setEditSchedule, section }) => {

    const thisRef = useRef(null);
    const dispatch = useDispatch();
    const [canUpdate, setCanUpdate] = useState(true);
    const [canAddSchedule, setCanAddSchedule] = useState(false);
    const [dayOfWeeks, setDayOfWeeks] = useState(['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']);
    const [periods, setPeriods] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [isPopUpConfirm, setIsPopUpConfirm] = useState(false);
    const [errors, setErrors] = useState({
        periods: '',
        dates: '',
        overlap: ''
    });
    const {
        schedules,
        addScheduleForm,
        teachers,
        places,
        postLoading,
        postError
    } = useSelector((state) => state.editSchedule);
    const {
        filter, searchKey, currentPage, itemPerPage
    } = useSelector((state) => state.section);


    // Hàm validate ngày
    const validateDates = () => {
        if (!addScheduleForm.startDate || !addScheduleForm.endDate) {
            return 'Ngày bắt đầu và ngày kết thúc không được để trống';
        }
        const startDate = new Date(addScheduleForm.startDate);
        const endDate = new Date(addScheduleForm.endDate);
        if (startDate > endDate) {
            return 'Ngày bắt đầu phải trước hoặc bằng ngày kết thúc';
        }
        return '';
    };

    // validate tiết học
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

    const validateInput = () => {
        const periodsError = validatePeriods();
        const datesError = validateDates();
        setErrors({
            ...errors,
            periods: periodsError,
            dates: datesError,
        });
        return !periodsError && !datesError;
    };

    const handleClickCancel = () => {
        setEditSchedule(null);
    };

    const handleClickConfirm = () => {
        setIsPopUpConfirm(true);
    };

    const handleDeleteSchedule = (scheduleId) => {
        dispatch(removeSchedule(scheduleId));
    };

    const handleOnUpdate = () => {
        dispatch(updateScheduleOnSection({ sessionId: section.sessionId, schedules: schedules }))
            .unwrap()
            .then((response) => {
                // khi update thành công -> đóng form, xóa trạng thái.
                dispatch(fetchSections({ filter, searchKey, currentPage, itemPerPage }));
                setEditSchedule(null);
            })
    };

    // Validate cho dữ liệu của schedule
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

    // Thêm buổi học vào lịch học phần
    const handleClickAddSchedule = () => {
        if (validateAddSchedule()) {
            // Thêm vào section form
            dispatch(addSchedule(addScheduleForm));
            setErrors({ ...errors, periods: '', dates: '', overlap: '' });
        }
    };

    const convertTeacherId = (string) => {
        console.log(string);
        return string && string != '' ? string.split(" ")[0] : '';
        // lấy chuỗi đầu tiên 'T30GVCN138' trong 'T30GVCN138 - Đặng Thị Ngọc'
    };

    const getTearcherOptions = () => {
        if (teachers && teachers.length > 0) {
            return teachers.map((t) => (`${t.teacherId} - ${t.fullname}`));
        }
        return [];
    };

    const getTeacherValue = () => {
        return addScheduleForm.teacherId ? teachers.find(t => t.teacherId === addScheduleForm.teacherId)?.fullname : '';
    }

    useEffect(() => {
        validateInput();
    }, [
        addScheduleForm.startPeriod,
        addScheduleForm.endPeriod,
        addScheduleForm.startDate,
        addScheduleForm.endDate,
    ]);

    // Nếu có thay đổi trong form, kiểm tra và set CanAddSchedule
    useEffect(() => {
        if (addScheduleForm.teacherId && addScheduleForm.placeId
            && !errors.periods && !errors.dates
        ) {
            setCanAddSchedule(true);
        } else {
            setCanAddSchedule(false);
        }
    }, [addScheduleForm.teacherId, addScheduleForm.placeId, errors]);

    useEffect(() => {
        dispatch(fetchScheduleOnSection({ sessionId: section.sessionId }))
            .unwrap()
            .then((response) => {
                dispatch(setSchedules(response.data));
            });
        dispatch(fetchTeacherForCourse({ courseId: section.courseInfo.courseId }));

        dispatch(fetchAllPlaces());

        return () => {
            dispatch(setScheduleForm({}));
            dispatch(resetFetchState());
            setErrors({ ...errors, periods: '', dates: '', overlap: '' });
        };
    }, []);

    // Nếu click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (thisRef.current && !thisRef.current.contains(e.target)) {
                setEditSchedule(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        console.log('when teachers list changed')
        console.log(teachers);
    }, [teachers]);

    useEffect(() => {
        console.log('when addScheduleForm changed')
        console.log(addScheduleForm)
    }, [addScheduleForm]);

    useEffect(() => {
        console.log('when schedules changed')
        console.log(schedules);
        if (schedules.length > 0) setCanUpdate(true);
        else setCanUpdate(false);
    }, [schedules]);

    return (
        <EditScheduleDialogContainer ref={thisRef}>
            <div className="section-4">
                <div className="header">
                    <div className='icon wrap-center'>
                        <Icons.Edit />
                    </div>
                    <h2 className="b-title">Chỉnh sửa thông tin lịch học lớp học phần {section.sessionId}</h2>
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
                                    onSelect={(value) => dispatch(setScheduleFormItem({ dayOfWeek: dowVieToEng[value] }))}
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
                                        onSelect={(value) => dispatch(setScheduleFormItem({ startPeriod: value }))}
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
                                        onSelect={(value) => dispatch(setScheduleFormItem({ endPeriod: value }))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {<span className={`error ${errors.periods ? 'visible' : ''}`}>{errors.periods}</span>}
                    <div className="form-2">
                        <div className="sd-option-box">
                            <div className="f-title">
                                Ngày bắt đầu
                            </div>
                            <div className='select-option'>
                                <DatePicker
                                    value={addScheduleForm.startDate ? convertToDayMonthYear(addScheduleForm.startDate) : ''}
                                    onChange={(value) => dispatch(setScheduleFormItem({ startDate: convertToYearMonthDay(value) }))}
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
                                    onChange={(value) => dispatch(setScheduleFormItem({ endDate: convertToYearMonthDay(value) }))}
                                />
                            </div>
                        </div>
                    </div>
                    {<span className={`error ${errors.dates ? 'visible' : ''}`}>{errors.dates}</span>}
                    <div className="form-3">
                        <div className="te-option-box">
                            <div className="f-title">
                                Giảng viên
                            </div>
                            <div className="select-option">
                                <SelectOption
                                    placeHolder='Chọn giảng viên'
                                    options={getTearcherOptions()}
                                    value={getTeacherValue()}
                                    onSelect={(value) => dispatch(setScheduleFormItem({ teacherId: convertTeacherId(value) }))}
                                />
                            </div>
                        </div>
                        <div className="pl-option-box">
                            <div className="f-title">
                                Địa điểm
                            </div>
                            <div className="select-option">
                                <SelectOption
                                    placeHolder='Chọn phòng học'
                                    options={places.length > 0 ? places.map((p) => (p.placeId)) : []}
                                    value={addScheduleForm.placeId}
                                    onSelect={(value) => dispatch(setScheduleFormItem({ placeId: value }))}
                                />
                            </div>
                        </div>
                    </div>
                    {<span className={`error ${errors.overlap ? 'visible' : ''}`}>{errors.overlap}</span>}
                    <button className={`add-btn ${canAddSchedule ? '' : 'disable'}`} onClick={handleClickAddSchedule} >Thêm vào lịch học</button>
                </div>
            </div>
            <div className="section-schedule">
                <div className="a-title">
                    Danh sách lịch học đã thêm
                </div>
                <div className="table-container">
                    <table className='table-schedule'>
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
                                    <td>{convertToDayMonthYear(sc.startDate)} <br /> {' - ' + convertToDayMonthYear(sc.endDate)}</td>
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
                <button className={`confirm-btn ${canUpdate ? '' : 'disable'}`} onClick={handleClickConfirm}>{postLoading ? 'Đang Lưu..' : 'Xác nhận'}</button>
                {postError && <Alert message={postError.message} />}
            </div>

            {isPopUpConfirm && <div className='pop-up-container wrap-center'>
                <ConfirmDelete
                    setIsDelete={setIsPopUpConfirm}
                    action='update'
                    message={`Bạn có chắc chắn thay đổi thông tin lịch học của lớp học phần ${section.sessionId}? Hành động này không thể hoàn tác.`}
                    onDelete={handleOnUpdate}
                />
            </div>}
        </EditScheduleDialogContainer>
    );
};

export default EditScheduleDialog;