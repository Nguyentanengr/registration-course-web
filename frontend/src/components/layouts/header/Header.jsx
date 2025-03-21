import { HeaderContainer } from "./Header.styled";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

const Header = () => {
    return (
        <HeaderContainer>
            <LeftHeader />
            <RightHeader /> 
        </HeaderContainer>
    )
}

export default Header;
