
// import React, { useEffect, useState } from 'react';
// import './IconList.scss';

// interface Icon {
//     name: string;
//     path: string;
// }

// interface IconListProps {
//     searchTerm: string; // اضافه کردن searchTerm به پراپ‌ها
// }

// const IconList: React.FC<IconListProps> = ({ searchTerm }) => {
//     const [icons, setIcons] = useState<Icon[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         fetch('http://localhost:3001/api/icons')
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Icons data:', data); // بررسی داده‌ها
//                 setIcons(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching icons:', error);
//                 setError('خطا در دریافت آیکون‌ها');
//                 setLoading(false);
//             });
//     }, []);

//     // فیلتر کردن آیکون‌ها بر اساس searchTerm
//     const filteredIcons = icons.filter(icon =>
//         icon.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : (
//                 <div className='list'>
//                     {filteredIcons.length > 0 ? (
//                         filteredIcons.map((icon, index) => {
//                             const iconPath = icon.path.replace(/^src\//, '');
//                             const imageUrl = `http://localhost:3001/icons/${iconPath}`;
                            
//                             return (
//                                 <a 
//                                     href= {imageUrl}
//                                     download
//                                     className='item'
//                                 >
//                                 <div className='item' key={index}>
//                                     <img 
//                                         src={imageUrl} 
//                                         alt={icon.name} 
//                                     />
//                                     <p>{icon.name.replace('.svg', '')}</p>
//                                 </div>
//                                 </a>
//                             );
//                         })
//                     ) : (
//                         <p>هیچ آیکونی برای نمایش وجود ندارد.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default IconList;
// In IconList.tsx
import React, { useEffect, useState } from 'react';
import './IconList.scss';

interface Icon {
    name: string;
    path: string;
}

interface IconListProps {
    searchTerm: string;
    borderSize: number;
}

const IconList: React.FC<IconListProps> = ({ searchTerm, borderSize }) => {
    const [icons, setIcons] = useState<Icon[]>([]); // تعریف icons
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

    // فیلتر کردن آیکون‌ها بر اساس searchTerm
    const filteredIcons = icons.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className='list'>
                    {filteredIcons.length > 0 ? (
                        filteredIcons.map((icon, index) => {
                            // تغییر مسیر بر اساس borderSize
                            const folderName = borderSize.toString();
                            const iconPath = icon.path
                                .replace(/^src\//, '')
                                .replace(/\/\d+(\.\d+)?\//, `/${folderName}/`);
                            const imageUrl = `http://localhost:3001/icons/${iconPath}`;
                            
                            return (
                                <div className='item' key={index}>
                                    <img 
                                        src={imageUrl} 
                                        alt={icon.name} 
                                    />
                                    <p>{icon.name.replace('.svg', '')}</p>
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
