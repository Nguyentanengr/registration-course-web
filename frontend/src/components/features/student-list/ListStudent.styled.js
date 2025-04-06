import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const ListStudentContainer = styled.div`
    width: 70vw;
    height: 90vh;
    background-color: ${Theme.header};
    border-radius: 15px;
    padding: 25px 30px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        border-radius: 5px;
        color: ${Theme.hover};
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        color: ${Theme.hover};
        background-color: ${Theme.hover};
        border-radius: 100px;
    }

    .s-title {

        h2 {
            font-size: 18px;
            font-weight: 500;
        }
    }

    .table-list-student {
        .table-container {
            margin-top: 20px;
            width: 100%;
            overflow-x: auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
            font-size: 14px;

            .table {
                width: 100%;
                border-collapse: collapse;
            }

            th, td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid ${Theme.hover};
            }

            td {
                padding: 10px;
                font-size: 16px;
                color: ${Theme.lightDark};
            }
        }
    }

    .confirm-box {
        margin-top: 35px;
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 10px;

        .excel-btn {
            .excel {
                border-radius: 5px;
                border: 1px solid ${Theme.hover};
                height: 40px;
                padding: 0 20px;
                gap: 10px;
                opacity: 0.6;
                .icon {
                    font-size: 20px;
                }

                p {
                    font-weight: 400;
                    opacity: 1;
                }

                &.active {
                    opacity: 1;
                    font-weight: 500;
                    cursor: pointer;
                }
            }
        }

        .close-btn {
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