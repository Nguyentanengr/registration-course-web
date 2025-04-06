
import { Icons } from '../../../assets/icons/Icon';
import { RightBarContainer } from './RightBar.styled';

const RightBar = ({ status, setStatus }) => {

    const handleOnClickOpenTab = () => {
        setStatus(status === "close" ? "open" : "close");
    }

    return (
        <RightBarContainer status={status}>
            <div className="item-box" onClick={handleOnClickOpenTab}>
                <div className="icon-box">
                    {status === "close" ? <Icons.OpenTab /> : <Icons.CloseTab />}
                </div>
                {status === "open" && <span>Đóng menu</span>}
            </div>
            <div className="item-box">
                <div className="icon-box">
                    <Icons.Registration />
                </div>
                {status === "open" && <span>Đăng ký học phần</span>}
            </div>
            <div className="item-box">
                <div className="icon-box">
                    <Icons.Schedule />
                </div>
                {status === "open" && <span>Xem lịch học</span>}
            </div>
            <div className="item-box">
                <div className="icon-box">
                    <Icons.Logout />
                </div>
                {status === "open" && <span>Đăng xuất</span>}
            </div>

        </RightBarContainer>
    );
};

export default RightBar;
