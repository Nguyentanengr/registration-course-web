import styled from "styled-components";
import { Theme } from "../../assets/styles/Theme";

export const AlertContainer = styled.div`
    position: fixed;
    top: ${(props) => (props.show ? "20px" : "-100px")};
    left: 75%;
    transform: translateX(-50%);
    width: 350px;
    background:${(props) => (props.type === "error" ? Theme.hotRed : Theme.success)};
    color: white;
    padding: 16px; 
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    font-weight: 500;
    opacity: ${(props) => (props.show ? "1" : "0")};
    transition: top 0.5s ease-in-out, opacity 0.5s ease-in-out;
    z-index: 9999;

    .error-content {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 12px;
    }

    .error-icon {
        font-size: 25px;
    }

    .error-message {
        flex: 1;
        font-size: 15px;
    }

    .close-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 16px;
        transition: color 0.3s;
        
        &:hover {
            color: #ffe58f;
        }
    }
`;
