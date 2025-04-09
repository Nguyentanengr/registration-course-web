import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme'

export const SectionAreaContainer = styled.div`
    margin-top: 25px;

    .finding {
        width: 100%;
        padding: 20px 50px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        color: ${Theme.mediumSoft};
        gap: 20px;
        align-items: center;
    }

    .not-found {
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

    .table-container {
        width: 100%;
        overflow-x: auto;
        height: 480px; 
        overflow-y: auto;
        background: white;
        border-radius: 8px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
        font-size: 16px;

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
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid ${Theme.hover};
            height: 50px;
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

        tr.body-row {
            transition: 0.05s;
            
            &:hover {
                background-color: ${Theme.softBlue};
            }
        }

        
        
    }


    .pagination {
        padding: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
    }

    .controls {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .controls button {
        margin-left: 6px;
        width: 28px;
        height: 28px;
        border-radius: 6px;
        border: 1px solid ${Theme.hover};
        background: white;
        cursor: pointer;
    }
    .controls select {
        margin-left: 6px;
        width: 58px;
        padding: 0 10px;
        height: 28px;
        border-radius: 6px;
        border: 1px solid ${Theme.hover};
        background: white;
        cursor: pointer;
        height: 28px;
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