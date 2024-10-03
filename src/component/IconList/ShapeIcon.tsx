// // // import React, { useEffect, useState } from 'react';
// // // import './ShapeIcon.scss';
// // // import axios from 'axios';
// // // import { XMLParser } from 'fast-xml-parser';
// // // import loadingG from '../../assets/loading.gif';
// // // import '../../base/type-style.scss';
// // // import Fuse from 'fuse.js';

// // // interface ShapeIconProps {
// // //   searchTerm: string;
// // //   switchChecked: boolean;
// // //   selectedFolders: string[];
// // //   iconColor: string
// // // }

// // // const ShapeIcon: React.FC<ShapeIconProps> = ({
// // //   searchTerm,
// // //   switchChecked,
// // //   selectedFolders,
// // //   iconColor,
// // // }) => {
// // //   const [icons, setIcons] = useState<{ name: string; path: string }[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});
// // //   const [filteredIcons, setFilteredIcons] = useState<{ name: string; path: string }[]>([]);

// // //   useEffect(() => {
// // //     const fetchIcons = async () => {
// // //       try {
// // //         const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=icons/shape&max-keys=1000');
// // //         const parser = new XMLParser();
// // //         const jsonData = parser.parse(response.data);
// // //         const fetchedIcons = jsonData.ListBucketResult.Contents.map((item: any) => ({
// // //           name: item.Key.split('/').pop(),
// // //           path: item.Key,
// // //         }));
// // //         setIcons(fetchedIcons);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         console.error('Error fetching icons:', error);
// // //         setError('Error receiving icons');
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchIcons();
// // //   }, []);

// // //   useEffect(() => {
// // //     const fuse = new Fuse(icons, {
// // //       // isCaseSensitive: false,
// // //       // includeScore: false,
// // //       // shouldSort: true,
// // //       // includeMatches: false,
// // //       // findAllMatches: false,
// // //       // minMatchCharLength: 1,
// // //       // location: 0,
// // //       threshold: 0.3,
// // //       // distance: 100,
// // //       // useExtendedSearch: false,
// // //       // ignoreLocation: false,
// // //       // ignoreFieldNorm: false,
// // //       // fieldNormWeight: 1,
// // //       keys: ['name']
// // //     });
// // //     const result = fuse.search(searchTerm);
// // //     console.log('Filtered icons:', result);
// // //     const iconsToBeFiltered = searchTerm 
// // //       ? result.map(({item: {name, path}}) => ({ name, path  }))
// // //       : icons

// // //     const filtered = iconsToBeFiltered
// // //       // .filter((icon) => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))
// // //       .filter((icon) => {
// // //         const iconType = switchChecked ? 'fill' : 'outline';
// // //         return icon.path.includes(iconType);
// // //       })
// // //       .filter((icon) => {
// // //         const iconFolder = icon.path.split('/')[2];
// // //         return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
// // //       });

// // //     setFilteredIcons(filtered);
// // //   }, [icons, searchTerm, switchChecked, selectedFolders]);

// // //   const fetchSvgContent = async (url: string, iconName: string) => {
// // //     try {
// // //       const response = await axios.get(url);
// // //       const svgData = response.data;
// // //       const coloredSvg = svgData
// // //         .replace(/fill="[^"]*"/g, `fill="${iconColor}"`)
// // //         .replace(/stroke="[^"]*"/g, `fill="${iconColor}"`);
// // //       setSvgContent((prev) => ({
// // //         ...prev,
// // //         [iconName]: coloredSvg,
// // //       }));
// // //     } catch (error) {
// // //       console.error('Error fetching SVG content:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     // فراخوانی مجدد محتوای SVG برای هر آیکون فیلتر شده
// // //     filteredIcons.forEach((icon) => {
// // //       const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
// // //       fetchSvgContent(imageUrl, icon.name); // واکشی هر آیکون و به‌روزرسانی محتوای SVG
// // //     });
// // //   }, [filteredIcons, iconColor]); // هر بار که لیست آیکون‌های فیلتر شده یا رنگ تغییر کرد، اجرا شود

