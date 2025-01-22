import React, { useState, useEffect } from 'react';
import '../../style.scss'
import '../../base/type-style.scss';
import OrHeader from '../../component/OrHeader/OrHeader';
import cover from '../../assets/cover.png'
import './About.scss';
const About: React.FC = () => {



  return (
    <div className='changelog-page main-container'>
      <OrHeader>
        
        <p className='h6-strong'>About</p>
  
      </OrHeader>
     <div className='content-container'>
      
      {/* <p className='h6-strong'>Changelogs</p> */}
        <div className='scroll-list'>
        <img className='img-cover' src={cover}></img>
        
          <span className='h4-strong title'>
            <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.00481 6.22562C5.71367 6.22562 7.09898 4.86257 7.09898 3.18117C7.09898 1.49977 5.71367 0.136719 4.00481 0.136719C2.29595 0.136719 0.910645 1.49977 0.910645 3.18117C0.910645 4.86257 2.29595 6.22562 4.00481 6.22562Z" fill="black"/>
              <path d="M14.0373 6.22562C15.7461 6.22562 17.1314 4.86257 17.1314 3.18117C17.1314 1.49977 15.7461 0.136719 14.0373 0.136719C12.3284 0.136719 10.9431 1.49977 10.9431 3.18117C10.9431 4.86257 12.3284 6.22562 14.0373 6.22562Z" fill="black"/>
              <path d="M24.0707 6.22562C25.7796 6.22562 27.1649 4.86257 27.1649 3.18117C27.1649 1.49977 25.7796 0.136719 24.0707 0.136719C22.3619 0.136719 20.9766 1.49977 20.9766 3.18117C20.9766 4.86257 22.3619 6.22562 24.0707 6.22562Z" fill="black"/>
              <path d="M4.00481 25.9684C5.71367 25.9684 7.09898 24.6054 7.09898 22.924C7.09898 21.2426 5.71367 19.8795 4.00481 19.8795C2.29595 19.8795 0.910645 21.2426 0.910645 22.924C0.910645 24.6054 2.29595 25.9684 4.00481 25.9684Z" fill="black"/>
              <path d="M14.0373 25.9684C15.7461 25.9684 17.1314 24.6054 17.1314 22.924C17.1314 21.2426 15.7461 19.8795 14.0373 19.8795C12.3284 19.8795 10.9431 21.2426 10.9431 22.924C10.9431 24.6054 12.3284 25.9684 14.0373 25.9684Z" fill="black"/>
              <path d="M24.0707 25.9684C25.7796 25.9684 27.1649 24.6054 27.1649 22.924C27.1649 21.2426 25.7796 19.8795 24.0707 19.8795C22.3619 19.8795 20.9766 21.2426 20.9766 22.924C20.9766 24.6054 22.3619 25.9684 24.0707 25.9684Z" fill="black"/>
              <path d="M4.00481 16.0968C5.71367 16.0968 7.09898 14.7338 7.09898 13.0524C7.09898 11.371 5.71367 10.0079 4.00481 10.0079C2.29595 10.0079 0.910645 11.371 0.910645 13.0524C0.910645 14.7338 2.29595 16.0968 4.00481 16.0968Z" fill="black"/>
              <path d="M14.0373 16.0968C15.7461 16.0968 17.1314 14.7338 17.1314 13.0524C17.1314 11.371 15.7461 10.0079 14.0373 10.0079C12.3284 10.0079 10.9431 11.371 10.9431 13.0524C10.9431 14.7338 12.3284 16.0968 14.0373 16.0968Z" fill="black"/>
              <path d="M24.0707 16.0968C25.7796 16.0968 27.1649 14.7338 27.1649 13.0524C27.1649 11.371 25.7796 10.0079 24.0707 10.0079C22.3619 10.0079 20.9766 11.371 20.9766 13.0524C20.9766 14.7338 22.3619 16.0968 24.0707 16.0968Z" fill="black"/>
            </svg>

                Welcome to Orbit Icon pack
                
                </span>
          <p className='b2'>
          At Orbit, we believe that icons are the universal language of design, capable of simplifying complex ideas and enhancing user experiences. Our dedicated team of designers has worked tirelessly to craft a comprehensive collection of over (...)high-quality, customizable icons designed to meet the needs of modern designers and developers.  
          </p>
          <p className='b2'>
          Our icons are meticulously crafted for clarity, consistency, and scalability, supporting a wide range of design projects, from mobile apps to enterprise solutions. With a focus on versatility, our library spans various categories, ensuring you find the perfect visual representation for your ideas.  
          </p>
          
          <span className='h5-strong title'>
            
          <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.2523 11.2963H-0.00012207V14.8065H26.2523V11.2963Z" fill="black"/>
          <path d="M14.9094 25.9679L14.9094 0.137329L11.3418 0.137329L11.3418 25.9679H14.9094Z" fill="black"/>
          <path d="M23.6692 20.9449L5.10596 2.67993L2.58328 5.16208L21.1465 23.427L23.6692 20.9449Z" fill="black"/>
          <path d="M5.10522 23.4254L23.6685 5.1604L21.1458 2.67826L2.58254 20.9432L5.10522 23.4254Z" fill="black"/>
          </svg>
          
            Why Choose Orbit?
            </span>
          <p className='b2'>
            Impeccable Quality: Every icon undergoes rigorous quality checks to ensure top-tier performance and visual harmony. Tailored Custom Icons: Get custom icons designed specifically to meet your project’s unique needs. Time-Saving Solutions: Instantly enhance your designs with a comprehensive, ready-to-use icon library. Unparalleled Versatility: Seamlessly integrate icons into web, mobile, and desktop applications for consistent visual experiences.
          </p>
          <p className='b2'>
          In addition, you can leverage Yoko Space Design System, which integrates seamlessly with Orbit Icons to provide a unified and cohesive design experience.
          </p>
          <p className='b2'>
          Together, Orbit Icons and Space empower designers and developers to craft innovative, user-centric solutions with speed, simplicity, and consistency.
          </p>
          

          <span className='h5-strong title'>
          <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.0624 25.9679C12.3292 25.9825 10.6102 25.6592 9.00469 25.0167C7.39914 24.3741 5.93881 23.4251 4.70797 22.2244C3.47714 21.0236 2.50016 19.595 1.83344 18.0208C1.16673 16.4466 0.823486 14.758 0.823486 13.0526C0.823486 11.3472 1.16673 9.65865 1.83344 8.08445C2.50016 6.51025 3.47714 5.08155 4.70797 3.8808C5.93881 2.68006 7.39914 1.73105 9.00469 1.08853C10.6102 0.44602 12.3292 0.122727 14.0624 0.137313V25.9679Z" fill="black"/>
          <path d="M27.1894 25.968C25.4562 25.9826 23.7372 25.6593 22.1316 25.0168C20.5261 24.3743 19.0658 23.4253 17.8349 22.2245C16.6041 21.0238 15.6271 19.5951 14.9604 18.0209C14.2937 16.4467 13.9504 14.7581 13.9504 13.0527C13.9504 11.3473 14.2937 9.65877 14.9604 8.08457C15.6271 6.51037 16.6041 5.08167 17.8349 3.88093C19.0658 2.68018 20.5261 1.73117 22.1316 1.08866C23.7372 0.446142 25.4562 0.122849 27.1894 0.137435V25.968Z" fill="black"/>
          </svg>


            Icon Pack License
            
            </span>
          <p className='b2'>
          This icon pack is provided free of charge for use in personal and commercial projects under the following terms:
          </p>
          <span className='b2-strong'>Icon Pack License:</span>
          <ul className='b2'>
            <li><b>Free Usage:</b> You may use, copy, and modify the icons in personal and commercial projects without any cost.</li>
            <li><b>Attribution Required:</b> You must include the following attribution in your project:
            "Icons by Yoko Orbit - [Website/Link]"</li>
            <li><b>Non-Sellable:</b> The icons or any derivative work created from them may not be sold, licensed, or distributed as part of any asset pack, design system, or similar product.</li>
          </ul>
          <span className='b2-strong'>Restrictions:</span>
          
          <ul className='b2'>
            <li><b>No Resale:</b>Redistribution of the icons (modified or unmodified) in a way that involves direct or indirect monetary gain is strictly prohibited.</li>
            <li><b>No Warranty or Support:</b> The icons are provided "as-is" without any guarantees of functionality or updates. The creators are not responsible for any issues arising from their use.</li>
          </ul>
          <span className='b2-strong'>Disclaimer:</span>
          <ul className='b2'>
            <li>The creators are not liable for any damages or losses arising from the use of this icon pack.</li>
            <li>By using this icon pack, you agree to these terms.</li>
          </ul>
          <p className='b2'>For questions or permissions beyond the scope of this license, contact us at: info@yoko.studio</p>



          
        </div>
     </div>
    </div>
  );
};

export default About;
