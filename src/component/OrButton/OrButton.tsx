import React from "react";
import './OrButton.scss';
import '../../base/type-style.scss';

interface OrButtonProps { 
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary';
    appearance?: 'fill' | 'outline' | 'ghost';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    size?: 'xs' |'sm' |'md' | 'lg' | 'xl';
    className?: string; 
    layout: 'icon' | 'text' | 'icon-text';

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
        className,
        layout,


    }) => { 
        
    const buttonClassName = `button ${layout} ${variant} ${appearance} ${size} b1`;

    return (
        <button 
            className={buttonClassName} 
            onClick={onClick} 
            disabled={disabled}
            >
                <div className="div-button">
                    {icon && iconPosition === 'left' && <span className='icon'>{icon}</span>}
                {text}  {/* نمایش متن کнопка */}
                {icon && iconPosition === 'right' && <span className='icon'>{icon}</span>}
                </div>
            </button>
    );
};

export default OrButton;