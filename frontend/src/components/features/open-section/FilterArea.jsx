import { useState } from 'react';
import { FilterAreaContainer } from './FilterArea.styled';
import { Icons } from '../../../assets/icons/Icon';
import SelectOption from '../../commons/SelectOption';
import AddPeriod from './AddPeriod';

const sectionList = [
    {
        sectionId: "10001",
        courseId: "INT1339",
        courseName: "Lập trình C++",
        classId: "D22CQCQN02-N",
        group: 1,
        year: 2024,
        semester: 1,
        students: "20 - 100"
    },
    {
        sectionId: "10004",
        courseId: "INT1342",
        courseName: "Trí tuệ nhân tạo",
        classId: "D22CQCQN02-N",
        group: 1,
        year: 2024,
        semester: 1,
        students: "30 - 70"
    },
    {
        sectionId: "10005",
        courseId: "INT1343",
        courseName: "Công nghệ phần mềm",
        classId: "D22CQCQN02-N",
        group: 1,
        year: 2024,
        semester: 1,
        students: "20 - 60"
    }
];
const openList = [
    {
        sectionId: "10001",
        courseId: "INT1339",
        courseName: "Lập trình C++",
        classId: "D22CQCQN02-N",
        group: 1,
        year: 2024,
        semester: 1,
        students: '0/100',
        registrationPeriod: "Giai đoạn đăng ký kỳ hè năm 2024",
        status: "Đang mở"
    },
    {
        sectionId: "10004",
        courseId: "INT1342",
        courseName: "Trí tuệ nhân tạo",
        classId: "D22CQCQN02-N",
        group: 1,
        year: 2024,
        semester: 1,
        students: '0/100',
        registrationPeriod: "Giai đoạn đăng ký kỳ hè năm 2024",
        status: "Đang mở"
    },
    {
        sectionId: "10005",
        courseId: "INT1343",
        courseName: "Công nghệ phần mềm",
        classId: "D22CQCQN02-N",
        group: 1,
        year: 2024,
        semester: 1,
        students: '0/100',
        registrationPeriod: "Giai đoạn đăng ký kỳ hè năm 2024",
        status: "Đang mở"
    }
];

const phases = [
    {
        id: 'REG001',
        name: 'Giai đoạn đăng ký kỳ 1 năm 2024',
        semester: 'Kỳ chính thức',
        startTime: '15/07/2024 08:00',
        endTime: '30/07/2024 23:59',
        status: 'Đang hoạt động',
    },
    {
        id: 'REG002',
        name: 'Giai đoạn đăng ký kỳ 2 năm 2024',
        semester: 'Kỳ chính thức',
        startTime: '01/12/2024 08:00',
        endTime: '15/12/2024 23:59',
        status: 'Không hoạt động',
    },
    {
        id: 'REG003',
        name: 'Giai đoạn đăng ký kỳ hè năm 2024',
        semester: 'Kỳ hè',
        startTime: '01/05/2025 08:00',
        endTime: '15/05/2025 23:59',
        status: 'Không hoạt động',
    },
];

console.log(phases);


