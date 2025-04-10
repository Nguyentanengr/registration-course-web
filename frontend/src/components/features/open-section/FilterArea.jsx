import { useEffect, useRef, useState } from 'react';
import { FilterAreaContainer } from './FilterArea.styled';
import { Icons } from '../../../assets/icons/Icon';
import SelectOption from '../../commons/SelectOption';
import AddPeriod from './AddPeriod';
import CircleSpinner from '../../commons/CircleSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterYear, setSearchKey } from '../../../stores/slices/phaseSlice';
import { fetchAllPhase, fetchAllPhaseBySemester } from '../../../apis/phaseApi';
import { addOpenSection, removeOpenSection, resetOpenSection, resetSections, setClassId, setOpenSection, setPhaseId, setSemester, setSemesters, setYear, setYears } from '../../../stores/slices/openSectionSlice';
import { fetchActiveClassInfos } from '../../../apis/classApi';
import { fetchSectionsBySemester } from '../../../apis/sectionApi';
import Alert from '../../commons/Alert';
import { createOpenSections } from '../../../apis/openSectionApi';

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


export const cvertDateTimeJson = (string) => {
    if (string && string !== '') {
        const [date, time] = string.split('T');
        const [year, month, day] = date.split('-');
        const targetDate = `${day}/${month}/${year}`;
        return `${targetDate} ${time}`;
    }
    return '';
};


