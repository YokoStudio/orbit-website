import React from 'react';
import './OrSlider.scss';

interface OrSliderProps {
    value: number;
    onChange: (value: number) => void;
}

const OrSlider: React.FC<OrSliderProps> = ({ value, onChange }) => {
    return (
        <div className="slider-container">
        <span className='b1-strong'>Stroke</span>
            <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.5"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="slider" />
            <div className="labels">
                <span>Light</span>
                <span>Bold</span>
            </div>
        </div>
    );
};

export default OrSlider;
