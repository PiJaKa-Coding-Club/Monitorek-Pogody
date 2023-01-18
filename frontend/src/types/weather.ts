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

export type DataNumber = {
    date: string;
    value: number;
};

export type DataString = {
    date: string;
    value: number;
};

export type HistoricalWeather = {
    place: string;
    date: string;
    condition: WeatherCondition;
    pressure: DataNumber[];
    air_quality: DataString[];
    humidity: DataNumber[];
    visibility: DataNumber[];
    temp_feel: DataNumber[];
    temp_real: DataNumber[];
    sunset: string;
    sunrise: string;
    uv: DataNumber[];
    moonset: string;
    moonrise: string;
    moon: string;
    rain: DataNumber[];
    wind: DataNumber[];
    wind_direction: DataString[];
};

export type LiveWeather = {
    place: string;
    date: string;
    pressure: number;
    air_quality: string;
    humidity: number;
    visibility: number;
    temp_feel: number;
    temp_real: number;
    uv: number;
    rain: number;
    wind: number;
    wind_direction: string;
}

export type CurrentWeatherResponse = {
    weather: CurrentWeather;
};

export type HistoricalWeatherResponse = {
    weather: HistoricalWeather;
};

export type LiveWeatherResponse = {
    weather: LiveWeather;
};

