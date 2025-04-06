import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const AddPeriodContainer = styled.div`
    width: 30vw;
    height: 70vh;
    background-color: ${Theme.header};
    padding: 30px 25px;
    border-radius: 10px;

    &::-webkit-scrollbar {
        border-radius: 5px;
        width: 10px;
    }

    .header-box {

        h1 {
            font-size: 20px;
            font-weight: 600;
        }
    }

    .input-container {

        margin-top: 25px;
        input.p-i {
            height: 40px;
            border-radius: 5px;
            border: 1px solid ${Theme.hover};
            width: 100%;
            padding: 0 10px;
        }
        .i-title {
            font-weight: 500;
        }

        .i-box {
            margin-top: 5px;
        }
    }

    .confirm-box {
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