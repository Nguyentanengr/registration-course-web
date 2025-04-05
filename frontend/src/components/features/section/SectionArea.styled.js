import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme'

export const SectionAreaContainer = styled.div`
    margin-top: 25px;

    .table-container {
        width: 100%;
        overflow-x: auto;
        background: white;
        border-radius: 8px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
        font-size: 16px;

        .table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid ${Theme.hover};
        }

        td {
            padding: 8px;

            span {
                color: ${Theme.soft}
            }

            span.lessons {
                padding: 3px 10px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 15px;
                color: ${Theme.dark};
                font-weight: 500;
                cursor: pointer;
            }

            span.status {
                padding: 3px 10px;
                border-radius: 15px;
                color: ${Theme.dark};
                font-weight: 500;
            }

            .box {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;

                .wrap-center {
                    width: 25px;
                    height: 25px;
                    border-radius: 5px;
                    cursor: pointer;
                    padding: 5px;
                    background-color: transparent;
                    transition: 0.2s;

                    &:hover {
                        background-color: ${Theme.hover};
                    }
                }

                .popup {
                    position: absolute;
                    top: 110%;
                    left: -130%;
                    width: 200px;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    padding: 7px;
                    background-color: ${Theme.header};
                    border-radius: 5px;
                    box-shadow: 1px -1px 3px rgba(0, 0, 0, 0.2);

                    .icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 30px;
                        height: 30px;
                    }

                    .action-name {
                        font-size: 16px;
                    }

                    .item {
                        width: 100%;
                        cursor: pointer;
                        border-radius: 5px;
                        display: flex;
                        align-items: center;
                        gap: 7px;
                        background-color: transparent;
                        color: ${Theme.dark};

                        &:hover {
                            background-color: ${Theme.hover};
                        }
                    }

                }
            }
        }

        tr.body-row {
            transition: 0.05s;
            
            &:hover {
                background-color: ${Theme.softBlue};
            }
        }

        
        .pagination {
            padding: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
        }

        .controls button,
        .controls select {
            margin-left: 6px;
            padding: 4px 10px;
            border-radius: 6px;
            border: 1px solid ${Theme.hover};
            background: white;
            cursor: pointer;
        }

        .controls button.current {
            background: #d61f1f;
            color: white;
            font-weight: bold;
        }

        .controls button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
`;