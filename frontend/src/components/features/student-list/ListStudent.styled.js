import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const ListStudentContainer = styled.div`
    width: 70vw;
    height: 93vh;
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
            height: 553px;
            overflow-y: auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
            font-size: 14px;

            &::-webkit-scrollbar {
                width: 5px;
                height: 5px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba(0, 0, 0, 0.1); 
                border-radius: 8px;
            }

            &::-webkit-scrollbar-track {
                background-color: transparent;
            }

            .table {
                width: 100%;
                min-width: 800px;
                border-collapse: collapse;
            }

            thead {
                position: sticky;
                top: 0;
                background-color: white;
                z-index: 1;
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
        margin-top: 18px;
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 10px;

        .excel-btn {
            transition: 0.2s;
            border-radius: 5px;
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
                    font-size: 16px;
                }

                &.active {
                    opacity: 1;
                    font-weight: 500;
                    cursor: pointer;
                }
            }
            &:hover {
                background-color: ${Theme.hover};
            }
        }

        .close-btn {
            border-radius: 5px;
            height: 36px;
            background-color: ${Theme.logo};
            font-size: 16px;
            font-weight: 500;
            padding: 0px 20px;
            cursor: pointer;
            color: ${Theme.header};
            &:hover {
                background-color:rgb(223, 53, 53);
            }
        }
    }
`;