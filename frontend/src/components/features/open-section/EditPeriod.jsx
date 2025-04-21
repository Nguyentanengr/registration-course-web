import { useDispatch, useSelector } from 'react-redux';
import DatePicker from '../../commons/DatePicker';
import SelectOption from '../../commons/SelectOption';
import { AddPeriodContainer } from './AddPeriod.styled';
import { resetFetchState, resetPhaseForm, setPhaseForm } from '../../../stores/slices/phaseSlice';
import { useEffect, useRef, useState } from 'react';
import Alert from '../../commons/Alert';
import { createPhase, fetchAllPhase, updatePhase } from '../../../apis/phaseApi';
import { EditPeriodContainer } from './EditPeriod.styled';
import ConfirmDelete from '../section/ConfirmDelete';


export const generateFromCurrentYears = () => {
    const currentYear = new Date().getFullYear();
    const yearArray = Array.from({ length: 10 }, (_, i) => currentYear + i);
    return yearArray;
}

export const convertJsonToDayMonthYear = (string) => { // 2020-02-02T22:22:22 => 02/02/2020
    if (string && string != '') {
        const [date, time] = string.split('T');
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }
    return '';
};

export const convertDayMonthYearToJsonTime = (string) => { // 02/02/2020 => 2020-02-02T00:00:00
    if (string && string != '') {
        const [day, month, year] = string.split('/');
        return `${year}-${month}-${day}T00:00:00`;
    }
    return '';
};

