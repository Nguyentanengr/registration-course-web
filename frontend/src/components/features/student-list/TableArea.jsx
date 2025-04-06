import { useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import SelectOption from '../../commons/SelectOption';
import { TableAreaContainer } from './TableArea.styled';
import ListStudent from './ListStudent';


const sectionList = [
    {
        sectionId: "10001",
        courseId: "INT1339",
        courseName: "Lập trình C++",
        classId: "D22CQCQN02-N",
        group: 1,
        year: 2024,
        semester: 1,
        students: "65"
    },
    {
        sectionId: "10004",
        courseId: "INT1342",
        courseName: "Trí tuệ nhân tạo",
        classId: "D22CQCQN02-N",
        group: 1,
        year: 2024,
        semester: 1,
        students: "70"
    },
    {
        sectionId: "10005",
        courseId: "INT1343",
        courseName: "Công nghệ phần mềm",
        classId: "D22CQCQN02-N",
        group: 1,
        year: 2024,
        semester: 1,
        students: "88"
    }
];

const TableArea = () => {

    const [select, setSelect] = useState([1, 2]);
    const [onSee, setOnSee] = useState(false);

    return (
        <TableAreaContainer>
            <div className="tool-bar">
                <div className="left">
                    <div className="select-all wrap-center">
                        <label className="custom-checkbox">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Chọn tất cả
                        </label>
                    </div>
                </div>
                <div className="right wrap-center">
                    <div className="search-container wrap-center">
                        <div className="input-container wrap-center">
                            <div className="icon wrap-center">
                                <Icons.SearchIcon />
                            </div>
                            <input type="text" placeholder='Tìm kiếm lớp học phần ...' spellCheck={false} />
                        </div>
                    </div>
                    <div className="excel-btn">
                        <button className={`excel wrap-center ${select.length > 0 ? 'active' : ''}`}>
                            <div className="icon wrap-center">
                                <Icons.File />
                            </div>
                            <p>Xuất Excel ({select.length})</p>
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-section">
                <div className="table-container">
                    <table className='table'>
                        <thead>
                            <tr className='head-row'>
                                <th></th>
                                <th>Mã lớp</th>
                                <th>Môn học</th>
                                <th>Lớp</th>
                                <th>Nhóm</th>
                                <th>Năm học</th>
                                <th>Học kỳ</th>
                                <th>Số SV</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sectionList.map((section, index) => (
                                <tr
                                    className='body-row'
                                    key={index}
                                >
                                    <td>
                                        <label className="custom-checkbox">
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </td>
                                    <td>{section.sectionId}</td>
                                    <td>{section.courseId} <br /> <span>
                                        {section.courseName}
                                    </span></td>
                                    <td>{section.classId}</td>
                                    <td>{section.group}</td>
                                    <td>{section.year}</td>
                                    <td>{section.semester}</td>
                                    <td>{section.students}</td>
                                    <td>
                                        <div className="action-box">
                                            <div className="see wrap-center" onClick={() => setOnSee(!onSee)}>
                                                <Icons.Eye />
                                            </div>
                                            <div className="down wrap-center">
                                                <Icons.Download />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {onSee && <div className='pop-up-container wrap-center'>
                <ListStudent setOnSee={setOnSee}/>
            </div>}
        </TableAreaContainer>
    );
};

export default TableArea;