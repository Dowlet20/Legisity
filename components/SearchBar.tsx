"use client"
import React, { useState, ChangeEvent, MouseEvent } from 'react';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>(['apple', 'banana', 'cherry', 'date', 'fig', 'grape']);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const data: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape'];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value) {
            const filteredSuggestions = data.filter(item =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        setShowDropdown(false);
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                onBlur={() => setShowDropdown(false)}
                onFocus={() => query && setShowDropdown(true)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:outline-none"
                placeholder="Gözleg..."
            />
            {showDropdown && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;