import styled from 'styled-components';
import { SunnyIcon } from '../assets';
import { shadow, weatherColors } from '../styles/colors/colors';
import { WeatherCondition } from '../types/weather';

const StyledPlace = styled.div`
    border: 1px solid black;
    width: calc(100% - 20px);
    align-self: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: ${weatherColors[WeatherCondition.Sunny]};
    box-shadow: ${shadow};
`;

const Icon = styled.img`
    width: 50px;
    height: 50px;
`;

const StyledPlaceName = styled.h1``;

export const Place = () => {
    return (
        <StyledPlace>
            <StyledPlaceName>Wrocław</StyledPlaceName>

            <Icon src={SunnyIcon} />
        </StyledPlace>
    );
};
