import styled from 'styled-components';
import './App.css';
import { Header } from './components/Header';
import { CurrentWeather } from './Pages/CurrentWeather';
import { background } from './styles/colors/colors';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HistoryWeather } from './Pages/HistoryWeather';
import { LiveWeather } from './Pages/LiveWeather';

const StyledApp = styled.div`
    background-color: ${background};
    min-height: 100vh;
`;

function App() {
    return (
        <StyledApp className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Navigate replace to="/current" />} />
                <Route path="/current" element={<CurrentWeather />} />
                <Route path="/history" element={<HistoryWeather />} />
                <Route path="/live" element={<LiveWeather />} />
            </Routes>
        </StyledApp>
    );
}

export default App;
