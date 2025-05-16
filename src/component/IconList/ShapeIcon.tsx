import React, { useEffect, useState } from 'react';
import './IconList.scss';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import loadingG from '../../assets/loading.gif';
import '../../base/type-style.scss';
import Fuse from 'fuse.js';
import JSZip from 'jszip'; // import JSZip
import OrButton from '../OrButton/OrButton';
import Icon from '../../assets/Icon';
import SidePanel from '../SidePanel';
import ill from '../../assets/404.png'

interface Icon {
  name: string;
  path: string;
  similarNames?: string[];
}

interface ShapeIconProps {
  searchTerm: string;
  switchChecked: boolean;
  selectedFolders: string[];
  iconColor: string;
  onSelectIcon?: (icon: Icon, svgContent: string) => void;
}

const ShapeIcon: React.FC<ShapeIconProps> = ({
  searchTerm,
  switchChecked,
  selectedFolders,
  iconColor,
  onSelectIcon,
}) => {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});
  const [filteredIcons, setFilteredIcons] = useState<Icon[]>([]);
  // Always start with the side panel closed
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);
  const [selectedIcons, setSelectedIcons] = useState<Icon[]>([]);
  const [suggestions, setSuggestions] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const fetchSuggestions = async () => {
      setError(null);

      try {
        const response = await axios.get('https://orbit-beta.s3.ir-thr-at1.arvanstorage.ir/IconList.json');
        const jsonSuggestions = response.data;

        const groupedSuggestions: { [key: string]: string[] } = {};

        Object.keys(jsonSuggestions).forEach(key => {
          groupedSuggestions[key] = jsonSuggestions[key];
        });

        // console.log(groupedSuggestions);
        setSuggestions(groupedSuggestions);
      } catch (err) {
        setError('Failed to load suggestions. Please try again later.');
      } finally {
      }
    };

    fetchSuggestions();
  }, []);

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
    const iconsWithSimilarNames = icons.map((icon: Icon) => ({
        suggestionList: suggestions[icon.name.replace('.svg', '')] || [],
        ...icon,
      }));

    const fuse = new Fuse(iconsWithSimilarNames, {
      threshold: 0.3,
      keys: ['name', 'suggestionList'],
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
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    setFilteredIcons(filtered);
  }, [icons, searchTerm, switchChecked, selectedFolders]);

  const fetchSvgContent = async (url: string, iconName: string) => {
    try {
      const response = await axios.get(url);
      const svgData = response.data;

      // تغییر fill و stroke به currentColor
      const svgWithCurrentColor = svgData
        .replace(/fill="[^"]*"/g, `fill="currentColor"`)
        .replace(/stroke="[^"]*"/g, `stroke="currentColor"`);

      setSvgContent((prev) => ({
        ...prev,
        [iconName]: svgWithCurrentColor,
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
  }, [filteredIcons]);

  const toggleIconSelection = (icon: Icon) => {
    // If onSelectIcon prop is provided, use it
    if (onSelectIcon && svgContent[icon.name]) {
      onSelectIcon(icon, svgContent[icon.name]);
      return;
    }

    // Otherwise, use the original implementation
    if (selectedIcons.some(selectedIcon => selectedIcon.name === icon.name)) {
      // Deselecting an icon
      const updatedSelectedIcons = selectedIcons.filter(selectedIcon => selectedIcon.name !== icon.name);

      if (updatedSelectedIcons.length === 0) {
        // If no icons left, hide the panel with animation
        setIsSidePanelOpen(false);
        // Then after animation completes, clear selected icons
        setTimeout(() => {
          setSelectedIcons([]);
        }, 300); // Match this with the CSS transition duration
      } else {
        // If there are still selected icons, update the selection
        // First hide the panel with animation
        setIsSidePanelOpen(false);

        // Then after a short delay, update the selection and show the panel again
        setTimeout(() => {
          setSelectedIcons(updatedSelectedIcons);
          setIsSidePanelOpen(true);
        }, 300); // Match this with the CSS transition duration
      }
    } else {
      // Selecting a new icon
      // First update the selected icons
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

  const formatIconName = (name: string) => {
    return name
      .replace('.svg', '')
      .replace(/-\d+$/, '')
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const removeSelectedIcon = (iconName: string) => {
    const updatedIcons = selectedIcons.filter(icon => icon.name !== iconName);
    setSelectedIcons(updatedIcons);

    if (updatedIcons.length === 0) {
      // First hide the panel with animation
      setIsSidePanelOpen(false);
      // Then after animation completes, clear selected icons
      setTimeout(() => {
        setSelectedIcons([]);
      }, 300); // Match this with the CSS transition duration
    }
  };

  const downloadSelectedIconsAsZip = async () => {
    const zip = new JSZip();

    for (const icon of selectedIcons) {
      let svg = svgContent[icon.name];
      if (svg) {
        // تغییر رنگ در زمان دانلود
        svg = svg
          .replace(/fill="currentColor"/g, `fill="${iconColor}"`)
          .replace(/stroke="currentColor"/g, `stroke="${iconColor}"`);
        zip.file(icon.name, svg);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'YOKO Orbit v1 (selected_icons).zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    // First hide the panel with animation
    setIsSidePanelOpen(false);
    // Then after animation completes, clear selected icons
    setTimeout(() => {
      setSelectedIcons([]);
    }, 300); // Match this with the CSS transition duration
  };

  const CopyButton: React.FC<{ svg: string }> = ({ svg }) => {
    const [buttonText, setButtonText] = useState('Copy SVG');

    const handleCopySvg = () => {


      let svgContentLocal = svg
      .replace(/fill="currentColor"/g, `fill="${iconColor}"`)

      navigator.clipboard.writeText(svgContentLocal).then(() => {
        setButtonText('Copied');



        // بازگرداندن متن به 'Copy' بعد از دو ثانیه
        setTimeout(() => {
          setButtonText('Copy');
        }, 2000);
      });
    };

    return (
      <OrButton
        layout='icon-text'
        appearance='outline'
        text={buttonText} // استفاده از متن ذخیره‌شده در state
        variant='secondary'
        icon={<Icon.copy />}
        onClick={handleCopySvg}
      />
    );
  };

  const downloadText = `Download ( ${selectedIcons.length} ) Icons`;

  const downloadSingleIcon = (icon: Icon) => {
    let svg = svgContent[icon.name];
    svg = svg
      .replace(/fill="currentColor"/g, `fill="${iconColor}"`)
      .replace(/stroke="currentColor"/g, `stroke="${iconColor}"`);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = icon.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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


                  <div className='announcement-wrapper'>
                    <a className='announcement '>
                        <div>
                              <b>Logo</b>
                        </div>
                        <div>
                            <div className='b2-strong'>
                                Yoko Space Design System v1.2
                            </div>
                            <div className='b2'>
                                This is test text
                            </div>
                        </div>
                    </a>
                </div>


          <div className="icon-list">
            {filteredIcons.length > 0 ? (
              filteredIcons.map((icon) => {
                const svgData = svgContent[icon.name];
                const isSelected = selectedIcons.some(selectedIcon => selectedIcon.name === icon.name);
                return (
                  <div
                    className={`item ${isSelected ? 'selected' : ''}`}
                    key={icon.path}
                    onClick={() => toggleIconSelection(icon)}
                    draggable={true}
                    onDragStart={(e) => {
                      // Prepare the SVG content with customized color
                      let customizedSvg = svgData
                        .replace(/fill="currentColor"/g, `fill="${iconColor}"`)
                        .replace(/stroke="currentColor"/g, `stroke="${iconColor}"`);

                      // Create a blob from the SVG content
                      const blob = new Blob([customizedSvg], { type: 'image/svg+xml' });

                      // Create a URL for the blob
                      const url = URL.createObjectURL(blob);

                      // Set the drag data for different targets
                      // For general web applications
                      e.dataTransfer.setData('text/plain', customizedSvg);
                      e.dataTransfer.setData('text/html', customizedSvg);

                      // For browsers and file system
                      e.dataTransfer.setData('text/uri-list', url);
                      e.dataTransfer.setData('DownloadURL', `image/svg+xml:${icon.name}:${url}`);

                      // For Figma and design applications
                      // Create a File object from the blob
                      const file = new File([blob], icon.name, { type: 'image/svg+xml' });

                      // Try to use the items API for better compatibility with design apps
                      try {
                        e.dataTransfer.items.add(file);
                      } catch (err) {
                        console.log('DataTransfer items API not supported');
                      }

                      // Set the drag image
                      const dragIcon = document.createElement('div');
                      dragIcon.innerHTML = svgData;
                      dragIcon.style.color = iconColor;
                      document.body.appendChild(dragIcon);
                      e.dataTransfer.setDragImage(dragIcon, 25, 25);
                      setTimeout(() => {
                        document.body.removeChild(dragIcon);
                      }, 0);

                      // Set effectAllowed to all to ensure compatibility
                      e.dataTransfer.effectAllowed = 'all';
                    }}
                  >
                    {svgData ? (
                      <div className="icon-wrapper">
                        <div
                        style={{ color: iconColor }}
                          className="svg-shape-icon"
                          dangerouslySetInnerHTML={{ __html: svgData }}
                        />
                      </div>
                    ) : (
                      <span className="skelton"></span>
                    )}
                    <span className="c1-strong icon-name">{formatIconName(icon.name)}</span>
                  </div>
                );
              })
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
              onClose={handleClose}
              title={`(${selectedIcons.length}) Selected`}
              downloadButton={selectedIcons.length > 1 ? {
                text: downloadText,
                onClick: downloadSelectedIconsAsZip
              } : undefined}
              svgContent={selectedIcons.length === 1 ?
                svgContent[selectedIcons[0].name].replace(/fill="currentColor"/g, `fill="${iconColor}"`)
                : undefined}
            >
              {selectedIcons.length === 1 ? (
                <div className='icon-preview'>
                  <div className="svg-preview-box">
                    <div className="t1-strong icon-sidepanel-name">
                      {formatIconName(selectedIcons[0].name)}
                    </div>
                    <div
                      className="svg-preview"
                      dangerouslySetInnerHTML={{ __html: svgContent[selectedIcons[0].name] }}
                      style={{
                        color: iconColor,
                      }}
                      draggable={true}
                      onDragStart={(e) => {
                        // Prepare the SVG content with customized color
                        let customizedSvg = svgContent[selectedIcons[0].name]
                          .replace(/fill="currentColor"/g, `fill="${iconColor}"`)
                          .replace(/stroke="currentColor"/g, `stroke="${iconColor}"`);

                        // Create a blob from the SVG content
                        const blob = new Blob([customizedSvg], { type: 'image/svg+xml' });

                        // Create a URL for the blob
                        const url = URL.createObjectURL(blob);

                        // Set the drag data for different targets
                        // For general web applications
                        e.dataTransfer.setData('text/plain', customizedSvg);
                        e.dataTransfer.setData('text/html', customizedSvg);

                        // For browsers and file system
                        e.dataTransfer.setData('text/uri-list', url);
                        e.dataTransfer.setData('DownloadURL', `image/svg+xml:${selectedIcons[0].name}:${url}`);

                        // For Figma and design applications
                        // Create a File object from the blob
                        const file = new File([blob], selectedIcons[0].name, { type: 'image/svg+xml' });

                        // Try to use the items API for better compatibility with design apps
                        try {
                          e.dataTransfer.items.add(file);
                        } catch (err) {
                          console.log('DataTransfer items API not supported');
                        }

                        // Set effectAllowed to all to ensure compatibility
                        e.dataTransfer.effectAllowed = 'all';
                      }}
                    />
                    <div className='single-download-box'>
                      <OrButton
                        layout='icon-text'
                        appearance='fill'
                        variant='secondary'
                        icon={<Icon.download />}
                        text='SVG'
                        onClick={() => downloadSingleIcon(selectedIcons[0])}
                      />
                      <CopyButton svg={svgContent[selectedIcons[0].name]} />
                    </div>
                  </div>
                  <div className='svg-box'></div>
                </div>
              ) : (
                // Display list of icons when more than one is selected
                selectedIcons.map((icon) => (
                  <div className='side-panel-item' key={icon.name}>
                    <div className='side-panel-item-body'>
                      <div
                        className="sidepabel-svg-container"
                        style={{ color: iconColor }}
                        dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                        draggable={true}
                        onDragStart={(e) => {
                          // Prepare the SVG content with customized color
                          let customizedSvg = svgContent[icon.name]
                            .replace(/fill="currentColor"/g, `fill="${iconColor}"`)
                            .replace(/stroke="currentColor"/g, `stroke="${iconColor}"`);

                          // Create a blob from the SVG content
                          const blob = new Blob([customizedSvg], { type: 'image/svg+xml' });

                          // Create a URL for the blob
                          const url = URL.createObjectURL(blob);

                          // Set the drag data for different targets
                          // For general web applications
                          e.dataTransfer.setData('text/plain', customizedSvg);
                          e.dataTransfer.setData('text/html', customizedSvg);

                          // For browsers and file system
                          e.dataTransfer.setData('text/uri-list', url);
                          e.dataTransfer.setData('DownloadURL', `image/svg+xml:${icon.name}:${url}`);

                          // For Figma and design applications
                          // Create a File object from the blob
                          const file = new File([blob], icon.name, { type: 'image/svg+xml' });

                          // Try to use the items API for better compatibility with design apps
                          try {
                            e.dataTransfer.items.add(file);
                          } catch (err) {
                            console.log('DataTransfer items API not supported');
                          }

                          // Set effectAllowed to all to ensure compatibility
                          e.dataTransfer.effectAllowed = 'all';

                          // Stop propagation to prevent the click event from firing
                          e.stopPropagation();
                        }}
                      />
                      <span className='b2'>{formatIconName(icon.name)}</span>
                      <OrButton
                        variant='error'
                        appearance='ghost'
                        size='sm'
                        layout='icon'
                        icon={<Icon.trash />}
                        onClick={() => removeSelectedIcon(icon.name)}
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

export default ShapeIcon;
