import { Icon, StyledWeatherBox } from "../components/elements/WeatherBox"
import { WarningIcon } from "../assets"
import { StyledButton as BaseButton } from "../components/NavigatorTab";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled(BaseButton)`
    margin: 20px;
`

export const PageNotFound = () => {
    const navigate = useNavigate();
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
                <StyledWeatherBox style={{
            maxWidth: '300px',
        }}>
            <Icon src={WarningIcon} style={{width:'100px', height:'100px'}}/>
            <h1>404</h1>
            </StyledWeatherBox>
        <h1>Zgubiłeś się?</h1>
        <p>Wskazana strona nie istnieje. Wróć na poprzednią stronę lub skorzystaj z nawigacji.</p>
        <StyledWeatherBox style={{
            maxWidth: '1000px',
            display: 'flex',
            flexDirection:'row',
        }}>
            <StyledButton
                onClick={() => {
                    navigate('/current');
                }}
            >
                Aktualna Pogoda
            </StyledButton>

            <StyledButton
                onClick={() => {
                    navigate('/history');
                }}
            >
                Dane Historyczne
            </StyledButton>

            <StyledButton
           
                onClick={() => {
                    navigate('/live');
                }} 
                badge
            >
                Pogoda na żywo
            </StyledButton>
            
            </StyledWeatherBox>
    </div>
}