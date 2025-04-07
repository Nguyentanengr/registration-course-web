import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


export const LoginContainer = styled.div`
    background-color: ${Theme.hover};
    height: calc(100% - 55px);
    position: fixed;
    z-index: 15;
    top: 55px;
    left: 0;
    right: 0;
    bottom: 0;

    .login-container {
        height: 85%;
        background-color: ${Theme.body};
        display: flex;
       
        .left-gap {
            width: 85%;
            display: flex;
            align-items: center;
            justify-content: center;
            
            img {
                width: auto;
                height: 100%;
            }
        }

        .right-gap {
            width: 50%;
            background-color: ${Theme.logo};

            .title {
                height: 60%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                justify-content: end;
                padding-bottom: 30px;
                
                .text {
                    padding: 0px 50px;
                    text-align: center;
                    font-size: 40px;
                    font-weight: 600;
                    color: ${Theme.header}
                }

                .line {
                    width: 50%;
                    height: 2px;
                    background-color: ${Theme.header};
                }
            }

            .login-form {
                height: 40%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 20px;

                .username-container, .password-container {
                    .username-input, .password-input {
                        display: flex;
                        align-items: center;
                        gap: 10px;

                        .icon {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 30px;
                            color: ${Theme.header};
                        }

                        input {
                            height: 40px;
                            width: 220px;
                            font-size: 18px;
                            background-color: ${Theme.header};
                            border: 2px solid ${Theme.header};
                            border-radius: 5px;
                            padding: 0 10px;
                            font-weight: 400;
                            font-size: 16px;   /* Làm con trỏ dài hơn */
                            caret-color: red;  /* Đổi màu con trỏ (tùy chọn) */

                        }
                    }

                    .username-error, .password-error {
                        margin-top: 5px;
                        margin-left: 40px;
                        font-weight: 500;
                        color: ${Theme.header};
                        font-size: 14px;
                    }
                }

                .login-btn {
                    margin-left: 40px;
                    height: 35px;
                    width: 170px;
                    padding: 0 10px;
                    border-radius: 15px;
                    font-size: 16px;
                    background-color: ${Theme.mediumLogo};
                    color: ${Theme.header};
                    cursor: pointer;
                    font-weight: 500;

                    &:hover {
                        background-color: ${Theme.midLogo};
                    }
                }
            }
        }
    }

    .footer-container {
        height: 15%;
        background-color: ${Theme.header};
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        font-size: 14px;

        .copyright {
            margin-top: 10px;
        }
    }
`