import styled from 'styled-components';
import { black, shadow, white } from '../../styles/colors/colors';
import { mainFont } from '../../styles/fonts';

export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${white};
    border-radius: 10px;
    padding: 5px 10px;
    width: 300px;
    border: 1px solid ${black};
    box-shadow: ${shadow};
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
