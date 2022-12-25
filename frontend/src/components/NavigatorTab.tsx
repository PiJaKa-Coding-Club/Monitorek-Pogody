import styled from 'styled-components';
import { button, shadow } from '../styles/colors/colors';
import { StyledWeatherBox } from './elements/WeatherBox';

const StyledNavigatorTab = styled(StyledWeatherBox)`
    border-radius: 30px;
    border: 1px solid black;
`;

const StyledButton = styled.button<{ bold?: boolean }>`
    border: 1px solid black;
    padding: 20px 5px;
    border-radius: 10px;
    background: ${button};
    box-shadow: ${shadow};
    margin: 20px 0;
    font-weight: ${props => (props.bold ? 'bold' : 'normal')};
    display: block;
    width: 100%;
`;

export const NavigatorTab = () => {
    return (
        <StyledNavigatorTab>
            <StyledButton bold>Aktualna Pogoda</StyledButton>
            <StyledButton>Dane Historyczne</StyledButton>
            <StyledButton>Pogoda na żywo</StyledButton>
        </StyledNavigatorTab>
    );
};
