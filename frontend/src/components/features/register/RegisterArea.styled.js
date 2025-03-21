import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const RegisterAreaContainer = styled.div`
    margin-top: 20px;

    .table-container {
        width: 100%;
        overflow-x: auto;
        background: white;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        font-size: 20px;

        .table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 20px;
            text-align: left;
            border-bottom: 1px solid ${Theme.hover};
        }

        td {
            padding: 18px;
        }

        tr.boldHighlight {
            background-color: #FF7575;
        }

        tr.softHighlight {
            background-color: #FFEDED;
        }

        tr.body-row {
            cursor: pointer;
            transition: 0.05s;
            
            &:hover {
                background-color: ${Theme.lightSoft};
            }
        }

        .option-box {
            background-color: ${Theme.body};
            padding: 5px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
        }

        input[type='checkbox'] {
            appearance: none; /* Xóa kiểu mặc định */
            width: 20px;
            height: 20px;
            border: 2px solid black; /* Viền màu đen */
            background-color: white; /* Màu nền */
            border-radius: 4px; /* Bo góc (tùy chọn) */
            position: relative;
        }

        input[type='checkbox']:checked {
            background-color: black; /* Màu nền khi chọn */
            border-color: black;
        }

        input[type='checkbox']:checked::after {
            content: '✔';
            font-size: 16px;
            color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-weight: bold;
        }

    }

    .note-container {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 30px;
        margin-top: 50px;

        .span-container {
            display: flex;
            align-items: center;
            gap: 20px;

            .span {
                height: 5vh;
                width: 5vw;
                border-radius: 17px;
            }

            .span.bold {
                background-color: #FF7575;
            }

            .span.light {
                background-color: #FFEDED;
            }

            .text {
            font-size: 18px;
            font-family: "Montserrat", sans-serif;
        }
        }
    }
`;