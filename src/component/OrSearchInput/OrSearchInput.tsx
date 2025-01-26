import React, { ChangeEvent, useEffect, useRef, useState, useMemo } from "react";
import './OrSearchInput.scss';
import SearchIcon from '../../assets/icons/search.svg';
import axios from 'axios';
import OrButton from "../OrButton/OrButton";
import Icon from '../../assets/Icon';

interface OrSearchInputProps {
    onClick?: () => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const OrSearchInput: React.FC<OrSearchInputProps> = ({
    onClick,
    onChange,
    placeholder = 'Enter your text',
    disabled = false,
    size = 'md',
}) => {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<{ [key: string]: string[] }>({});
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Fetch suggestions from API
    useEffect(() => {
        const fetchSuggestions = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get('https://orbit-beta.s3.ir-thr-at1.arvanstorage.ir/IconList.json');
                const jsonSuggestions = response.data;

                const groupedSuggestions: { [key: string]: string[] } = {};

                Object.keys(jsonSuggestions).forEach(key => {
                    groupedSuggestions[key] = jsonSuggestions[key];
                });

                setSuggestions(groupedSuggestions);
            } catch (err) {
                setError('Failed to load suggestions. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuggestions();
    }, []);

    // Function to remove numbers, replace hyphens with spaces, and trim extra spaces
const removeNumbersAndHyphens = (str: string) => {
    return str
        .replace(/[\d]/g, '') // Remove numbers
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .trim(); // Trim leading and trailing spaces
};

// Function to bold the matched part of the suggestion
const boldMatchedText = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? <strong key={index}>{part}</strong> : part
    );
};

// Filtered suggestions based on input value for both key and value
const filteredSuggestions = useMemo(() => {
    const lowerCaseInput = inputValue.toLowerCase().trim();
    const matchingSuggestions: string[] = [];
    const seenSuggestions = new Set<string>();

    // Search based on key
    Object.entries(suggestions).forEach(([key, values]) => {
        const cleanedKey = removeNumbersAndHyphens(key.toLowerCase());
        if (cleanedKey.includes(lowerCaseInput) && !seenSuggestions.has(cleanedKey)) {
            matchingSuggestions.push(cleanedKey); // Add cleaned key if it matches the input value
            seenSuggestions.add(cleanedKey); // Mark cleaned key as seen
        }
    });

    return matchingSuggestions;
}, [suggestions, inputValue]);

    // Handle input value change
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setShowSuggestions(value.length > 0);
        setSelectedIndex(null);

        if (onChange) {
            const fakeEvent = {
                target: { value },
            } as ChangeEvent<HTMLInputElement>;
            onChange(fakeEvent);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (value: string) => {
        setInputValue(value);
        setShowSuggestions(false);

        if (onChange) {
            const fakeEvent = {
                target: { value },
            } as ChangeEvent<HTMLInputElement>;
            onChange(fakeEvent);
        }
    };

    // Handle clear input
    const handleClearInput = () => {
        setInputValue('');
        setShowSuggestions(false);
        setSelectedIndex(null);
        if (onChange) {
            const fakeEvent = {
                target: { value: '' },
            } as ChangeEvent<HTMLInputElement>;
            onChange(fakeEvent);
        }
    };

    // Handle keyboard navigation
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (selectedIndex !== null && filteredSuggestions[selectedIndex]) {
                const value = filteredSuggestions[selectedIndex!];
                handleSuggestionClick(value);
            }
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedIndex(prevIndex => {
                const nextIndex = (prevIndex === null || prevIndex === filteredSuggestions.length - 1) ? 0 : prevIndex + 1;
                suggestionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return nextIndex;
            });
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedIndex(prevIndex => {
                const prevIndexValue = (prevIndex === null || prevIndex === 0) ? filteredSuggestions.length - 1 : prevIndex - 1;
                suggestionRefs.current[prevIndexValue]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return prevIndexValue;
            });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <img className={`input-icon-${size}`} src={SearchIcon} alt="search icon" />
                <input
                    ref={inputRef}
                    className={`b1 search-input ${size}`}
                    value={inputValue}
                    onClick={onClick}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    disabled={disabled}
                    placeholder={placeholder}
                />
                {inputValue && (
                    <div className="clear-btn">
                        <OrButton
                            layout="icon"
                            variant='secondary'
                            appearance="ghost"
                            size="md"
                            icon={<Icon.cross />}
                            onClick={handleClearInput}
                        />
                    </div>
                )}
            </form>
            {isLoading && <div className="loading-message"></div>}
            {error && <div className="error-message">{error}</div>}
            {showSuggestions && !isLoading && !error && (
                <div className="suggestion-list">
                    {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.slice(0, 5).map((value, index) => (
                            <div
                                key={value}
                                className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
                                onClick={() => handleSuggestionClick(value)}
                                ref={el => suggestionRefs.current[index] = el}
                            >
                                  {boldMatchedText(value, inputValue)}
                            </div>
                        ))
                    ) : (
                        <div className="b2-strong no-suggestions"></div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrSearchInput;