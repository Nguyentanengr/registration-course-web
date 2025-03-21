import { Outlet } from "react-router-dom";
import { MainLayoutContainer } from "./MainLayout.styled";
import Header from "./header/Header";
import Content from "./content/Content";

const MainLayout = () => {
    return (
        <MainLayoutContainer>
            <Header />
            {/* <SideBar /> */}
            <Content>
                <Outlet />
            </Content>
        </MainLayoutContainer>
    );
};

export default MainLayout;