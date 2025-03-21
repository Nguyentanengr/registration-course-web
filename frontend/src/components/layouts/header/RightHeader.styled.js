import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";
export const RightHeaderContainer = styled.div`
    margin-right: 50px;
    .menu-container {
        display: flex;
        align-items: center;
        justify-content: end;
        
        .menu-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 45px;
            cursor: pointer;
            background-color: transparent;
            border-radius: 5px;
            transition: 0.2s;

            &:hover {
                background-color: ${Theme.lightSoft};
            }
        }
    }
`;