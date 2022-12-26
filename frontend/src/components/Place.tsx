import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    CloudyIcon,
    PartiallySunnyIcon,
    RainyIcon,
    SnowyIcon,
    StormyIcon,
    SunnyIcon,
    TornadoIcon,
    WindyIcon,
} from '../assets';
import { shadow, weatherColors } from '../styles/colors/colors';
import { WeatherCondition } from '../types/weather';

const StyledPlace = styled.div`
    border: 1px solid black;
    width: calc(100% - 20px);
    align-self: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: ${weatherColors[WeatherCondition.Sunny]};
    box-shadow: ${shadow};
`;

const Icon = styled.img`
    width: 50px;
    height: 50px;
`;

const StyledPlaceName = styled.h1``;

type Props = {
    name: string;
    condition: WeatherCondition;
};

export const Place: FC<Props> = ({ name, condition }) => {
    const [icon, setIcon] = useState<string>(SunnyIcon);

    useEffect(() => {
        switch (condition) {
            case WeatherCondition.Sunny:
                setIcon(SunnyIcon);
                break;
            case WeatherCondition.PartiallySunny:
                setIcon(PartiallySunnyIcon);
                break;
            case WeatherCondition.Cloudy:
                setIcon(CloudyIcon);
                break;
            case WeatherCondition.Rainy:
                setIcon(RainyIcon);
                break;
            case WeatherCondition.Snowy:
                setIcon(SnowyIcon);
                break;
            case WeatherCondition.Stormy:
                setIcon(StormyIcon);
                break;
            case WeatherCondition.Tornado:
                setIcon(TornadoIcon);
                break;
            case WeatherCondition.Windy:
                setIcon(WindyIcon);
                break;
            default:
                setIcon(SunnyIcon);
                break;
        }
    }, []);

    return (
        <StyledPlace
            style={{
                backgroundColor: weatherColors[condition],
            }}
        >
            <StyledPlaceName>{name}</StyledPlaceName>

            <Icon src={icon} />
        </StyledPlace>
    );
};
