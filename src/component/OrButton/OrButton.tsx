import React from "react";
import './OrButton.scss';
import '../../bace/type-style.scss';

interface OrButtonProps { 
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary';
    appearance?: 'fill' | 'outline' | 'ghost';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    size?: 'xs' |'sm' |'md' | 'lg' | 'xl';
}

const OrButton: React.FC<OrButtonProps> = ({ 
        text,
        onClick,
        disabled = false,
        variant = 'primary',
        appearance = 'fill',
        icon,
        iconPosition = 'left',  
        size = 'md',


    }) => { 
        
    const buttonClassName = `button ${variant} ${appearance} ${size} b1`;

    return (
        <button 
            className={buttonClassName} 
            onClick={onClick} 
            disabled={disabled}
            >
                {icon && iconPosition === 'left' && <span className='icon'>{icon}</span>}
                {text}  {/* نمایش متن کнопка */}
                {icon && iconPosition === 'right' && <span className='icon'>{icon}</span>}
            </button>
    );
};

export default OrButton;