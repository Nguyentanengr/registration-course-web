import { useEffect, useRef, useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import { ListStudentContainer } from './ListStudent.styled';
import { useDispatch, useSelector } from 'react-redux';
import { convertToDayMonthYear } from '../schedule/FilterArea';
import { fetchStudentsByOpenSection } from '../../../apis/studentApi';
import { exportStudentsByOpenSections } from '../../../apis/exportApi';
import { toast } from 'react-toastify';


export const convertGenderToVie = (gender) => {
    if (gender === 'MALE') {
        return 'Nam';
    } else if (gender === 'FEMALE') {
        return 'Nữ';
    }
    return '';
};

export const convertToDateTime = (jsonTime) => {
    const [ date, time ] = jsonTime.split('T');
    const [ year, month, day ] = date.split('-');
    return `${day}/${month}/${year} ${time}`;
}

const ListStudent = ({ setOnSee, openSection }) => {

    const thisRef = useRef(null);
    const dispatch = useDispatch();
    const [onRefresh, setOnRefresh] = useState(false);
    const {
        filterClassId,
        filterYear,
        filterSemester,
        searchKey,
        classIds,
        sections,
        students,
    } = useSelector((state) => state.studentList);

    const handleClickConfirm = () => {
        setOnSee(false);
    }

    const handleExportFile = (openSectionIds) => {
            console.log("openSectionIds");
            console.log(openSectionIds);
    
            dispatch(exportStudentsByOpenSections({ openSessionIds: openSectionIds }))
                .unwrap()
                .then((action) => {
                    // action chứa { fileName, success }
                    console.log("Tải file thành công");
                })
                .catch((error) => {
                    console.error("Error exporting file:", error);
                    toast.error(error.message || "Đã có lỗi xảy ra khi tải file!");
                });
        };

    // khi form hiện lên -> fetch dữ liệu
    useEffect(() => {
        dispatch(fetchStudentsByOpenSection({openSectionId: openSection.openSessionId}))
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (thisRef.current && !thisRef.current.contains(e.target)) {
                setOnSee(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <ListStudentContainer ref={thisRef}>
            <div className="show-list">
                <div className="s-title">
                    <h2>Danh sách sinh viên - Lớp học phần {openSection.sessionId}</h2>
                    <small>{openSection.courseId} - {openSection.courseName} - Lớp {openSection.classId} - Nhóm {openSection.groupNumber}</small>
                </div>
            </div>

            <div className="table-list-student">
                <div className="table-container">
                    <table className='table'>
                        <thead>
                            <tr className='head-row'>
                                <th>STT</th>
                                <th>Mã SV</th>
                                <th>Họ và tên</th>
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>Ngày đăng ký</th>
                                <th>Điểm GK</th>
                                <th>Điểm CK</th>
                                <th>Tổng kết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr
                                    className='body-row'
                                    key={index}
                                >
                                    <td>{index + 1}</td>
                                    <td>{student.studentId}</td>
                                    <td>{student.fullname}</td>
                                    <td>{convertToDayMonthYear(student.dateOfBirth)}</td>
                                    <td>{convertGenderToVie(student.gender)}</td>
                                    <td>{convertToDateTime(student.registerDate)}</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="confirm-box">
                <div className="excel-btn">
                    <button className='excel wrap-center active' onClick={() => handleExportFile([openSection.openSessionId])}>
                        <div className="icon wrap-center">
                            <Icons.File />
                        </div>
                        <p>Xuất Excel</p>
                    </button>
                </div>
                <button className="close-btn" onClick={handleClickConfirm}>Đóng</button>
            </div>
        </ListStudentContainer>
    );
};

export default ListStudent;