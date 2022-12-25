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
