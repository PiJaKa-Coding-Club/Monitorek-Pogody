# API

## Endpointy:

- GET /current/:place
- GET /history/:place/:dateISO
- GET /cities/:q

- WEBSOCKET

dateISO format: '2023-01-19T15:32:34.582Z' - 'YYYY-MM-DDTHH:MM:SS.SSSZ'

### GET /current/:place

```
Response:
{
    weather: {
        place: string;
        condition: WeatherConditionENUM;
        pressure: number;
        air_quality: AirQualityENUM;
        humidity: number;
        visibility: number;
        temp_feel: number;
        temp_real: number;
        sunset: string (date ISO);
        sunrise: string (date ISO);
        uv: number;
        moonset: string (date ISO);
        moonrise: string (date ISO);
        moon: MoonPhaseENUM;
        rain: number;
        wind: number;
        wind_direction: WindDirectionENUM;
    }
}
- number = integer, not Float <3
- WeatherConditionENUM
enum WeatherCondition {
    Sunny = 'sunny',
    PartiallySunny = 'partiallysunny',
    Cloudy = 'cloudy',
    Rainy = 'rainy',
    Snowy = 'snowy',
    Stormy = 'stormy',
    Tornado = 'tornado',
    Windy = 'windy',
}

- AirQualityENUM Po polsku! dobre/złe itd jak w pierwszym etapie (diagram domeny)

- MoonPhaseENUM Po polsku! pełnia, nów itd jak w pierwszym etapie (diagram domeny)

- WindDirectionENUM! N,S,E,SW itd jak w pierwszym etapie (diagram domeny)


Response example:
/current/Wrocław
{
    "weather": {
        "place": "Wrocław",
        "condition": "rainy",
        "pressure": 1012,
        "air_quality": "dobre",
        "humidity": 40,
        "visibility": 10,
        "temp_feel": 22,
        "temp_real": 28,
        "sunset": "2022-12-12T22:21:00.000Z",
        "sunrise": "2022-12-12T22:21:00.000Z",
        "uv": 1,
        "moonset": "2022-12-12T22:21:00.000Z",
        "moonrise": "2022-12-12T22:21:00.000Z",
        "moon": "pełnia",
        "rain": 20,
        "wind": 20,
        "wind_direction": "SW"
    }
}
```

### GET /cities/:q

```
Response:
{
    cities: string[];
}

Response example:
{
    cities: ['Wrocław' 'Wronki', 'Milanówek']
}
```

### GET /history/:place/:dateISO

