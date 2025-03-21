import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';

export const SelectedAreaContainer = styled.div`
   margin-top: 80px;
   height: 500px;

   .title {
        font-size: 20px;
        font-weight: 800;

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
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        font-size: 20px;

        .table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 20px;
            text-align: left;
            border-bottom: 1px solid ${Theme.hover};
        }


        td {
            padding: 15px;
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

        .pending {
            padding: 10px 10px;
            background-color:  #FFEDED;
            text-align: center;
            border-radius: 15px;
        }

        .confirmed {
            padding: 12px 10px;
            background-color: ${Theme.lightSuccess};
            text-align: center;
            border-radius: 15px;
        }


   }
`;