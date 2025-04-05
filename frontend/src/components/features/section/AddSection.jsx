

import { useEffect, useRef, useState } from 'react';
import { AddSectionContainer } from './AddSection.styled';
import SelectOption from '../../commons/SelectOption';
import { useDispatch, useSelector } from 'react-redux';
import { setClassId } from '../../../stores/slices/sectionSlice';
import CounterBox from '../../commons/CounterBox';
import { Icons } from '../../../assets/icons/Icon';
import DatePicker from '../../commons/DatePicker';

const AddSection = ({ setIsAdding }) => {

    // Variable
    const dispatch = useDispatch();
    const { addSectionForm } = useSelector((state) => state.section);
    const thisRef = useRef();
    const [listSchedule, setListSchedule] = useState([]);
    const [schedule, setSchedule] = useState({
        "dayOfWeek": null,
        "startPeriod": null,
        "endPeriod": null,
        "startDate": null,
        "endDate": null,
        "teacher": null,
        "place": null,
    });

    const handleSetSchedule = (name, value) => {
        setSchedule(prev => ({ ...prev, [name]: value }));
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    // Function 

    useEffect(() => {
        console.log(schedule);
    }, [schedule]);

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
    }, [addSectionForm]);

    const handleClickCancel = () => {
        setIsAdding(false);
    };
    const handleClickConfirm = () => {
        setIsAdding(false);
    };

    const handleAddSchedule = () => {
        setListSchedule([...listSchedule, schedule]);
    }

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
                        <SelectOption options={["Lớp sinh viên 1", "Lớp sinh viên 2", "Lớp sinh viên 3"]} />
                    </div>
                </div>
                <div className="option-box">
                    <div className="o-title">
                        Năm học
                    </div>
                    <div className="select-option">
                        <SelectOption options={["2025", "2024", "2023", "2022"]} />
                    </div>
                </div>
                <div className="option-box">
                    <div className="o-title">
                        Học kì
                    </div>
                    <div className="select-option">
                        <SelectOption options={["1", "2", "3"]} />
                    </div>
                </div>
            </div>
            <div className="section-2">
                <div className="option-box">
                    <div className="o-title">
                        Môn học
                    </div>
                    <div className="select-option">
                        <SelectOption options={["INT1339-Công nghệ phần mêm", "INT1227-Lập trình Web", "INT1008-Cơ sở dữ liệu"]} />
                    </div>
                </div>
            </div>
            <div className="section-3">
                <div className="counter-box">
                    <div className="c-title">
                        Số thứ tự nhóm
                    </div>
                    <div className="counter">
                        <CounterBox init={1} min={0} onChange={() => { }} />
                    </div>
                </div>
                <div className="counter-box">
                    <div className="c-title">
                        Số sinh viên tối thiểu
                    </div>
                    <div className="counter">
                        <CounterBox init={20} min={20} onChange={() => { }} />
                    </div>
                </div>
                <div className="counter-box">
                    <div className="c-title">
                        Số sinh viên tối đa
                    </div>
                    <div className="counter">
                        <CounterBox init={20} min={20} onChange={() => { }} />
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
                                <SelectOption options={["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"]} placeholder='Chọn ngày' onSelect={(value) => handleSetSchedule('dayOfWeek', value)} />
                            </div>
                        </div>
                        <div className="box">
                            <div className="sp-option-box">
                                <div className="f-title">
                                    Tiết bắt đầu
                                </div>
                                <div className="select-option">
                                    <SelectOption
                                        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                        onSelect={(value) => handleSetSchedule('startPeriod', value)}
                                    />
                                </div>
                            </div>
                            <div className="ep-option-box">
                                <div className="f-title">
                                    Tiết kết thúc
                                </div>
                                <div className="select-option">
                                    <SelectOption
                                        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                        onSelect={(value) => handleSetSchedule('endPeriod', value)}
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
                                <DatePicker onChange={(value) => handleSetSchedule('startDate', value)} />
                            </div>
                        </div>
                        <div className="ed-option-box">
                            <div className="f-title">
                                Ngày kết thúc
                            </div>
                            <div className='select-option'>
                                <DatePicker onChange={(value) => handleSetSchedule('endDate', value)} />
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
                                    options={["Lương Văn Thùy", "Cao Thị Thứ", "Đinh Xuân Anh", "Mai Xuân Thi"]}
                                    onSelect={(value) => handleSetSchedule('teacher', value)}
                                />
                            </div>
                        </div>
                        <div className="pl-option-box">
                            <div className="f-title">
                                Địa điểm
                            </div>
                            <div className="select-option">
                                <SelectOption
                                    options={["2B11-Phòng học lí thuyết", "2B22-Phòng học lí thuyết", "2A31-Phòng học thí nghiệm"]}
                                    onSelect={(value) => handleSetSchedule('place', value)}
                                />
                            </div>
                        </div>
                    </div>
                    <button className="add-btn" onClick={handleAddSchedule}>Thêm vào lịch học</button>
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
                            {listSchedule.map((sc, index) => (
                                <tr
                                    className='body-row'
                                    key={index}
                                >
                                    <td>{sc.dayOfWeek}</td>
                                    <td>{sc.startPeriod + ' - ' + sc.endPeriod}</td>
                                    <td>{formatDate(sc.startDate) + ' - '} <br /> {formatDate(sc.endDate)}</td>
                                    <td>{sc.teacher}</td>
                                    <td>{sc.place}</td>
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