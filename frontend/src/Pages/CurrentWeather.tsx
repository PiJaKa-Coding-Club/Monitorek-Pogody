import styled from 'styled-components';
import { Column, Row } from '../components/elements/Column';
import { Wrapper } from '../components/elements/Wrapper';
import { NavigatorTab } from '../components/NavigatorTab';
import { NoPlace } from '../components/NoPlace';
import { Place } from '../components/Place';
import { WeatherBox } from '../components/WeatherBox';
import { useWeather } from '../hooks/useWeather';

const Page = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const LeftCol = styled.div`
    width: 66%;
    display: flex;
    flex-direction: column;
`;

const RightCol = styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
`;
const Controller = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

export const CurrentWeather = () => {
    const { place, weather, air, temp, sun, moon, rain, wind } = useWeather();

    return (
        <Page>
            <Wrapper>
                <Controller>
                    <LeftCol>
                        {place && weather && (
                            <>
                                <Place
                                    name={place}
                                    condition={weather.condition}
                                />
                                <Row>
                                    <Column>
                                        {air && <WeatherBox data={air} />}
                                        {temp && <WeatherBox data={temp} />}
                                    </Column>

                                    <Column>
                                        {sun && <WeatherBox data={sun} />}
                                        {moon && <WeatherBox data={moon} />}
                                    </Column>
                                </Row>
                            </>
                        )}
                        {!place && <NoPlace />}
                    </LeftCol>

                    <RightCol>
                        <NavigatorTab />
                        {place && (
                            <>
                                {rain && <WeatherBox data={rain} />}
                                {wind && <WeatherBox data={wind} />}
                            </>
                        )}
                    </RightCol>
                </Controller>
            </Wrapper>
        </Page>
    );
};
