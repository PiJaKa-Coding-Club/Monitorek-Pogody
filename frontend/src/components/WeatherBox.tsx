import { FC } from 'react';
import { IconValueUnit } from '../types/weather';
import {
    Icon,
    StyledWeatherBox,
    Value,
    WeatherRow,
} from './elements/WeatherBox';

type Props = {
    data: IconValueUnit[];
};

export const WeatherBox: FC<Props> = ({ data }) => {
    return (
        <StyledWeatherBox>
            {data.map((item, index) => (
                <WeatherRow key={index} reversed={!!item.reversed}>
                    <Value>
                        <Icon src={item.icon} />
                    </Value>
                    <Value>
                        <p>{`${item.value} ${item.unit ?? ''}`}</p>
                    </Value>
                </WeatherRow>
            ))}
        </StyledWeatherBox>
    );
};
