import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const ContentContainer = styled.div`
    padding: 55px 0px 0px 0px;
    margin-right: ${props => props.status === "close" ? "40px" : "200px"};
    height: 100vh;
    background-color: ${Theme.content};
    transition: margin-right 0.2s ease;
`