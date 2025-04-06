
import { useEffect, useRef, useState } from "react";
import { Icons } from "../../../assets/icons/Icon";
import { FilterAreaContainer } from "./FilterArea.styled";
import SelectOption from "../../commons/SelectOption";

const FilterArea = ({ options, selected, setSelected }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const optionRef = useRef(null);
    const [info, setInfo] = useState({
        "studentName": "Phạm Tấn Nguyên",
        "studentId": "N22DCCN156",
        "major": "Ngành công nghệ thông tin",
        "totalCredits": "140",
    });

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
            <div className="info">
                <div className="header-info">
                    <h2>Thông tin sinh viên</h2>
                    <small>Đăng ký môn học theo đợt</small>
                </div>

                <div className="box">
                    <div className="left">
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.Hash />
                            </div>
                            <div className="text">Mã sinh viên: <span>{info.studentId}</span></div>
                        </div>
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.FlatUser />
                            </div>
                            <div className="text">Tên: <span>{info.studentName}</span></div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.Registration />
                            </div>
                            <div className="text">Ngành học: <span>{info.major}</span></div>
                        </div>
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.BookMark />
                            </div>
                            <div className="text">Tổng số tín chỉ tích lũy: <span>{info.totalCredits} tín chỉ</span></div>
                        </div>
                    </div>
                </div>
            </div>
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