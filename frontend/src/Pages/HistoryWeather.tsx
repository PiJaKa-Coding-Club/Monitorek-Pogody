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
import { ChartBox } from '../components/ChartBox';
import { AirQualityIcon, HumidityIcon, PressureIcon, RainIcon, TemperatureFeelIcon, TemperatureRealIcon, UVIndexIcon, VisibilityIcon, WindDirectionIcon, WindSpeedIcon, WindyIcon } from '../assets';

export const HistoryWeather = () => {
    const { place, sun, moon, date, setDate, history } = useWeather();

    return (
        <Page>
            <Wrapper>
                <Controller>
                    <Row>
                        <Column>
                            <StyledWeatherBox
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                }}
                            >
                                <h1>{`${date.getDate()}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getFullYear()}`}</h1>
                                <Calendar onChange={setDate} value={date} maxDate={new Date()}/>
                            </StyledWeatherBox>
                        </Column>
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
                    {place && history && (
                        <>
                            <Row>
                                <Column>
                                    <ChartBox
                                        icons={[
                                            RainIcon,
                                        ]}
                                        label1="Opady"
                                        data1={history.rain}
                                    />
                                </Column>
                                <Column>
                                    <ChartBox
                                        icons={[
                                            UVIndexIcon,
                                        ]}
                                        label1="Indeks UV"
                                        data1={history.uv}
                                    />
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <ChartBox
                                        icons={[
                                            WindSpeedIcon,
                                            WindDirectionIcon,
                                        ]}
                                        label1={"Prędkość wiatru"}
                                        data1={history.wind}
                                    />
                                </Column>
                                <Column>
                                    <ChartBox
                                        icons={[
                                            TemperatureRealIcon,
                                            TemperatureFeelIcon,
                                        ]}
                                        label1={"Temperatura rzeczywista"}
                                        data1={history.temp_real}
                                        label2={"Temperatura odczuwalna"}
                                        data2={history.temp_feel}
                                    />
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <ChartBox
                                        icons={[
                                            PressureIcon,
                                            AirQualityIcon,
                                        ]}
                                        label1={"Ciśnienie"}
                                        data1={history.pressure}
                                    />
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <ChartBox
                                        icons={[
                                            HumidityIcon,
                                            VisibilityIcon,
                                        ]}
                                        label1={"Wilgotność"}
                                        data1={history.humidity}
                                        label2={"Widoczność"}
                                        data2={history.visibility}
                                    />
                                </Column>
                            </Row>
                        </>
                    )}
                </Controller>
            </Wrapper>
        </Page>
    );
};
