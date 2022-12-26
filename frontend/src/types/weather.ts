export enum WeatherCondition {
    Sunny = 'sunny',
    PartiallySunny = 'partiallysunny',
    Cloudy = 'cloudy',
    Rainy = 'rainy',
    Snowy = 'snowy',
    Stormy = 'stormy',
    Tornado = 'tornado',
    Windy = 'windy',
}

export type IconValueUnit = {
    icon: string;
    value: string | number;
    unit?: string;
    reversed?: boolean;
};

export type CurrentWeather = {
    place: string;
    condition: WeatherCondition;
    pressure: number;
    air_quality: string;
    humidity: number;
    visibility: number;
    temp_feel: number;
    temp_real: number;
    sunset: string;
    sunrise: string;
    uv: number;
    moonset: string;
    moonrise: string;
    moon: string;
    rain: number;
    wind: number;
    wind_direction: string;
};

export type CurrentWeatherResponse = {
    weather: CurrentWeather;
};
