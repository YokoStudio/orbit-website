import React from 'react';
import OrSlider from '../OrSlider/OrSlider';
import OrSwitch from '../OrSwitch/OrSwitch';
import './OrFilter.scss';

// تعریف نوع Props
interface OrFilterProps {
    borderSize: number;
    onSliderChange: (value: number) => void;
    switchChecked: boolean;
    onSwitchChange: (checked: boolean) => void;
}

const OrFilter: React.FC<OrFilterProps> = ({ borderSize, onSliderChange, switchChecked, onSwitchChange }) => {
    return (
        <div className='filter'>
            <OrSlider value={borderSize} onChange={onSliderChange} />
            <OrSwitch checked={switchChecked} onChange={onSwitchChange} />
        </div>
    );
};

export default OrFilter;
