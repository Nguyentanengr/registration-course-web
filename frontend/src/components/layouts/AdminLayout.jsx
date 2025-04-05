import { Outlet } from 'react-router-dom';
import { AdminLayoutContainer } from './AdminLayout.styled';
import Content from './content/Content';
import RightBar from './sidebar/RightBar';
import { useState } from 'react';
import AdminHeader from './header/AdminHeader';
import AdminRightBar from './sidebar/AdminRightBar';

const AdminLayout = () => {
    
    const [rbStatus, setRbStatus] = useState("close");

    return (
        <AdminLayoutContainer>
            <AdminHeader />
            <AdminRightBar status={rbStatus} setStatus={setRbStatus} />
            <Content status={rbStatus}>
                <Outlet />
            </Content>
        </AdminLayoutContainer>
    );
};

export default AdminLayout;