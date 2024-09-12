// import React, { useEffect, useState } from 'react';
// import './ShapeIcon.scss';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import loadingG from '../../assets/loading.gif';
// import '../../base/type-style.scss';

// interface ShapeIconProps {
//   searchTerm: string;
//   switchChecked: boolean;
//   selectedFolders: string[];
// }

// const ShapeIcon: React.FC<ShapeIconProps> = ({ searchTerm, switchChecked, selectedFolders }) => {
//   const [icons, setIcons] = useState<{ name: string; path: string }[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});


//   useEffect(() => {
//     const fetchIcons = async () => {
//       try {
//         const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=icons/shape&max-keys=1000');
//         const parser = new XMLParser();
//         const jsonData = parser.parse(response.data);
//         const ShapeIcon = jsonData.ListBucketResult.Contents.map((item: any) => ({
//           name: item.Key.split('/').pop(),
//           path: item.Key,
//         }));
//         setIcons(ShapeIcon);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching icons:', error);
//         setError('Error receiving icons');
//         setLoading(false);
//       }
//     };

//     fetchIcons();
//   }, []);

//   // دریافت محتوای SVG به عنوان متن
//   const fetchSvgContent = async (url: string, iconName: string) => {
//     try {
//       const response = await axios.get(url);
//       setSvgContent((prev) => ({
//         ...prev,
//         [iconName]: response.data,
//       }));
//     } catch (error) {
//       console.error('Error fetching SVG content:', error);
//     }
//   };

//   const filteredIcons = icons
//     .filter((icon) => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))

//     .filter(icon => {
//         const iconType = switchChecked ? 'fill' : 'outline';
//         return icon.path.includes(iconType);
//     })
                
//     .filter((icon) => {
//       const iconFolder = icon.path.split('/')[2];
//       return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
//     });

//   return (
//     <div className="icon-shape-body">
//       {loading ? (
//         <div className="loading">
//           <img src={loadingG} alt="logo" width="128px" height="128px" />
//           <span>Loading...</span>
//         </div>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <div className="icon-list">
//           {filteredIcons.length > 0 ? (
//             filteredIcons.map((icon, index) => {
//               const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;

//               // اگر محتوای SVG هنوز بارگذاری نشده بود، آن را بارگذاری کنید
//               if (!svgContent[icon.name]) {
//                 fetchSvgContent(imageUrl, icon.name);
//               }

//               return (
//                 <div className="item" key={index}>
//                   {svgContent[icon.name] ? (
//                     <div className='icon-wrapper'>
//                         <div
//                             className="svg-shape-icon"
//                             dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
//                             onClick={() => {
//                             const link = document.createElement('a');
//                             link.href = imageUrl;
//                             link.download = icon.name;
//                             link.click();
//                         }}
//                     />
//                     </div>
//                   ) : (
//                     <span className='skelton'>Loading SVG...</span>
//                   )}
//                   <span className='b2'>{icon.name.replace('.svg', '')}</span>
//                 </div>
//               );
//             })
//           ) : (
//             <div>
//               <span >Icon not found</span>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShapeIcon;

import React, { useEffect, useState } from 'react';
import './ShapeIcon.scss';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import loadingG from '../../assets/loading.gif';
import '../../base/type-style.scss';

interface ShapeIconProps {
  searchTerm: string;
  switchChecked: boolean;
  selectedFolders: string[];
}

const ShapeIcon: React.FC<ShapeIconProps> = ({ searchTerm, switchChecked, selectedFolders }) => {
  const [icons, setIcons] = useState<{ name: string; path: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});
  const [filteredIcons, setFilteredIcons] = useState<{ name: string; path: string }[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=icons/shape&max-keys=1000');
        const parser = new XMLParser();
        const jsonData = parser.parse(response.data);
        const fetchedIcons = jsonData.ListBucketResult.Contents.map((item: any) => ({
          name: item.Key.split('/').pop(),
          path: item.Key,
        }));
        setIcons(fetchedIcons);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching icons:', error);
        setError('Error receiving icons');
        setLoading(false);
      }
    };

    fetchIcons();
  }, []); // این قسمت فقط یک بار هنگام بارگذاری کامپوننت اجرا می‌شود

  useEffect(() => {
    // فیلتر آیکون‌ها براساس جستجو، نوع (fill/outline)، و فولدرهای انتخابی
    const filtered = icons
      .filter((icon) => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(icon => {
        const iconType = switchChecked ? 'fill' : 'outline'; // فیلتر نوع (پر یا خط)
        return icon.path.includes(iconType);
      })
      .filter((icon) => {
        const iconFolder = icon.path.split('/')[2]; // فیلتر بر اساس فولدر انتخابی
        return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
      });

    setFilteredIcons(filtered);
  }, [icons, searchTerm, switchChecked, selectedFolders]); // به روزرسانی فیلتر آیکون‌ها در زمان تغییر props

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

  return (
    <div className="icon-shape-body">
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
                <div className="item" key={icon.path}> {/* key از مسیر یونیک فایل */}
                  {svgContent[icon.name] ? (
                    <div className='icon-wrapper'>
                        <div
                            className="svg-shape-icon"
                            dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                            onClick={() => {
                            const link = document.createElement('a');
                            link.href = imageUrl;
                            link.download = icon.name;
                            link.click();
                        }}
                    />
                    </div>
                  ) : (
                    <span className='skelton'></span>
                  )}
                  <span className='b2'>{icon.name.replace('.svg', '')}</span>
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

export default ShapeIcon;
