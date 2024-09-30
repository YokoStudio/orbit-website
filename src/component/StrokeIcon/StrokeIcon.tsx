// import React, { useEffect, useState } from 'react';
// import './StrokeIcon.scss';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import loadingG from '../../assets/loading.gif';
// import OrInput from '../OrInput/OrInput';
// import Fuse from 'fuse.js';

// interface StrokeIconProps {
//   searchTerm: string;
//   selectedFolders: string[];
//   strokeColor: string; // رنگ لبه آیکون
//   strokeWidth: number; // عرض لبه آیکون
// }

// interface Icon {
//   name: string;
//   path: string;
//   similarNames?: string[]; // نام‌های مشابه از JSON
// }

// const StrokeIcon: React.FC<StrokeIconProps> = ({ searchTerm, selectedFolders, strokeColor, strokeWidth }) => {
//   const [icons, setIcons] = useState<{ name: string; path: string }[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     const fetchIcons = async () => {
//       try {
//         const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=icons/stroke&max-keys=1000');
//         const parser = new XMLParser();
//         const jsonData = parser.parse(response.data);
//         const StrokeIcon = jsonData.ListBucketResult.Contents.map((item: any) => ({
//           name: item.Key.split('/').pop(),
//           path: item.Key,
//         }));

        
//         // واکشی JSON برای نام‌های مشابه
//         const jsonResponse = await axios.get(`https://orbit-website.s3.ir-thr-at1.arvanstorage.ir/IconList.json?t=${Date.now()}`);

//         const similarNamesData = jsonResponse.data;

//         // ترکیب اطلاعات JSON با آیکون‌ها
//         const iconsWithSimilarNames = StrokeIcon.map((icon: Icon) => {
//           const similarNamesEntry = similarNamesData[icon.name.replace('.svg', '')];
//           const similarNames = similarNamesEntry ? similarNamesEntry : [];
//           return { ...icon, similarNames };
//         });


//         setIcons(StrokeIcon);
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
//       let svgData = response.data;
//       // تغییر رنگ لبه‌های SVG و عرض لبه‌ها با استفاده از مقادیر انتخابی
//       const coloredSvg = svgData
//         .replace(/stroke="[^"]*"/g, `stroke="${strokeColor}"`)
//         .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}px"`);
//       setSvgContent((prev) => ({
//         ...prev,
//         [iconName]: coloredSvg,
//       }));
//     } catch (error) {
//       console.error('Error fetching SVG content:', error);
//     }
//   };

//   useEffect(() => {
//     // بارگذاری مجدد محتوای SVGها با تغییر رنگ و عرض لبه
//     icons.forEach(icon => {
//       const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
//       fetchSvgContent(imageUrl, icon.name);
//     });
//   }, [strokeColor, strokeWidth, icons]);

//   // تابع دانلود SVG با رنگ و عرض لبه
//   const downloadSvg = (iconName: string, svgContent: string) => {
//     const blob = new Blob([svgContent], { type: 'image/svg+xml' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = iconName;
//     link.click();
//     URL.revokeObjectURL(url); // برای آزادسازی حافظه
//   };
//   useEffect(() => {
//     const fuse = new Fuse(icons, {
//       threshold: 0.3,
//       includeMatches: true,
//       keys: ['name', 'similarNames'], // جستجو در نام و نام‌های مشابه
//     });
//     const result = fuse.search(searchTerm);
//     const iconsToBeFiltered = searchTerm
//       ? result.map(({ item }) => item)
//       : icons;
// })
     


//   const filteredIcons = icons
//     .filter((icon) => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))


//     .filter((icon) => {
//       const iconFolder = icon.path.split('/')[2];
//       return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
//     });

