// import React from "react";
// import './OrSearchInput.scss'

// interface OrSearchInputProps {
//     onClick?: () => void;
//     placeholder?: string;
//     disabled?: boolean;
//     size?: 'sm' | 'md' | 'lg';
   
// }

// const OrSearchInput: React.FC<OrSearchInputProps> = ({ 
//     onClick,
//     // onChange,
//     placeholder = 'enter your text',
//     disabled = false,
//     size = 'md',
    

// }) => {

//     const OrSearchinputClassName = `input ${size}`;

//     return (
//         <input
//         className={OrSearchinputClassName}
//         onClick={onClick}
//         disabled={disabled}
//         placeholder={placeholder}
//         // onChange={handleSearchChange}
        

//         />

//     );
// };

// export default OrSearchInput;
import React, { ChangeEvent } from "react";
import './OrSearchInput.scss';
import SearchIcon from '../../assets/icons/search.svg';

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
    placeholder = 'enter your text',
    disabled = false,
    size = 'md',
}) => {

    const OrSearchinputClassName = `search-input ${size}`;

    return (
        <form>
            <img className="input-icon" src={SearchIcon} ></img>
        <input
            className={OrSearchinputClassName}
            onClick={onClick}
            onChange={onChange}  // مدیریت تغییرات ورودی
            disabled={disabled}
            placeholder={placeholder}
        />
        </form>
    );
};

export default OrSearchInput;
