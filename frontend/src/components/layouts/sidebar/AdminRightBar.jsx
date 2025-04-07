import { AdminRightBarContainer } from './AdminRightBar.styled';
import { Icons } from '../../../assets/icons/Icon';
import { useState } from 'react';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

const urls = [
    "/admin/hoc-phan",
    "/admin/mo-lop-hoc-phan",
    "/admin/xem-danh-sach-lop",
];

const AdminRightBar = ({ status, setStatus }) => {

    const navigate = useNavigate();
    const [isLogout, setIsLogout] = useState(false);
    const [selected, setSelected] = useState(0);

    const handleOnClickOpenTab = () => {
        setStatus(status === "close" ? "open" : "close");
    }

    const handleOnClickItem = ( urlIndex ) => {
        navigate(urls[urlIndex]);
        setSelected(urlIndex);
    }

    const reset = () => {
        setIsLogout(false);
        setSelected(0);
    }

    return (
        <AdminRightBarContainer status={status}>
            <div className="item-box" onClick={handleOnClickOpenTab}>
                <div className="icon-box">
                    {status === "close" ? <Icons.OpenTab /> : <Icons.CloseTab />}
                </div>
                {status === "open" && <span>Đóng menu</span>}
            </div>
            <div className={`item-box ${selected == 0 ? 'highlight' : ''}`} onClick={() => handleOnClickItem(0)}>
                <div className="icon-box">
                    <Icons.Registration />
                </div>
                {status === "open" && <span>Quản lý học phần</span>}
            </div>
            <div className={`item-box ${selected == 1 ? 'highlight' : ''}`} onClick={() => handleOnClickItem(1)}>
                <div className="icon-box">
                    <Icons.Schedule />
                </div>
                {status === "open" && <span>Mở lớp học phần</span>}
            </div>
            <div className={`item-box ${selected == 2 ? 'highlight' : ''}`} onClick={() => handleOnClickItem(2)}>
                <div className="icon-box">
                    <Icons.Group />
                </div>
                {status === "open" && <span>Xem danh sách SV</span>}
            </div>
            <div className="item-box" onClick={() => setIsLogout(!isLogout)}>
                <div className="icon-box">
                    <Icons.Logout />
                </div>
                {status === "open" && <span>Đăng xuất</span>}
            </div>
            {isLogout && <div className='pop-up-container wrap-center'>
                <Logout setIsLogout={setIsLogout} reset={reset}/>
            </div>}  
        </AdminRightBarContainer>
    );
};

export default AdminRightBar;