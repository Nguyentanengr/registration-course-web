import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const AdminHeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 55px;
    background-color: ${Theme.body};
    z-index: 20;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
`;