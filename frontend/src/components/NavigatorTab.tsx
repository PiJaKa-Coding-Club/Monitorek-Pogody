import styled from 'styled-components';
import { badge as badgeColor, button, shadow } from '../styles/colors/colors';
import { StyledWeatherBox } from './elements/WeatherBox';
import { useNavigate } from 'react-router-dom';
import { mainFont } from '../styles/fonts';

const StyledNavigatorTab = styled(StyledWeatherBox)`
    border-radius: 30px;
    border: 1px solid black;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

export const StyledButton = styled.button<{ bold?: boolean, badge?: boolean }>`
    border: 1px solid black;
    padding: 20px 5px;
    border-radius: 10px;
    background: ${button};
    box-shadow: ${shadow};
    margin: 20px 0;
    font-weight: ${props => (props.bold ? 'bold' : 'normal')};
    display: block;
    width: 100%;
    position: relative;

    ${({ badge }) => badge && `&::after {
        content: 'NOWOŚĆ';
        display: block;
        position: absolute;
        right: -20px;
        top: -10px;
        font-size: 22px;
        color: black;
        font-family: ${mainFont};
        background-color: ${badgeColor};
        border-radius: 5px;
        border: 1px solid black;
        padding: 5px;
        box-shadow: ${shadow};
    }`}
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
            <StyledButton
                bold={path === 'live'}
                badge={true}
                onClick={() => {
                    navigate('/live');
                }}
            >
                Pogoda na żywo
            </StyledButton>
        </StyledNavigatorTab>
    );
};
