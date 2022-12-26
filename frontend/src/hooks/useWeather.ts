import axios, { AxiosResponse } from 'axios';
import { createServer } from 'miragejs';
import { useEffect, useState } from 'react';
import {
    AirQualityIcon,
    FirstMoonIcon,
    HumidityIcon,
    LastMoonIcon,
    MoonFullIcon,
    MoonHiddenIcon,
    MoonRiseIcon,
    MoonSetIcon,
    PressureIcon,
    RainIcon,
    SunriseIcon,
    SunsetIcon,
    TemperatureFeelIcon,
    TemperatureRealIcon,
    UVIndexIcon,
    VisibilityIcon,
    WindDirectionIcon,
    WindSpeedIcon,
} from '../assets';
import {
    CurrentWeather,
    CurrentWeatherResponse,
    IconValueUnit,
} from '../types/weather';

createServer({
    routes() {
        this.get('/current/:place', (_, request) => {
            const { place } = request.params;

            return {
                weather: {
                    place: place,
                    condition: 'rainy',
                    pressure: 1012,
                    air_quality: 'dobre',
                    humidity: 50,
                    visibility: 10,
                    temp_feel: 20,
                    temp_real: 20,
                    sunset: '18:00',
                    sunrise: '6:00',
                    uv: 1,
                    moonset: '18:00',
                    moonrise: '6:00',
                    moon: 'pełnia',
                    rain: 20,
                    wind: 20,
                    wind_direction: 'SW',
                },
            };
        });

        this.get('/cities/:q', (_, request) => {
            const cities = [
                'Wrocław',
                'Wronki',
                'Wrocławek',
                'Włocławek',
                'Nowy sad',
                'Nowosybirsk',
            ];
            const { q } = request.params;
            return {
                cities: cities.filter(city =>
                    city.toLowerCase().startsWith(q.toLowerCase())
                ),
            };
        });
    },
});

export const useWeather = () => {
    const [place] = useState(localStorage.getItem('place'));
    const [weather, setWeather] = useState<CurrentWeather>();

    const [air, setAir] = useState<IconValueUnit[]>();
    const [temp, setTemp] = useState<IconValueUnit[]>();
    const [sun, setSun] = useState<IconValueUnit[]>();
    const [moon, setMoon] = useState<IconValueUnit[]>();
    const [rain, setRain] = useState<IconValueUnit[]>();
    const [wind, setWind] = useState<IconValueUnit[]>();

    useEffect(() => {
        if (place) {
            axios
                .get<string, AxiosResponse<CurrentWeatherResponse>>(
                    `/current/${place}`
                )
                .then(res => {
                    setWeather(res.data.weather);
                });
        }
    }, [place]);

    useEffect(() => {
        if (weather) {
            setAir([
                {
                    icon: PressureIcon,
                    value: weather.pressure,
                    unit: 'hPa',
                },
                {
                    icon: AirQualityIcon,
                    value: weather.air_quality,
                },
                {
                    icon: HumidityIcon,
                    value: weather.humidity,
                    unit: '%',
                },
                {
                    icon: VisibilityIcon,
                    value: weather.visibility,
                    unit: '%',
                },
            ]);
            setTemp([
                {
                    icon: TemperatureFeelIcon,
                    value: weather.temp_feel,
                    unit: '°C',
                },
                {
                    icon: TemperatureRealIcon,
                    value: weather.temp_real,
                    unit: '°C',
                },
            ]);
            setSun([
                {
                    icon: SunsetIcon,
                    value: weather.sunset,
                },
                {
                    icon: SunriseIcon,
                    value: weather.sunrise,
                },
                {
                    icon: UVIndexIcon,
                    value: weather.uv,
                },
            ]);
            setMoon([
                {
                    icon: MoonSetIcon,
                    value: weather.moonset,
                },
                {
                    icon: MoonRiseIcon,
                    value: weather.moonrise,
                },
                {
                    icon: getMoonIcon(weather.moon),
                    value: weather.moon,
                    reversed: true,
                },
            ]);
            setRain([
                {
                    icon: RainIcon,
                    value: weather.rain,
                    unit: 'mm',
                },
            ]);
            setWind([
                {
                    icon: WindSpeedIcon,
                    value: weather.wind,
                    unit: 'm/s',
                },
                {
                    icon: WindDirectionIcon,
                    value: weather.wind_direction,
                },
            ]);
        }
    }, [weather]);

    return { weather, air, temp, sun, moon, rain, wind, place };
};

function getMoonIcon(moon: string): string {
    switch (moon) {
        case 'pełnia':
            return MoonFullIcon;
        case 'nów':
            return MoonHiddenIcon;
        case 'pierwszaKwadra':
            return FirstMoonIcon;
        case 'ostatniaKwadra':
            return LastMoonIcon;
        default:
            return MoonFullIcon;
    }
}
