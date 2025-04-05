import styled from 'styled-components';
import { Theme } from '../../assets/styles/Theme';

export const CounterBoxContainer = styled.div`
    width: ${props => props.width};
    background-color: ${Theme.header};
    border: 1px solid ${Theme.hover};
    text-align: left;
    border-radius: 5px;
    padding: 9px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    transition: 0.2s;
    color: ${Theme.lightDark};


    input {
        width: 100%;
        color: ${Theme.dark};
    }

    .updown {
        display: none;
        flex-direction: column;
        gap: 2px;
        
        .wrap-center {
            background-color: ${Theme.softBlue};
            font-size: 8px;
            color: ${Theme.mediumSoft};
            padding: 0 2px;
            &:hover {
                color: ${Theme.soft};
            }
        }
    }

    
    &:hover {
        .updown {
            display: flex;
        }
    }
`;