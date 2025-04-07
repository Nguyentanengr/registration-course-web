import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const LogoutContainer = styled.div`
    width: 30vw;
    height: 30vh;
    background-color: ${Theme.header};
    border-radius: 15px;
    padding: 25px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5%;
    .title {
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;

        h3 {

        }
    }

    .confirm-box {
        margin-top: 25px;
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 10px;
        .logout-btn {
            .logout {
                border-radius: 5px;
                background-color: ${Theme.logo};
                color: ${Theme.header};
                height: 35px;
                padding: 0 20px;
                gap: 10px;
                cursor: pointer;
                transition: 0.2s;
                .icon {
                    font-size: 20px;
                }

                p {
                    font-weight: 400;
                    opacity: 1;
                }

                &:hover {
                    background-color:rgb(255, 18, 18);
                }

            }
        }

        .close-btn {
            border-radius: 5px;
            height: 35px;
            font-size: 16px;
            font-weight: 500;
            padding: 0 20px;
            cursor: pointer;
            border: 1px solid ${Theme.hover};
            transition: 0.2s;
            &:hover {
                border: 1px solid ${Theme.mediumSoft};
            }
        }
    }
`;