// // //   const handleDownload = (iconName: string, svgData: string) => {
// // //     const blob = new Blob([svgData], { type: 'image/svg+xml' });
// // //     const url = URL.createObjectURL(blob);
// // //     const link = document.createElement('a');
// // //     link.href = url;
// // //     link.download = iconName;
// // //     link.click();
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   return (
// // //     <div className="icon-shape-body">
// // //       {loading ? (
// // //         <div className="loading">
// // //           <img src={loadingG} alt="logo" width="128px" height="128px" />
// // //           <span>Loading...</span>
// // //         </div>
// // //       ) : error ? (
// // //         <p>{error}</p>
// // //       ) : (
// // //         <div className="shape-icon-list">
// // //           {filteredIcons.length > 0 ? (
// // //             filteredIcons.map((icon) => {
// // //               const svgData = svgContent[icon.name];
// // //               return (
// // //                 <div className="item" key={icon.path}>
// // //                   {svgData ? (
// // //                     <div className="icon-wrapper">
// // //                       <div
// // //                         className="svg-shape-icon"
// // //                         dangerouslySetInnerHTML={{ __html: svgData }}
// // //                         onClick={() => handleDownload(icon.name, svgData)}
// // //                       />
// // //                     </div>
// // //                   ) : (
// // //                     <span className="skelton">Loading SVG...</span>
// // //                   )}
// // //                   <span className="b1 icon-name">{icon.name.replace('.svg', '')}</span>
// // //                 </div>
// // //               );
// // //             })
// // //           ) : (
// // //             <div>
// // //               <span>Icon not found</span>
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default ShapeIcon;

// // import React, { useEffect, useState } from 'react';
// // import './ShapeIcon.scss';
// // import axios from 'axios';
// // import { XMLParser } from 'fast-xml-parser';
// // import loadingG from '../../assets/loading.gif';
// // import '../../base/type-style.scss';
// // import Fuse from 'fuse.js';
// // import OrLoadding from '../OrLoading/OrLoading'
// // import OrButton from '../OrButton/OrButton';
// // import Icon from '../../assets/Icon';

// // interface ShapeIconProps {
// //   searchTerm: string;
// //   switchChecked: boolean;
// //   selectedFolders: string[];
// //   iconColor: string;
// // }

// // interface Icon {
// //   name: string;
// //   path: string;
// //   similarNames?: string[]; // نام‌های مشابه از JSON
// // }

// // const ShapeIcon: React.FC<ShapeIconProps> = ({
// //   searchTerm,
// //   switchChecked,
// //   selectedFolders,
// //   iconColor,
// // }) => {
// //   const [icons, setIcons] = useState<Icon[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});
// //   const [filteredIcons, setFilteredIcons] = useState<Icon[]>([]);
// //   const [copyMessages, setCopyMessages] = useState<{ [key: string]: string | null }>({}); // وضعیت برای پیام کپی

// //   useEffect(() => {
// //     const fetchIcons = async () => {
// //       try {
// //         // واکشی آیکون‌ها از S3
// //         const response = await axios.get(
// //           'https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=icons/shape&max-keys=1000'
// //         );
// //         const parser = new XMLParser();
// //         const jsonData = parser.parse(response.data);
// //         const fetchedIcons = jsonData.ListBucketResult.Contents.map((item: any) => ({
// //           name: item.Key.split('/').pop(),
// //           path: item.Key,
// //         }));

// //         // واکشی JSON برای نام‌های مشابه
// //         const jsonResponse = await axios.get(`https://orbit-website.s3.ir-thr-at1.arvanstorage.ir/IconList.json?t=${Date.now()}`);

// //         const similarNamesData = jsonResponse.data;

// //         // ترکیب اطلاعات JSON با آیکون‌ها
// //         const iconsWithSimilarNames = fetchedIcons.map((icon: Icon) => {
// //           const similarNamesEntry = similarNamesData[icon.name.replace('.svg', '')];
// //           const similarNames = similarNamesEntry ? similarNamesEntry : [];
// //           return { ...icon, similarNames };
// //         });

// //         setIcons(iconsWithSimilarNames);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error('Error fetching icons or JSON data:', error);
// //         setError('Error receiving icons or JSON data');
// //         setLoading(false);
// //       }
// //     };

// //     fetchIcons();
// //   }, []);

// //   useEffect(() => {
// //     const fuse = new Fuse(icons, {
// //       threshold: 0.3,
// //       includeMatches: true,
// //       keys: ['name', 'similarNames'], // جستجو در نام و نام‌های مشابه
// //     });
// //     const result = fuse.search(searchTerm);
// //     const iconsToBeFiltered = searchTerm
// //       ? result.map(({ item }) => item)
// //       : icons;



// //     const filtered = iconsToBeFiltered
// //       .filter((icon) => {
// //         const iconType = switchChecked ? 'fill' : 'outline';
// //         return icon.path.includes(iconType);
// //       })
// //       .filter((icon) => icon.name.toLowerCase().endsWith('.svg'))
// //       .filter((icon) => {
// //         const iconFolder = icon.path.split('/')[2];
// //         return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
// //       })

// //       .sort((a, b) => a.name.localeCompare(b.name));

// //     setFilteredIcons(filtered);
// //   }, [icons, searchTerm, switchChecked, selectedFolders]);

// //   const fetchSvgContent = async (url: string, iconName: string) => {
// //     try {
// //       const response = await axios.get(url);
// //       const svgData = response.data;
// //       const coloredSvg = svgData
// //         .replace(/fill="[^"]*"/g, `fill="${iconColor}"`)
// //         .replace(/stroke="[^"]*"/g, `fill="${iconColor}"`);
// //       setSvgContent((prev) => ({
// //         ...prev,
// //         [iconName]: coloredSvg,
// //       }));
// //     } catch (error) {
// //       console.error('Error fetching SVG content:', error);
// //     }
// //   };

// //   const formatIconName = (name: string) => {
// //     return name
// //       .replace('.svg', '')          // حذف پسوند .svg
// //       .replace(/-\d+$/, '')        // حذف عدد از انتهای نام (مثلاً -2 یا -3)
// //       .replace(/-/g, ' ')          // جایگزینی - با فاصله
// //       .split(' ')                  // تقسیم نام به کلمات
// //       .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // تبدیل حرف اول هر کلمه به بزرگ
// //       .join(' ');                  // ترکیب مجدد کلمات با فاصله
// //   };

// //   useEffect(() => {
// //     filteredIcons.forEach((icon) => {
// //       const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
// //       fetchSvgContent(imageUrl, icon.name);
// //     });
// //   }, [filteredIcons, iconColor]);

// //   const handleDownload = (iconName: string, svgData: string) => {
// //     const blob = new Blob([svgData], { type: 'image/svg+xml' });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement('a');
// //     link.href = url;
// //     link.download = iconName;
// //     link.click();
// //     URL.revokeObjectURL(url);
// //   };

// //   const copyToClipboard = (iconName: string, svgContent: string) => {
// //     navigator.clipboard.writeText(svgContent).then(() => {
// //       setCopyMessages((prev) => ({
// //         ...prev,
// //         [iconName]: 'Copied!!',
// //       }));

// //       setTimeout(() => {
// //         setCopyMessages((prev) => ({
// //           ...prev,
// //           [iconName]: null,
// //         }));
// //       }, 2000); // پیام بعد از 2 ثانیه ناپدید می‌شود
// //     }).catch((err) => {
// //       console.error('Failed to copy SVG: ', err);
// //     });
// //   };
  

// //   return (
// //     <div className="icon-shape-body">
// //       {loading ? (
// //         <div className="loading">
// //           <img src={loadingG} alt="logo" width="128px" height="128px" />
// //           <span>Loading...</span>
// //         </div>
// //       ) : error ? (
// //         <p>{error}</p>
// //       ) : (
// //         <div className="shape-icon-list">
// //           {filteredIcons.length > 0 ? (
// //             filteredIcons.map((icon) => {
// //               const svgData = svgContent[icon.name];
// //               return (
// //                 <div className="item" onClick={() => handleDownload(icon.name, svgData)}>
// //                   <div className='flot-button'  >
// //                   <OrButton
// //                     variant='secondary'
// //                     size='xs'
// //                     icon={<Icon.copy/>}
// //                     appearance = 'outline'
// //                     layout='icon'
// //                     onClick={() => {
// //                       copyToClipboard(icon.name, svgContent[icon.name]);
// //                     }}
// //                   />
// //                   {copyMessages[icon.name] && ( // پیام فقط برای آیکون انتخاب شده
// //                   <div className="tooltip">
// //                     {copyMessages[icon.name]}
// //                   </div>
// //                 )}
// //                   </div>
// //                   {svgData ? (
// //                     <div className="icon-wrapper">
// //                       <div
// //                         className="svg-shape-icon"
// //                         dangerouslySetInnerHTML={{ __html: svgData }}
// //                         onClick={() => handleDownload(icon.name, svgData)}
// //                       />
                  
                  
// //                     </div>
// //                   ) : (
// //                     <span className="skelton"></span>
// //                   )}
// //                   <span className="b2 icon-name">{formatIconName(icon.name)}</span>
// //                 </div>
// //               );
// //             })
// //           ) : (
// //             <div>
// //               <span>Icon not found</span>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ShapeIcon;

// import React, { useEffect, useState } from 'react';
// import './ShapeIcon.scss';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import loadingG from '../../assets/loading.gif';
// import '../../base/type-style.scss';
// import Fuse from 'fuse.js';
// import OrLoadding from '../OrLoading/OrLoading'
// import OrButton from '../OrButton/OrButton';
// import Icon from '../../assets/Icon';

// interface ShapeIconProps {
//   searchTerm: string;
//   switchChecked: boolean;
//   selectedFolders: string[];
//   iconColor: string;
// }

// interface Icon {
//   name: string;
//   path: string;
//   similarNames?: string[];
// }

// const ShapeIcon: React.FC<ShapeIconProps> = ({
//   searchTerm,
//   switchChecked,
//   selectedFolders,
//   iconColor,
// }) => {
//   const [icons, setIcons] = useState<Icon[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});
//   const [filteredIcons, setFilteredIcons] = useState<Icon[]>([]);
//   const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false); // مدیریت ساید پنل
//   const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null); // ذخیره آیکون انتخاب شده

//   useEffect(() => {
//     const fetchIcons = async () => {
//       try {
//         const response = await axios.get(
//           'https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=icons/shape&max-keys=1000'
//         );
//         const parser = new XMLParser();
//         const jsonData = parser.parse(response.data);
//         const fetchedIcons = jsonData.ListBucketResult.Contents.map((item: any) => ({
//           name: item.Key.split('/').pop(),
//           path: item.Key,
//         }));
//         setIcons(fetchedIcons);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching icons:', error);
//         setError('Error receiving icons');
//         setLoading(false);
//       }
//     };

//     fetchIcons();
//   }, []);

//   useEffect(() => {
//     const fuse = new Fuse(icons, {
//       threshold: 0.3,
//       keys: ['name'],
//     });
//     const result = fuse.search(searchTerm);
//     const iconsToBeFiltered = searchTerm
//       ? result.map(({ item }) => item)
//       : icons;

//     const filtered = iconsToBeFiltered
//       .filter((icon) => {
//         const iconType = switchChecked ? 'fill' : 'outline';
//         return icon.path.includes(iconType);
//       })
//       .filter((icon) => icon.name.toLowerCase().endsWith('.svg'))
//       .filter((icon) => {
//         const iconFolder = icon.path.split('/')[2];
//         return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
//       });

//     setFilteredIcons(filtered);
//   }, [icons, searchTerm, switchChecked, selectedFolders]);

//   const fetchSvgContent = async (url: string, iconName: string) => {
//     try {
//       const response = await axios.get(url);
//       const svgData = response.data;
//       const coloredSvg = svgData
//         .replace(/fill="[^"]*"/g, `fill="${iconColor}"`)
//         .replace(/stroke="[^"]*"/g, `fill="${iconColor}"`);
//       setSvgContent((prev) => ({
//         ...prev,
//         [iconName]: coloredSvg,
//       }));
//     } catch (error) {
//       console.error('Error fetching SVG content:', error);
//     }
//   };

//   useEffect(() => {
//     filteredIcons.forEach((icon) => {
//       const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
//       fetchSvgContent(imageUrl, icon.name);
//     });
//   }, [filteredIcons, iconColor]);

//   const openSidePanel = (icon: Icon) => {
//     setSelectedIcon(icon);
//     setIsSidePanelOpen(true);
//   };

//   const closeSidePanel = () => {
//     setIsSidePanelOpen(false);
//     setSelectedIcon(null);
//   };

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
//         <div className="shape-icon-list">
//           {filteredIcons.length > 0 ? (
//             filteredIcons.map((icon) => {
//               const svgData = svgContent[icon.name];
//               return (
//                 <div className="item" key={icon.path} onClick={() => openSidePanel(icon)}>
//                   {svgData ? (
//                     <div className="icon-wrapper">
//                       <div
//                         className="svg-shape-icon"
//                         dangerouslySetInnerHTML={{ __html: svgData }}
//                       />
//                     </div>
//                   ) : (
//                     <span className="skelton"></span>
//                   )}
//                   <span className="b1 icon-name">{icon.name.replace('.svg', '')}</span>
//                 </div>
//               );
//             })
//           ) : (
//             <div>
//               <span>Icon not found</span>
//             </div>
//           )}
//         </div>
//       )}

//       {isSidePanelOpen && selectedIcon && (
//         <div className="side-panel">
//           <button onClick={closeSidePanel}>Close</button>
//           <h2>{selectedIcon.name.replace('.svg', '')}</h2>
//           <div
//             dangerouslySetInnerHTML={{ __html: svgContent[selectedIcon.name] }}
//             className="svg-details"
//           />
//           <p>Path: {selectedIcon.path}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShapeIcon;
import React, { useEffect, useState } from 'react';
import './IconList.scss';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import loadingG from '../../assets/loading.gif';
import '../../base/type-style.scss';
import Fuse from 'fuse.js';
import JSZip from 'jszip'; // import JSZip
import OrLoadding from '../OrLoading/OrLoading'
import OrButton from '../OrButton/OrButton';
import Icon from '../../assets/Icon';

interface ShapeIconProps {
  searchTerm: string;
  switchChecked: boolean;
  selectedFolders: string[];
  iconColor: string;
}

interface Icon {
  name: string;
  path: string;
  similarNames?: string[];
}

const ShapeIcon: React.FC<ShapeIconProps> = ({
  searchTerm,
  switchChecked,
  selectedFolders,
  iconColor,
}) => {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});
  const [filteredIcons, setFilteredIcons] = useState<Icon[]>([]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);
  const [selectedIcons, setSelectedIcons] = useState<Icon[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await axios.get(
          'https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=icons/shape&max-keys=1000'
        );
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
  }, []);

  useEffect(() => {
    const fuse = new Fuse(icons, {
      threshold: 0.3,
      keys: ['name'],
    });
    const result = fuse.search(searchTerm);
    const iconsToBeFiltered = searchTerm
      ? result.map(({ item }) => item)
      : icons;

    const filtered = iconsToBeFiltered
      .filter((icon) => {
        const iconType = switchChecked ? 'fill' : 'outline';
        return icon.path.includes(iconType);
      })
      .filter((icon) => icon.name.toLowerCase().endsWith('.svg'))
      .filter((icon) => {
        const iconFolder = icon.path.split('/')[2];
        return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
      });

    setFilteredIcons(filtered);
  }, [icons, searchTerm, switchChecked, selectedFolders]);

  const fetchSvgContent = async (url: string, iconName: string) => {
    try {
      const response = await axios.get(url);
      const svgData = response.data;
      const coloredSvg = svgData
        .replace(/fill="[^"]*"/g, `fill="${iconColor}"`)
        .replace(/stroke="[^"]*"/g, `stroke="${iconColor}"`);
      setSvgContent((prev) => ({
        ...prev,
        [iconName]: coloredSvg,
      }));
    } catch (error) {
      console.error('Error fetching SVG content:', error);
    }
  };

  useEffect(() => {
    filteredIcons.forEach((icon) => {
      const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
      fetchSvgContent(imageUrl, icon.name);
    });
  }, [filteredIcons, iconColor]);

  const toggleIconSelection = (icon: Icon) => {
    if (selectedIcons.some(selectedIcon => selectedIcon.name === icon.name)) {
      setSelectedIcons(selectedIcons.filter(selectedIcon => selectedIcon.name !== icon.name));
    } else {
      setSelectedIcons([...selectedIcons, icon]);
    }

    setIsSidePanelOpen(true);
  };

  const downloadSelectedIconsAsZip = async () => {
    const zip = new JSZip();

    // افزودن آیکون‌های انتخاب‌شده به فایل ZIP
    for (const icon of selectedIcons) {
      const svg = svgContent[icon.name];
      if (svg) {
        zip.file(icon.name, svg); // نام فایل را به عنوان آیکون استفاده کنید
      }
    }

    // تولید فایل ZIP
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected_icons.zip'; // نام فایل ZIP
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setSelectedIcons([]); // خالی کردن لیست آیکون‌های انتخاب شده
    setIsSidePanelOpen(false); // بستن ساید پنل
  };

  const handleCopySvg = () => {
    if (selectedIcons.length === 1) {
      const svg = svgContent[selectedIcons[0].name];
      navigator.clipboard.writeText(svg).then(() => {
        alert('کد SVG کپی شد!');
      });
    }
  };

  const downloadSingleIcon = (icon: Icon) => {
    const svg = svgContent[icon.name];
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = icon.name; // نام فایل آیکون
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="icon-body">
      {loading ? (
        <div className="loading">
          <img src={loadingG} alt="logo" width="128px" height="128px" />
          <span>Loading...</span>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="shape-icon-list">
          {filteredIcons.length > 0 ? (
            filteredIcons.map((icon) => {
              const svgData = svgContent[icon.name];
              const isSelected = selectedIcons.some(selectedIcon => selectedIcon.name === icon.name);
              return (
                <div 
                  className={`item ${isSelected ? 'selected' : ''}`} 
                  key={icon.path} 
                  onClick={() => toggleIconSelection(icon)}
                >
                  {svgData ? (
                    <div className="icon-wrapper">
                      <div
                        className="svg-shape-icon"
                        dangerouslySetInnerHTML={{ __html: svgData }}
                      />
                    </div>
                  ) : (
                    <span className="skelton"></span>
                  )}
                  <span className="b1 icon-name">{icon.name.replace('.svg', '')}</span>
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

      {isSidePanelOpen && (
        <div className="side-panel">
          <button onClick={handleClose}>Close</button>
          {selectedIcons.length === 0 ? null : (
            <div>
              <div className="selected-icons">
                {selectedIcons.map(icon => (
                  <div key={icon.name} className="selected-icon">
                    <div
                      className="svg-shape-icon"
                      dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                    />
                    <span>{icon.name.replace('.svg', '')}</span>
                  </div>
                ))}
              </div>
              {selectedIcons.length === 1 && (
                <>
                  <button onClick={handleCopySvg}>کپی SVG</button>
                  <button onClick={() => downloadSingleIcon(selectedIcons[0])}>دانلود آیکون</button>
                  <h3>SVG Code:</h3>
                  <textarea
                    value={svgContent[selectedIcons[0].name]}
                    readOnly
                    rows={10}
                    className="svg-code-box"
                  />
                </>
              )}
              {selectedIcons.length > 1 && (
                <button onClick={downloadSelectedIconsAsZip}>دانلود آیکون‌های انتخاب شده</button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShapeIcon;