//   return (
//     <div className="icon-stroke-body">
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
//             filteredIcons.map((icon, index) => (
//               <div className="item" key={index}>
//                 {svgContent[icon.name] ? (
//                   <div className="icon-wrapper">
//                     <div
//                     className="svg-container"
//                     dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
//                     onClick={() => {
//                       // دانلود SVG با رنگ و عرض لبه
//                       downloadSvg(icon.name, svgContent[icon.name]);
//                     }}
//                   />
//                   </div>
//                 ) : (
//                   <span className="skelton">Loading SVG...</span>
//                 )}
//                 <span className="b2 icon-name">{icon.name.replace('.svg', '')}</span>
//               </div>
//             ))
//           ) : (
//             <div>
//               <span>Icon not found</span>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StrokeIcon;

import React, { useEffect, useState } from 'react';
import './StrokeIcon.scss';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import loadingG from '../../assets/loading.gif';
import OrInput from '../OrInput/OrInput';
import Fuse from 'fuse.js';

interface StrokeIconProps {
  searchTerm: string;
  selectedFolders: string[];
  strokeColor: string; // رنگ لبه آیکون
  strokeWidth: number; // عرض لبه آیکون
}

interface Icon {
  name: string;
  path: string;
  similarNames?: string[]; // نام‌های مشابه از JSON
}

const StrokeIcon: React.FC<StrokeIconProps> = ({ searchTerm, selectedFolders, strokeColor, strokeWidth }) => {
  const [icons, setIcons] = useState<Icon[]>([]);
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

        // واکشی JSON برای نام‌های مشابه
        const jsonResponse = await axios.get(`https://orbit-website.s3.ir-thr-at1.arvanstorage.ir/IconList.json?t=${Date.now()}`);
        const similarNamesData = jsonResponse.data;

        // ترکیب اطلاعات JSON با آیکون‌ها
        const iconsWithSimilarNames = StrokeIcon.map((icon: Icon) => {
          const similarNamesEntry = similarNamesData[icon.name.replace('.svg', '')];
          const similarNames = similarNamesEntry ? similarNamesEntry : [];
          return { ...icon, similarNames };
        });

        setIcons(iconsWithSimilarNames); // استفاده از آیکون‌ها با نام‌های مشابه
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
      let svgData = response.data;
      const coloredSvg = svgData
        .replace(/stroke="[^"]*"/g, `stroke="${strokeColor}"`)
        .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}px"`);
      setSvgContent((prev) => ({
        ...prev,
        [iconName]: coloredSvg,
      }));
    } catch (error) {
      console.error('Error fetching SVG content:', error);
    }
  };

  const formatIconName = (name: string) => {
    return name
      .replace('.svg', '')          // حذف پسوند .svg
      .replace(/-\d+$/, '')        // حذف عدد از انتهای نام (مثلاً -2 یا -3)
      .replace(/-/g, ' ');          // جایگزینی - با فاصله
  };

  useEffect(() => {
    icons.forEach(icon => {
      const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
      fetchSvgContent(imageUrl, icon.name);
    });
  }, [strokeColor, strokeWidth, icons]);

  const downloadSvg = (iconName: string, svgContent: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = iconName;
    link.click();
    URL.revokeObjectURL(url); // برای آزادسازی حافظه
  };

  // جستجو در آیکون‌ها با استفاده از Fuse.js
  const fuse = new Fuse(icons, {
    threshold: 0.3,
    includeMatches: true,
    keys: ['name', 'similarNames'], // جستجو در نام و نام‌های مشابه
  });
  const result = fuse.search(searchTerm);
  const filteredIcons = searchTerm
    ? result.map(({ item }) => item)
    : icons;

  // فیلتر کردن بر اساس پوشه‌های انتخابی
  const finalIcons = filteredIcons.filter((icon) => {
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
          {finalIcons.length > 0 ? (
            finalIcons.map((icon, index) => (
              <div className="item" key={index}>
                {svgContent[icon.name] ? (
                  <div className="icon-wrapper">
                    <div
                      className="svg-container"
                      dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                      onClick={() => {
                        downloadSvg(icon.name, svgContent[icon.name]);
                      }}
                    />
                  </div>
                ) : (
                  <span className="skelton">Loading SVG...</span>
                )}
                <span className="b2 icon-name">{formatIconName(icon.name)}</span>
              </div>
            ))
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
