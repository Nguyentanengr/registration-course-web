import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const EditSectionDialogContainer = styled.div`
    width: 45vw;
    height: 63vh;
    background-color: ${Theme.header};
    padding: 30px 25px;
    border-radius: 10px;
    overflow-y: scroll;

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

                &.disable {
                    pointer-events: none;
                    opacity: 0.5;
                }
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
                &.disable {
                    pointer-events: none;
                    opacity: 0.5;
                }
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