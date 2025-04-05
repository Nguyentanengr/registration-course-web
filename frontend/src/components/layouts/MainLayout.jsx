import { Outlet } from "react-router-dom";
import { MainLayoutContainer } from "./MainLayout.styled";
import Header from "./header/Header";
import Content from "./content/Content";
import RightBar from "./sidebar/RightBar";
import { useState } from "react";

const MainLayout = () => {
    
    const [rbStatus, setRbStatus] = useState("close");

    return (
        <MainLayoutContainer>
            <Header />
            <RightBar status={rbStatus} setStatus={setRbStatus} />
            <Content status={rbStatus}>
                <Outlet />
            </Content>
        </MainLayoutContainer>
    );
};

export default MainLayout;