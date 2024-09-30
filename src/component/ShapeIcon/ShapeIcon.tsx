// import React, { useEffect, useState } from 'react';
// import './ShapeIcon.scss';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import loadingG from '../../assets/loading.gif';
// import '../../base/type-style.scss';
// import Fuse from 'fuse.js';

// interface ShapeIconProps {
//   searchTerm: string;
//   switchChecked: boolean;
//   selectedFolders: string[];
//   iconColor: string
// }

// const ShapeIcon: React.FC<ShapeIconProps> = ({
//   searchTerm,
//   switchChecked,
//   selectedFolders,
//   iconColor,
// }) => {
//   const [icons, setIcons] = useState<{ name: string; path: string }[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});
//   const [filteredIcons, setFilteredIcons] = useState<{ name: string; path: string }[]>([]);

//   useEffect(() => {
//     const fetchIcons = async () => {
//       try {
//         const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=icons/shape&max-keys=1000');
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
//       // isCaseSensitive: false,
//       // includeScore: false,
//       // shouldSort: true,
//       // includeMatches: false,
//       // findAllMatches: false,
//       // minMatchCharLength: 1,
//       // location: 0,
//       threshold: 0.3,
//       // distance: 100,
//       // useExtendedSearch: false,
//       // ignoreLocation: false,
//       // ignoreFieldNorm: false,
//       // fieldNormWeight: 1,
//       keys: ['name']
//     });
//     const result = fuse.search(searchTerm);
//     console.log('Filtered icons:', result);
//     const iconsToBeFiltered = searchTerm 
//       ? result.map(({item: {name, path}}) => ({ name, path  }))
//       : icons

//     const filtered = iconsToBeFiltered
//       // .filter((icon) => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))
//       .filter((icon) => {
//         const iconType = switchChecked ? 'fill' : 'outline';
//         return icon.path.includes(iconType);
//       })
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
//     // فراخوانی مجدد محتوای SVG برای هر آیکون فیلتر شده
//     filteredIcons.forEach((icon) => {
//       const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
//       fetchSvgContent(imageUrl, icon.name); // واکشی هر آیکون و به‌روزرسانی محتوای SVG
//     });
//   }, [filteredIcons, iconColor]); // هر بار که لیست آیکون‌های فیلتر شده یا رنگ تغییر کرد، اجرا شود

//   const handleDownload = (iconName: string, svgData: string) => {
//     const blob = new Blob([svgData], { type: 'image/svg+xml' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = iconName;
//     link.click();
//     URL.revokeObjectURL(url);
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
//                 <div className="item" key={icon.path}>
//                   {svgData ? (
//                     <div className="icon-wrapper">
//                       <div
//                         className="svg-shape-icon"
//                         dangerouslySetInnerHTML={{ __html: svgData }}
//                         onClick={() => handleDownload(icon.name, svgData)}
//                       />
//                     </div>
//                   ) : (
//                     <span className="skelton">Loading SVG...</span>
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
import Fuse from 'fuse.js';

interface ShapeIconProps {
  searchTerm: string;
  switchChecked: boolean;
  selectedFolders: string[];
  iconColor: string;
}

interface Icon {
  name: string;
  path: string;
  similarNames?: string[]; // نام‌های مشابه از JSON
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

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        // واکشی آیکون‌ها از S3
        const response = await axios.get(
          'https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=icons/shape&max-keys=1000'
        );
        const parser = new XMLParser();
        const jsonData = parser.parse(response.data);
        const fetchedIcons = jsonData.ListBucketResult.Contents.map((item: any) => ({
          name: item.Key.split('/').pop(),
          path: item.Key,
        }));

        // واکشی JSON برای نام‌های مشابه
        const jsonResponse = await axios.get(`https://orbit-website.s3.ir-thr-at1.arvanstorage.ir/IconList.json?t=${Date.now()}`);

        const similarNamesData = jsonResponse.data;

        // ترکیب اطلاعات JSON با آیکون‌ها
        const iconsWithSimilarNames = fetchedIcons.map((icon: Icon) => {
          const similarNamesEntry = similarNamesData[icon.name.replace('.svg', '')];
          const similarNames = similarNamesEntry ? similarNamesEntry : [];
          return { ...icon, similarNames };
        });

        setIcons(iconsWithSimilarNames);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching icons or JSON data:', error);
        setError('Error receiving icons or JSON data');
        setLoading(false);
      }
    };

    fetchIcons();
  }, []);

  useEffect(() => {
    const fuse = new Fuse(icons, {
      threshold: 0.3,
      includeMatches: true,
      keys: ['name', 'similarNames'], // جستجو در نام و نام‌های مشابه
    });
    const result = fuse.search(searchTerm);
    const iconsToBeFiltered = searchTerm
      ? result.map(({ item }) => item)
      : icons;

      console.log(result);

    const filtered = iconsToBeFiltered
      .filter((icon) => {
        const iconType = switchChecked ? 'fill' : 'outline';
        return icon.path.includes(iconType);
      })
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
        .replace(/stroke="[^"]*"/g, `fill="${iconColor}"`);
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
    filteredIcons.forEach((icon) => {
      const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
      fetchSvgContent(imageUrl, icon.name);
    });
  }, [filteredIcons, iconColor]);

  const handleDownload = (iconName: string, svgData: string) => {
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = iconName;
    link.click();
    URL.revokeObjectURL(url);
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
        <div className="shape-icon-list">
          {filteredIcons.length > 0 ? (
            filteredIcons.map((icon) => {
              const svgData = svgContent[icon.name];
              return (
                <div className="item" key={icon.path}>
                  {svgData ? (
                    <div className="icon-wrapper">
                      <div
                        className="svg-shape-icon"
                        dangerouslySetInnerHTML={{ __html: svgData }}
                        onClick={() => handleDownload(icon.name, svgData)}
                      />
                    </div>
                  ) : (
                    <span className="skelton">Loading SVG...</span>
                  )}
                  <span className="b2 icon-name">{formatIconName(icon.name)}</span>
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
