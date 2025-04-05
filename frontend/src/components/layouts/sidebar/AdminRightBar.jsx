import { AdminRightBarContainer } from './AdminRightBar.styled';
import { Icons } from '../../../assets/icons/Icon';

const AdminRightBar = ({ status, setStatus }) => {

    const handleOnClickOpenTab = () => {
        setStatus(status === "close" ? "open" : "close");
    }

    return (
        <AdminRightBarContainer status={status}>
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
                {status === "open" && <span>Quản lý học phần</span>}
            </div>
            <div className="item-box">
                <div className="icon-box">
                    <Icons.Schedule />
                </div>
                {status === "open" && <span>Mở lớp học phần</span>}
            </div>
            <div className="item-box">
                <div className="icon-box">
                    <Icons.Group />
                </div>
                {status === "open" && <span>Xem danh sách SV</span>}
            </div>
            <div className="item-box">
                <div className="icon-box">
                    <Icons.Logout />
                </div>
                {status === "open" && <span>Đăng xuất</span>}
            </div>
        </AdminRightBarContainer>
    );
};

export default AdminRightBar;