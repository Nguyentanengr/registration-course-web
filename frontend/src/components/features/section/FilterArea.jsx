import { FilterAreaContainer } from './FilterArea.styled';
import { Icons } from '../../../assets/icons/Icon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearchKey } from '../../../stores/slices/sectionSlice';
import AddSection from './AddSection';
import { fetchSections } from '../../../apis/sectionApi';
import CircleSpinner from '../../commons/CircleSpinner';

const FilterArea = () => {

    const dispatch = useDispatch();
    const { loading, filters, filter, currentPage, itemPerPage, searchKey }
        = useSelector((state) => state.section);

    const [isAdding, setIsAdding] = useState(false);


    // Xử lý sự kiện chọn tab
    const handleOnClickOption = (option) => {
        dispatch(setFilter(option))
    }


    // khi nhấn enter để search
    const handleOnEnter = (e) => {
        if (e.key === 'Enter') {
            console.log("on enter");
            
            dispatch(fetchSections({ filter, searchKey, currentPage, itemPerPage }));
        }
    };

    // Khi filter, seachkey, currentPage, itemPerPage thay đổi -> fetch API.
    useEffect(() => {
        // Fetch api
        dispatch(fetchSections({ filter, searchKey, currentPage, itemPerPage }));
    }, [filter, currentPage, itemPerPage]);

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
                                { loading ? <CircleSpinner size={15} color='#777777'/> : <Icons.SearchIcon /> }
                            </div>
                            <input
                                value={searchKey}
                                type="text"
                                placeholder='Tìm kiếm lớp học phần ...'
                                spellCheck={false}
                                onChange={(e) => { dispatch(setSearchKey(e.target.value)) }}
                                onKeyDown={handleOnEnter}
                            />
                        </div>
                    </div>
                    <button className='wrap-center highlight' onClick={() => { setIsAdding(!isAdding) }}>
                        <div className="icon-container wrap-center">
                            <Icons.FollowPlus />
                        </div>
                        <p>Thêm lớp</p>
                    </button>
                    {isAdding && <div className='pop-up-container wrap-center'>
                        <AddSection setIsAdding={setIsAdding} />
                    </div>}
                </div>
            </div>
        </FilterAreaContainer>
    );
};

export default FilterArea;