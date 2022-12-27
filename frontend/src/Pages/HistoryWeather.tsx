import { Column, Controller, Page, Row } from '../components/elements/Column';
import { StyledWeatherBox } from '../components/elements/WeatherBox';
import { Wrapper } from '../components/elements/Wrapper';
import { NavigatorTab } from '../components/NavigatorTab';
import { Place } from '../components/Place';
import { WeatherBox } from '../components/WeatherBox';
import { useWeather } from '../hooks/useWeather';
import Calendar from 'react-calendar';
import { useState } from 'react';
import '../styles/Calendar.css';
import { NoPlace } from '../components/NoPlace';

export const HistoryWeather = () => {
    const { place, weather, sun, moon } = useWeather();
    const [value, onChange] = useState(new Date());

    return (
        <Page>
            <Wrapper>
                <Controller>
                    <Row>
                        <StyledWeatherBox
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <h1>{`${value.getDate()}.${value.getMonth()}.${value.getFullYear()}`}</h1>
                            <Calendar onChange={onChange} value={value} />
                        </StyledWeatherBox>
                        {place && weather && (
                            <>
                                <Column>
                                    <Place
                                        name={place}
                                        condition={weather.condition}
                                    />
                                    <Row>
                                        {moon && (
                                            <Column>
                                                <WeatherBox data={moon} />
                                            </Column>
                                        )}
                                        {sun && (
                                            <Column>
                                                <WeatherBox data={sun} />
                                            </Column>
                                        )}
                                    </Row>
                                </Column>
                            </>
                        )}
                        {!place && (
                            <Row style={{ margin: '0 20px' }}>
                                <NoPlace />
                            </Row>
                        )}
                        <NavigatorTab />
                    </Row>
                </Controller>
            </Wrapper>
        </Page>
    );
};
