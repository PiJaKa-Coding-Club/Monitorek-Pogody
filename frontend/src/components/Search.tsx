import { SearchIcon } from '../assets';
import {
    Icon,
    SearchIconWrapper,
    SearchInput,
    SearchWrapper,
} from './elements/Search';

export const Search = () => {
    return (
        <SearchWrapper>
            <SearchInput type="text" placeholder="Search" />
            <SearchIconWrapper>
                <Icon src={SearchIcon} alt="search" />
            </SearchIconWrapper>
        </SearchWrapper>
    );
};
