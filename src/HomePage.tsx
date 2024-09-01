import React from 'react';

const HomePage = () => {
    // دسته‌بندی‌ها رو به صورت دستی لیست می‌کنیم
    const categories = [
        { name: 'Weather', path: '/icons/weather' },
        { name: 'Animals', path: '/icons/interface' },
        // دسته‌بندی‌های دیگر رو اینجا اضافه کن
    ];

    return (
        <div>
            <h1>Icon Pack</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.name}>
                        <a href={category.path}>{category.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
