import { Icons } from '../../../assets/icons/Icon';
import { RegisterAreaContainer } from './RegisterArea.styled';

const RegisterArea = ({ sessionList }) => {

    const handleOnClickRow = (e) => {

    }


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
                        {sessionList.map((session, index) => (
                            <tr
                                className='body-row'
                                key={index}
                                onClick={handleOnClickRow}
                            >
                                <td>{session.id}</td>
                                <td>{session.nameCourse}</td>
                                <td>{session.class}</td>
                                <td>{session.group}</td>
                                <td>{session.credits}</td>
                                <td>{session.quantity}</td>
                                <td>{session.empty}</td>
                                <td className='time-box'>{session.startDate + " - " + session.endDate}</td>
                                <td>
                                    <label className="custom-checkbox">
                                        <input type="checkbox" />
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
        </RegisterAreaContainer>
    );
};

export default RegisterArea;