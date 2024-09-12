// import React, { useEffect, useState } from 'react';
// import './StrokeIcon.scss';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser'; // اضافه کردن این کتابخانه
// import loadingG from '../../assets/loading.gif'


// interface StrokeIconProps {
//     searchTerm: string;
//     switchChecked: boolean;
//     selectedFolders: string[];
// }

// const StrokeIcon: React.FC<StrokeIconProps> = ({ searchTerm, switchChecked, selectedFolders }) => {
//     const [icons, setIcons] = useState<{ name: string; path: string }[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchIcons = async () => {
//             try {
//                 // درخواست به ArvanStorage برای دریافت لیست آیکون‌ها
//                 const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=Icons/stroke&max-keys=1000');
                
//                 // تبدیل XML به JSON
//                 const parser = new XMLParser();
//                 const jsonData = parser.parse(response.data);

//                 // استخراج آیکون‌ها از داده‌های JSON
//                 const StrokeIcon = jsonData.ListBucketResult.Contents.map((item: any) => ({
//                     name: item.Key.split('/').pop(), // نام فایل SVG
//                     path: item.Key // مسیر فایل
//                 }));

//                 setIcons(StrokeIcon);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching icons:', error);
//                 setError('Error receiving icons');
//                 setLoading(false);
//             }
//         };

//         fetchIcons();
//     }, []);

//     const filteredIcons = icons
//         .filter(icon => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))

//         .filter(icon => {
//             const iconFolder = icon.path.split('/')[2];
//             return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
//         });

//     return (
//         <div className="icon-stroke-body">
//             {loading ? (
//                 <div className='loading'>
//                     <img src={loadingG} alt="logo" width="128px" height="128px"/>
//                     <span>Loading...</span>
//                 </div>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : (
//                 <div className='icon-list'>
//                     {filteredIcons.length > 0 ? (
//                         filteredIcons.map((icon, index) => {
//                             const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;

//                             return (
//                                 <div className='item' key={index}>
//                                     <a href={imageUrl} download>
//                                         <img
//                                             src={imageUrl}
//                                             alt={icon.name}
//                                             className='icon-view'
//                                             onClick={() => {
//                                                 const link = document.createElement('a');
//                                                 link.href = imageUrl;
//                                                 link.download = icon.name;
//                                                 link.click();
//                                             }}
//                                         />
//                                         <p>
//                                             {icon.name.replace('.svg', '')}
//                                         </p>
//                                     </a>
//                                 </div>
//                             );
//                         })
//                     ) : (
//                         <div><span>Icon not found</span></div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default StrokeIcon;
import React, { useEffect, useState } from 'react';
import './StrokeIcon.scss';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import loadingG from '../../assets/loading.gif';

interface StrokeIconProps {
  searchTerm: string;
  selectedFolders: string[];
}

const StrokeIcon: React.FC<StrokeIconProps> = ({ searchTerm, selectedFolders }) => {
  const [icons, setIcons] = useState<{ name: string; path: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});


  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=icons/stroke&max-keys=1000');
        const parser = new XMLParser();
        const jsonData = parser.parse(response.data);
        const StrokeIcon = jsonData.ListBucketResult.Contents.map((item: any) => ({
          name: item.Key.split('/').pop(),
          path: item.Key,
        }));
        setIcons(StrokeIcon);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching icons:', error);
        setError('Error receiving icons');
        setLoading(false);
      }
    };

    fetchIcons();
  }, []);

  // دریافت محتوای SVG به عنوان متن
  const fetchSvgContent = async (url: string, iconName: string) => {
    try {
      const response = await axios.get(url);
      setSvgContent((prev) => ({
        ...prev,
        [iconName]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching SVG content:', error);
    }
  };

  const filteredIcons = icons
    .filter((icon) => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((icon) => {
      const iconFolder = icon.path.split('/')[2];
      return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
    });

  return (
    <div className="icon-stroke-body">
      {loading ? (
        <div className="loading">
          <img src={loadingG} alt="logo" width="128px" height="128px" />
          <span>Loading...</span>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="icon-list">
          {filteredIcons.length > 0 ? (
            filteredIcons.map((icon, index) => {
              const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;

              // اگر محتوای SVG هنوز بارگذاری نشده بود، آن را بارگذاری کنید
              if (!svgContent[icon.name]) {
                fetchSvgContent(imageUrl, icon.name);
              }

              return (
                <div className="item" key={index}>
                  {svgContent[icon.name] ? (
                    <div
                      className="svg-container"
                      dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = imageUrl;
                        link.download = icon.name;
                        link.click();
                      }}
                    />
                  ) : (
                    <span>Loading SVG...</span>
                  )}
                  <p>{icon.name.replace('.svg', '')}</p>
                </div>
              );
            })
          ) : (
            <div>
              <span>Icon not found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StrokeIcon;