```
Response:
{
    weather: {
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
    }
}

CUSTOM TYPES:
export type DataNumber = {
    date: string;
    value: number;
};

export type DataString = {
    date: string;
    value: number;
};

INSTRUKCJA IMPLEMENTACJI:
- jeśli pobierasz dane historyczne z dzisiaj o godzinie 17:20, w tablicy nie moga istniec dane z godziny 20 -
ucinaj te dane przy generowaniu losowym i niech ostatnia godzina będzię godzina 17:00 wtedy

Response example:
{
    "weather": {
        "place": "Wrocław",
        "date": "2023-01-19T15:42:14.311Z",
        "condition": "rainy",
        "pressure": [
            {
                "date": "2023-01-01T00:00:00.000Z",
                "value": 1006
            },
            {
                "date": "2023-01-01T01:00:00.000Z",
                "value": 1003
            },
            {
                "date": "2023-01-01T02:00:00.000Z",
                "value": 1004
            },
            {
                "date": "2023-01-01T03:00:00.000Z",
                "value": 1019
            },
            {
                "date": "2023-01-01T04:00:00.000Z",
                "value": 1002
            },
            {
                "date": "2023-01-01T05:00:00.000Z",
                "value": 1011
            },
            {
                "date": "2023-01-01T06:00:00.000Z",
                "value": 1010
            },
            {
                "date": "2023-01-01T07:00:00.000Z",
                "value": 1017
            },
            {
                "date": "2023-01-01T08:00:00.000Z",
                "value": 1009
            },
            {
                "date": "2023-01-01T09:00:00.000Z",
                "value": 1012
            },
            {
                "date": "2023-01-01T10:00:00.000Z",
                "value": 1010
            },
            {
                "date": "2023-01-01T11:00:00.000Z",
                "value": 1014
            },
            {
                "date": "2023-01-01T12:00:00.000Z",
                "value": 1010
            },
            {
                "date": "2023-01-01T13:00:00.000Z",
                "value": 1012
            },
            {
                "date": "2023-01-01T14:00:00.000Z",
                "value": 1001
            },
            {
                "date": "2023-01-01T15:00:00.000Z",
                "value": 999
            }
        ],
        "air_quality": [
            {
                "date": "2023-01-01T00:00:00.000Z",
                "value": "bardzo złe"
            },
            {
                "date": "2023-01-01T01:00:00.000Z",
                "value": "dobre"
            },
            {
                "date": "2023-01-01T02:00:00.000Z",
                "value": "umiarkowane"
            },
            {
                "date": "2023-01-01T03:00:00.000Z",
                "value": "dobre"
            },
            {
                "date": "2023-01-01T04:00:00.000Z",
                "value": "złe"
            },
            {
                "date": "2023-01-01T05:00:00.000Z",
                "value": "dobre"
            },
            {
                "date": "2023-01-01T06:00:00.000Z",
                "value": "bardzo dobre"
            },
            {
                "date": "2023-01-01T07:00:00.000Z",
                "value": "dobre"
            },
            {
                "date": "2023-01-01T08:00:00.000Z",
                "value": "bardzo złe"
            },
            {
                "date": "2023-01-01T09:00:00.000Z",
                "value": "bardzo złe"
            },
            {
                "date": "2023-01-01T10:00:00.000Z",
                "value": "bardzo złe"
            },
            {
                "date": "2023-01-01T11:00:00.000Z",
                "value": "umiarkowane"
            },
            {
                "date": "2023-01-01T12:00:00.000Z",
                "value": "dobre"
            },
            {
                "date": "2023-01-01T13:00:00.000Z",
                "value": "umiarkowane"
            },
            {
                "date": "2023-01-01T14:00:00.000Z",
                "value": "bardzo dobre"
            },
            {
                "date": "2023-01-01T15:00:00.000Z",
                "value": "dobre"
            }
        ],
        "humidity": [
            {
                "date": "2023-01-01T00:00:00.000Z",
                "value": 49
            },
            {
                "date": "2023-01-01T01:00:00.000Z",
                "value": 47
            },
            {
                "date": "2023-01-01T02:00:00.000Z",
                "value": 32
            },
            {
                "date": "2023-01-01T03:00:00.000Z",
                "value": 33
            },
            {
                "date": "2023-01-01T04:00:00.000Z",
                "value": 41
            },
            {
                "date": "2023-01-01T05:00:00.000Z",
                "value": 45
            },
            {
                "date": "2023-01-01T06:00:00.000Z",
                "value": 47
            },
            {
                "date": "2023-01-01T07:00:00.000Z",
                "value": 34
            },
            {
                "date": "2023-01-01T08:00:00.000Z",
                "value": 48
            },
            {
                "date": "2023-01-01T09:00:00.000Z",
                "value": 30
            },
            {
                "date": "2023-01-01T10:00:00.000Z",
                "value": 53
            },
            {
                "date": "2023-01-01T11:00:00.000Z",
                "value": 49
            },
            {
                "date": "2023-01-01T12:00:00.000Z",
                "value": 44
            },
            {
                "date": "2023-01-01T13:00:00.000Z",
                "value": 39
            },
            {
                "date": "2023-01-01T14:00:00.000Z",
                "value": 52
            },
            {
                "date": "2023-01-01T15:00:00.000Z",
                "value": 32
            }
        ],
        "visibility": [
            {
                "date": "2023-01-01T00:00:00.000Z",
                "value": 39
            },
            {
                "date": "2023-01-01T01:00:00.000Z",
                "value": 41
            },
            {
                "date": "2023-01-01T02:00:00.000Z",
                "value": 48
            },
            {
                "date": "2023-01-01T03:00:00.000Z",
                "value": 32
            },
            {
                "date": "2023-01-01T04:00:00.000Z",
                "value": 49
            },
            {
                "date": "2023-01-01T05:00:00.000Z",
                "value": 46
            },
            {
                "date": "2023-01-01T06:00:00.000Z",
                "value": 47
            },
            {
                "date": "2023-01-01T07:00:00.000Z",
                "value": 43
            },
            {
                "date": "2023-01-01T08:00:00.000Z",
                "value": 33
            },
            {
                "date": "2023-01-01T09:00:00.000Z",
                "value": 50
            },
            {
                "date": "2023-01-01T10:00:00.000Z",
                "value": 53
            },
            {
                "date": "2023-01-01T11:00:00.000Z",
                "value": 47
            },
            {
                "date": "2023-01-01T12:00:00.000Z",
                "value": 34
            },
            {
                "date": "2023-01-01T13:00:00.000Z",
                "value": 47
            },
            {
                "date": "2023-01-01T14:00:00.000Z",
                "value": 34
            },
            {
                "date": "2023-01-01T15:00:00.000Z",
                "value": 43
            }
        ],
        "temp_feel": [
            {
                "date": "2023-01-01T00:00:00.000Z",
                "value": 19
            },
            {
                "date": "2023-01-01T01:00:00.000Z",
                "value": 15
            },
            {
                "date": "2023-01-01T02:00:00.000Z",
                "value": 21
            },
            {
                "date": "2023-01-01T03:00:00.000Z",
                "value": 13
            },
            {
                "date": "2023-01-01T04:00:00.000Z",
                "value": 13
            },
            {
                "date": "2023-01-01T05:00:00.000Z",
                "value": 20
            },
            {
                "date": "2023-01-01T06:00:00.000Z",
                "value": 13
            },
            {
                "date": "2023-01-01T07:00:00.000Z",
                "value": 20
            },
            {
                "date": "2023-01-01T08:00:00.000Z",
                "value": 19
            },
            {
                "date": "2023-01-01T09:00:00.000Z",
                "value": 21
            },
            {
                "date": "2023-01-01T10:00:00.000Z",
                "value": 18
            },
            {
                "date": "2023-01-01T11:00:00.000Z",
                "value": 14
            },
            {
                "date": "2023-01-01T12:00:00.000Z",
                "value": 13
            },
            {
                "date": "2023-01-01T13:00:00.000Z",
                "value": 16
            },
            {
                "date": "2023-01-01T14:00:00.000Z",
                "value": 22
            },
            {
                "date": "2023-01-01T15:00:00.000Z",
                "value": 15
            }
        ],
        "temp_real": [
            {
                "date": "2023-01-01T00:00:00.000Z",
                "value": 14
            },
            {
                "date": "2023-01-01T01:00:00.000Z",
                "value": 19
            },
            {
                "date": "2023-01-01T02:00:00.000Z",
                "value": 16
            },
            {
                "date": "2023-01-01T03:00:00.000Z",
                "value": 16
            },
            {
                "date": "2023-01-01T04:00:00.000Z",
                "value": 13
            },
            {
                "date": "2023-01-01T05:00:00.000Z",
                "value": 16
            },
            {
                "date": "2023-01-01T06:00:00.000Z",
                "value": 20
            },
            {
                "date": "2023-01-01T07:00:00.000Z",
                "value": 13
            },
            {
                "date": "2023-01-01T08:00:00.000Z",
                "value": 14
            },
            {
                "date": "2023-01-01T09:00:00.000Z",
                "value": 12
            },
            {
                "date": "2023-01-01T10:00:00.000Z",
                "value": 21
            },
            {
                "date": "2023-01-01T11:00:00.000Z",
                "value": 20
            },
            {
                "date": "2023-01-01T12:00:00.000Z",
                "value": 13
            },
            {
                "date": "2023-01-01T13:00:00.000Z",
                "value": 14
            },
            {
                "date": "2023-01-01T14:00:00.000Z",
                "value": 12
            },
            {
                "date": "2023-01-01T15:00:00.000Z",
                "value": 18
            }
        ],
        "sunset": "2023-01-01T22:21:00.000Z",
        "sunrise": "2023-01-01T22:21:00.000Z",
        "uv": [
            {
                "date": "2023-01-01T00:00:00.000Z",
                "value": 1
            },
            {
                "date": "2023-01-01T01:00:00.000Z",
                "value": 4
            },
            {
                "date": "2023-01-01T02:00:00.000Z",
                "value": 3
            },
            {
                "date": "2023-01-01T03:00:00.000Z",
                "value": 4
            },
            {
                "date": "2023-01-01T04:00:00.000Z",
                "value": 5
            },
            {
                "date": "2023-01-01T05:00:00.000Z",
                "value": 3
            },
            {
                "date": "2023-01-01T06:00:00.000Z",
                "value": 4
            },
            {
                "date": "2023-01-01T07:00:00.000Z",
                "value": 5
            },
            {
                "date": "2023-01-01T08:00:00.000Z",
                "value": 2
            },
            {
                "date": "2023-01-01T09:00:00.000Z",
                "value": 1
            },
            {
                "date": "2023-01-01T10:00:00.000Z",
                "value": 5
            },
            {
                "date": "2023-01-01T11:00:00.000Z",
                "value": 3
            },
            {
                "date": "2023-01-01T12:00:00.000Z",
                "value": 1
            },
            {
                "date": "2023-01-01T13:00:00.000Z",
                "value": 1
            },
            {
                "date": "2023-01-01T14:00:00.000Z",
                "value": 4
            },
            {
                "date": "2023-01-01T15:00:00.000Z",
                "value": 4
            }
        ],
        "moonset": "2023-01-01T22:21:00.000Z",
        "moonrise": "2023-01-01T06:00:00.000Z",
        "moon": "pełnia",
        "rain": [
            {
                "date": "2023-01-01T00:00:00.000Z",
                "value": 12
            },
            {
                "date": "2023-01-01T01:00:00.000Z",
                "value": 10
            },
            {
                "date": "2023-01-01T02:00:00.000Z",
                "value": 13
            },
            {
                "date": "2023-01-01T03:00:00.000Z",
                "value": 10
            },
            {
                "date": "2023-01-01T04:00:00.000Z",
                "value": 11
            },
            {
                "date": "2023-01-01T05:00:00.000Z",
                "value": 11
            },
            {
                "date": "2023-01-01T06:00:00.000Z",
                "value": 11
            },
            {
                "date": "2023-01-01T07:00:00.000Z",
                "value": 12
            },
            {
                "date": "2023-01-01T08:00:00.000Z",
                "value": 12
            },
            {
                "date": "2023-01-01T09:00:00.000Z",
                "value": 12
            },
            {
                "date": "2023-01-01T10:00:00.000Z",
                "value": 10
            },
            {
                "date": "2023-01-01T11:00:00.000Z",
                "value": 10
            },
            {
                "date": "2023-01-01T12:00:00.000Z",
                "value": 11
            },
            {
                "date": "2023-01-01T13:00:00.000Z",
                "value": 12
            },
            {
                "date": "2023-01-01T14:00:00.000Z",
                "value": 13
            },
            {
                "date": "2023-01-01T15:00:00.000Z",
                "value": 12
            }
        ],
        "wind": [
            {
                "date": "2023-01-01T00:00:00.000Z",
                "value": 4
            },
            {
                "date": "2023-01-01T01:00:00.000Z",
                "value": 4
            },
            {
                "date": "2023-01-01T02:00:00.000Z",
                "value": 2
            },
            {
                "date": "2023-01-01T03:00:00.000Z",
                "value": 3
            },
            {
                "date": "2023-01-01T04:00:00.000Z",
                "value": 3
            },
            {
                "date": "2023-01-01T05:00:00.000Z",
                "value": 5
            },
            {
                "date": "2023-01-01T06:00:00.000Z",
                "value": 5
            },
            {
                "date": "2023-01-01T07:00:00.000Z",
                "value": 3
            },
            {
                "date": "2023-01-01T08:00:00.000Z",
                "value": 5
            },
            {
                "date": "2023-01-01T09:00:00.000Z",
                "value": 5
            },
            {
                "date": "2023-01-01T10:00:00.000Z",
                "value": 5
            },
            {
                "date": "2023-01-01T11:00:00.000Z",
                "value": 3
            },
            {
                "date": "2023-01-01T12:00:00.000Z",
                "value": 2
            },
            {
                "date": "2023-01-01T13:00:00.000Z",
                "value": 3
            },
            {
                "date": "2023-01-01T14:00:00.000Z",
                "value": 3
            },
            {
                "date": "2023-01-01T15:00:00.000Z",
                "value": 4
            }
        ],
        "wind_direction": [
            {
                "date": "2023-01-01T00:00:00.000Z",
                "value": "N"
            },
            {
                "date": "2023-01-01T01:00:00.000Z",
                "value": "E"
            },
            {
                "date": "2023-01-01T02:00:00.000Z",
                "value": "NE"
            },
            {
                "date": "2023-01-01T03:00:00.000Z",
                "value": "N"
            },
            {
                "date": "2023-01-01T04:00:00.000Z",
                "value": "SW"
            },
            {
                "date": "2023-01-01T05:00:00.000Z",
                "value": "S"
            },
            {
                "date": "2023-01-01T06:00:00.000Z",
                "value": "NE"
            },
            {
                "date": "2023-01-01T07:00:00.000Z",
                "value": "SW"
            },
            {
                "date": "2023-01-01T08:00:00.000Z",
                "value": "S"
            },
            {
                "date": "2023-01-01T09:00:00.000Z",
                "value": "NE"
            },
            {
                "date": "2023-01-01T10:00:00.000Z",
                "value": "SE"
            },
            {
                "date": "2023-01-01T11:00:00.000Z",
                "value": "W"
            },
            {
                "date": "2023-01-01T12:00:00.000Z",
                "value": "SE"
            },
            {
                "date": "2023-01-01T13:00:00.000Z",
                "value": "NW"
            },
            {
                "date": "2023-01-01T14:00:00.000Z",
                "value": "S"
            },
            {
                "date": "2023-01-01T15:00:00.000Z",
                "value": "NW"
            }
        ]
    }
}
```

### WEBSOCKET

Miałem problem z wysłaniem obiektu ale mozna wysylac stringa w taki sposób:

```
wysyłaj do klientów co 10 sekund:

JSON.stringify({
    weather: {
        place: "COS TUTAJ WSTAW",
        date: stringISO,
        pressure: number,
        air_quality: string,
        humidity: number,
        visibility: number,
        temp_feel: number,
        temp_real: number,
        uv: number,
        rain: number,
        wind: number,
        wind_direction: 'SW',
    },
})
```

## Wskazówki do szukania w plikach

Implementacja Mocku API jest w pliku:
/frontend/src/hooks/useWeather.ts od linii 36, metoda createServer

WebSocket Server w pliku:
/frontend/src/websocketServer.js
