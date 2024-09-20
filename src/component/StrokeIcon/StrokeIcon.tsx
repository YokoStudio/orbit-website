 
// import React, { useEffect, useState } from 'react';
// import './StrokeIcon.scss';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import loadingG from '../../assets/loading.gif';
// import OrInput from '../OrInput/OrInput'; // اطمینان حاصل کنید که این کامپوننت به درستی وارد شده است

// interface StrokeIconProps {
//   searchTerm: string;
//   selectedFolders: string[];
//   strokeColor: string; // رنگ لبه آیکون
// }

// const StrokeIcon: React.FC<StrokeIconProps> = ({ searchTerm, selectedFolders, strokeColor }) => {
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
//       const svgData = response.data;
//       const coloredSvg = svgData
//         // تغییر رنگ لبه‌های SVG با استفاده از رنگ منتخب
//         .replace(/stroke="[^"]*"/g, `stroke="${strokeColor}"`);
//       setSvgContent((prev) => ({
//         ...prev,
//         [iconName]: coloredSvg,
//       }));
//     } catch (error) {
//       console.error('Error fetching SVG content:', error);
//     }
//   };

//   useEffect(() => {
//     // بارگذاری مجدد محتوای SVGها با تغییر رنگ
//     icons.forEach(icon => {
//       const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
//       fetchSvgContent(imageUrl, icon.name);
//     });
//   }, [strokeColor, icons]);

//   // تابع دانلود SVG با رنگ و استروک
//   const downloadSvg = (iconName: string, svgContent: string) => {
//     const blob = new Blob([svgContent], { type: 'image/svg+xml' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = iconName;
//     link.click();
//     URL.revokeObjectURL(url); // برای آزادسازی حافظه
//   };

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
//                   <div
//                     className="svg-container"
//                     dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
//                     onClick={() => {
//                       // دانلود SVG با رنگ و استروک
//                       downloadSvg(icon.name, svgContent[icon.name]);
//                     }}
//                   />
//                 ) : (
//                   <span>Loading SVG...</span>
//                 )}
//                 <p>{icon.name.replace('.svg', '')}</p>
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
import OrInput from '../OrInput/OrInput'; // اطمینان حاصل کنید که این کامپوننت به درستی وارد شده است

interface StrokeIconProps {
  searchTerm: string;
  selectedFolders: string[];
  strokeColor: string; // رنگ لبه آیکون
  strokeWidth: number; // عرض لبه آیکون
}

const StrokeIcon: React.FC<StrokeIconProps> = ({ searchTerm, selectedFolders, strokeColor, strokeWidth }) => {
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
      let svgData = response.data;
      // تغییر رنگ لبه‌های SVG و عرض لبه‌ها با استفاده از مقادیر انتخابی
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

  useEffect(() => {
    // بارگذاری مجدد محتوای SVGها با تغییر رنگ و عرض لبه
    icons.forEach(icon => {
      const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
      fetchSvgContent(imageUrl, icon.name);
    });
  }, [strokeColor, strokeWidth, icons]);

  // تابع دانلود SVG با رنگ و عرض لبه
  const downloadSvg = (iconName: string, svgContent: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = iconName;
    link.click();
    URL.revokeObjectURL(url); // برای آزادسازی حافظه
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
            filteredIcons.map((icon, index) => (
              <div className="item" key={index}>
                {svgContent[icon.name] ? (
                  <div
                    className="svg-container"
                    dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                    onClick={() => {
                      // دانلود SVG با رنگ و عرض لبه
                      downloadSvg(icon.name, svgContent[icon.name]);
                    }}
                  />
                ) : (
                  <span>Loading SVG...</span>
                )}
                <p>{icon.name.replace('.svg', '')}</p>
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
