import React, { useEffect, useState } from 'react';
import './IconList.scss';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import loadingG from '../../assets/loading.gif';
import OrButton from '../OrButton/OrButton';
import Fuse from 'fuse.js';
import JSZip from 'jszip';
import Icon from '../../assets/Icon';

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
  const [copyMessages, setCopyMessages] = useState<{ [key: string]: string | null }>({});
  const [selectedIcons, setSelectedIcons] = useState<Icon[]>([]);

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

        setIcons(iconsWithSimilarNames);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching icons:', error);
        setError('Error receiving icons');
        setLoading(false);
      }
    };

    fetchIcons();
  }, []);

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
      .replace('.svg', '')
      .replace(/-\d+$/, '')
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
    URL.revokeObjectURL(url);
  };

  const downloadSelectedIcons = () => {
    const zip = new JSZip();
    selectedIcons.forEach((icon) => {
      const svgContentValue = svgContent[icon.name];
      if (svgContentValue) {
        zip.file(icon.name, svgContentValue);
      }
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'selected-icons.zip';
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  const fuse = new Fuse(icons, {
    threshold: 0.3,
    includeMatches: true,
    keys: ['name', 'similarNames'],
  });
  const result = fuse.search(searchTerm);
  const filteredIcons = searchTerm
    ? result.map(({ item }) => item)
    : icons;

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
      }, 2000);
    }).catch((err) => {
      console.error('Failed to copy SVG: ', err);
    });
  };

  const toggleSelectIcon = (icon: Icon) => {
    if (selectedIcons.includes(icon)) {
      setSelectedIcons(selectedIcons.filter((i) => i !== icon));
    } else {
      setSelectedIcons([...selectedIcons, icon]);
    }
  };

  // تابع برای حذف آیکون انتخاب‌شده
  const removeSelectedIcon = (icon: Icon) => {
    setSelectedIcons(selectedIcons.filter((i) => i !== icon));
  };

  const downloadText = `Download ( ${selectedIcons.length} ) Icons`;

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
        <div className='icon-list-main'>
          <div className="icon-list">
          {finalIcons.length > 0 ? (
            finalIcons.map((icon) => (
              <div 
                className={`item ${selectedIcons.includes(icon) ? 'selected' : ''}`} 
                key={icon.path} 
                onClick={() => toggleSelectIcon(icon)}
              >
                {svgContent[icon.name] ? (
                  <div className="icon-wrapper">
                    <div
                      className="svg-container"
                      dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                      
                    />
                  </div>
                ) : (
                  <span className="skelton"></span>
                )}
                <span className="b2 icon-name">{formatIconName(icon.name)}</span>
                {copyMessages[icon.name] && (
                  <div className="tooltip">
                    {copyMessages[icon.name]}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>
              <span>Icon not found</span>
            </div>
          )}
        </div>
        </div>
      )}
      
      {selectedIcons.length > 0 && (
        <div className="side-panel">
          <div className='filter-header'>
            <h3>({selectedIcons.length}) Selected</h3> {/* تعداد آیکون‌های انتخاب شده */}
            <OrButton
              layout='icon'
              appearance='outline'
              variant='secondary'
              icon={<Icon.cross />}
              onClick={() => { setSelectedIcons([]); }}
            />
          </div>
          <div className='side-panel-body'>
            {selectedIcons.map((icon) => (
              <div className='side-panel-item' key={icon.name}>
                <div className='side-panel-item-body'>
                  <div
                    className="sidepabel-svg-container"
                    dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                  />
                  <span>{formatIconName(icon.name)}</span>
                  <OrButton
                    variant='secondary'
                    appearance='outline'
                    size='sm'
                    layout='icon'
                    icon={<Icon.trash />}
                    onClick={() => removeSelectedIcon(icon)} // دکمه حذف آیکون
                  />
                </div>
              </div>
            ))}
            {selectedIcons.length === 1 && (
              <div className='svg-code'>
                
                <div className='single-download-box'>
                  <OrButton
                    layout='icon-text'
                    appearance='fill'
                    variant='secondary'
                    icon={<Icon.download />}
                    text='Download'
                    onClick={() => downloadSvg(selectedIcons[0].name, svgContent[selectedIcons[0].name])}
                  />
                  <OrButton
                    layout='icon-text'
                    appearance='outline'
                    variant='secondary'
                    icon={<Icon.copy />}
                    text='copy'
                    onClick={() => copyToClipboard(selectedIcons[0].name, svgContent[selectedIcons[0].name])}
                  />
                </div>
                <h4>SVG Code:</h4>
                <div className="svg-code-box">
                  <pre>
                    <code>
                      {svgContent[selectedIcons[0].name]}
                    </code>
                  </pre>
                </div>
              </div>
            )}
            
          </div>
          {selectedIcons.length > 1 && (
            <div className='dowload-button-box'>
              <OrButton
              layout='icon-text'
              appearance='fill'
              variant='primary'
              icon={<Icon.download />}
              text={downloadText}
              onClick={downloadSelectedIcons}
            />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StrokeIcon;
