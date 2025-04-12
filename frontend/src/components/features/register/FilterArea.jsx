
import { useEffect, useRef, useState } from "react";
import { Icons } from "../../../assets/icons/Icon";
import { FilterAreaContainer } from "./FilterArea.styled";
import SelectOption from "../../commons/SelectOption";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentByAccount } from "../../../apis/studentApi";
import { fetchRegisterOpenSection } from "../../../apis/openSectionApi";

export const convertToCounter = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diffInSeconds = Math.max(0, Math.floor((end - now) / 1000));
    return diffInSeconds;
};

export const formatSecondsToTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => num.toString().padStart(2, '0');

    return `${pad(hours)} giờ ${pad(minutes)} phút ${pad(seconds)} giây`;
};


const FilterArea = ({ options, selected, setSelected }) => {

    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);
    const optionRef = useRef(null);
    const { myInfo } = useSelector((state) => state.studentInfo);
    const { listOpenSession } = useSelector((state) => state.register);
    const [counter, setCounter] = useState(listOpenSession.endTime ? convertToCounter(listOpenSession.endTime) : '');

    const handleOnClickOption = (index) => {
        setSelected(options[index]);
        if (index == 0) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch(fetchRegisterOpenSection({ accountId: user.userId, filterType: index}));
        }
        setIsExpanded(false);
    }

    // khi giao diện bật lên, gọi api lấy dữ liệu sinh viên
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch(fetchStudentByAccount({ accountId: user.userId }))
            .unwrap()
            .then((action) => {

            });
        dispatch(fetchRegisterOpenSection({ accountId: user.userId, filterType: 0}));
    }, []);

    // Bắt đầu đếm số giây còn lại
    useEffect(() => {
        console.log('counter')
        const time = new Date(listOpenSession.endTime);

        if (counter) {
            const interval = setInterval(() => {
                setCounter(prev => {
                    if (prev - 1 < 0) {
                        return '';
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [listOpenSession.endTime]);

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
                            <div className="text">Mã sinh viên: <span>{myInfo.studentId}</span></div>
                        </div>
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.FlatUser />
                            </div>
                            <div className="text">Tên: <span>{myInfo.studentName}</span></div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.Registration />
                            </div>
                            <div className="text">Ngành học: <span>{myInfo.majorName}</span></div>
                        </div>
                        <div className="item-box">
                            <div className="icon wrap-center">
                                <Icons.BookMark />
                            </div>
                            <div className="text">Tổng số tín chỉ tích lũy: <span>{myInfo.accumulateCredits} tín chỉ</span></div>
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

                <div className= {`timer-container ${counter ? '' : 'close'}`}>

                    <div className="icon">
                        <Icons.Clock />
                    </div>
                    <div className={`text ${counter ? '' : 'close'}`}>
                        {counter ? `Kết thúc sau: ${formatSecondsToTime(counter)}` : 'Đã kết thúc'}
                    </div>
                </div>
            </div>
        </FilterAreaContainer>
    )
}

export default FilterArea;