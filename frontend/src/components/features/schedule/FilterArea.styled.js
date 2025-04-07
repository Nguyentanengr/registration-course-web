import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const FilterAreaContainer = styled.div`
    .info {
        padding: 20px;
        width: 100%;
        border-radius: 8px;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: rgb(255, 255, 255);

        .box {
            display: flex;
            gap: 30%;
        }

        .item-box {
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 10px;

            .icon {

            }
            .text {
                font-weight: 600;
                span {
                    font-weight: 400;
                    padding: 0px 10px;
                }
            }
        }
    }
    .filter-control {
        margin-top: 30px;
        display: flex;
        gap: 20px;
        justify-content: space-between;

        .filter-box {
            flex: 1;
            display: flex;
            gap: 20px;
            .semester-filter {
                flex: 1;
            }

            .course-filter {
                flex: 1;
            }
        }

        .control-box {
            flex: 1;
            display: flex;
            gap: 20px;

            span.week {
                width: 50%;
                display: flex;
                align-items: center;
                padding-left: 7%;
                gap: 10px;
                border-radius: 5px;
                border: 1px solid rgba(0, 0, 0, 0.1)
            }

            button.control-btn {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                gap: 10px;
                border-radius: 5px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                transition: 0.2s;

                &:hover {
                    background-color: ${Theme.softBlue};
                }

            }
            
            .icon {
                font-size: 24px;
            }
            h6 {
                font-size: 16px;
                font-weight: 400;
            }
        }
    }

    .timetable-container {
        margin-top: 20px;
        display: flex;
        gap: 15px;
        

        .day-col {
            flex: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
            border-radius: 5px;
            border: 1px solid ${Theme.hover};
            min-height: 700px;
            padding: 20px 10px;

            .info-day {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                h4 {
                    font-weight: 500;
                }

                span {
                    margin-top: 5px;
                    font-size: 14px;
                    color: ${Theme.lightDark};
                }
            }

            .lessions {
                margin-top: 30px;
                font-size: 14px;
                display: flex;
                flex-direction: column;
                gap: 15px;

                .empty {
                    color: ${Theme.mediumSoft};
                }

                .lession {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                    border-radius: 5px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    padding: 10px;

                    &.light {
                        background-color:rgb(212, 244, 255);
                    }

                    &.dark {
                        background-color:rgb(255, 228, 248);
                    }
                    .title {
                        display: flex;
                        align-items: start;
                        gap: 5px;
                        font-size: 14px;

                        .icon {
                            padding-top: 1px;
                            font-size: 13px;
                        }

                        .text {

                        }
                        }
                }
            }
        }
    }
`;