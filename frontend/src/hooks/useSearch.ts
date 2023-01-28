import axios from 'axios';
import { useEffect, useState } from 'react';

export const useSearch = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<string[]>([]);

    useEffect(() => {
        if (search && search.length > 2) {
            axios.get(`http://127.0.0.1:8000/cities/${search}`).then(res => {
                console.log(res)
                setResults(res.data.cities.slice(0, 3));
            });
        }
    }, [search]);

    const onSelect = (city: string) => {
        localStorage.setItem('place', city);
        window.location.reload();
    };

    return { search, setSearch, results, onSelect };
};
