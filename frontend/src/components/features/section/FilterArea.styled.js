import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme'
export const FilterAreaContainer = styled.div`
    width: 100%;

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

    .filter-container {
        width: 100%;
        margin-top: 30px;
        font-size: 16px;
        display: flex;

        .tabs-container {
            height: 40px;
            background-color: ${Theme.softBlue};
            padding: 0 5px;
            border-radius: 5px;


            button {
                padding: 7px 15px;
                background-color: transparent;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 500;
                color: ${Theme.textMediumSoft};

                &.active {
                    background-color: ${Theme.header};
                    font-weight: 600;
                    color: ${Theme.dark}
                }
            }
        }

        .box {
            flex: 1;
            gap: 15px;
            background-color: transparent;
            justify-content: end;
        }

        .search-container {
            width: 40%;
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

        .box button.highlight {
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
`;