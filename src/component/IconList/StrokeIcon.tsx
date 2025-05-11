import React, { useEffect, useState, CSSProperties } from 'react';
import './IconList.scss';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import loadingG from '../../assets/loading.gif';
import OrButton from '../OrButton/OrButton';
import Fuse from 'fuse.js';
import JSZip from 'jszip';
import Icon from '../../assets/Icon';
import SidePanel from '../SidePanel';
import ill from '../../assets/404.png'

interface Icon {
  name: string;
  path: string;
  similarNames?: string[];
}

interface StrokeIconProps {
  searchTerm: string;
  selectedFolders: string[];
  strokeColor: string;
  strokeWidth: number;
  onSelectIcon?: (icon: Icon, svgContent: string) => void;
}

const StrokeIcon: React.FC<StrokeIconProps> = ({ searchTerm, selectedFolders, strokeColor, strokeWidth, onSelectIcon }) => {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});
  const [copyMessages, setCopyMessages] = useState<{ [key: string]: string | null }>({});
  const [selectedIcons, setSelectedIcons] = useState<Icon[]>([]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

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

        const jsonResponse = await axios.get(`https://orbit-beta.s3.ir-thr-at1.arvanstorage.ir/IconList.json?t=${Date.now()}`);
        const similarNamesData = jsonResponse.data;

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

      const svgWithCurrentColor = svgData
        .replace(/stroke="[^"]*"/g, `stroke="currentColor"`)
        .replace(/stroke-width="[^"]*"/g, `stroke-width="currentWidth"`);

      setSvgContent((prev) => ({
        ...prev,
        [iconName]: svgWithCurrentColor,
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
  }, [icons]);

  const downloadSvg = (iconName: string, svgContent: string) => {
    let svg = svgContent;

    svg = svg
      .replace(/stroke="currentColor"/g, `stroke="${strokeColor}"`)
      .replace(/stroke-width="currentWidth"/g, `stroke-width="${strokeWidth}px"`);

    const blob = new Blob([svg], { type: 'image/svg+xml' });
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
      let svg = svgContent[icon.name];

      if (svg) {
        svg = svg
          .replace(/stroke="currentColor"/g, `stroke="${strokeColor}"`)
          .replace(/stroke-width="currentWidth"/g, `stroke-width="${strokeWidth}px"`);

        zip.file(icon.name, svg);
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

    // const copyToClipboard = (iconName: string, svgContent: string) => {
    //   let svg = svgContent;

    //   // تنظیم مقدار stroke و stroke-width قبل از کپی
    //   svg = svg
    //     .replace(/stroke="currentColor"/g, `stroke="${strokeColor}"`)
    //     .replace(/stroke-width="currentWidth"/g, `stroke-width="${strokeWidth}px"`);

    //   navigator.clipboard.writeText(svg).then(() => {
    //     setCopyMessages((prev) => ({
    //       ...prev,
    //       [iconName]: 'Copied!!',
    //     }));

    //     setTimeout(() => {
    //       setCopyMessages((prev) => ({
    //         ...prev,
    //         [iconName]: null,
    //       }));
    //     }, 2000);
    //   }).catch((err) => {
    //     console.error('Failed to copy SVG: ', err);
    //   });
    // };

    const CopyButton: React.FC<{ svg: string, strokeColor: string, strokeWidth: number }> = ({ svg, strokeColor, strokeWidth }) => {
      const [buttonText, setButtonText] = useState('Copy SVG');

      const handleCopySvg = () => {

        let svgContentLocal = svg
          .replace(/stroke="currentColor"/g, `stroke="${strokeColor}"`)
          .replace(/stroke-width="currentWidth"/g, `stroke-width="${strokeWidth}px"`);


        navigator.clipboard.writeText(svgContentLocal).then(() => {
          setButtonText('Copied');


          setTimeout(() => {
            setButtonText('Copy');
          }, 2000);
        });
      };

      return (
        <OrButton
          layout='icon-text'
          appearance='outline'
          text={buttonText}
          variant='secondary'
          icon={<Icon.copy />}
          onClick={handleCopySvg}
        />
      );
    };



  const toggleSelectIcon = (icon: Icon) => {
    // If onSelectIcon prop is provided, use it
    if (onSelectIcon && svgContent[icon.name]) {
      onSelectIcon(icon, svgContent[icon.name]);
      return;
    }

    // Otherwise, use the original implementation
    if (selectedIcons.includes(icon)) {
      // Deselecting an icon
      const updatedSelectedIcons = selectedIcons.filter((i) => i !== icon);

      if (updatedSelectedIcons.length === 0) {
        // If no icons left, hide the panel with animation
        setIsSidePanelOpen(false);
        // Then after animation completes, clear selected icons
        setTimeout(() => {
          setSelectedIcons([]);
        }, 300); // Match this with the CSS transition duration
      } else {
        // If there are still selected icons, update the selection
        setSelectedIcons(updatedSelectedIcons);
      }
    } else {
      // Selecting a new icon
      const updatedSelectedIcons = [...selectedIcons, icon];
      setSelectedIcons(updatedSelectedIcons);

      // If this is the first icon being selected, we need to handle the animation differently
      if (selectedIcons.length === 0) {
        // First render the panel with hidden class
        setTimeout(() => {
          // Then set it to visible to trigger the animation
          setIsSidePanelOpen(true);
        }, 10); // Small delay to ensure the DOM has updated
      } else {
        setIsSidePanelOpen(true);
      }
    }
  };

  const removeSelectedIcon = (icon: Icon) => {
    const updatedIcons = selectedIcons.filter((i) => i !== icon);

    if (updatedIcons.length === 0) {
      // First hide the panel with animation
      setIsSidePanelOpen(false);
      // Then after animation completes, clear selected icons
      setTimeout(() => {
        setSelectedIcons([]);
      }, 300); // Match this with the CSS transition duration
    } else {
      setSelectedIcons(updatedIcons);
    }
  };

  const downloadText = `Download ( ${selectedIcons.length} ) Icons`;

  return (
    <div className="icon-body">
      {loading ? (
        <div className="loading">
          <img src={loadingG} alt="logo" width="160px" height="160px" />
          <span className='t1-strong'>Loading...</span>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="icon-list-main">
          <div className="icon-list">
          {finalIcons.length > 0 ? (
            finalIcons.map((icon) => (
              <div
                className={`item ${selectedIcons.includes(icon) ? 'selected' : ''}`}
                key={icon.path}
                onClick={() => toggleSelectIcon(icon)}
                // تنظیم استایل CSS با متغیرهای سفارشی
                // style={{
                //   color: strokeColor,
                //   '--stroke-width': `${strokeWidth}px` } as CSSProperties}
              >
                {svgContent[icon.name] ? (
                <div className="icon-wrapper">
                  <div
                    className="svg-container"
                    dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                    style={{
                      color: strokeColor,
                      strokeWidth: strokeWidth, // مستقیماً مقدار strokeWidth تنظیم می‌شود
                    }}
                  />
                </div>
              ) : (
                <span className="skelton"></span>
              )}
                <span className=" c1-strong icon-name">{formatIconName(icon.name)}</span>
                {copyMessages[icon.name] && (
                  <div className="tooltip">
                    {copyMessages[icon.name]}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className='not-found'>
              <div>
                <img src={ill}  width="240px"></img>
              </div>
              <span className='b2-strong'>Icon not found</span>
            </div>
          )}
        </div>
        </div>
      )}

      {/* Only render the SidePanel if onSelectIcon is not provided */}
      {!onSelectIcon && selectedIcons.length > 0 && (
  <SidePanel
    isOpen={isSidePanelOpen}
    onClose={() => {
      setIsSidePanelOpen(false);
      setTimeout(() => {
        setSelectedIcons([]);
      }, 300);
    }}
    title={`(${selectedIcons.length}) Selected`}
    downloadButton={selectedIcons.length > 1 ? {
      text: downloadText,
      onClick: downloadSelectedIcons
    } : undefined}
  >
    {selectedIcons.length === 1 ? (
      <div className='icon-preview'>
        <div className="svg-preview-box">
          <div className="b1-strong icon-sidepanel-name">
            {formatIconName(selectedIcons[0].name)}
          </div>
          <div
            className="svg-preview"
            dangerouslySetInnerHTML={{ __html: svgContent[selectedIcons[0].name] }}
            style={{
              color: strokeColor,
              strokeWidth: strokeWidth,
            }}
          />
          <div className='single-download-box'>
            <OrButton
              layout='icon-text'
              appearance='fill'
              variant='secondary'
              icon={<Icon.download />}
              text='SVG'
              onClick={() => downloadSvg(selectedIcons[0].name, svgContent[selectedIcons[0].name])}
            />
            <CopyButton
              svg={svgContent[selectedIcons[0].name]}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
            />
          </div>
        </div>
        <div className='svg-box'></div>
      </div>
    ) : (
      selectedIcons.map((icon) => (
        <div className='side-panel-item' key={icon.name}>
          <div className='side-panel-item-body'>
            <div
              className="sidepabel-svg-container"
              dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
              style={{
                color: strokeColor,
                strokeWidth: strokeWidth,
              }}
            />
            <span className='b2'>{formatIconName(icon.name)}</span>
            <OrButton
              variant='error'
              appearance='ghost'
              size='sm'
              layout='icon'
              icon={<Icon.trash />}
              onClick={() => removeSelectedIcon(icon)}
            />
          </div>
        </div>
      ))
    )}
  </SidePanel>
)}

    </div>
  );
};

export default StrokeIcon;
