import { FC, useEffect, useMemo, useState } from 'react';
import { DataString, DataNumber } from '../types/weather';
import { Icon, StyledWeatherBox } from './elements/WeatherBox';
import { Chart, AxisOptions, TooltipOptions } from 'react-charts';

// I know I can do better type but why ? XD
type Props = {
    label1: string
    data1: DataNumber[];
    icons: string[];
    label2?: string 
    data2?: DataNumber[] | DataString[];
};

type MyDatum = { date: Date; value: number };

export const ChartBox: FC<Props> = ({ data1, label1, data2, label2, icons }) => {

    const [data, _] = useState(() => {

        const mappedData1: MyDatum[] = data1.map(o => {
            return {
                ...o,
                date: new Date(o.date)
            }
        }).sort((a,b)=>{
            return a.date.getHours() - b.date.getHours()
        }).slice(1)

        let initial = [{
            label: label1,
            data: mappedData1
        }];

        if(data2?.length && label2 && typeof data2[0].value === 'number'){
            const mappedData2 = data2.map(o => {
                return {
                    ...o,
                    date: new Date(o.date)
                }
            }).sort((a,b)=>{
                return a.date.getHours() - b.date.getHours()
            }).slice(1)

            initial.push(
                {
                    label: label2,
                    data: mappedData2,
                }
            )
        }

        return initial;
    })

    useEffect(()=>{
        console.log(data)
    })

    const primaryAxis = useMemo(
        (): AxisOptions<MyDatum> => ({
            getValue: datum => `${datum.date.getHours().toString().padStart(2,'0')}:${datum.date.getMinutes().toString().padStart(2,'0')}`,
        }),
        []
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<MyDatum>[] => [
            {
                getValue: datum => datum.value,
                elementType: 'line',
            },
        ],
        []
    );
    const tooltip = useMemo(
        (): TooltipOptions<MyDatum> => ({
            groupingMode: 'single',
        }),
        []
    );

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
                <Chart
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,
                        tooltip,
                    }}
                />
            </div>
        </StyledWeatherBox>
    );
};
