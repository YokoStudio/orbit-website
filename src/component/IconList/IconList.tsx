// import React, { useEffect, useState } from 'react';
// import './IconList.scss';

// interface IconListProps {
//     searchTerm: string;
//     borderSize: number;
//     switchChecked: boolean; // اضافه کردن پراپرتی جدید
// }

// const IconList: React.FC<IconListProps> = ({ searchTerm, borderSize, switchChecked }) => {
//     const [icons, setIcons] = useState<{ name: string; path: string }[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         fetch('http://localhost:3001/api/icons')
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Icons data:', data);
//                 setIcons(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching icons:', error);
//                 setError('خطا در دریافت آیکون‌ها');
//                 setLoading(false);
//             });
//     }, []);

//     const filteredIcons = icons
//         .filter(icon => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))
//         .filter(icon => {
//             const iconBorderSize = icon.path.match(/(\d+(\.\d+)?)\/?/)?.[1];
//             return iconBorderSize ? Number(iconBorderSize) === borderSize : false;
//         })
//         .filter(icon => {
//             const iconType = switchChecked ? 'fill' : 'outline';
//             return icon.path.includes(iconType);
//         });

//     return (
//         <div className="icon-list">
//             {loading ? (
//                 <p>در حال بارگذاری...</p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : (
//                 <div className='list'>
//                     {filteredIcons.length > 0 ? (
//                         filteredIcons.map((icon, index) => {
//                             const iconPath = icon.path.replace(/^src\//, '');
//                             const imageUrl = `http://localhost:3001/icons${iconPath}`;
                            
//                                 return (
                                    
//                                     <div>
//                                         <a 
//                                             href={imageUrl} 
//                                             download
//                                         >
                                            
//                                             <img
//                                                 src={imageUrl}
//                                                 alt={icon.name}
//                                                 className='icon-view'
//                                                 onClick={() => {
//                                                 const link = document.createElement('a');
//                                                 link.href = imageUrl;
//                                                 link.download = icon.name;
//                                                 link.click();
//                                                 }}
//                                             />
                                    
//                                             <p>
//                                                 {icon.name.replace('.svg', '')}
//                                             </p>
//                                         </a>       
//                                     </div>
                                    
//                                 );
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
import React, { useEffect, useState } from 'react';
import './IconList.scss';

interface IconListProps {
    searchTerm: string;
    borderSize: number;
    switchChecked: boolean;
    selectedFolders: string[]; // اضافه کردن selectedFolders
}

const IconList: React.FC<IconListProps> = ({ searchTerm, borderSize, switchChecked, selectedFolders }) => {
    const [icons, setIcons] = useState<{ name: string; path: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/icons')
            .then(response => response.json())
            .then(data => {
                setIcons(data);
                setLoading(false);
            })
            .catch(error => {
                setError('خطا در دریافت آیکون‌ها');
                setLoading(false);
            });
    }, []);

    const filteredIcons = icons
        .filter(icon => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(icon => {
            const iconBorderSize = icon.path.match(/(\d+(\.\d+)?)\/?/)?.[1];
            return iconBorderSize ? Number(iconBorderSize) === borderSize : false;
        })
        .filter(icon => {
            const iconType = switchChecked ? 'fill' : 'outline';
            return icon.path.includes(iconType);
        })
        .filter(icon => {
            const iconFolder = icon.path.split('/')[1]; // تغییر به مسیر درست برای فیلتر کردن
            return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
        });

    return (
        <div className="icon-list">
            {loading ? (
                <p>در حال بارگذاری...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {filteredIcons.length > 0 ? (
                        filteredIcons.map((icon, index) => {
                            const iconPath = icon.path.replace(/^src\//, '');
                            const imageUrl = `http://localhost:3001/icons${iconPath}`;

                            return (
                                <div className='list' key={index}>
                                    <a 
                                        href={imageUrl} 
                                        download
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={icon.name}
                                            className='icon-view'
                                            onClick={() => {
                                                const link = document.createElement('a');
                                                link.href = imageUrl;
                                                link.download = icon.name;
                                                link.click();
                                            }}
                                        />
                                        <p>
                                            {icon.name.replace('.svg', '')}
                                        </p>
                                    </a>
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
