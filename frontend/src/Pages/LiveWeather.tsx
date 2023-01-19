import { Column, Controller, Page, Row } from '../components/elements/Column';
import { StyledWeatherBox } from '../components/elements/WeatherBox';
import { Wrapper } from '../components/elements/Wrapper';
import { NavigatorTab } from '../components/NavigatorTab';
import { Place } from '../components/Place';
import { WeatherBox } from '../components/WeatherBox';
import { useWeather } from '../hooks/useWeather';
import '../styles/Calendar.css';
import { NoPlace } from '../components/NoPlace';
import { ChartBox } from '../components/ChartBox';
import {useEffect} from 'react'
import {
    AirQualityIcon,
    HumidityIcon,
    PressureIcon,
    RainIcon,
    TemperatureFeelIcon,
    TemperatureRealIcon,
    UVIndexIcon,
    VisibilityIcon,
    WindDirectionIcon,
    WindSpeedIcon,
} from '../assets';
import { useLive } from '../hooks/useLive';
import styled from 'styled-components';

const LiveDot = styled.div`
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    margin-right: 20px;
    animation-name: blink;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
`

export const LiveWeather = () => {
    const { place, sun, moon, date, setDate, history } = useWeather();
    const {liveData} = useLive();

    useEffect(() => {
        setDate(new Date())
        console.log(sun)
    },[])    

    useEffect(() => {
        console.log(liveData)
    },[liveData])

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
                            <h1>{`${date.getDate()}.${(date.getMonth() + 1)
                                .toString()
                                .padStart(
                                    2,
                                    '0'
                                )}.${date.getFullYear()}`}</h1>
                                <h1>{`${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`}</h1>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'red'
                                }}>
                                    <LiveDot/>
                                    <h1>Live</h1>
                                </div>

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
                    {place && history && liveData && (
                        <>
                            <Row>
                                <Column>
                                    <ChartBox
                                        icons={[RainIcon]}
                                        label1="Opady"
                                        data1={[...history.rain, {
                                            date: liveData?.date,
                                            value: liveData?.rain
                                        }]}
                                        unit={'mm'}
                                        min={0}
                                    />
                                </Column>
                                <Column>
                                    <ChartBox
                                        icons={[UVIndexIcon]}
                                        label1="Indeks UV"
                                        data1={[...history.uv, {
                                            date: liveData?.date,
                                            value: liveData?.uv
                                        }]}
                                        min={0}
                                        max={7}
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
                                        label1={'Prędkość wiatru'}
                                        data1={[...history.wind, {
                                            date: liveData?.date,
                                            value: liveData?.wind
                                        }]}
                                        unit={'m/s'}
                                        min = {0}
                                    />
                                </Column>
                                <Column>
                                    <ChartBox
                                        icons={[
                                            TemperatureRealIcon,
                                            TemperatureFeelIcon,
                                        ]}
                                        label1={'Temperatura rzeczywista'}
                                        data1={[...history.temp_real, {
                                            date: liveData?.date,
                                            value: liveData?.temp_real
                                        }]}
                                        label2={'Temperatura odczuwalna'}
                                        data2={[...history.temp_feel, {
                                            date: liveData?.date,
                                            value: liveData?.temp_feel
                                        }]}
                                        unit={'°C'}
                                    />
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <ChartBox
                                        icons={[PressureIcon, AirQualityIcon]}
                                        label1={'Ciśnienie'}
                                        data1={[...history.pressure, {
                                            date: liveData?.date,
                                            value: liveData?.pressure
                                        }]}
                                        unit={'hPa'}
                                        min={990}
                                        max={1030}
                                    />
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <ChartBox
                                        icons={[HumidityIcon, VisibilityIcon]}
                                        label1={'Wilgotność'}
                                        data1={[...history.humidity, {
                                            date: liveData?.date,
                                            value: liveData?.humidity
                                        }]}
                                        label2={'Widoczność'}
                                        data2={[...history.visibility, {
                                            date: liveData?.date,
                                            value: liveData?.visibility
                                        }]}
                                        unit={'%'}
                                        min={0}
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


