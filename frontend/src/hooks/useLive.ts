import useWebSocket from 'react-use-websocket';
import { useState } from 'react';
import { LiveWeather } from '../types/weather';
const WS_URL = 'ws://127.0.0.1:8000';


export const useLive = () => {
    const [place, setPlace] = useState<string | null>(localStorage.getItem('place') || null);
    const [data, setData] = useState<LiveWeather>();

    useWebSocket(WS_URL, {
        onOpen: () => {
          console.log('WebSocket connection established.');
        },
        onMessage: (event) => {
            setData(JSON.parse(event.data).weather);
        }
      });

    return {
        liveData: data,
    }
}