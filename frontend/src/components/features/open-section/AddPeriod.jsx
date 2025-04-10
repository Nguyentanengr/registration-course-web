import { useDispatch, useSelector } from 'react-redux';
import DatePicker from '../../commons/DatePicker';
import SelectOption from '../../commons/SelectOption';
import { AddPeriodContainer } from './AddPeriod.styled';
import { resetPhaseForm, setPhaseForm } from '../../../stores/slices/phaseSlice';
import { useEffect, useRef, useState } from 'react';
import Alert from '../../commons/Alert';
import { createPhase, fetchAllPhase } from '../../../apis/phaseApi';


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

const AddPeriod = ({ setIsAdding }) => {

    const dispatch = useDispatch();
    const thisRef = useRef(null);
    const { phaseForm, postLoading, postError, searchKey } = useSelector((state) => state.phase);
    const [errorTime, setErrorTime] = useState('');
    const [canAdd, setCanAdd] = useState(false);

    // khi click hủy form
    const handleClickCancel = () => {
        setIsAdding(false);
        dispatch(resetPhaseForm());
    };

    // khi click tạo form
    const handleClickConfirm = () => {
        // fetch api
        dispatch(createPhase({ phase: phaseForm }))
            .unwrap()
            .then((action) => { // Reset Form, load lại dữ liệu
                setIsAdding(false);
                dispatch(resetPhaseForm());
                dispatch(fetchAllPhase({ searchKey: searchKey}));
            })
    };

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
        if (open > close) {
            setErrorTime('Ngày mở phải trước hoặc bằng ngày đóng')
        } else {
            setErrorTime('')
        }
    }, [phaseForm.openTime, phaseForm.closeTime])

    // khi click ra ngoài
    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (thisRef.current && !thisRef.current.contains(e.target)) {
                setIsAdding(false);
                dispatch(resetPhaseForm());
            }
        };

        document.addEventListener('mousedown', handleClickOutSide);
        return () => document.removeEventListener('mousedown', handleClickOutSide);
    }, [setIsAdding]);

    return (
        <AddPeriodContainer ref={thisRef}>
            <div className="header-box">
                <h1>Tạo đợt đăng ký mới</h1>
                <small>Điền đầy đủ thông tin để tạo đợt đăng ký mới</small>
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
                        <div className="i-box">
                            <SelectOption
                                options={generateFromCurrentYears()}
                                value={phaseForm.year}
                                onSelect={(value) => dispatch(setPhaseForm({ ...phaseForm, year: value }))}
                            />
                        </div>
                    </div>
                    <div className="box">
                        <div className="i-title">
                            Học kì
                        </div>
                        <div className="i-box">
                            <SelectOption
                                options={[1, 2, 3]}
                                value={phaseForm.semester}
                                onSelect={(value) => dispatch(setPhaseForm({ ...phaseForm, semester: value }))}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-container">
                <div className="i-title">
                    Thời gian mở
                </div>
                <div className="i-box">
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
        </AddPeriodContainer>
    );
};

export default AddPeriod;