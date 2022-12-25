import styled from 'styled-components';
import { white, shadowBox } from '../../styles/colors/colors';

export const StyledWeatherBox = styled.div`
    background: ${white};
    padding: 10px;
    border-radius: 10px;
    box-shadow: ${shadowBox};
    margin: 10px;
    border: 1px solid black;
`;

export const WeatherRow = styled.div<{ reversed: boolean }>`
    display: flex;
    flex-direction: ${props => (props.reversed ? 'row-reverse' : 'row')};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
    padding: 0 20px;
`;

export const Value = styled.div`
    width: 100px;
    font-size: 20px;
`;

export const Icon = styled.img`
    width: 60px;
    height: 60px;
`;
