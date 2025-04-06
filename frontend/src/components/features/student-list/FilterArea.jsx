

import { Icons } from '../../../assets/icons/Icon';
import SelectOption from '../../commons/SelectOption';
import { FilterAreaContainer } from './FilterArea.styled';

const FilterArea = () => {
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
            </div>
        </FilterAreaContainer>
    );
};

export default FilterArea;