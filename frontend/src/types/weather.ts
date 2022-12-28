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

export type HistoricalWeather = {
    place: string;
    date: string;
    condition: WeatherCondition;
    pressure: { [key: number]: number };
    air_quality: { [key: number]: string };
    humidity: { [key: number]: number };
    visibility: { [key: number]: number };
    temp_feel: { [key: number]: number };
    temp_real: { [key: number]: number };
    sunset: string;
    sunrise: string;
    uv: { [key: number]: number };
    moonset: string;
    moonrise: string;
    moon: string;
    rain: { [key: number]: number };
    wind: { [key: number]: number };
    wind_direction: { [key: number]: string };
};

export type CurrentWeatherResponse = {
    weather: CurrentWeather;
};

export type HistoricalWeatherResponse = {
    weather: HistoricalWeather;
};
