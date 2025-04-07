import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from '../../../assets/icons/Icon';
import { LogoutContainer } from './Logout.styled';
import { useEffect, useRef } from 'react';

const Logout = ({ setIsLogout, reset }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const thisRef = useRef();

    const handleClickCancel = () => {
        setIsLogout(false);
    };

    const handleClickLogout = () => {
        setIsLogout(false);
        reset();
        if (location.pathname.includes('portal')) {
            navigate('/portal');
        }
        else {
            navigate('/admin');
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (thisRef.current && !thisRef.current.contains(e.target)) {
                setIsLogout(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    },[])

    return (
        <LogoutContainer ref={thisRef}>
            <div className="title">
                <h3>Xác nhận đăng xuất</h3>
                <small>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?</small>
            </div>
            <div className="confirm-box">
                <button className="close-btn" onClick={handleClickCancel}>Đóng</button>
                <div className="logout-btn">
                    <button className='logout wrap-center' onClick={handleClickLogout}>
                        <div className="icon wrap-center">
                            <Icons.Logout />
                        </div>
                        <p>Đăng xuất</p>
                    </button>
                </div>
            </div>
        </LogoutContainer>
    );
};

export default Logout;