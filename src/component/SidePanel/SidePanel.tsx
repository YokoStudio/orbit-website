import React, { ReactNode, useState } from 'react';
import './SidePanel.scss';
import OrButton from '../../component/OrButton/OrButton';
import Icon from '../../assets/Icon';
import OrTab from '../OrTab/Ortab';
import OrSplitButton from '../OrSplitButton/OrSplitButton';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  downloadButton?: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
  };
  svgContent?: string; // SVG content to display in the code tabs
}

const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClose,
  title,
  children,
  downloadButton,
  svgContent
}) => {
  const [activeTab, setActiveTab] = useState<string>('SVG');
  const tabs = ['SVG', 'JSX', 'TSX'];

  // Function to convert SVG to JSX format
  const convertSvgToJsx = (svg: string): string => {
    if (!svg) return '';

    // Replace kebab-case attributes with camelCase
    let jsxCode = svg
      .replace(/stroke-width/g, 'strokeWidth')
      .replace(/stroke-linecap/g, 'strokeLinecap')
      .replace(/stroke-linejoin/g, 'strokeLinejoin')
      .replace(/fill-rule/g, 'fillRule')
      .replace(/clip-rule/g, 'clipRule')
      .replace(/stroke-miterlimit/g, 'strokeMiterlimit')
      .replace(/class=/g, 'className=');

    // Add JSX import and component structure
    return `import React from 'react';\n\nconst IconComponent = () => {\n  return (\n    ${jsxCode}\n  );\n};\n\nexport default IconComponent;`;
  };

  // Function to convert SVG to TSX format
  const convertSvgToTsx = (svg: string): string => {
    if (!svg) return '';

    // Replace kebab-case attributes with camelCase (same as JSX)
    let tsxCode = svg
      .replace(/stroke-width/g, 'strokeWidth')
      .replace(/stroke-linecap/g, 'strokeLinecap')
      .replace(/stroke-linejoin/g, 'strokeLinejoin')
      .replace(/fill-rule/g, 'fillRule')
      .replace(/clip-rule/g, 'clipRule')
      .replace(/stroke-miterlimit/g, 'strokeMiterlimit')
      .replace(/class=/g, 'className=');

    // Add TSX import, interface, and component structure
    return `import React from 'react';\n\ninterface IconProps {\n  size?: number;\n  color?: string;\n  className?: string;\n}\n\nconst IconComponent: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => {\n  return (\n    ${tsxCode}\n  );\n};\n\nexport default IconComponent;`;
  };

  // Function to get the code based on the active tab
  const getCodeContent = (): string => {
    if (!svgContent) return '';

    switch (activeTab) {
      case 'SVG':
        return svgContent;
      case 'JSX':
        return convertSvgToJsx(svgContent);
      case 'TSX':
        return convertSvgToTsx(svgContent);
      default:
        return svgContent;
    }
  };

  // Function to download SVG
  const downloadSvg = () => {
    if (!svgContent) return;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'icon.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to convert SVG to PNG and download
  const downloadPng = () => {
    if (!svgContent) return;

    // Create a temporary SVG element
    const svgElement = document.createElement('div');
    svgElement.innerHTML = svgContent;
    const svg = svgElement.querySelector('svg');

    if (!svg) return;

    // Set width and height if not present
    if (!svg.getAttribute('width')) svg.setAttribute('width', '200');
    if (!svg.getAttribute('height')) svg.setAttribute('height', '200');

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    const width = parseInt(svg.getAttribute('width') || '200');
    const height = parseInt(svg.getAttribute('height') || '200');
    canvas.width = width;
    canvas.height = height;

    // Create an image from the SVG
    const img = new Image();
    const svgBlob = new Blob([svgElement.innerHTML], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);

        // Convert canvas to PNG and download
        const pngUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = 'icon.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };

    img.src = url;
  };

  // Function to convert SVG to JPG and download
  const downloadJpg = () => {
    if (!svgContent) return;

    // Create a temporary SVG element
    const svgElement = document.createElement('div');
    svgElement.innerHTML = svgContent;
    const svg = svgElement.querySelector('svg');

    if (!svg) return;

    // Set width and height if not present
    if (!svg.getAttribute('width')) svg.setAttribute('width', '200');
    if (!svg.getAttribute('height')) svg.setAttribute('height', '200');

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    const width = parseInt(svg.getAttribute('width') || '200');
    const height = parseInt(svg.getAttribute('height') || '200');
    canvas.width = width;
    canvas.height = height;

    // Create an image from the SVG
    const img = new Image();
    const svgBlob = new Blob([svgElement.innerHTML], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (ctx) {
        // Fill with white background for JPG
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);

        // Convert canvas to JPG and download
        const jpgUrl = canvas.toDataURL('image/jpeg', 0.9);
        const a = document.createElement('a');
        a.href = jpgUrl;
        a.download = 'icon.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };

    img.src = url;
  };

  // Function to handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Check if we should show the code tabs
  const showCodeTabs = svgContent && title && title.includes('(1)');

  return (
    <div className={`side-panel ${isOpen ? 'visible' : 'hidden'}`}>
      <div className='filter-header'>
        <h2 className='t2-strong'>{title || 'Selected Items'}</h2>
        <OrButton
          layout='icon'
          appearance='outline'
          variant='secondary'
          icon={<Icon.cross />}
          onClick={onClose}
        />
      </div>

      <div className="side-panel-body">
        {children}

        {/* Code tabs section */}
        {showCodeTabs && (
          <div className="code-tabs-section">
            <div className="code-tabs-header">
              <span className="b1-strong">Code</span>
              <OrTab
                tabs={tabs}
                initialTab="SVG"
                onTabChange={handleTabChange}
                isSegmentControl={true}
              />
            </div>
            <div className="svg-code-box">
              <textarea
                readOnly
                value={getCodeContent()}
                onClick={(e) => {
                  const textarea = e.target as HTMLTextAreaElement;
                  textarea.select();
                  navigator.clipboard.writeText(textarea.value);
                }}
              />
            </div>
          </div>
        )}
      </div>

      {downloadButton && title && title.includes('Selected') && (
        <div className={`dowload-button-box ${title.includes('(1)') ? 'hidden' : ''}`}>
          <OrButton
            layout='icon'
            variant='primary'
            onClick={downloadButton.onClick}
            disabled={downloadButton.disabled}
            text={downloadButton.text}
          />
        </div>
      )}
    </div>
  );
};

export default SidePanel;
