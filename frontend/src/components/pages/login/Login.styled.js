import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";


export const LoginContainer = styled.div`
    background-color: ${Theme.hover};
    height: 100%;

    .login-container {
        height: 85%;
        background-color: ${Theme.body};
        display: flex;
       
        .left-gap {
            width: 50%;
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
                gap: 30px;
                justify-content: end;
                padding-bottom: 50px;
                
                .text {
                    padding: 0px 50px;
                    text-align: center;
                    font-size: 65px;
                    font-weight: 600;
                    color: ${Theme.header}
                }

                .line {
                    width: 50%;
                    height: 5px;
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
                            font-size: 35px;
                            color: ${Theme.header};
                        }

                        input {
                            height: 45px;
                            font-size: 18px;
                            background-color: ${Theme.header};
                            border: 2px solid ${Theme.header};
                            border-radius: 5px;
                            padding: 0 10px;
                            font-size: 20px;
                            font-weight: 400;
                            font-size: 20px;   /* Làm con trỏ dài hơn */
                            caret-color: red;  /* Đổi màu con trỏ (tùy chọn) */

                        }
                    }

                    .username-error, .password-error {
                        margin-top: 5px;
                        margin-left: 50px;
                        font-weight: 500;
                        color: ${Theme.header};
                    }
                }

                .login-btn {
                    margin-left: 40px;
                    height: 40px;
                    width: 210px;
                    padding: 0 30px;
                    border-radius: 15px;
                    font-size: 20px;
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
        padding-top: 30px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);

        .copyright {
            margin-top: 10px;
        }
    }
`