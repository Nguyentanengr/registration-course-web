import DatePicker from '../../commons/DatePicker';
import SelectOption from '../../commons/SelectOption';
import { AddPeriodContainer } from './AddPeriod.styled';

const AddPeriod = ({ setIsAdding }) => {

    const handleClickCancel = () => {
        setIsAdding(false);
    };
    const handleClickConfirm = () => {
        setIsAdding(false);
    };

    return (
        <AddPeriodContainer>
            <div className="header-box">
                <h1>Tạo đợt đăng ký mới</h1>
                <small>Điền đầy đủ thông tin để tạo đợt đăng ký mới</small>
            </div>
            <div className="input-container">
                <div className="i-title">
                    Tên giai đoạn
                </div>
                <div className="i-box">
                    <input className='p-i' type="text" placeholder='Nhập tên giai đoạn đăng ký' />
                </div>
            </div>
            <div className="input-container">
                <div className="i-title">
                    Hình thức
                </div>
                <div className="i-box">
                    <SelectOption options={["Kỳ chính thức", "Kỳ hè"]} />
                </div>
            </div>
            <div className="input-container">
                <div className="i-title">
                    Thời gian mở
                </div>
                <div className="i-box">
                    <DatePicker onChange={(value) => { }} />
                </div>
            </div>
            <div className="input-container">
                <div className="i-title">
                    Thời gian đóng
                </div>
                <div className="i-box">
                    <DatePicker onChange={(value) => { }} />
                </div>
            </div>
            <div className="confirm-box">
                <button className="cancel-btn" onClick={handleClickCancel}>Hủy</button>
                <button className="confirm-btn" onClick={handleClickConfirm}>Xác nhận</button>
            </div>
        </AddPeriodContainer>
    );
};

export default AddPeriod;