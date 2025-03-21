import styled, { keyframes } from "styled-components";
import { Theme } from "../../assets/styles/Theme";

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const CircleSpinnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    .circle {
        width: ${({ size }) => size}px;
        height: ${({ size }) => size}px;
        border: ${({ size }) => size / 6}px solid ${Theme.header};
        border-top-color: transparent;
        border-radius: 50%;
        animation: ${spin} 0.8s linear infinite;
    }
`;
