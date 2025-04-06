import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const FilterAreaContainer = styled.div`
    width: 100%;
    padding-bottom: 100px;
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
    .tabs-container {
        margin-top: 30px;
        height: 40px;
        background-color: ${Theme.softBlue};
        padding: 3px 5px;
        border-radius: 5px;
        display: inline-block;


        button {
            padding: 7px 15px;
            background-color: transparent;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            color: ${Theme.textMediumSoft};
            transition: 0.1s;

            &.active {
                background-color: ${Theme.header};
                font-weight: 600;
                color: ${Theme.dark}
            }
        }
    }
    .pick-section {
        margin-top: 20px;
        width: 100%;
        border-radius: 5px;
        border: 1px solid ${Theme.hover};
        padding: 20px 25px;

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
                    }

                    p {
                        opacity: 1;
                        font-size: 14px;
                        font-weight: 500;
                    }
                }
            }
        }

        .header-select {
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

                .search-btn {
                    flex: 1;
                    height: 37px;
                    padding: 0 20px;
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

        .selected {
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
                }
            }

        }
    }

    .opened {
        margin-top: 50px;
        .header-opened {
            display: flex;
            justify-content: space-between;

            h2 {
                font-size: 18px;
                font-weight: 500;
            }

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
        }
    }

    .table-opened {
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

                    &.status {
                        border-radius: 15px;
                        background-color: ${Theme.logo};
                        color: ${Theme.header};
                        padding: 3px 15px;
                        font-size: 14px;
                    }
                }
            }
        }
    }

    .create-period {
        margin-top: 30px;

        .header-period {
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            h2 {
                font-size: 18px;
                font-weight: 500;
            }

            button.add-box {
                height: 40px;
                background-color: ${Theme.logo};
                color: ${Theme.header};
                gap: 5px;
                padding: 0 10px;
                border-radius: 5px;
                cursor: pointer;

                .icon-container {
                    font-size: 22px;
                }

                p {
                    opacity: 1;
                    font-weight: 500;
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
        }
    }

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
            &.time-box {
                width: 230px;
            }
            span {
                color: ${Theme.lightDark};

                &.status {
                    border-radius: 15px;
                    background-color: ${Theme.logo};
                    color: ${Theme.header};
                    padding: 3px 15px;
                    font-size: 14px;

                    &.inactive {
                        background-color: ${Theme.hover};
                        color: ${Theme.dark};
                    }
                }
            }
        }
    }

`;