const FilterArea = () => {

    const dispatch = useDispatch();
    const filters = ['Mở lớp học phần', 'Đợt đăng ký'];
    const [filter, setFilter] = useState(filters[0]);
    const [isAdding, setIsAdding] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const checkBoxRefs = useRef([]);
    const checkBoxAllRefs = useRef(null);
    const { getLoading, searchKey, phases } = useSelector((state) => state.phase);
    const { classes, classId, year, semester
        , years, semesters, openPhases, phaseId
        , sections, openSections, postLoading, postError } = useSelector((state) => state.openSection);

    const handleOnClickOption = (option) => {
        setFilter(option);
    };


    // Gọi api sau khi nhấn enter trong input
    const handleOnEnterPhase = (e) => {
        if (e.key == "Enter") {
            dispatch(fetchAllPhase({ searchKey: searchKey }));
        }
    };

    const generateYears = () => {
        const currentYear = new Date().getFullYear() - 10;
        const yearArray = Array.from({ length: 20 }, (_, i) => currentYear + i);
        return yearArray;
    }

    const isActive = (phase) => {
        const open = new Date(phase.openTime);
        const close = new Date(phase.closeTime);
        const now = new Date();
        return now >= open && now <= close;
    }

    const getPhaseIdByName = (name, phases) => {
        const finded = phases.find((p) => p.phaseName === name);
        return finded.phaseId;
    };

    // Khi click mở tất cả
    const handleClickOpenAll = () => {
        dispatch(createOpenSections({ openSections: openSections}))
            .unwrap()
            .then((action) => {      
                // fetch lại các sections
                dispatch(fetchSectionsBySemester({ classId: classId, year: year, semester: semester }));
                // reset lại openSection (những section được chọn)
                dispatch(resetOpenSection());

                // Tắt checkbox chọn tất cả
                checkBoxAllRefs.current.checked = false;
                checkBoxRefs.current.forEach((el) => { if (el) el.checked = false });
                
            })
            .catch((error) => {

            })
    };

    // Khi chọn từng lớp để mở
    const handleChangeCheckBox = (e, sectionId) => {
        if (e.target.checked) {
            const user = JSON.parse(localStorage.getItem('user'));
            const openSection = {
                openSectionId: openSections.length + 1,
                sectionId: sectionId,
                managerId: user.username.toUpperCase(),
                phaseId: getPhaseIdByName(phaseId, openPhases),
            }
            dispatch(addOpenSection(openSection));
        } else {
            dispatch(removeOpenSection(sectionId));
            checkBoxAllRefs.current.checked = false;
        }
    }

    // Khi chọn tất cả để mở

    const handeChangeAllCheckBox = (e) => {
        if (e.target.checked) {
            const user = JSON.parse(localStorage.getItem('user'));
            const openSections = sections.map((s, index) => {
                const openSection = {
                    openSectionId: index,
                    sectionId: s.sessionId,
                    managerId: user.username.toUpperCase(),
                    phaseId: getPhaseIdByName(phaseId, openPhases),
                }
                return openSection;
            });
            dispatch(setOpenSection(openSections));

            // Bật tất cả các checkbox phần tử
            checkBoxRefs.current.forEach((el) => { if (el) el.checked = true });

        } else {
            // Tắt tất cả các checkbox phần tử
            dispatch(resetOpenSection());
            checkBoxRefs.current.forEach((el) => { if (el) el.checked = false });
        }
    }

    // Nếu không có openSections nào được chọn disable button mở
    useEffect(() => {
        console.log(openSections);
        if (openSections.length == 0) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, [openSections]);

    // trang được render - call get phase, get class
    useEffect(() => {
        dispatch(fetchAllPhase({ searchKey: searchKey }));
        dispatch(fetchActiveClassInfos());
    }, [dispatch]);

    // Khi classId thay đổi -> set mặc định giá trị tương ứng cho year và semester
    useEffect(() => {
        if (classId) {
            const cl = classes.find((c) => c.clazzId === classId);
            console.log(cl);
            dispatch(setSemesters([cl.nextSemester]));
            dispatch(setYears([cl.nextYear]));
        }
    }, [classId]);


    // Khi lớp - năm - học kì thay đổi -> fetch Đợt, fetch Học phần
    useEffect(() => {
        if (year && semester) {
            dispatch(fetchAllPhaseBySemester({ year: year, semester: semester }));
        }
    }, [year, semester]);
    useEffect(() => {
        if (classId && year && semester) {
            dispatch(fetchSectionsBySemester({ classId: classId, year: year, semester: semester }));
        }
    }, [classId, year, semester]);

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
                                <SelectOption
                                    options={classes.map((c) => c.clazzId)}
                                    placeHolder='Chọn lớp'
                                    value={classId}
                                    onSelect={(value) => { dispatch(setClassId(value)) }}
                                />
                            </div>
                        </div>
                        <div className="option-box">
                            <div className="o-title">
                                Năm học
                            </div>
                            <div className="select-option">
                                <SelectOption
                                    options={years}
                                    value={year}
                                    onSelect={(value) => { dispatch(setYear(value)) }}
                                />
                            </div>
                        </div>
                        <div className="option-box">
                            <div className="o-title">
                                Học kì
                            </div>
                            <div className="select-option">
                                <SelectOption
                                    options={semesters}
                                    value={semester}
                                    onSelect={(value) => { dispatch(setSemester(value)) }}
                                />
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
                                    <input type="checkbox" onChange={handeChangeAllCheckBox} ref={checkBoxAllRefs}/>
                                    <span className="checkmark"></span>
                                    Chọn tất cả
                                </label>
                            </div>
                        </div>
                        <div className="right wrap-center">
                            <p>Đợt đăng ký:</p>
                            <div className="select-option">
                                <SelectOption
                                    options={openPhases.map((o) => o.phaseName)}
                                    value={phaseId}
                                    onSelect={(value) => dispatch(setPhaseId(value))}
                                    width='340px'
                                />
                            </div>
                            <div
                                className={`search-btn ${isOpen ? '' : 'disable'}`}
                                onClick={handleClickOpenAll}
                            >
                                <button className='search wrap-center'>
                                    <div className="icon wrap-center">
                                        { postLoading ? <CircleSpinner size={15} color='#ffffff' /> : <Icons.FollowPlus />}
                                    </div>
                                    <p>Mở tất cả</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    {sections.length == 0 && <div className='not-found'>
                        <div className="icon wrap-center">
                            <Icons.Info />
                        </div>
                        <div className="note">
                            <div className="h4">Không tìm thấy kết quả</div>
                            <small>Chưa có lớp học phần nào được tạo cho lớp {classId} trong năm học {year} và học kì {semester}.</small>
                        </div>
                    </div>}
                    {sections.length != 0 && <div className="selected">
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
                                    {sections.map((section, index) => (
                                        <tr
                                            className='body-row'
                                            key={index}
                                        >
                                            <td>
                                                <label className="custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        onChange={(e) => { handleChangeCheckBox(e, section.sessionId) }}
                                                        ref={(el) => checkBoxRefs.current[index] = el}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </td>
                                            <td>{section.sessionId}</td>
                                            <td>{section.courseInfo.courseId} <br /> <span>
                                                {section.courseInfo.courseName}
                                            </span></td>
                                            <td>{section.clazzId}</td>
                                            <td>{section.groupNumber}</td>
                                            <td>{section.year}</td>
                                            <td>{section.semester}</td>
                                            <td>{section.minStudents} - {section.maxStudents}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>}
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
                        <div className="action-box wrap-center">

                            <div className="search-container wrap-center">
                                <div className="input-container wrap-center">
                                    <div className="icon wrap-center">
                                        {getLoading ? <CircleSpinner size={15} color='#777777' /> : <Icons.SearchIcon />}
                                    </div>
                                    <input
                                        value={searchKey}
                                        type="text"
                                        placeholder='Tìm kiếm đợt đăng ký ...'
                                        spellCheck={false}
                                        onChange={(e) => { dispatch(setSearchKey(e.target.value)) }}
                                        onKeyDown={handleOnEnterPhase}
                                    />
                                </div>
                            </div>
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

                </div>

                <div className="table-period">
                    <div className="table-container">
                        <table className='table'>
                            <thead>
                                <tr className='head-row'>
                                    <th>Mã đợt</th>
                                    <th>Tên đợt đăng ký</th>
                                    <th>Học kì</th>
                                    <th>Năm học</th>
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
                                        <td>{phase.phaseId}</td>
                                        <td>{phase.phaseName}</td>
                                        <td>{phase.semester}</td>
                                        <td>{phase.year}</td>
                                        <td>{cvertDateTimeJson(phase.openTime)}</td>
                                        <td>{cvertDateTimeJson(phase.closeTime)}</td>
                                        <td><div className="box">
                                            <span
                                                className={`status ${isActive(phase) ? '' : 'inactive'}`}
                                            >
                                                {isActive(phase) ? 'Đang hoạt động' : 'Không hoạt động'}
                                            </span>
                                        </div></td>
                                        <td><Icons.More /></td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}
            {postError && <Alert message={postError.massage || 'Đã có lỗi xảy ra'} />}
        </FilterAreaContainer>
    )
}

export default FilterArea;
