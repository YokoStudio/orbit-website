import React, { useState } from 'react';
import './OrInput.scss'; // در صورت نیاز به استایل‌ها

interface OrInputProps {
  initialValue?: string; // مقدار اولیه ورودی رنگ
  onColorChange?: (color: string) => void; // تابع برای ارسال رنگ انتخاب‌شده به کامپوننت والد
  label?: string;
}

const OrInput: React.FC<OrInputProps> = ({ initialValue = '#ff0000', onColorChange, label }) => {
  const [color, setColor] = useState<string>(initialValue);

  // تابع برای هندل کردن تغییرات در ورودی رنگ به‌صورت متنی
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^#[0-9A-F]{6}$/i.test(value)) { // بررسی فرمت کد رنگ (مثل #FF0000)
      setColor(value);
      if (onColorChange) {
        onColorChange(value);
      }
    }
  };

  // تابع برای هندل کردن تغییرات در ورودی رنگ پیکرنگ
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColor(value);
    if (onColorChange) {
      onColorChange(value);
    }
  };



  return (
    <div className='field-input'>
      {/* ورودی متنی برای وارد کردن کد رنگ */}
    <span className='b1-strong'>{label}</span>
     <div className="color-input">
     <input
        type="text"
        value={color}
        onChange={handleTextChange}
        className="text-input"
        placeholder="#FFFFFF"
      />

      {/* ورودی نوع color برای انتخاب رنگ */}
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="color-picker"
      />
     </div>
    </div>
  );
};

export default OrInput;
