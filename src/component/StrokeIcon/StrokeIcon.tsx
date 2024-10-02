

// import React, { useEffect, useState } from 'react';
// import './StrokeIcon.scss';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import loadingG from '../../assets/loading.gif';
// import OrInput from '../OrInput/OrInput';
// import Fuse from 'fuse.js';
// import OrButton from '../OrButton/OrButton';

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
//   const [icons, setIcons] = useState<Icon[]>([]);
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



//         setIcons(iconsWithSimilarNames); // استفاده از آیکون‌ها با نام‌های مشابه
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching icons:', error);
//         setError('Error receiving icons');
//         setLoading(false);
//       }
//     };

//     fetchIcons();
//   }, []);

//   const [copyMessage, setCopyMessage] = useState<string | null>(null);
//   // دریافت محتوای SVG به عنوان متن
//   const fetchSvgContent = async (url: string, iconName: string) => {
//     try {
//       const response = await axios.get(url);
//       let svgData = response.data;
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

//   const formatIconName = (name: string) => {
//     return name
//       .replace('.svg', '')          // حذف پسوند .svg
//       .replace(/-\d+$/, '')        // حذف عدد از انتهای نام (مثلاً -2 یا -3)
//       .replace(/-/g, ' ')          // جایگزینی - با فاصله
//       .split(' ')                  // تقسیم نام به کلمات
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // تبدیل حرف اول هر کلمه به بزرگ
//       .join(' ');                  // ترکیب مجدد کلمات با فاصله
//   };
//   useEffect(() => {
//     icons.forEach(icon => {
//       const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
//       fetchSvgContent(imageUrl, icon.name);
//     });
//   }, [strokeColor, strokeWidth, icons]);

//   const downloadSvg = (iconName: string, svgContent: string) => {
//     const blob = new Blob([svgContent], { type: 'image/svg+xml' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = iconName;
//     link.click();
//     URL.revokeObjectURL(url); // برای آزادسازی حافظه
//   };

//   // جستجو در آیکون‌ها با استفاده از Fuse.js
//   const fuse = new Fuse(icons, {
//     threshold: 0.3,
//     includeMatches: true,
//     keys: ['name', 'similarNames'], // جستجو در نام و نام‌های مشابه
//   });
//   const result = fuse.search(searchTerm);
//   const filteredIcons = searchTerm
//     ? result.map(({ item }) => item)
//     : icons;

//   // فیلتر کردن بر اساس پوشه‌های انتخابی
//   const finalIcons = filteredIcons
//   .filter((icon) => icon.name.toLowerCase().endsWith('.svg'))
//   .filter((icon) => {
//     const iconFolder = icon.path.split('/')[2];
//     return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
//   })
//   .sort((a, b) => a.name.localeCompare(b.name)); 
  
//   const copyToClipboard = (svgContent: string) => {
//     navigator.clipboard.writeText(svgContent).then(() => {
//       setCopyMessage('SVG copied to clipboard');
//       setTimeout(() => {
//         setCopyMessage(null);
//       }, 2000); // پیام بعد از 2 ثانیه ناپدید می‌شود
//     }).catch((err) => {
//       console.error('Failed to copy SVG: ', err);
//     });
//   };
  

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
//           {finalIcons.length > 0 ? (
//             finalIcons.map((icon, index) => (
//               <div className="item" key={index}>
//                 <OrButton
//                       variant='secondary'
//                       appearance = 'outline'
//                       layout='icon'
//                       className='copy-flot-button'
//                       onClick={() => {
//                       copyToClipboard(svgContent[icon.name]);
//                     }}
//                   />
//                   {copyMessage && (
//   <div className="tooltip">
//     {copyMessage}
//   </div>
// )}

//                 {svgContent[icon.name] ? (
//                   <div className="icon-wrapper">
//                     <div
//                       className="svg-container"
//                       dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
//                       onClick={() => {
//                         downloadSvg(icon.name, svgContent[icon.name]);
//                       }}
//                       />
                      
//                   </div>
//                 ) : (
//                   <span className="skelton"></span>
//                 )}
//                 <span className="b2 icon-name">{formatIconName(icon.name)}</span>
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
import OrButton from '../OrButton/OrButton';
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
  const [copyMessages, setCopyMessages] = useState<{ [key: string]: string | null }>({}); // وضعیت برای پیام کپی

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
      .replace(/-/g, ' ')          // جایگزینی - با فاصله
      .split(' ')                  // تقسیم نام به کلمات
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // تبدیل حرف اول هر کلمه به بزرگ
      .join(' ');                  // ترکیب مجدد کلمات با فاصله
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
  const finalIcons = filteredIcons
    .filter((icon) => icon.name.toLowerCase().endsWith('.svg'))
    .filter((icon) => {
      const iconFolder = icon.path.split('/')[2];
      return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
    })
    .sort((a, b) => a.name.localeCompare(b.name)); 
  
  const copyToClipboard = (iconName: string, svgContent: string) => {
    navigator.clipboard.writeText(svgContent).then(() => {
      setCopyMessages((prev) => ({
        ...prev,
        [iconName]: 'Copied!!',
      }));

      setTimeout(() => {
        setCopyMessages((prev) => ({
          ...prev,
          [iconName]: null,
        }));
      }, 2000); // پیام بعد از 2 ثانیه ناپدید می‌شود
    }).catch((err) => {
      console.error('Failed to copy SVG: ', err);
    });
  };
  
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
              <div className="item" onClick={() => {
                downloadSvg(icon.name, svgContent[icon.name]);
              }}>
                <OrButton
                  variant='secondary'
                  appearance='outline'
                  layout='icon'
                  className='copy-flot-button'
                  onClick={() => {
                    copyToClipboard(icon.name, svgContent[icon.name]);
                  }}
                />
                {copyMessages[icon.name] && ( // پیام فقط برای آیکون انتخاب شده
                  <div className="tooltip">
                    {copyMessages[icon.name]}
                  </div>
                )}

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
                  <span className="skelton"></span>
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
