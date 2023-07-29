import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

const SearchForm = ({ route }) => {
    const [search, setSearch] = useState("");
    const { get } = useForm();

    const onSubmit = (e) => {
        e.preventDefault();
        get(`${route}?search=${search}`);
    };

    return (
        <form onSubmit={onSubmit} className="w-2/5">
            <input
                type="text"
                className="border border-gray-300 shadow text-gray-900 rounded-lg focus:border-blue-500 block w-full p-2.5"
                placeholder="Recherche..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    );
};

export default SearchForm;
