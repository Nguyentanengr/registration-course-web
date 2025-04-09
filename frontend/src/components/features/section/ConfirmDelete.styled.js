import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const ConfirmDeleteContainer = styled.div`
    width: 35vw;
    min-height: 25vh;
    background-color: ${Theme.header};
    padding: 30px 25px;
    border-radius: 10px;

    .title {
        font-size: 18px;
        font-weight: 600;
    }

    .ms {
        font-size: 14px;
        margin-top: 10px;
        color: ${Theme.soft};
    }

    .footer {
        margin-top: 35px;
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 10px;

        .cancel-btn {
            border-radius: 5px;
            height: 35px;
            background-color: transparent;
            border: 1px solid ${Theme.hover};
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            padding: 0 20px;
            color: ${Theme.dark};
            &:hover {
                background-color:rgb(230, 230, 230);
            }
        }

        .confirm-btn {
            border-radius: 5px;
            height: 35px;
            background-color: ${Theme.logo};
            font-size: 16px;
            font-weight: 500;
            padding: 0 20px;
            cursor: pointer;
            color: ${Theme.header};
            &:hover {
                background-color:rgb(223, 53, 53);
            }
        }
    }
`;