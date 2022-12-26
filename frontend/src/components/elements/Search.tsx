import styled from 'styled-components';
import { black, searchHover, shadow, white } from '../../styles/colors/colors';
import { mainFont } from '../../styles/fonts';
import { StyledWeatherBox } from './WeatherBox';

export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    background: ${white};
    border-radius: 10px;
    padding: 5px 10px;
    width: 300px;
    border: 1px solid ${black};
    box-shadow: ${shadow};
    z-index: 5;
    position: relative;
`;

export const SearchInput = styled.input`
    flex: 1;
    background: none;
    border: none;
    outline: none;
    font-family: ${mainFont};
`;

export const SearchIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Icon = styled.img`
    width: 20px;
    height: 20px;
`;

export const Results = styled(StyledWeatherBox)`
    border: 1px solid black;
    position: absolute;
    top: 40px;
    width: 150px;
    margin: 0;
    z-index: 0;
    padding: 0;
`;

export const Result = styled.div`
    padding: 10px 20px;

    &:hover {
        background: ${searchHover};
        cursor: pointer;
    }
    &:first-child {
        padding-top: 20px;
    }
    &:last-child {
        border-radius: 0 0 10px 10px;
    }
`;
