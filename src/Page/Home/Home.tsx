import React, { useEffect, useState } from "react";
import './Home.scss';
import axios from 'axios';
import '../../base/type-style.scss';
import OrButton from "../../component/OrButton/OrButton";
import OrSplitButton from "../../component/OrSplitButton/OrSplitButton";
import Icon from '../../assets/Icon';
import OrHeader from "../../component/OrHeader/OrHeader";
import OrTab from "../../component/OrTab/Ortab";
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [iconCount, setIconCount] = useState<number>(123);
  const [activeTab, setActiveTab] = useState<string>("SVG");
  const [iconColor, setIconColor] = useState<string>("#000000");
  const [strokeWidth, setStrokeWidth] = useState<number>(1.5);
  const [fillMode, setFillMode] = useState<boolean>(true);
  const [iconType, setIconType] = useState<'shape' | 'stroke'>('shape');
  const navigate = useNavigate();

  const fetchIconCount = async () => {
    try {
        // Fetch icon list from bucket
        const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?list-type=2');

        // Convert XML to JSON
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "application/xml");

        // Get all <Key> tags that represent icon paths
        const keys = xmlDoc.getElementsByTagName("Key");

        // Filter icons with SVG format
        const svgIcons = Array.from(keys).filter((key: Element) => {
            const filePath = key.textContent || '';
            return filePath.endsWith('.svg');  // Only SVG files
        });

        // Set the count of filtered icons
        setIconCount(svgIcons.length);
    } catch (error) {
        console.error('Error fetching icon count:', error);
    }
  };

  useEffect(() => {
    fetchIconCount();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleColorChange = (color: string) => {
    setIconColor(color);
  };

  const handleStrokeWidthChange = (width: number) => {
    setStrokeWidth(width);
  };

  const handleFillModeChange = (isFilled: boolean) => {
    setFillMode(isFilled);
  };

  const handleIconTypeChange = (type: 'shape' | 'stroke') => {
    setIconType(type);
  };

  // Sample SVG paths for demo icons
  const starIconPath = "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z";
  const settingsIconPath = "M12 15.5C14.21 15.5 16 13.71 16 11.5C16 9.29 14.21 7.5 12 7.5C9.79 7.5 8 9.29 8 11.5C8 13.71 9.79 15.5 12 15.5ZM19.43 12.97C19.47 12.65 19.5 12.33 19.5 12C19.5 11.67 19.47 11.34 19.43 11L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.66 15.5 5.32 14.87 5.07L14.5 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.5 2.42L9.13 5.07C8.5 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11C4.53 11.34 4.5 11.67 4.5 12C4.5 12.33 4.53 12.65 4.57 12.97L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.04 4.95 18.95L7.44 17.94C7.96 18.34 8.5 18.68 9.13 18.93L9.5 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.5 21.58L14.87 18.93C15.5 18.67 16.04 18.34 16.56 17.94L19.05 18.95C19.27 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.97Z";

  return (
    <div className='home-page main-container'>
      <OrHeader>
        <div className="header-actions">
          <a href="#features">Features</a>
          <a href="#styles">Styles</a>
          <a href="#categories">Categories</a>
          <a href="#customize">Customize</a>
          <a href="#download">Download</a>
        </div>
      </OrHeader>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="content-container hero">
          <div className="hero-title">
            <span className="version-badge">v1.0.0</span>
            <svg className="hero-logo" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 655.72 180">
              <path d="M475.72,32.14h0A32.14,32.14,0,0,1,507.86,0h0A32.14,32.14,0,0,1,540,32.14h0a32.14,32.14,0,0,1-32.14,32.15h0A32.14,32.14,0,0,1,475.72,32.14ZM540,180V109.29L514.29,77.14H475.72V180ZM655.72,77.14V51.43H636.43V25.22L610.72.08,572.15,0V51.43H552.86v51.43l19.29-6.43v34s0,49.61,32.14,49.61h51.43V115.72H636.43V82ZM257.15,38.57V.09L225,0,192.86,25.71V180h64.29V128.57L295.72,90V25.71H276.31ZM180,90a90,90,0,1,0-90,90A90,90,0,0,0,180,90ZM385.79,25.71a78.59,78.59,0,0,0-9.77.64V0H308.64V102.86a77.15,77.15,0,1,0,77.15-77.15Z"/>
            </svg>
            <h1 className="hero-head h3-strong">Elevate Your Design with Orbit Icons</h1>
            <p className="hero-description b1">
              Access to <span className="highlight-text">{iconCount} meticulously crafted icons</span> in <span className="highlight-text">2 distinct styles</span> to enhance your design projects with clarity, consistency, and visual impact.
            </p>
            <div className="hero-action">
              <OrButton
                layout="text"
                appearance="fill"
                size="lg"
                text="Explore Icons"
                className="home-btn"
                onClick={() => navigate('/icons')}
              />
              <OrButton
                layout="text"
                appearance="outline"
                size="lg"
                text="Learn More"
                onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
              />
            </div>
          </div>
          <div className="hero-image-container">
            <div className="image-placeholder">
              <span className="placeholder-text">Icon Preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section section">
        <div className="section-header">
          <h2 className="h4-strong">Why Choose Orbit Icons?</h2>
          <p className="b1">Designed to meet the needs of modern designers and developers</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <div className="image-placeholder small">
                <span className="placeholder-text">Icon</span>
              </div>
            </div>
            <h3 className="h6-strong">High Quality</h3>
            <p className="b2">Meticulously crafted icons with pixel-perfect precision for crisp display at any size</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <div className="image-placeholder small">
                <span className="placeholder-text">Icon</span>
              </div>
            </div>
            <h3 className="h6-strong">Customizable</h3>
            <p className="b2">Easily customize colors, stroke width, and style to match your design system</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <div className="image-placeholder small">
                <span className="placeholder-text">Icon</span>
              </div>
            </div>
            <h3 className="h6-strong">Versatile</h3>
            <p className="b2">Available in multiple formats including SVG, PNG, and JSX for any project requirement</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <div className="image-placeholder small">
                <span className="placeholder-text">Icon</span>
              </div>
            </div>
            <h3 className="h6-strong">Comprehensive</h3>
            <p className="b2">Covers a wide range of categories from interface elements to weather symbols</p>
          </div>
        </div>
      </section>

      {/* Icon Styles Section */}
      <section id="styles" className="styles-section section">
        <div className="section-header">
          <h2 className="h4-strong">Two Distinct Styles</h2>
          <p className="b1">Choose the perfect style for your project needs</p>
        </div>
        <div className="styles-container">
          <div className="style-card">
            <div className="style-preview">
              <div className="image-placeholder medium">
                <span className="placeholder-text">Shape Icons</span>
              </div>
            </div>
            <div className="style-info">
              <h3 className="h5-strong">Shape Icons</h3>
              <p className="b2">Bold, filled icons perfect for UI elements that need to stand out. Available in both fill and outline variations.</p>
              <OrButton
                layout="text"
                appearance="ghost"
                text="View Shape Icons"
                onClick={() => navigate('/icons')}
              />
            </div>
          </div>
          <div className="style-card">
            <div className="style-preview">
              <div className="image-placeholder medium">
                <span className="placeholder-text">Stroke Icons</span>
              </div>
            </div>
            <div className="style-info">
              <h3 className="h5-strong">Stroke Icons</h3>
              <p className="b2">Clean, minimalist line icons with adjustable stroke width for a more subtle and elegant look.</p>
              <OrButton
                layout="text"
                appearance="ghost"
                text="View Stroke Icons"
                onClick={() => navigate('/icons')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="categories-section section">
        <div className="section-header">
          <h2 className="h4-strong">Explore Icon Categories</h2>
          <p className="b1">Find the perfect icons for any context</p>
        </div>
        <div className="categories-grid">
          {['Arrow', 'Devices', 'Document', 'Interface', 'Media', 'Editor', 'Maps', 'Shape', 'Weather'].map((category) => (
            <div className="category-card" key={category}>
              <div className="category-preview">
                <div className="image-placeholder small">
                  <span className="placeholder-text">{category}</span>
                </div>
              </div>
              <h3 className="b1-strong">{category}</h3>
              <OrButton
                layout="text"
                appearance="ghost"
                size="sm"
                text="View"
                onClick={() => navigate('/icons')}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Customization Section */}
      <section id="customize" className="customize-section section">
        <div className="section-header">
          <h2 className="h4-strong">Customize to Your Needs</h2>
          <p className="b1">Tailor icons to match your design system perfectly</p>
        </div>
        <div className="customize-container">
          <div className="customize-preview">
            <div className="live-preview">
              <div className="icon-type-selector">
                <button
                  className={`icon-type-btn ${iconType === 'shape' ? 'active' : ''}`}
                  onClick={() => handleIconTypeChange('shape')}
                >
                  Shape Icon
                </button>
                <button
                  className={`icon-type-btn ${iconType === 'stroke' ? 'active' : ''}`}
                  onClick={() => handleIconTypeChange('stroke')}
                >
                  Stroke Icon
                </button>
              </div>

              <div className="preview-icon-container">
                {iconType === 'shape' ? (
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d={starIconPath}
                      fill={fillMode ? iconColor : "none"}
                      stroke={fillMode ? "none" : iconColor}
                      strokeWidth={fillMode ? 0 : strokeWidth}
                    />
                  </svg>
                ) : (
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d={settingsIconPath}
                      fill="none"
                      stroke={iconColor}
                      strokeWidth={strokeWidth}
                    />
                  </svg>
                )}
              </div>

              <div className="preview-code">
                <pre className="code-snippet">
                  {iconType === 'shape' ? (
                    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="${starIconPath.substring(0, 30)}..."
        ${fillMode ? `fill="${iconColor}"` : `stroke="${iconColor}" stroke-width="${strokeWidth}"`}/>
</svg>`
                  ) : (
                    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="${settingsIconPath.substring(0, 30)}..."
        fill="none"
        stroke="${iconColor}"
        stroke-width="${strokeWidth}"/>
</svg>`
                  )}
                </pre>
              </div>
            </div>
          </div>

          <div className="customize-options">
            <div className="customize-option">
              <h3 className="h6-strong">Color Options</h3>
              <p className="b2">Change colors to match your brand palette</p>
              <div className="color-samples">
                <div
                  className={`color-sample ${iconColor === "#000000" ? "active" : ""}`}
                  style={{backgroundColor: "#000000"}}
                  onClick={() => handleColorChange("#000000")}
                ></div>
                <div
                  className={`color-sample ${iconColor === "#3366FF" ? "active" : ""}`}
                  style={{backgroundColor: "#3366FF"}}
                  onClick={() => handleColorChange("#3366FF")}
                ></div>
                <div
                  className={`color-sample ${iconColor === "#FF3366" ? "active" : ""}`}
                  style={{backgroundColor: "#FF3366"}}
                  onClick={() => handleColorChange("#FF3366")}
                ></div>
                <div
                  className={`color-sample ${iconColor === "#33CC66" ? "active" : ""}`}
                  style={{backgroundColor: "#33CC66"}}
                  onClick={() => handleColorChange("#33CC66")}
                ></div>
              </div>
            </div>

            {iconType === 'stroke' || !fillMode ? (
              <div className="customize-option">
                <h3 className="h6-strong">Stroke Width</h3>
                <p className="b2">Adjust stroke thickness for different visual weights</p>
                <div className="stroke-samples">
                  <div
                    className={`stroke-sample thin ${strokeWidth === 1 ? "active" : ""}`}
                    onClick={() => handleStrokeWidthChange(1)}
                  ></div>
                  <div
                    className={`stroke-sample medium ${strokeWidth === 1.5 ? "active" : ""}`}
                    onClick={() => handleStrokeWidthChange(1.5)}
                  ></div>
                  <div
                    className={`stroke-sample thick ${strokeWidth === 2 ? "active" : ""}`}
                    onClick={() => handleStrokeWidthChange(2)}
                  ></div>
                </div>
              </div>
            ) : null}

            {iconType === 'shape' && (
              <div className="customize-option">
                <h3 className="h6-strong">Fill Styles</h3>
                <p className="b2">Choose between filled or outline styles for shape icons</p>
                <div className="fill-samples">
                  <div
                    className={`fill-sample filled ${fillMode ? "active" : ""}`}
                    onClick={() => handleFillModeChange(true)}
                  ></div>
                  <div
                    className={`fill-sample outline ${!fillMode ? "active" : ""}`}
                    onClick={() => handleFillModeChange(false)}
                  ></div>
                </div>
              </div>
            )}

            <div className="customize-option">
              <OrButton
                layout="text"
                appearance="fill"
                variant="primary"
                size="md"
                text="Download Customized Icon"
                icon={<Icon.download />}
                onClick={() => {
                  // Create SVG string
                  let svgContent = '';
                  if (iconType === 'shape') {
                    svgContent = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="${starIconPath}" ${fillMode ? `fill="${iconColor}"` : `stroke="${iconColor}" stroke-width="${strokeWidth}"`}/>
</svg>`;
                  } else {
                    svgContent = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="${settingsIconPath}" fill="none" stroke="${iconColor}" stroke-width="${strokeWidth}"/>
</svg>`;
                  }

                  // Create blob and download
                  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = iconType === 'shape' ? 'star-icon.svg' : 'settings-icon.svg';
                  link.click();
                  URL.revokeObjectURL(url);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="download-section section">
        <div className="section-header">
          <h2 className="h4-strong">Download Options</h2>
          <p className="b1">Multiple formats to suit your workflow</p>
        </div>
        <div className="download-options">
          <div className="download-card">
            <div className="download-icon">
              <div className="image-placeholder small">
                <span className="placeholder-text">SVG</span>
              </div>
            </div>
            <div className="download-info">
              <h3 className="h5-strong">SVG Format</h3>
              <p className="b2">Scalable vector graphics for crisp display at any size</p>
              <div className="code-preview">
                <OrTab
                  tabs={["SVG", "JSX", "TSX"]}
                  onTabChange={handleTabChange}
                  initialTab="SVG"
                />
                <div className="code-container">
                  {activeTab === "SVG" && (
                    <pre className="code-block">
                      <code>{`<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="currentColor"/>
</svg>`}</code>
                    </pre>
                  )}
                  {activeTab === "JSX" && (
                    <pre className="code-block">
                      <code>{`import React from 'react';

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="currentColor"/>
  </svg>
);

export default StarIcon;`}</code>
                    </pre>
                  )}
                  {activeTab === "TSX" && (
                    <pre className="code-block">
                      <code>{`import React from 'react';

const StarIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="currentColor"/>
  </svg>
);

export default StarIcon;`}</code>
                    </pre>
                  )}
                </div>
              </div>
              <OrSplitButton
                mainText="Download SVG"
                mainIcon={<Icon.download />}
                mainOnClick={() => window.open('https://s3.ir-thr-at1.arvanstorage.ir/orbit-beta/Yoko%20Orbit%20Icon%20pack%20v1.zip', '_blank')}
                menuItems={[
                  { label: 'Download PNG', onClick: () => {} },
                  { label: 'Download JPG', onClick: () => {} },
                  { label: 'Download All', onClick: () => {} }
                ]}
                appearance="fill"
                variant="primary"
                size="lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="usage-section section">
        <div className="section-header">
          <h2 className="h4-strong">Easy Integration</h2>
          <p className="b1">Seamlessly add icons to your projects</p>
        </div>
        <div className="usage-container">
          <div className="usage-card">
            <div className="usage-preview">
              <div className="image-placeholder medium">
                <span className="placeholder-text">Drag & Drop</span>
              </div>
            </div>
            <div className="usage-info">
              <h3 className="h5-strong">Drag & Drop</h3>
              <p className="b2">Simply drag icons directly into design applications like Figma, Sketch, or Adobe XD</p>
            </div>
          </div>
          <div className="usage-card">
            <div className="usage-preview">
              <div className="image-placeholder medium">
                <span className="placeholder-text">Code Integration</span>
              </div>
            </div>
            <div className="usage-info">
              <h3 className="h5-strong">Code Integration</h3>
              <p className="b2">Copy SVG code or use the React components in your web projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* License Section */}
      <section className="license-section section">
        <div className="section-header">
          <h2 className="h4-strong">License Information</h2>
        </div>
        <div className="license-container">
          <div className="license-info">
            <p className="b2">
              This icon pack is provided free of charge for use in personal and commercial projects under the following terms:
            </p>
            <h3 className="b2-strong">Icon Pack License:</h3>
            <ul className="b2">
              <li><b>Free Usage:</b> You may use, copy, and modify the icons in personal and commercial projects without any cost.</li>
              <li><b>Attribution Required:</b> You must include the following attribution in your project: "Icons by Yoko Orbit - [Website/Link]"</li>
              <li><b>Non-Sellable:</b> The icons or any derivative work created from them may not be sold, licensed, or distributed as part of any asset pack, design system, or similar product.</li>
            </ul>
            <p className="b2">For questions or permissions beyond the scope of this license, contact us at: info@yoko.studio</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="cta-container">
          <h2 className="h4-strong">Ready to Enhance Your Designs?</h2>
          <p className="b1">Start using Orbit Icons in your projects today</p>
          <div className="cta-buttons">
            <OrButton
              layout="text"
              appearance="fill"
              size="lg"
              text="Get Started Now"
              className="home-btn"
              onClick={() => navigate('/icons')}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <svg className="footer-logo-svg" width="100" height="30" viewBox="0 0 655.72 180">
              <path d="M475.72,32.14h0A32.14,32.14,0,0,1,507.86,0h0A32.14,32.14,0,0,1,540,32.14h0a32.14,32.14,0,0,1-32.14,32.15h0A32.14,32.14,0,0,1,475.72,32.14ZM540,180V109.29L514.29,77.14H475.72V180ZM655.72,77.14V51.43H636.43V25.22L610.72.08,572.15,0V51.43H552.86v51.43l19.29-6.43v34s0,49.61,32.14,49.61h51.43V115.72H636.43V82ZM257.15,38.57V.09L225,0,192.86,25.71V180h64.29V128.57L295.72,90V25.71H276.31ZM180,90a90,90,0,1,0-90,90A90,90,0,0,0,180,90ZM385.79,25.71a78.59,78.59,0,0,0-9.77.64V0H308.64V102.86a77.15,77.15,0,1,0,77.15-77.15Z"/>
            </svg>
            <span className="c1">v1.0.0</span>
          </div>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#styles">Styles</a>
            <a href="#categories">Categories</a>
            <a href="#customize">Customize</a>
            <a href="#download">Download</a>
          </div>
          <div className="footer-copyright">
            <p className="c1">© 2023 Yoko Orbit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
