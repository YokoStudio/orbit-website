import React, { useEffect, useState } from 'react';
import './OrSlider.scss';

interface OrSliderProps {
    value: number;
    onChange: (value: number) => void;
}

const OrSlider: React.FC<OrSliderProps> = ({ value, onChange }) => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    useEffect(() => {
        const sliderElement = document.querySelector('.slider') as HTMLInputElement;
        if (sliderElement) {
            sliderElement.style.setProperty('--value', `${(value - 0.5) / (2 - 0.5) * 100}%`);
        }
    }, [value]);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div className="slider-container">
            <span className='b1-strong'>Stroke (PX)</span>
            <div className="tooltip b1-strong" style={{ display: showTooltip ? 'block' : 'none', left: `${(value - 0.5) / (2 - 0.5) * 100}%` }}>
                {value}
            </div>
            <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={value}
                onChange={(e) => {
                    const newValue = Number(e.target.value);
                    onChange(newValue);
                    e.target.style.setProperty('--value', `${(newValue - 0.5) / (2 - 0.5) * 100}%`);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="slider" />
            <div className="labels">
                <span className='b1'>Light</span>
                <span className='b1'>Bold</span>
            </div>
        </div>
    );
};

export default OrSlider;
