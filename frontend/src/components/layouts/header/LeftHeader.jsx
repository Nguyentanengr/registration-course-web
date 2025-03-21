import { LeftHeaderContainer } from "./LeftHeader.styled";
import { Link } from "react-router-dom";
import { Icons } from "../../../assets/icons/Icon";


const LeftHeader = () => {
    return (
        <LeftHeaderContainer>
            <Link to="/">
                <div className="logo-container">
                    <div className="logo">
                        <img src="images/logo-navbar.png" alt="" />
                    </div>
                    <div className="logo-text">Sbox</div>
                </div>
            </Link>
        </LeftHeaderContainer>
    )
};

export default LeftHeader;