const FilterArea = () => {
    const filters = ['Mở lớp học phần', 'Đợt đăng ký'];
    const [filter, setFilter] = useState(filters[0]);
    const [isAdding, setIsAdding] = useState(false);

    const handleOnClickOption = (option) => {
        setFilter(option);
    };

    return (
        <FilterAreaContainer>
            <div className="title-container">
                <div className="icon-container wrap-center">
                    <Icons.Schedule />

                </div>
                <h1>Mở lớp học phần</h1>
            </div>
            <div className="tabs-container">
                {filters.map((option, index) => {
                    return (
                        <button
                            key={index}
                            className={(option === filter ? "active" : "")}
                            onClick={() => handleOnClickOption(option)}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {filter === filters[0] && <div className="tab">
                <div className="pick-section">
                    <div className="p-title">
                        <h2>Chọn lớp học phần</h2>
                        <small>Chọn lớp sinh viên, năm học và học kỳ để tìm lớp học phần</small>
                    </div>

                    <div className="search-filter">
                        <div className="option-box">
                            <div className="o-title">
                                Lớp sinh viên
                            </div>
                            <div className="select-option">
                                <SelectOption options={["D22CQCN01-N", "D18CQCN02-N", "D22CQCN03-N"]} />
                            </div>
                        </div>
                        <div className="option-box">
                            <div className="o-title">
                                Năm học
                            </div>
                            <div className="select-option">
                                <SelectOption options={["2024", "2025", "2026", "2027"]} />
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
                        <div className="search-btn">
                            <button className='search wrap-center'>
                                <div className="icon wrap-center">
                                    <Icons.SearchIcon />
                                </div>
                                <p>Tìm kiếm</p>
                            </button>
                        </div>
                    </div>
                    <div className="header-select">
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
                            <p>Đợt đăng ký:</p>
                            <div className="select-option">
                                <SelectOption options={["Giai đoạn đăng ký kỳ hè năm 2024", "Giai đoạn đăng ký kỳ 2 năm 2024", "Giai đoạn đăng ký kỳ 1 năm 2024"]} width='320px' />
                            </div>
                            <div className="search-btn">
                                <button className='search wrap-center'>
                                    <div className="icon wrap-center">
                                        <Icons.FollowPlus />
                                    </div>
                                    <p>Mở tất cả</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="selected">
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="opened">
                    <div className="header-opened">
                        <div className="op-title">
                            <h2>Các lớp học phần đã mở</h2>
                        </div>
                        <div className="search-container wrap-center">
                            <div className="input-container wrap-center">
                                <div className="icon wrap-center">
                                    <Icons.SearchIcon />
                                </div>
                                <input type="text" placeholder='Tìm kiếm lớp học phần ...' spellCheck={false} />
                            </div>
                        </div>
                    </div>
                    <div className="table-opened">
                        <div className="table-container">
                            <table className='table'>
                                <thead>
                                    <tr className='head-row'>
                                        <th>Mã lớp</th>
                                        <th>Môn học</th>
                                        <th>Lớp</th>
                                        <th>Nhóm</th>
                                        <th>Năm học</th>
                                        <th>Học kỳ</th>
                                        <th>Số SV</th>
                                        <th>Đợt đăng ký</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {openList.map((section, index) => (
                                        <tr
                                            className='body-row'
                                            key={index}
                                        >
                                            <td>{section.sectionId}</td>
                                            <td>{section.courseId} <br /> <span>
                                                {section.courseName}
                                            </span></td>
                                            <td>{section.classId}</td>
                                            <td>{section.group}</td>
                                            <td>{section.year}</td>
                                            <td>{section.semester}</td>
                                            <td>{section.students}</td>
                                            <td>{section.registrationPeriod}</td>
                                            <td><span className='status'>{section.status}</span></td>
                                            <td><Icons.More /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>}

            {filter === filters[1] && <div className='tab'>

                <div className="create-period">
                    <div className="header-period">
                        <h2>Danh sách đợt đăng ký</h2>
                        <div className="box">
                            <button className='add-box wrap-center' onClick={() => { setIsAdding(!isAdding) }}>
                                <div className="icon-container wrap-center">
                                    <Icons.FollowPlus />
                                </div>
                                <p>Tạo đợt đăng ký mới</p>
                            </button>
                            {isAdding && <div className='pop-up-container wrap-center'>
                                <AddPeriod setIsAdding={setIsAdding} />
                            </div>}
                        </div>
                    </div>

                </div>

                <div className="table-period">
                    <div className="table-container">
                        <table className='table'>
                            <thead>
                                <tr className='head-row'>
                                    <th>Mã đợt</th>
                                    <th>Tên đợt đăng ký</th>
                                    <th>Hình thức</th>
                                    <th>Thời gian mở</th>
                                    <th>Thời gian đóng</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {phases.map((phase, index) => (
                                    <tr
                                        className='body-row'
                                        key={index}
                                    >
                                        <td>{phase.id}</td>
                                        <td>{phase.name}</td>
                                        <td>{phase.semester}</td>
                                        <td>{phase.startTime}</td>
                                        <td>{phase.endTime}</td>
                                        <td><div className="box">
                                            <span className={`status ${phase.status === 'Đang hoạt động' ? "" : "inactive"}`}>{phase.status}</span>
                                        </div></td>
                                        <td><Icons.More /></td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>}
        </FilterAreaContainer>
    )
}

export default FilterArea;
