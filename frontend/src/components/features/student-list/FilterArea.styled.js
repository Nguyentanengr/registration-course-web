import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const FilterAreaContainer = styled.div`
    
    // global custom
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


    .title-container {
        display: flex;
        align-items: center;
        gap: 15px;

        .icon-container {
            font-size: 22px;
        }

        h1 {
            font-size: 18px;
            font-weight: 500px;

        }
    }

    .pick-section {
        margin-top: 20px;
        width: 100%;
        border-radius: 5px;
        border: 1px solid ${Theme.hover};
        padding: 40px 25px;

        .p-title {

            h2 {
                font-size: 18px;
                font-weight: 500;
            }
            small {}
        }

        .search-filter {
            margin-top: 25px;
            display: flex;
            align-items: end;
            gap: 20px;

            .option-box {
                flex: 1;

                .o-title {
                    font-weight: 500;
                }
                .select-option {
                    margin-top: 5px;
                }
            }

            .search-btn {
                flex: 1;
                height: 37px;
                background-color: ${Theme.logo};
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.2s;

                &:hover {
                    background-color:rgb(223, 53, 53);
                }

                button.search {
                    cursor: pointer;
                    color: ${Theme.header};
                    gap: 10px;

                    .icon {
                        font-size: 20px;
                        font-weight: 500;

                        .rotate {
                            animation: spin 0.5s ease-in-out forwards;
                        }

                        @keyframes spin {
                            to {
                                transform: rotate(360deg);
                            }
                        }
                    }

                    p {
                        opacity: 1;
                        font-size: 14px;
                        font-weight: 500;
                    }
                }
            }
        }
    }
`;