import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const SelectedAreaContainer = styled.div`
   margin-top: 80px;
   height: 500px;

   .title {
        font-size: 16px;
        font-weight: 600;

        span {
            color: ${Theme.logo};
        }
   }

   .table-container {
        margin-top: 30px;
        width: 100%;
        overflow-x: auto;
        background: white;
        border-radius: 8px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
        font-size: 16px;

        .table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid ${Theme.hover};
        }


        td {
            padding: 12px;

            &.time-box {
                width: 230px;
            }
        }


        tr.boldHighlight {
            background-color: #FF7575;
        }

        tr.softHighlight {
            background-color: #FFEDED;
        }

        tr.body-row {
            cursor: pointer;
            transition: 0.05s;
            
            &:hover {
                background-color: ${Theme.lightSoft};
            }
        }

        .sc {
            font-size: 14px;
            margin: 3px 0px;
        }

        .light, .highlight, .dark {
            padding: 5px;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            border-radius: 15px;
        }

        .light {
            background-color:rgb(255, 247, 247);
        }

        .highlight {
            background-color:rgb(228, 237, 255);
        }

        .dark {
            background-color:rgb(232, 232, 232);
        }


   }
`;