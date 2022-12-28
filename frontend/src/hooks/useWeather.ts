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
    HistoricalWeather,
    HistoricalWeatherResponse,
    IconValueUnit,
} from '../types/weather';

function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

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
                    humidity: getRandomArbitrary(20, 70),
                    visibility: 10,
                    temp_feel: getRandomArbitrary(20, 30),
                    temp_real: getRandomArbitrary(20, 30),
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

        this.get('/history/:place/:date', (_, request) => {
            const { place, date } = request.params;
            // date ISO format = '2022-12-28T09:16:20.120Z'
            return {
                weather: {
                    place: place,
                    date: date,
                    condition: 'rainy', //historical condition (average of day)
                    pressure: {
                        23: 1012,
                        22: 1012,
                        21: 1012,
                        20: 1012,
                        19: 1012,
                        18: 1012,
                        17: 1012,
                        16: 1012,
                    },
                    air_quality: {
                        23: 'dobre',
                        22: 'dobre',
                        21: 'dobre',
                        20: 'dobre',
                        19: 'dobre',
                        18: 'dobre',
                        17: 'dobre',
                        16: 'dobre',
                    },
                    humidity: {
                        23: 50,
                        22: 50,
                        21: 50,
                        20: 50,
                        19: 50,
                        18: 50,
                        17: 50,
                        16: 50,
                    },
                    visibility: {
                        23: 50,
                        22: 50,
                        21: 50,
                        20: 50,
                        19: 50,
                        18: 50,
                        17: 50,
                        16: 50,
                    },
                    temp_feel: {
                        23: 50,
                        22: 50,
                        21: 50,
                        20: 50,
                        19: 50,
                        18: 50,
                        17: 50,
                        16: 50,
                    },
                    temp_real: {
                        23: 50,
                        22: 50,
                        21: 50,
                        20: 50,
                        19: 50,
                        18: 50,
                        17: 50,
                        16: 50,
                    },
                    sunset: '18:00',
                    sunrise: '6:00',
                    uv: {
                        23: 1,
                        22: 2,
                        21: 3,
                        20: 4,
                        19: 4,
                        18: 4,
                        17: 6,
                        16: 6,
                    },
                    moonset: `${getRandomArbitrary(8, 13)}:${getRandomArbitrary(
                        20,
                        30
                    )}`,
                    moonrise: '6:00',
                    moon: 'pełnia',
                    rain: {
                        23: 50,
                        22: 50,
                        21: 50,
                        20: 50,
                        19: 50,
                        18: 50,
                        17: 50,
                        16: 50,
                    },
                    wind: {
                        23: 50,
                        22: 50,
                        21: 50,
                        20: 50,
                        19: 50,
                        18: 50,
                        17: 50,
                        16: 50,
                    },
                    wind_direction: {
                        23: 'SW',
                        22: 'SW',
                        21: 'SW',
                        20: 'SW',
                        19: 'SW',
                        18: 'SW',
                        17: 'SW',
                        16: 'SW',
                    },
                },
            };
        });
    },
});

export const useWeather = () => {
    const path = window.location.href.split('/').pop();

    const [place] = useState(localStorage.getItem('place'));
    const [weather, setWeather] = useState<CurrentWeather>();
    const [history, setHistory] = useState<HistoricalWeather>();
    const [date, setDate] = useState(new Date());

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
            if (date) {
                axios
                    .get<string, AxiosResponse<HistoricalWeatherResponse>>(
                        `/history/${place}/${date.toISOString()}`
                    )
                    .then(res => {
                        setHistory(res.data.weather);
                    });
            }
        }
    }, [place, path, date]);

    useEffect(() => {
        if (weather && path === 'current') {
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
    }, [weather, path]);

    useEffect(() => {
        if (history && path === 'history') {
            setSun([
                {
                    icon: SunsetIcon,
                    value: history.sunset,
                },
                {
                    icon: SunriseIcon,
                    value: history.sunrise,
                },
            ]);
            setMoon([
                {
                    icon: MoonSetIcon,
                    value: history.moonset,
                },
                {
                    icon: MoonRiseIcon,
                    value: history.moonrise,
                },
                {
                    icon: getMoonIcon(history.moon),
                    value: history.moon,
                    reversed: true,
                },
            ]);
        }
    }, [history, path]);

    return {
        weather,
        air,
        temp,
        sun,
        moon,
        rain,
        wind,
        place,
        date,
        setDate,
        history,
    };
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
