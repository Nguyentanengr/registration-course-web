import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const FilterAreaContainer = styled.div`
    width: 100%;
    padding-bottom: 30px;
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

                    &.disable {
                        pointer-events: none;
                        opacity: 0.5;
                    }

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

        .not-found {
            margin-top: 20px;
            padding: 20px 50px;
            border-radius: 10px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            display: flex;
            gap: 20px;
            align-items: start;

            .icon {
                padding-top: 2px;
                font-size: 18px;
            }

            .note {

                .h4 {
                    font-weight: 600;
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
            height: 575px; 
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
                &.action {
                    position: relative;
                    .icon {
                        height: 25px;
                        width: 25px;
                        transition: 0.2s;
                        border-radius: 5px;
                        cursor: pointer;
                        &:hover {
                            background-color: ${Theme.hover};
                        }
                    }

                    .popup {
                        position: absolute;
                        top: 70%;
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

                        .icon-item {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 30px;
                            height: 30px;
                            font-size: 16px;
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

                            &.disable {
                                pointer-events: none;  
                                opacity: 0.5;          
                                user-select: none;    
                            }

                            &:hover {
                                background-color: ${Theme.hover};
                            }
                        }

                    }
                }
            }

            tr {
                &:hover {
                    background-color: ${Theme.softBlue};
                }
            }

            .empty-list {
                width: 100%;
                text-align: center;
                padding: 10px 0;
                color: ${Theme.mediumSoft};
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

            .action-box {
                gap: 30px;
                width: 60%;
                justify-content: end;
                
                .search-container {
                    width: 35%;
                    border-radius: 10px;
                    height: 40px;
                    border: 1px solid ${Theme.hover};
                    padding: 0 15px;
                    justify-content: start;

                    .input-container {
                        width: 100%;
                        gap: 5px;
                        justify-content: start;

                        .icon {
                            width: 40px;
                            height: 40px;
                            font-size: 22px;
                            color: ${Theme.soft};
                        }
                        input {
                            width: 100%;
                            &::placeholder {
                                color: ${Theme.textMediumSoft};
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
        }
    }

    .table-period .table-container {
        margin-top: 20px;
        width: 100%;
        height: 480px; 
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
            &.time-box {
                width: 230px;
            }
                
            .status {
                color: ${Theme.lightDark};
                border-radius: 15px;
                background-color: ${Theme.logo};
                color: ${Theme.header};
                padding: 3px 15px;
                font-size: 14px;
                width: 150px;
                display: flex;
                justify-content: center;

                &.inactive {
                    background-color: ${Theme.lightSoft};
                    color: ${Theme.dark};
                }
                &.coming {
                    background-color: ${Theme.softBlue};
                    color: ${Theme.dark};
                }
            }

            .action-area {
                display: flex;
                gap: 10px;
                align-items: center;

                .action-container {
                    padding: 3px;
                    border-radius: 3px;
                    cursor: pointer;
                    transition: 0.2s;

                    &.disable {
                        pointer-events: none;
                        opacity: 0.3;
                    }

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