import React, { useState, useEffect } from 'react';
import '../../style.scss'
import '../../base/type-style.scss';
import OrHeader from '../../component/OrHeader/OrHeader';
import cover from '../../assets/cover.png'
import './Contribute.scss';
const Contribute: React.FC = () => {



  return (
    <div className='changelog-page main-container'>
      <OrHeader>
        
        <p className='h6-strong'>About</p>
  
      </OrHeader>
     <div className='content-container'>
      
      {/* <p className='h6-strong'>Changelogs</p> */}
        <div className='scroll-list'>
        
          <span className='h4-strong title'>

                Contributing to Yoko Orbit
                
                </span>
          <p className='b2'>
            First off, thank you for considering contributing to Yoko Orbit! It’s people like you who make open-source tools awesome.
          </p>

          <p className='b2'>
            To maintain a consistent "orbit" of icons, we’ve put together some guidelines to help you get started.
          </p>

          <span className='h5-strong title'>
            Design Principles
            </span>
          <p className='b2'>
            To ensure every icon feels like it belongs to the Yoko Orbit family, please follow these technical specifications:
          </p>
          <ul className='b2'>
            <li><b>Grid Size: </b>All icons must be designed on a 24x24 px artboard.</li>
            <li><b>Safe Zone: </b>Keep the main content within a 22x22 px area to avoid clipping.</li>
            <li><b>Stroke Width: </b>Use a consistent 2px stroke.</li>
            <li><b>Corners & Caps: </b>Use Round joins and caps for a friendly, modern feel.</li>
            <li><b>Simplicity: </b>Aim for a "minimalist-functional" aesthetic. If a detail doesn't help recognize the icon, remove it.</li>
          </ul>

           <p className='b2'>
            <b>1. Request an Icon </b><br></br>
            If you need an icon that’s currently missing:
          </p>
           <ul className='b2'>
            <li>Open an Issue on GitHub.</li>
            <li>Use the tag icon-request.</li>
            <li>Describe the use case and, if possible, attach a rough sketch or a reference image.</li>
          </ul>

            <p className='b2'>
            <b>2. Design and Submit</b><br></br>
            If you need an icon that’s currently missing:
          </p>
           <ul className='b2'>
            <li>Duplicate the Figma file.</li>
            <li>Create your icon following the design principles above.</li>
            <li>Export as an SVG file. (Note: Ensure paths are expanded (outlined) and layers are named clearly.)</li>
            <li>Submit a<b> Pull Request (PR) </b>with a brief description of the new addition.</li>
          </ul>

           <span className='h5-strong title'>
            Final Checklist
            </span>
          <p className='b2'>
            Before you hit "Submit," please double-check:
          </p>
          <ul className='b2'>
            <li><b>[ ] Naming: </b>Use kebab-case (e.g., cloud-computing.svg).</li>
            <li><b>[ ] Alignment: </b>The icon is perfectly centered on the grid.</li>
            <li><b>[ ] Cleanliness: </b>No hidden layers, masks, or stray points.</li>
            <li><b>[ ] Color: </b>Use Round joins and caps for a friendly, modern feel.</li>
          </ul>
          
        

          
        </div>
     </div>
    </div>
  );
};

export default Contribute;
