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
            <h1>لیست آیکون‌ها</h1>
            {loading ? (
                <p>در حال بارگذاری...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {icons.length > 0 ? (
                        icons.map((icon, index) => {
                            // مسیر آیکون‌ها را به صورت صحیح بسازید
                            const iconPath = icon.path.replace(/^src\//, '');
                            const imageUrl = `http://localhost:3001${iconPath}`;
                            
                            return (
                                <div key={index}>
                                    <img 
                                        src={imageUrl} 
                                        alt={icon.name} 
                                    />
                                    <p>{icon.name}</p>
                                </div>
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
