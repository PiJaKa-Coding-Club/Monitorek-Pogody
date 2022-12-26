import { SearchIcon } from '../assets';
import { useSearch } from '../hooks/useSearch';
import {
    Icon,
    Result,
    Results,
    SearchIconWrapper,
    SearchInput,
    SearchWrapper,
} from './elements/Search';

export const Search = () => {
    const { search, setSearch, results, onSelect } = useSearch();
    return (
        <>
            <SearchWrapper>
                <SearchInput
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <SearchIconWrapper>
                    <Icon src={SearchIcon} alt="search" />
                </SearchIconWrapper>
            </SearchWrapper>
            {results.length > 0 && (
                <Results>
                    {results.map((result, index) => {
                        return (
                            <Result
                                key={index}
                                onClick={() => onSelect(result)}
                            >
                                <span>{result}</span>
                            </Result>
                        );
                    })}
                </Results>
            )}

            {!results.length && search && (
                <Results>
                    <Result style={{ background: '#f00' }}>
                        <span>No results</span>
                    </Result>
                </Results>
            )}
        </>
    );
};
