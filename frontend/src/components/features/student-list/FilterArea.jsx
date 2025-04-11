

import { useEffect, useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import SelectOption from '../../commons/SelectOption';
import { FilterAreaContainer } from './FilterArea.styled';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter, setFilterClassId, setFilterSemester, setFilterYear, setOpenSections } from '../../../stores/slices/studentListSlice';
import { fetchAllClassInfos } from '../../../apis/classApi';
import { fetchComformOpenSection } from '../../../apis/openSectionApi';

export const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const yearArray = Array.from({ length: 15 }, (_, i) => currentYear - i);
    return yearArray;
}

const FilterArea = () => {

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

    const handleClickRefresh = () => {
        setOnRefresh(true);
        setTimeout(() => {
            setOnRefresh(false); // chờ đợt hiệu ứng quay tròn kết thúc.
        }, 500);

        // làm mới filter 
        dispatch(resetFilter());
        dispatch(setOpenSections([])); 
    };

    useEffect(() => {
        // Gọi API lấy dữ liệu khi lớp - năm - học kì thay đổi. 
        console.log(filterClassId, filterYear, filterSemester);
        const classId = filterClassId ? filterClassId : '';
        const year = filterYear ? filterYear : '';
        const semester = filterSemester ? filterSemester : '';
        dispatch(fetchComformOpenSection({
            searchKey: searchKey,
            classId: classId,
            year: year,
            semester: semester
        }));

    }, [filterClassId, filterYear, filterSemester]);

    // gọi api lấy dữ liệu classID
    useEffect(() => {
        dispatch(fetchAllClassInfos());
    }, [dispatch])

    return (
        <FilterAreaContainer>
            <div className="title-container">
                <div className="icon-container wrap-center">
                    <Icons.Group />
                </div>
                <h1>Danh sách sinh viên theo lớp học phần</h1>
            </div>
            <div className="pick-section">
                <div className="p-title">
                    <h2>Tìm kiếm lớp học phần</h2>
                    <small>Chọn lớp sinh viên, năm học và học kỳ để tìm lớp học phần</small>
                </div>

                <div className="search-filter">
                    <div className="option-box">
                        <div className="o-title">
                            Lớp sinh viên
                        </div>
                        <div className="select-option">
                            <SelectOption
                                options={classIds}
                                value={filterClassId}
                                placeHolder='Chọn lớp'
                                onSelect={(value) => { dispatch(setFilterClassId(value)) }}
                            />
                        </div>
                    </div>
                    <div className="option-box">
                        <div className="o-title">
                            Năm học
                        </div>
                        <div className="select-option">
                            <SelectOption
                                options={generateYears()}
                                value={filterYear}
                                placeHolder='Chọn năm'
                                onSelect={(value) => { dispatch(setFilterYear(value)) }}
                            />
                        </div>
                    </div>
                    <div className="option-box">
                        <div className="o-title">
                            Học kì
                        </div>
                        <div className="select-option">
                            <SelectOption
                                options={[1, 2, 3]}
                                value={filterSemester}
                                placeHolder='Chọn học kì'
                                onSelect={(value) => { dispatch(setFilterSemester(value)) }}
                            />
                        </div>
                    </div>
                    <div className="search-btn" onClick={handleClickRefresh}>
                        <button className='search wrap-center'>
                            <div className={`icon wrap-center `}>
                                <Icons.Refresh className={`${onRefresh ? 'rotate' : ''}`} />
                            </div>
                            <p>Làm mới</p>
                        </button>
                    </div>
                </div>
            </div>
        </FilterAreaContainer>
    );
};

export default FilterArea;