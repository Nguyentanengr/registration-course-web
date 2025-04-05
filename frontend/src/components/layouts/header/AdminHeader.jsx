import { AdminHeaderContainer } from './AdminHeader.styled';
import AdminLeftHeader from './AdminLeftHeader';

const AdminHeader = () => {
    return (
        <AdminHeaderContainer>
            <AdminLeftHeader />
        </AdminHeaderContainer>
    );
};

export default AdminHeader;