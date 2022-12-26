import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import { Header } from './components/Header';
import { CurrentWeather } from './Pages/CurrentWeather';
import { background } from './styles/colors/colors';

const StyledApp = styled.div`
    background-color: ${background};
    min-height: 100vh;
`;

function App() {
    return (
        <StyledApp className="App">
            <Header />
            <CurrentWeather />
        </StyledApp>
    );
}

export default App;
