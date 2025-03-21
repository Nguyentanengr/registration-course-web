
import { useEffect, useRef, useState } from "react";
import { Icons } from "../../../assets/icons/Icon";
import { FilterAreaContainer } from "./FilterArea.styled";

const FilterArea = ({ options, selected, setSelected }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const optionRef = useRef(null);

    const handleOnClickOption = (index) => {
        setSelected(options[index]);
        setIsExpanded(false);
    }

    useEffect(() => {
        const handleOutsideClide = (e) => {
            if (optionRef.current && !optionRef.current.contains(e.target)) {
                setIsExpanded(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClide);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClide);
        };
    }, [])
    return (
        <FilterAreaContainer>
            <div className="header-page">
                <div className="filter-container">
                    <div className="title">
                        Chọn môn học theo
                    </div>
                    <div className="select-option">
                        <div className="select" onClick={() => setIsExpanded(!isExpanded)}>
                            <div className="text">
                                {selected}
                            </div>
                            <div className="dropdown-icon">
                                <Icons.FlatArrowDown />
                            </div>
                        </div>
                        {isExpanded && <div className="option-container" ref={optionRef}>
                            {options.map((option, index) => {
                                let customeClass = index == 0 ? "first"
                                    : (index == options.length - 1) ? "last"
                                        : ""
                                return (<div
                                    className={`option-item ${customeClass}`}
                                    key={index}
                                    onClick={() => { handleOnClickOption(index) }}
                                >
                                    {option}
                                </div>)
                            })}
                        </div>}
                    </div>

                </div>

                <div className="timer-container">

                    <div className="icon">
                        <Icons.Clock />
                    </div>
                    <div className="text">
                        Kết thúc sau: 23 giờ 18 phút 22 giây
                    </div>
                </div>
            </div>
        </FilterAreaContainer>
    )
}

export default FilterArea;