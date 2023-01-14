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

function rand(min: number, max: number) {
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
                    humidity: rand(20, 70),
                    visibility: 10,
                    temp_feel: rand(20, 30),
                    temp_real: rand(20, 30),
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
            const dateObj = new Date(date);


            const day = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // padStart to add leading zero
            const year = dateObj.getFullYear();

            const hours: string[] = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

            const qualities: string[] = ['bardzo dobre', 'dobre', 'umiarkowane', 'złe', 'bardzo złe'];
            const windDirections: string[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

            return {
                weather: {
                    place: place,
                    date: date,
                    condition: 'rainy', //historical condition (average of day)
                    pressure: [
                        ...hours.map(hour => {
                            return {date: `${year}-${month}-${day}T${hour}:00:00.000Z`, value: rand(998, 1020)}
                        })
                    ],
                    air_quality: [
                        ...hours.map(hour => {
                            return {date: `${year}-${month}-${day}T${hour}:00:00.000Z`, value: qualities[rand(0, qualities.length)]}
                        })
                    ],
                    humidity: [
                        ...hours.map(hour => {
                            return {date: `${year}-${month}-${day}T${hour}:00:00.000Z`, value: rand(30, 55)}
                        })
                    ],
                    visibility: [
                        ...hours.map(hour => {
                            return {date: `${year}-${month}-${day}T${hour}:00:00.000Z`, value: rand(30, 55)}
                        })
                    ],
                    temp_feel: [
                        ...hours.map(hour => {
                            return {date: `${year}-${month}-${day}T${hour}:00:00.000Z`, value: rand(12, 23)}
                        })
                    ],
                    temp_real: [
                        ...hours.map(hour => {
                            return {date: `${year}-${month}-${day}T${hour}:00:00.000Z`, value: rand(12, 22)}
                        })
                    ],
                    sunset: `${year}-${month}-${day}T22:21:00.000Z`,
                    sunrise: `${year}-${month}-${day}T22:21:00.000Z`,
                    uv: [
                        ...hours.map(hour => {
                            return {date: `${year}-${month}-${day}T${hour}:00:00.000Z`, value: rand(1, 6)}
                        })
                    ],
                    moonset: `${year}-${month}-${day}T22:21:00.000Z`, //hour is variable
                    moonrise: `${year}-${month}-${day}T06:00:00.000Z`,//hour is variable
                    moon: 'pełnia',
                    rain: [
                        ...hours.map(hour => {
                            return {date: `${year}-${month}-${day}T${hour}:00:00.000Z`, value: rand(10, 14)}
                        })
                    ],
                    wind: [
                        ...hours.map(hour => {
                            return {date: `${year}-${month}-${day}T${hour}:00:00.000Z`, value: rand(2, 6)}
                        })
                    ],
                    wind_direction: [
                        ...hours.map(hour => {
                            return {date: `${year}-${month}-${day}T${hour}:00:00.000Z`, value: windDirections[rand(0, windDirections.length)]}
                        })
                    ],
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
                        console.log(res.data.weather);
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
