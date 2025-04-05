import { FilterAreaContainer } from './FilterArea.styled';
import { Icons } from '../../../assets/icons/Icon';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../stores/slices/sectionSlice';
import AddSection from './AddSection';

const FilterArea = () => {

    const dispatch = useDispatch();
    const { filter, filters, sections, currentPage, totalPage, searchKey }
        = useSelector((state) => state.section);

    const [isAdding, setIsAdding] = useState(false);


    // Xử lý sự kiện chọn tab
    const handleOnClickOption = (option) => {
        dispatch(setFilter(option))
    }




    return (
        <FilterAreaContainer>
            <div className="title-container">
                <div className="icon-container wrap-center">
                    <Icons.Registration />
                </div>
                <h1>Quản lý lớp học phần</h1>
            </div>
            <div className="filter-container">
                <div className="tabs-container wrap-center">
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
                <div className="box wrap-center">
                    <div className="search-container wrap-center">
                        <div className="input-container wrap-center">
                            <div className="icon wrap-center">
                                <Icons.SearchIcon />
                            </div>
                            <input type="text" placeholder='Tìm kiếm lớp học phần ...' spellCheck={false} />
                        </div>
                    </div>
                    <button className='wrap-center highlight' onClick={() => { setIsAdding(!isAdding) }}>
                        <div className="icon-container wrap-center">
                            <Icons.FollowPlus />
                        </div>
                        <p>Thêm lớp</p>
                    </button>
                    {isAdding && <div className='pop-up-container wrap-center'>
                        <AddSection setIsAdding={setIsAdding}/>
                    </div>}
                </div>
            </div>
        </FilterAreaContainer>
    );
};

export default FilterArea;