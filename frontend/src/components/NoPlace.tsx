import styled from 'styled-components';
import { StyledWeatherBox } from './elements/WeatherBox';

export const StyledNoPlaceBox = styled(StyledWeatherBox)`
    border-radius: 30px;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const RedText = styled.h1`
    color: red;
`;

export const NoPlace = () => {
    return (
        <StyledNoPlaceBox>
            <RedText>Brak określonej lokalizacji</RedText>
            <p>Wyszukaj lokalizację dla której chcesz pobrać aktualne dane</p>
        </StyledNoPlaceBox>
    );
};
