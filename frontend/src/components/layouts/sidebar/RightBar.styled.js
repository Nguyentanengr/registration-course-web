import styled from 'styled-components';
import { Theme } from "../../../assets/styles/Theme";

export const RightBarContainer = styled.div`
    position: fixed;
    top: 55px;
    right: 0;
    bottom: 0;
    width: ${props => props.status === "close" ? "40px" : "200px"};
    border-left: 1px solid ${Theme.lightSoft};
    padding: ${props => props.status === "close" ? "10px 5px 0 5px" : "10px 10px 0 10px"};
    background-color: ${Theme.header};
    transition: width 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .item-box {
        display: flex;
        align-items: center;
        background-color: transparent;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background-color: ${Theme.hover};
        }
    }

    .item-box span {
        font-size: 14px;
        color: ${Theme.lightDark};
    }
    .icon-box {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        opacity: 0.7;
    }


`;