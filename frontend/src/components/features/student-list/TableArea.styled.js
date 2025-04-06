import styled, { ThemeConsumer } from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const TableAreaContainer = styled.div`
    width: 100%;

    .custom-checkbox {
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;

        input {
            display: none;
        }

        .checkmark {
            width: 18px;
            height: 18px;
            border: 2px solid ${Theme.logo};
            border-radius: 4px;
            margin-right: 8px;
            position: relative;
            transition: 0.2s;

            &::after {
                content: "";
                position: absolute;
                left: 6px;
                top: 1px;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
                opacity: 0;
                transition: opacity 0.2s;
            }
        }

        input:checked + .checkmark {
            background-color: ${Theme.logo};

            &::after {
            opacity: 1;
            }
        }
    }

    .tool-bar {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
            opacity: 1;
        }

        .left {
            .select-all {
                gap: 10px;
            }
        }

        .right {
            gap: 10px;
            p {
                font-weight: 600;
            }
            
            .select-option {}

            .search-container {
                width: 300px;
                border-radius: 10px;
                height: 40px;
                border: 1px solid ${Theme.hover};
                padding: 0 15px;
                justify-content: start;

                .input-container {
                    gap: 5px;
                    .icon {
                        font-size: 22px;
                        color: ${Theme.soft};

                    }
                    input {
                        &::placeholder {
                            color: ${Theme.textMediumSoft};
                        }
                    }
                }
            }

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
                    }

                    &.active {
                        opacity: 1;
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .table-section {
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
                padding: 5px;
                font-size: 16px;
                &.time-box {
                    width: 230px;
                }
                span {
                    color: ${Theme.lightDark};
                }

                .action-box {
                    width: 100%;
                    display: flex;
                    gap: 20px;
                }

                .see, .down {
                    width: 25px;
                    height:25px;
                    border-radius: 5px;
                    cursor: pointer;
                    background-color: transparent;
                    transition: 0.2s;
                    &:hover {
                        background-color: ${Theme.hover};
                    }
                }
            }
        }
    }

    .pop-up-container {
        position: fixed;
        z-index: 20;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: ${Theme.boldShadow};
    }
`;