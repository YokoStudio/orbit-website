import React, { useState } from 'react';
import tinycolor from 'tinycolor2'; // tinycolor2 برای مدیریت رنگ‌ها
import './OrInput.scss';

interface OrInputProps {
  initialValue?: string;
  onColorChange?: (color: string) => void;
  label?: string;
  maxRecentColors?: number;
}

const OrInput: React.FC<OrInputProps> = ({ initialValue = '#ff0000', onColorChange, label, maxRecentColors = 5 }) => {
  const [color, setColor] = useState<string>(initialValue);
  const [inputValue, setInputValue] = useState<string>(initialValue); // برای نگه‌داری مقدار ورودی بدون اعتبارسنجی فوری
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [previousColor, setPreviousColor] = useState<string | null>(null); // نگه‌داری رنگ قبلی برای undo

  // افزودن رنگ به لیست رنگ‌های اخیر
  const addRecentColor = (newColor: string) => {
    setRecentColors((prevColors) => {
      const updatedColors = prevColors.filter(c => c !== newColor);
      return [newColor, ...updatedColors].slice(0, maxRecentColors);
    });
  };

  // هندل کردن تغییرات در ورودی متنی بدون محدودیت تایپ
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // به‌روزرسانی مقدار ورودی بدون محدودیت
  };

  // اعتبارسنجی رنگ هنگام خروج از ورودی (onBlur) یا فشردن Enter
  const validateAndApplyColor = () => {
    if (tinycolor(inputValue).isValid()) {
      const validColor = tinycolor(inputValue).toHexString(); // تبدیل رنگ به فرمت هگزادسیمال
      setPreviousColor(color); // ذخیره رنگ قبلی
      setColor(validColor); // تنظیم رنگ معتبر
      if (onColorChange) {
        onColorChange(validColor);
      }
      addRecentColor(validColor);
    } else {
      alert("کد رنگ وارد شده نامعتبر است!"); // پیام هشدار در صورت نامعتبر بودن
      setInputValue(color); // بازگرداندن مقدار ورودی به رنگ معتبر قبلی
    }
  };

  // هندل کردن فشردن Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      validateAndApplyColor(); // فراخوانی تابع اعتبارسنجی وقتی کلید Enter فشرده شد
    }
  };

  // هندل کردن تغییرات در ورودی color picker
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPreviousColor(color); // ذخیره رنگ قبلی
    setColor(value); // به‌روزرسانی رنگ
    setInputValue(value); // به‌روزرسانی ورودی متنی با رنگ جدید
    if (onColorChange) {
      onColorChange(value);
    }
    addRecentColor(value);
  };

  // بازگشت به رنگ قبلی (undo)
  const handleUndo = () => {
    if (previousColor) {
      setColor(previousColor);
      setInputValue(previousColor);
      if (onColorChange) {
        onColorChange(previousColor);
      }
      setPreviousColor(null);
    }
  };

  // انتخاب رنگ از رنگ‌های اخیر
  const handleRecentColorClick = (recentColor: string) => {
    setPreviousColor(color); // ذخیره رنگ فعلی قبل از تغییر
    setColor(recentColor);
    setInputValue(recentColor);
    if (onColorChange) {
      onColorChange(recentColor);
    }
  };

  return (
    <div className='field-input'>
      <span className='b1-strong'>{label}</span>
      <div className="color-input">
        {/* ورودی متنی بدون محدودیت تایپ */}
        <input
          type="text"
          value={inputValue}
          onChange={handleTextChange}
          onBlur={validateAndApplyColor} // اعتبارسنجی هنگام خروج از ورودی
          onKeyDown={handleKeyDown} // اعمال رنگ هنگام فشردن Enter
          className="b1 text-input"
          placeholder="#FFFFFF"
        />
        {/* ورودی color picker */}
        <input
          type="color"
          value={color} // مقدار همگام‌شده با color picker
          onChange={handleColorChange}
          className="color-picker"
        />
      </div>

      {/* دکمه undo */}
      <button
        onClick={handleUndo}
        disabled={!previousColor}
        className="undo-btn"
      >
        Undo
      </button>

      {/* نمایش رنگ‌های اخیر */}
      <div className="recent-colors">
        {recentColors.length > 0 && <span>Recent Colors:</span>}
        {recentColors.map((recentColor) => (
          <button
            key={recentColor}
            style={{ backgroundColor: recentColor }}
            className={`recent-color-btn ${recentColor === color ? 'active' : ''}`}
            onClick={() => handleRecentColorClick(recentColor)}
            title={recentColor}
          />
        ))}
      </div>
    </div>
  );
};

export default OrInput;
