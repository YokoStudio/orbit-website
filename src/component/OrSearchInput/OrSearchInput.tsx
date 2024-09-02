import React from "react";
import './OrSearchInput.scss'

interface OrSearchInputProps {
    onClick?: () => void;
    placeholder?: string;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    // onChange: (value: string) => void;
}

const OrSearchInput: React.FC<OrSearchInputProps> = ({
    onClick,
    // onChange,
    placeholder = 'enter your text',
    disabled = false,
    size = 'md',

}) => {

    const OrSearchinputClassName = `input ${size}`;

    return (
        <input
        className={OrSearchinputClassName}
        onClick={onClick}
        disabled={disabled}
        placeholder={placeholder}
        // onChange={handleSearchChange}
        

        />

    );
};

export default OrSearchInput;