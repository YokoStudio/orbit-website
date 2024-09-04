import React from 'react';
import './OrSwitch.scss'; // فایل استایل برای کامپوننت

interface OrSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const OrSwitch: React.FC<OrSwitchProps> = ({ checked, onChange }) => {
    return (
        <div className="or-switch">
            <span className='b1-string'> Fill </span>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="slider-switch"></span>
            </label>
            {/* <span className="switch-label">{checked ? 'Fill' : 'Outline'}</span> */}
        </div>
    );
};

export default OrSwitch;
