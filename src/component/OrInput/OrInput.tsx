import React, { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';
import './OrInput.scss';
import OrButton from '../OrButton/OrButton';
import Icon from '../../assets/Icon';

interface OrInputProps {
  initialValue?: string;
  onColorChange?: (color: string) => void;
  label?: string;
  maxRecentColors?: number;
}

const OrInput: React.FC<OrInputProps> = ({
  initialValue = '#ff0000',
  onColorChange,
  label,
  maxRecentColors = 7,
}) => {
  const [color, setColor] = useState<string>(initialValue);
  const [pickerColor, setPickerColor] = useState<string>(initialValue);
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedColors = localStorage.getItem('recentColors');
    if (storedColors) {
      setRecentColors(JSON.parse(storedColors));
    }
  }, []);

  const addRecentColor = (newColor: string) => {
    setRecentColors((prevColors) => {
      const updatedColors = prevColors.filter((c) => c !== newColor);
      const newColors = [newColor, ...updatedColors].slice(0, maxRecentColors);
      localStorage.setItem('recentColors', JSON.stringify(newColors));
      return newColors;
    });
  };

  const handleColorChange = (newColor: any) => {
    setPickerColor(newColor.hex);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => {
      setColor(newColor.hex);
      if (onColorChange) {
        onColorChange(newColor.hex);
      }
    }, 1000)); // 1000 milliseconds = 1 second
  };

  const handleColorChangeComplete = (newColor: any) => {
    setColor(newColor.hex);
    if (onColorChange) {
      onColorChange(newColor.hex);
    }
  };

  const handleResetColor = () => {
    const blackColor = '#000000';
    setColor(blackColor);
    handleColorChange({ hex: blackColor });
  };

  const handleAddToRecent = () => {
    addRecentColor(color);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsPickerVisible(false);
      }
    };

    if (isPickerVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isPickerVisible]);

  const presetColors = [
    '#ffffff', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0',
    '#9013FE', 
  ];

  return (
    <div className="field-input">
      <span className="b1-strong field-label">{label}</span>
      <div onClick={() => setIsPickerVisible(!isPickerVisible)} className=" color-input" >
        
        <span className="color-code">{color}</span>
        
        <div
          className="color-preview"
          style={{ backgroundColor: color }}

        />
      </div>
      <div className="reset-div">
          <OrButton
            layout="text"
            variant="secondary"
            appearance="outline"
            text="Reset"
            onClick={handleResetColor}
            size="xs"
            className='rest-btn'
          />
        </div>
      {isPickerVisible && (
        <div className="color-picker-wrapper" ref={pickerRef}>
          <SketchPicker
            color={pickerColor}
            onChange={handleColorChange}
            onChangeComplete={handleColorChangeComplete}
            presetColors={presetColors}
            className="sketch-picker"
            styles={{
              default: {
                picker: {
                  borderRadius: '0px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  padding: '0px'
                },
                saturation: {
                  borderRadius: '4px',
                },
                hue: {
                  borderRadius: '4px',
                },
                controls: {
                  display: 'flex',
                },
                sliders: {
                  padding: '4px 0',
                },
                color: {
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                },
              },
            }}
          />
          <div className="recent-colors-popup">
            {recentColors.length > 0 && <span className="c1 recent-label">Saved Colors</span>}
            <div className="recent-colors-list">
              {recentColors.map((recentColor) => (
                <button
                  key={recentColor}
                  style={{ backgroundColor: recentColor }}
                  className={`recent-color-btn ${recentColor === color ? 'active' : ''}`}
                  onClick={() => handleColorChange({ hex: recentColor })}
                />
              ))}
              <div className="add-to-recent">
                <OrButton
                  layout="icon"
                  variant="secondary"
                  appearance="ghost"
                  icon={<Icon.plus />}
                  onClick={handleAddToRecent}
                  size="xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrInput;