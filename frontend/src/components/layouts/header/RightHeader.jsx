import { Icons } from "../../../assets/icons/Icon";
import { RightHeaderContainer } from "./RightHeader.styled";


const RightHeader = () => {

    return (
        <RightHeaderContainer>
            <div className="menu-container">
                <div className="menu-icon">
                    <Icons.Menu />
                </div>
                <div className="expand-menu">

                </div>
            </div>

        </RightHeaderContainer>
    )
};

export default RightHeader;