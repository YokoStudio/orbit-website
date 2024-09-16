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
  iconColor: string;
}

const ShapeIcon: React.FC<ShapeIconProps> = ({ searchTerm, switchChecked, selectedFolders, iconColor = '#ffffff' }) => {
  const [icons, setIcons] = useState<{ name: string; path: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});
  const [filteredIcons, setFilteredIcons] = useState<{ name: string; path: string }[]>([]);

  // Fetch icons from the server
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

  // Filter icons based on search term, type (fill/outline), and selected folders
  useEffect(() => {
    const filtered = icons
      .filter((icon) => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))
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

  // Fetch SVG content for all filtered icons
  useEffect(() => {
    const fetchAllSvgContent = async () => {
      for (const icon of filteredIcons) {
        const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
        try {
          const response = await axios.get(imageUrl);
          const svgData = response.data;
          const coloredSvg = svgData
            .replace(/fill="[^"]*"/g, `fill="${iconColor}"`)
            .replace(/stroke="[^"]*"/g, `stroke="${iconColor}"`);
          setSvgContent((prev) => ({
            ...prev,
            [icon.name]: coloredSvg,
          }));
        } catch (error) {
          console.error('Error fetching SVG content:', error);
        }
      }
    };

    if (filteredIcons.length > 0) {
      fetchAllSvgContent();
    }
  }, [filteredIcons, iconColor]);

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
            filteredIcons.map((icon) => (
              <div className="item" key={icon.path}>
                {svgContent[icon.name] ? (
                  <div className="icon-wrapper">
                    <div
                      className="svg-shape-icon"
                      dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
                        link.download = icon.name;
                        link.click();
                      }}
                    />
                  </div>
                ) : (
                  <span className="skelton">Loading SVG...</span>
                )}
                <span className="b2">{icon.name.replace('.svg', '')}</span>
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

export default ShapeIcon;
