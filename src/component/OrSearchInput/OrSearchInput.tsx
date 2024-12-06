import React, { ChangeEvent, useEffect, useRef, useState, useMemo } from "react";
import './OrSearchInput.scss';
import SearchIcon from '../../assets/icons/search.svg';
import axios from 'axios';

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
    const [suggestions, setSuggestions] = useState<string[]>([]); 
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null); // برای نگهداری مرجع به ورودی

    useEffect(() => {
        const fetchSuggestions = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get('https://orbit-website.s3.ir-thr-at1.arvanstorage.ir/IconList.json');
                const jsonSuggestions = response.data;

                const allSuggestions: string[] = [];
                Object.keys(jsonSuggestions).forEach(key => {
                    allSuggestions.push(key);
                    allSuggestions.push(...jsonSuggestions[key]);
                });

                const formattedSuggestions = allSuggestions.map(suggestion => 
                    suggestion
                        .replace(/-\d+$/, '') 
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, char => char.toUpperCase())
                );

                const uniqueSuggestions = Array.from(new Set(formattedSuggestions));
                setSuggestions(uniqueSuggestions);
            } catch (err) {
                setError('Failed to load suggestions. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuggestions();
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === '/' && !disabled) { // اگر اسلش فشار داده شد
                event.preventDefault();
                inputRef.current?.focus(); // فوکوس کردن روی ورودی
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [disabled]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setShowSuggestions(value.length > 0);
        setSelectedIndex(null);
        if (onChange) onChange(event);
    };

    const filteredSuggestions = useMemo(() => 
        suggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(inputValue.toLowerCase())
        ),
        [suggestions, inputValue]
    );

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
        setShowSuggestions(false);

        if (onChange) {
            const fakeEvent = {
                target: { value: suggestion },
            } as ChangeEvent<HTMLInputElement>;
            onChange(fakeEvent);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (selectedIndex !== null && filteredSuggestions[selectedIndex]) {
                handleSuggestionClick(filteredSuggestions[selectedIndex]);
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
                    ref={inputRef} // مرجع ورودی برای استفاده از فوکوس
                    className={`b1 search-input ${size}`}
                    value={inputValue}
                    onClick={onClick}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    disabled={disabled}
                    placeholder={placeholder}
                />
            </form>
            
            {isLoading && <div className="loading-message"></div>}
            {error && <div className="error-message">{error}</div>}
            {showSuggestions && !isLoading && !error && (
                <div className="suggestion-list">
                    {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.slice(0, 10).map((suggestion, index) => (
                            <div
                                key={suggestion}
                                className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`} 
                                onClick={() => handleSuggestionClick(suggestion)} 
                                ref={el => suggestionRefs.current[index] = el}
                            >
                                {suggestion}
                            </div>
                        ))
                    ) : (
                        <div className="no-suggestions">No results found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrSearchInput;