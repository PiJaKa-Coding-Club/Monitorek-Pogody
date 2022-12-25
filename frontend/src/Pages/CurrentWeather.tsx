import styled from 'styled-components';
import {
    PressureIcon,
    AirQualityIcon,
    HumidityIcon,
    VisibilityIcon,
    TemperatureFeelIcon,
    TemperatureRealIcon,
    SunsetIcon,
    SunriseIcon,
    UVIndexIcon,
    MoonSetIcon,
    MoonRiseIcon,
    MoonFullIcon,
    RainIcon,
    WindSpeedIcon,
    WindDirectionIcon,
    SunnyIcon,
} from '../assets';
import { Column, Row } from '../components/elements/Column';
import { Icon } from '../components/elements/WeatherBox';
import { Wrapper } from '../components/elements/Wrapper';
import { NavigatorTab } from '../components/NavigatorTab';
import { Place } from '../components/Place';
import { WeatherBox } from '../components/WeatherBox';
import { IconValueUnit } from '../types/weather';

const air: IconValueUnit[] = [
    {
        icon: PressureIcon,
        value: 1012,
        unit: 'hPa',
    },
    {
        icon: AirQualityIcon,
        value: 'Dobre',
    },
    {
        icon: HumidityIcon,
        value: 1012,
        unit: 'hPa',
    },
    {
        icon: VisibilityIcon,
        value: 100,
        unit: '%',
    },
];

const temp: IconValueUnit[] = [
    {
        icon: TemperatureFeelIcon,
        value: 30,
        unit: '°C',
    },
    {
        icon: TemperatureRealIcon,
        value: 40,
        unit: '°C',
    },
];

const sun: IconValueUnit[] = [
    {
        icon: SunsetIcon,
        value: '20:00',
    },
    {
        icon: SunriseIcon,
        value: '10:00',
    },
    {
        icon: UVIndexIcon,
        value: 3,
    },
];

const moon: IconValueUnit[] = [
    {
        icon: MoonSetIcon,
        value: '20:00',
    },
    {
        icon: MoonRiseIcon,
        value: '10:00',
    },
    {
        icon: MoonFullIcon, //TODO: dynamic icon
        value: 'Pełnia',
        reversed: true,
    },
];

const rain: IconValueUnit[] = [
    {
        icon: RainIcon,
        value: '21',
        unit: 'mm',
    },
];

const wind: IconValueUnit[] = [
    {
        icon: WindSpeedIcon,
        value: '21',
        unit: 'm/s',
    },
    {
        icon: WindDirectionIcon,
        value: 'SW',
    },
];

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
    return (
        <Page>
            <Wrapper>
                <Controller>
                    <LeftCol>
                        <Place />
                        <Row>
                            <Column>
                                <WeatherBox data={air} />
                                <WeatherBox data={temp} />
                            </Column>

                            <Column>
                                <WeatherBox data={sun} />
                                <WeatherBox data={moon} />
                            </Column>
                        </Row>
                    </LeftCol>

                    <RightCol>
                        <NavigatorTab />
                        <WeatherBox data={rain} />
                        <WeatherBox data={wind} />
                    </RightCol>
                </Controller>
            </Wrapper>
        </Page>
    );
};
