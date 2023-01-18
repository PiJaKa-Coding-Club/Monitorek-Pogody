import { FC, useEffect, useMemo, useState, useCallback } from 'react';
import { DataString, DataNumber } from '../types/weather';
import { Icon, StyledWeatherBox } from './elements/WeatherBox';
import { Chart, AxisOptions, TooltipOptions } from 'react-charts';

// I know I can do better type but why ? XD
type Props = {
    label1: string;
    data1: DataNumber[];
    icons: string[];
    label2?: string;
    data2?: DataNumber[] | DataString[];
    unit?: string;
};

type MyDatum = { date: Date; value: number };

export const ChartBox: FC<Props> = ({
    data1,
    label1,
    data2,
    label2,
    icons,
    unit,
}) => {

    const [data, setData] = useState(() => {
        const mappedData1: MyDatum[] = data1
            .map(o => {
                return {
                    ...o,
                    date: new Date(o.date),
                };
            })
            .sort((a, b) => {
                return a.date.getHours() - b.date.getHours();
            })
            .slice(1);

        let initial = [
            {
                label: label1,
                data: mappedData1,
            },
        ];

        if (data2?.length && label2 && typeof data2[0].value === 'number') {
            const mappedData2 = data2
                .map(o => {
                    return {
                        ...o,
                        date: new Date(o.date),
                    };
                })
                .sort((a, b) => {
                    return a.date.getHours() - b.date.getHours();
                })
                .slice(1);

            initial.push({
                label: label2,
                data: mappedData2,
            });
        }

        return initial;
    });

    useEffect(() => {
        const mappedData1: MyDatum[] = data1
        .map(o => {
            return {
                ...o,
                date: new Date(o.date),
            };
        })
        .sort((a, b) => {
            return a.date.getHours() - b.date.getHours();
        })
        .slice(1);

    let initial = [
        {
            label: label1,
            data: mappedData1,
        },
    ];

    if (data2?.length && label2 && typeof data2[0].value === 'number') {
        const mappedData2 = data2
            .map(o => {
                return {
                    ...o,
                    date: new Date(o.date),
                };
            })
            .sort((a, b) => {
                return a.date.getHours() - b.date.getHours();
            })
            .slice(1);

        initial.push({
            label: label2,
            data: mappedData2,
        });
    }

     setData(initial);
    }, [data1, data2])

    const primaryAxis = useMemo(
        (): AxisOptions<MyDatum> => ({
            getValue: datum =>
                `${datum.date
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${datum.date
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}`,
        }),
        [data]
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<MyDatum>[] => [
            {
                getValue: datum => datum.value,
                elementType: 'line',
            },
        ],
        [data]
    );
    const tooltip = useMemo(
        (): TooltipOptions<MyDatum> => ({
            groupingMode: 'single',
        }),
        []
    );

    const render =  useCallback(() => {
        return <Chart
        options={{
            data,
            primaryAxis,
            secondaryAxes,
            tooltip,
        }}
    />
    },[data])

    return (
        <StyledWeatherBox
            style={{
                height: '200px',
                display: 'flex',
                padding: 0,
                position: 'relative',
                flexDirection: 'row',
            }}
        >
            {unit && (
                <div
                    style={{
                        position: 'absolute',
                        fontSize: 15,
                        left: 0,
                        top: 10,
                        color: 'black',
                        zIndex: 15,
                        fontWeight: 'bold',
                    }}
                >
                    [{unit}]
                </div>
            )}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}
            >
                {icons?.map((icon, idx) => (
                    <Icon
                        src={icon}
                        style={{ width: '30px', height: '30px' }}
                        key={idx}
                    />
                ))}
            </div>
            <div style={{ width: '100%' }}>
            {render()}
            </div>
        </StyledWeatherBox>
    );
};
