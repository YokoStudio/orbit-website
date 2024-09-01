import React, { useEffect, useState } from 'react';
import '../style.scss';

const IconList = () => {
    const [icons, setIcons] = useState<{ name: string; path: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/icons')
            .then(response => response.json())
            .then(data => {
                console.log('Icons data:', data); // بررسی داده‌ها
                setIcons(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching icons:', error);
                setError('خطا در دریافت آیکون‌ها');
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className='list'>
                    {icons.length > 0 ? (
                        icons.map((icon, index) => {
                            // حذف src/ از مسیر
                            const iconPath = icon.path.replace(/^src\//, '');
                            const imageUrl = `http://localhost:3001/icons/${iconPath}`;
                            
                            // حذف .svg از نام آیکون
                            const iconName = icon.name.replace(/\.svg$/, '');

                            return (
                                <a 
                                    href={imageUrl} 
                                    download 
                                    className='item' 
                                    key={index}
                                >
                                    <div className='icon-view'>
                                        <img 
                                            src={imageUrl} 
                                            alt={iconName} 
                                        />
                                        <p>{iconName}</p>
                                    </div>
                                </a>
                            );
                        })
                    ) : (
                        <p>هیچ آیکونی برای نمایش وجود ندارد.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default IconList;
