import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";

export const FilterAreaContainer = styled.div`
    
    .header-page {
        display: flex;
        justify-content: space-between;
        align-items: end;
        
        .filter-container {
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 15px;

            .title {
                font-size: 18px;
                font-weight: 500;
            }

            .select-option {
                position: relative;
                font-family: 'Montserrat', sans-serif;
                .select {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 350px;
                    padding: 12px 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    font-size: 16px;
                    .text {
                        
                        color: ${Theme.textSoft};
                    }

                    .dropdown-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 20px;
                    }

                    
                }

                .option-container {
                    position: absolute;
                    background-color: ${Theme.body};
                    top: 120%;
                    left: 0;
                    border-radius: 10px;
                    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
                    font-size: 16px;
                    .option-item {
                        padding: 12px 20px;
                        cursor: pointer;
                        &.first {
                            border-top-left-radius: 10px;
                            border-top-right-radius: 10px;
                            background-color: transparent;
                        }
                        &.last {
                            border-bottom-left-radius: 10px;
                            border-bottom-right-radius: 10px;
                            background-color: transparent;
                        }
                        &:hover {
                            background-color: ${Theme.hover};
                        }
                    }
                }
            }
        }

        .timer-container {
            display: flex;
            align-items: center;
            justify-content: start;
            gap: 15px;
            border: 2px solid rgba(165, 13, 13, 1);
            padding: 7px 25px;
            border-radius: 10px;

            

            .icon {
                font-size: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .text {
                font-size: 16px;
                color: ${Theme.textSoft};
                font-family: 'Montserrat', sans-serif;
            }
        }
    }
`