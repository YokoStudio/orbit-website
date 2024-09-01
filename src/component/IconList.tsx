import React, { useEffect, useState } from 'react';

// داده‌های نمونه برای دسته‌بندی‌ها
const categories = [
    { name: 'Weather', path: '/icons/weather' },
    { name: 'Animals', path: '/icons/animals' },
    // دسته‌بندی‌های دیگر رو اینجا اضافه کن
];

const IconList = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [icons, setIcons] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/icons')
            .then(response => response.json())
            .then(data => {
                console.log('Icons data:', data); // برای بررسی داده‌های دریافتی
                setIcons(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching icons:', error);
                setLoading(false);
            });
    }, []);

    const filteredIcons = selectedCategory
        ? icons.filter(icon => icon.includes(selectedCategory))
        : icons;

    return (
        <div>
            <h1>Icon Pack</h1>

            {/* فیلتر */}
            <div className="filters">
                <label htmlFor="category-filter">فیلتر بر اساس دسته‌بندی:</label>
                <select
                    id="category-filter"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory || ''}
                >
                    <option value="">همه دسته‌بندی‌ها</option>
                    {categories.map((category) => (
                        <option key={category.name} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* نمایش آیکون‌ها */}
            <div className="icon-list">
                {loading ? (
                    <p>در حال بارگذاری...</p>
                ) : (
                    filteredIcons.length > 0 ? (
                        filteredIcons.map((icon, index) => (
                            <div className='item' key={index}>
                                <img src={icon} alt={`icon-${index}`} />
                            </div>
                        ))
                    ) : (
                        <p>هیچ آیکونی برای نمایش وجود ندارد.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default IconList;
