import styled from 'styled-components';
import { button, shadow } from '../styles/colors/colors';
import { StyledWeatherBox } from './elements/WeatherBox';
import { useNavigate } from 'react-router-dom';

const StyledNavigatorTab = styled(StyledWeatherBox)`
    border-radius: 30px;
    border: 1px solid black;
    width: 100%;
    padding: 10px;
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
    const navigate = useNavigate();
    const path = window.location.href.split('/').pop();

    return (
        <StyledNavigatorTab>
            <StyledButton
                bold={path === 'current'}
                onClick={() => {
                    navigate('/current');
                }}
            >
                Aktualna Pogoda
            </StyledButton>
            <StyledButton
                bold={path === 'history'}
                onClick={() => {
                    navigate('/history');
                }}
            >
                Dane Historyczne
            </StyledButton>
            <StyledButton>Pogoda na żywo</StyledButton>
        </StyledNavigatorTab>
    );
};
