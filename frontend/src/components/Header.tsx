import styled from 'styled-components';
import { header, shadow } from '../styles/colors/colors';
import { Wrapper } from './elements/Wrapper';
import { Search } from './Search';

const StyledHeader = styled.div`
    background-color: ${header};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: ${shadow};
    height: 80px;
`;

const StyledContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Header = () => {
    return (
        <StyledHeader>
            <Wrapper>
                <StyledContent>
                    <h1>Monitorek Pogody</h1>
                    <div>
                        <Search />
                    </div>
                </StyledContent>
            </Wrapper>
        </StyledHeader>
    );
};
