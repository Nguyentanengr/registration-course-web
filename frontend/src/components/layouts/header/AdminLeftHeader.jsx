import { Link } from 'react-router-dom';
import { AdminLeftHeaderContainer } from './AdminLeftHeader.styled';

const AdminLeftHeader = () => {
    return (
        <AdminLeftHeaderContainer>
            <Link to="#">
                <div className="logo-container">
                    <div className="logo">
                        <img src="/images/logo-navbar.png" alt="" />
                    </div>
                    <div className="logo-text">Abox</div>
                </div>
            </Link>
        </AdminLeftHeaderContainer>
    );
};

export default AdminLeftHeader;