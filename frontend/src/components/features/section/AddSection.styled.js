

import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const AddSectionContainer = styled.div`
    width: 45vw;
    height: 90vh;
    background-color: ${Theme.header};
    padding: 30px 25px;
    border-radius: 10px;
    overflow-y: scroll;
    animation: fadeIn 0.2s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    &::-webkit-scrollbar {
            width: 8px;
            height: 5px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.1); 
            border-radius: 8px;
        }

        &::-webkit-scrollbar-track {
            background-color: transparent;
        }

    .o-title, .c-title {
        font-weight: 500;
        font-size: 16px;
    }

    h2 {
        font-size: 20px;
    }

    .section-1 {
        width: 100%;
        margin-top: 30px;
        display: flex;
        gap: 20px;

        .option-box {
            flex: 1;

            .select-option {
                margin-top: 5px;
            }
        }
        
    }

    .section-2 {
        width: 100%;
        margin-top: 30px;
        display: flex;

        .option-box {
            flex: 1;

            .select-option {
                margin-top: 5px;
            }
        }
    }

    .section-3 {
        width: 100%;
        margin-top: 30px;
        display: flex;
        gap: 20px;

        .counter-box {
            flex: 1;

            .counter {
                margin-top: 5px;
            }
        }
    }

    .section-4 {
        width: 100%;
        margin-top: 30px;

        .header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .h-title {
                font-weight: 500;
            }

            .label {
                display: flex;
                gap: 15px;
                background-color: ${Theme.header};
                padding: 8px 12px;
                border-radius: 5px;
                border: 1px solid ${Theme.hover};
                font-weight: 500;

                p {
                    opacity: 1;
                }

            }
        }

        .body {
            margin-top: 20px;
            width: 100%;
            border-radius: 5px;
            border: 1px solid ${Theme.hover};
            padding: 20px 25px;
            
            .f-title {
                font-weight: 500;
            }

            .select-option {
                margin-top: 5px;
            }

            .form-1 {
                width: 100%;
                margin-top: 30px;
                display: flex;
                gap: 20px;

                .dow-option-box {
                    flex: 1;
                }

                .box {
                    flex: 1;
                    display: flex;

                    .sp-option-box {
                        flex: 1;
                    }

                    .ep-option-box {
                        flex: 1;
                        
                    }
                    

                }
            }

            .form-2 {
                margin-top: 30px;
                display: flex;
                gap: 20px;
                .sd-option-box {
                    flex: 1;
                }

                .ed-option-box {
                    flex: 1;
                }
            }

            .form-3 {
                margin-top: 30px;
                display: flex;
                gap: 20px;
                .te-option-box {
                    flex: 1;
                }

                .pl-option-box {
                    flex: 1;
                }
            }

            button.add-btn {
                border-radius: 5px;
                margin-top: 25px;
                height: 40px;
                background-color: ${Theme.logo};
                font-size: 16px;
                font-weight: 500;
                width: 100%;
                cursor: pointer;
                color: ${Theme.header};

                &.disable {
                    pointer-events: none;
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                &:hover {
                    background-color:rgb(223, 53, 53);
                }
            }
        }
    }

    .section-5 {
        margin-top: 30px;
        
        .a-title {
            font-size: 16px;
            font-weight: 600;
        }
        .table-container {
            margin-top: 10px;
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
                font-size: 14px;
                &.time-box {
                    width: 230px;
                }
            }
        }
    }

    .trash {
        cursor: pointer;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        &:hover {
            background-color: ${Theme.hover};
        }
    }

    .footer {
        margin-top: 35px;
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 10px;

        .cancel-btn {
            border-radius: 5px;
            height: 40px;
            background-color: transparent;
            border: 1px solid ${Theme.hover};
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            padding: 0 20px;
            color: ${Theme.dark};
            &:hover {
                background-color:rgb(230, 230, 230);
            }
        }

        .confirm-btn {
            border-radius: 5px;
            height: 40px;
            background-color: ${Theme.logo};
            font-size: 16px;
            font-weight: 500;
            padding: 0 20px;
            cursor: pointer;
            color: ${Theme.header};

            &.disable {
                pointer-events: none;
                opacity: 0.5;
                cursor: not-allowed;
            }

            &:hover {
                background-color:rgb(223, 53, 53);
            }
        }
    }

    span.error {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: ${Theme.logo};
    opacity: 0; /* Mặc định ẩn */
    transform: translateY(-10px); /* Dịch chuyển lên trên một chút khi ẩn */
    transition: opacity 0.3s ease, transform 0.3s ease; /* Hiệu ứng mượt mà cho opacity và transform */
    height: 0; /* Đảm bảo không chiếm không gian khi ẩn */
    overflow: hidden; /* Ẩn nội dung khi height là 0 */
}

span.error.visible {
    opacity: 1; /* Hiển thị */
    transform: translateY(0); /* Dịch chuyển về vị trí ban đầu */
    height: auto; /* Hiển thị đầy đủ chiều cao */
}
`;