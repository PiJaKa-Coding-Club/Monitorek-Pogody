import {
    Column,
    Controller,
    LeftCol,
    Page,
    RightCol,
    Row,
    RowController,
} from '../components/elements/Column';
import { Wrapper } from '../components/elements/Wrapper';
import { NavigatorTab } from '../components/NavigatorTab';
import { NoPlace } from '../components/NoPlace';
import { Place } from '../components/Place';
import { WeatherBox } from '../components/WeatherBox';
import { useWeather } from '../hooks/useWeather';

export const CurrentWeather = () => {
    const { place, weather, air, temp, sun, moon, rain, wind } = useWeather();

    return (
        <Page>
            <Wrapper>
                <RowController>
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
                </RowController>
            </Wrapper>
        </Page>
    );
};
