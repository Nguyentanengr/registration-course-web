import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const LeftHeaderContainer = styled.div`
    margin-left: 50px;
    .logo-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        transition: 0.3s;

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 46px;
            position: relative;
            overflow: hidden;
            z-index: 10;
        }

        .logo-text {
            font-size: 35px;
            font-weight: 700;
            color: ${Theme.logo};
        }
    }
`;