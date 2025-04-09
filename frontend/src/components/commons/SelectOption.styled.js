import styled from 'styled-components';
import { Theme } from '../../assets/styles/Theme';

export const SelectOptionContainer = styled.div`
    position: relative;
    font-size: 16px;
    width: ${props => props.width};
    color: ${Theme.dark};

    .btn-select {
        width: 100%;
        padding: 8px 12px;
        background-color: white;
        border: 1px solid ${Theme.hover};
        border-radius: 5px;
        text-align: left;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.2s;
        color: ${Theme.dark};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .btn-select:hover {
        border-color: #ccc;
    }

    .wrap-center {
        font-size: 20px;
        color: ${Theme.mediumSoft};
    }

    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        margin-top: 4px;
        background-color: white;
        border: 1px solid ${Theme.hover};
        border-radius: 5px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        z-index: 10;
        max-height: 200px;
        overflow-y: auto;
    }

    .dd-item {
        padding: 8px 12px;
        cursor: pointer;
    }

    .dd-item:hover {
        background-color: #f0f8ff;
    }
`;