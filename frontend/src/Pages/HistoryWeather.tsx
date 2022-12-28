import { Column, Controller, Page, Row } from '../components/elements/Column';
import { StyledWeatherBox } from '../components/elements/WeatherBox';
import { Wrapper } from '../components/elements/Wrapper';
import { NavigatorTab } from '../components/NavigatorTab';
import { Place } from '../components/Place';
import { WeatherBox } from '../components/WeatherBox';
import { useWeather } from '../hooks/useWeather';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';
import { NoPlace } from '../components/NoPlace';

export const HistoryWeather = () => {
    const { place, sun, moon, date, setDate, history } = useWeather();

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
                            <h1>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</h1>
                            <Calendar onChange={setDate} value={date} />
                        </StyledWeatherBox>
                        {place && history && (
                            <>
                                <Column>
                                    <Place
                                        name={place}
                                        condition={history.condition}
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
