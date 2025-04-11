import { useEffect, useRef, useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import { ListStudentContainer } from './ListStudent.styled';
import { useDispatch, useSelector } from 'react-redux';

const students = [
    {
        id: 'SV100000',
        fullName: 'Huỳnh Thị Mai',
        birthDate: '18/11/2002',
        gender: 'Nữ',
        registerDate: '25/09/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100001',
        fullName: 'Trần Thanh Cường',
        birthDate: '04/05/2003',
        gender: 'Nam',
        registerDate: '24/08/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100002',
        fullName: 'Nguyễn Thanh Mai',
        birthDate: '24/12/2004',
        gender: 'Nam',
        registerDate: '02/08/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100003',
        fullName: 'Trần Xuân An',
        birthDate: '26/12/2003',
        gender: 'Nam',
        registerDate: '02/01/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100004',
        fullName: 'Võ Đức Dũng',
        birthDate: '23/10/2004',
        gender: 'Nam',
        registerDate: '18/06/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100005',
        fullName: 'Vũ Quang Mai',
        birthDate: '16/11/2001',
        gender: 'Nữ',
        registerDate: '10/12/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100006',
        fullName: 'Nguyễn Thị Quỳnh',
        birthDate: '03/08/2003',
        gender: 'Nữ',
        registerDate: '27/04/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100007',
        fullName: 'Lê Minh Thảo',
        birthDate: '04/07/2003',
        gender: 'Nam',
        registerDate: '01/12/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100008',
        fullName: 'Vũ Thị Phượng',
        birthDate: '27/06/2001',
        gender: 'Nam',
        registerDate: '01/03/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    // 11 phần tử tiếp theo với điểm là '-'
    {
        id: 'SV100009',
        fullName: 'Phạm Quốc Hùng',
        birthDate: '15/03/2002',
        gender: 'Nam',
        registerDate: '15/01/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100010',
        fullName: 'Hoàng Thị Linh',
        birthDate: '22/09/2004',
        gender: 'Nữ',
        registerDate: '30/05/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100011',
        fullName: 'Đặng Văn Nam',
        birthDate: '10/12/2003',
        gender: 'Nam',
        registerDate: '12/07/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100012',
        fullName: 'Bùi Thị Thu',
        birthDate: '05/04/2001',
        gender: 'Nữ',
        registerDate: '20/02/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100013',
        fullName: 'Nguyễn Văn Phúc',
        birthDate: '17/08/2002',
        gender: 'Nam',
        registerDate: '01/06/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100014',
        fullName: 'Trần Thị Hương',
        birthDate: '29/11/2004',
        gender: 'Nữ',
        registerDate: '14/03/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100015',
        fullName: 'Lê Quốc Tuấn',
        birthDate: '03/01/2003',
        gender: 'Nam',
        registerDate: '25/08/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100016',
        fullName: 'Phạm Thị Lan',
        birthDate: '12/06/2001',
        gender: 'Nữ',
        registerDate: '10/04/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100017',
        fullName: 'Hoàng Văn Thắng',
        birthDate: '20/10/2002',
        gender: 'Nam',
        registerDate: '05/09/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100018',
        fullName: 'Đỗ Thị Trang',
        birthDate: '08/02/2004',
        gender: 'Nữ',
        registerDate: '18/01/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
    {
        id: 'SV100019',
        fullName: 'Nguyễn Văn Thành',
        birthDate: '25/07/2003',
        gender: 'Nam',
        registerDate: '22/06/2024',
        midtermScore: '-',
        finalScore: '-',
        totalScore: '-',
    },
];


const ListStudent = ({ setOnSee, section }) => {

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
    } = useSelector((state) => state.studentList);

    const handleClickConfirm = () => {
        setOnSee(false);
    }

    const handleClickExcel = () => {
        setOnSee(false);
    }

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
                    <h2>Danh sách sinh viên - Lớp học phần {section.sectionId}</h2>
                    <small>{section.courseId} - {section.courseName} - Lớp {section.classId} - Nhóm {section.groupNumber}</small>
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
                                    <td>{student.id}</td>
                                    <td>{student.fullName}</td>
                                    <td>{student.birthDate}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.registerDate}</td>
                                    <td>{student.midtermScore}</td>
                                    <td>{student.finalScore}</td>
                                    <td>{student.totalScore}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="confirm-box">
                <div className="excel-btn">
                    <button className='excel wrap-center active' onClick={handleClickExcel}>
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