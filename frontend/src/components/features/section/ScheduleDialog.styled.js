import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const ScheduleDialogContainer = styled.div`
    width: 50vw;
    min-height: 55vh;
    background-color: ${Theme.header};
    padding: 30px 25px;
    border-radius: 10px;
    animation: fadeIn 0.1s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .header {
        .title {
            display: flex;
            align-items: center;
            gap: 10px;

            .icon {
                font-size: 22px;
                color: ${Theme.logo};
            }

            .text {
                font-size: 18px;
                font-weight: 500;
            }
        }

        .detail-title {
            margin-top: 15px;
            display: flex;
            gap: 30px;
            align-items: center;
            color:rgb(112, 117, 121);

            .group {
                display: flex;
                gap: 10px;
                .icon {
                }

                .small-text {
                }
            }

            span {
                padding: 3px 10px;
                border-radius: 15px;
                border: 2px solid ${Theme.lightSoft};
                font-size: 14px;
                font-weight: 500;
            }
        }
    }

    .body {
        margin-top: 25px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        animation: fadeIn 0.2s ease-in-out;

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        .lesson {
            border: 1px solid ${Theme.logo};
            border-radius: 10px;
            width: 100%;
            padding: 25px;

            .title {
                display: flex;
                justify-content: space-between;
                .day {
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    .icon {
                        color: ${Theme.logo};
                        font-size: 20px;
                    }

                    .day-text {
                        font-weight: 600;
                        font-size: 16px;
                    }
                }

                span {
                    padding: 3px 10px;
                    border-radius: 20px;
                    background-color: ${Theme.logo};
                    font-size: 13px;
                    font-weight: 500;
                    color: ${Theme.header};
                }
            }

            .row {
                display: flex;
                margin-top: 10px;
                .group {
                    flex: 1;
                    display: flex;
                    gap: 10px;
                    align-items: center;

                    .icon {
                        font-size: 15px;

                        &.add {
                            font-size: 15px;
                        }
                    }

                    small {
                        font-size: 14px;
                    }
                }
            }
        }
    }

        
`;