const EditPeriod = ({ setIsUpdate, phase }) => {

    const dispatch = useDispatch();
    const thisRef = useRef(null);
    const { phaseForm, postLoading, postError, updateError, searchKey } = useSelector((state) => state.phase);
    const [errorTime, setErrorTime] = useState('');
    const [canAdd, setCanAdd] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);

    // khi click hủy form
    const handleClickCancel = () => {
        setIsUpdate(false);
        dispatch(resetPhaseForm());
    };

    // khi click tạo form
    const handleClickConfirm = () => {
        setIsConfirm(true);
    };

    const handleOnUpdate = () => {
        dispatch(updatePhase({ phaseId: phase.phaseId, phase: phaseForm }))
            .unwrap()
            .then((action) => {
                setIsUpdate(false);
                dispatch(resetPhaseForm());
                dispatch(fetchAllPhase({ searchKey: searchKey }));
            })
    };


    const getStatusPhase = (phase) => {
        const open = new Date(phase.openTime);
        const close = new Date(phase.closeTime);
        const now = new Date();
        if (now >= open && now <= close) {
            return 0
        } else if (close < now) {
            return -1
        }
        return 1;
    }

    // logging
    useEffect(() => {
        console.log(phaseForm);
    }, [phaseForm]);

    // Kiểm tra thông tin đủ điều kiện để add
    useEffect(() => {
        setCanAdd(!errorTime && phaseForm.name);
    }, [phaseForm.name, errorTime]);

    // validate cho ngày mở và ngày đóng
    useEffect(() => {
        const open = new Date(phaseForm.openTime);
        const close = new Date(phaseForm.closeTime);
        const now = new Date();

        open.setHours(0, 0, 0, 0);
        close.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        now.setDate(now.getDate() + 1);

        if (getStatusPhase(phase) == 0 && (close < now)) {
            setErrorTime('Thời gian đóng phải là thời gian trong tương lai')
        }
        else if (getStatusPhase(phase) == 1 && (close < now || open < now)) {
            setErrorTime('Thời gian mở/đóng phải là thời gian trong tương lai')
        }
        else if (open >= close) {
            setErrorTime('Thời gian mở phải trước ngày đóng')
        } else {
            setErrorTime('')
        }
    }, [phaseForm.openTime, phaseForm.closeTime])

    // khi click ra ngoài
    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (thisRef.current && !thisRef.current.contains(e.target)) {
                setIsUpdate(false);
                dispatch(resetPhaseForm());
            }
        };

        document.addEventListener('mousedown', handleClickOutSide);
        return () => document.removeEventListener('mousedown', handleClickOutSide);
    }, [setIsUpdate]);

    useEffect(() => {
        dispatch(setPhaseForm({
            ...phaseForm,
            name: phase.phaseName,
            openTime: phase.openTime,
            closeTime: phase.closeTime,
            year: phase.year,
            semester: phase.semester,
        }));
        return () => {
            dispatch(resetPhaseForm());
            dispatch(resetFetchState());
        };
    }, [])

    return (
        <EditPeriodContainer ref={thisRef}>
            <div className="header-box">
                <h1>Chỉnh sửa đợt đăng ký
                    <span
                        className={`status ${getStatusPhase(phase) == 0 ? 'active' : 'coming'}`}
                    >
                        {getStatusPhase(phase) == 0 ? 'Đang hoạt động' : 'Sắp diễn ra'}

                    </span>
                </h1>
                <small>Điền đầy đủ thông tin để cập nhật đợt đăng ký {phase.phaseId}</small>
            </div>
            <div className="input-container">
                <div className="i-title">
                    Tên giai đoạn
                </div>
                <div className="i-box">
                    <input
                        value={phaseForm.name}
                        className='p-i'
                        type="text"
                        placeholder='Nhập tên giai đoạn đăng ký'
                        onChange={(e) => dispatch(setPhaseForm({ ...phaseForm, name: e.target.value }))}
                    />

                </div>
            </div>
            <div className="input-container">
                <div className="wrap wrap-center">
                    <div className="box">
                        <div className="i-title">
                            Năm học
                        </div>
                        <div className="i-box disable">
                            <SelectOption
                                value={phase.year}
                            />
                        </div>
                    </div>
                    <div className="box">
                        <div className="i-title">
                            Học kì
                        </div>
                        <div className="i-box disable">
                            <SelectOption
                                value={phase.semester}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-container">
                <div className="i-title">
                    Thời gian mở
                </div>
                <div className={`i-box ${getStatusPhase(phase) == 0 ? 'disable' : ''}`}>
                    <DatePicker
                        value={convertJsonToDayMonthYear(phaseForm.openTime)}
                        onChange={(value) => { dispatch(setPhaseForm({ ...phaseForm, openTime: convertDayMonthYearToJsonTime(value) })) }}
                    />
                </div>
            </div>
            <div className="input-container">
                <div className="i-title">
                    Thời gian đóng
                </div>
                <div className="i-box">
                    <DatePicker
                        value={convertJsonToDayMonthYear(phaseForm.closeTime)}
                        onChange={(value) => { dispatch(setPhaseForm({ ...phaseForm, closeTime: convertDayMonthYearToJsonTime(value) })) }}
                    />
                </div>
            </div>
            {<span className={`error ${errorTime ? 'visible' : ''}`}>{errorTime}</span>}
            <div className="confirm-box">
                <button className="cancel-btn" onClick={handleClickCancel}>Hủy</button>
                <button
                    className={`confirm-btn ${canAdd ? '' : 'disable'}`}
                    onClick={handleClickConfirm}
                >
                    {postLoading ? 'Đang tạo..' : 'Xác nhận'}
                </button>
            </div>
            {postError && <Alert message={postError.message || 'Đã có lỗi xảy ra'} />}
            {updateError && <Alert message={updateError.message || 'Đã có lỗi xảy ra'} />}
            {isConfirm && <div className='pop-up-container wrap-center'>
                <ConfirmDelete
                    action='update'
                    setIsDelete={setIsConfirm}
                    message={`Bạn có chắc chắn thay đổi thông tin cho đợt đăng ký ${phase.phaseId}? Hành động này không thể hoàn tác.`}
                    onDelete={handleOnUpdate}
                />
            </div>}
        </EditPeriodContainer>
    );
};

export default EditPeriod;