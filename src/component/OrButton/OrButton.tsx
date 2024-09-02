import React from "react";
import './OrButton.scss';
import '../../bace/type-style.scss';

interface OrButtonProps { 
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary';
    appearance?: 'fill' | 'outline' | 'ghost';
    icon?: React.ReactNode;
    size?: 'xs' |'sm' |'md' | 'lg' | 'xl'; 
}

const OrButton: React.FC<OrButtonProps> = ({ 
        text,
        onClick,
        disabled = false,
        variant = 'primary',
        appearance = 'fill',
        icon, size = 'md' 
    }) => { 
        
    const buttonClassName = `button ${variant} ${appearance} ${size} b1`;

    return (
        <button 
            className={buttonClassName} 
            onClick={onClick} 
            disabled={disabled}
            >
                {icon && <span className='icon'>{icon}</span>}
                {text}  {/* نمایش متن کнопка */}
            </button>
    );
};

export default OrButton;