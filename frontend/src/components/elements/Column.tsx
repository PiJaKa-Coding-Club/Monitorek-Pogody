import styled from 'styled-components';

export const Column = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

export const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const Page = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const LeftCol = styled.div`
    width: 66%;
    display: flex;
    flex-direction: column;
`;

export const RightCol = styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
    padding: 10px;
`;
export const Controller = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`;

export const RowController = styled(Controller)`
    flex-direction: row;
`