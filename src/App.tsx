// import React, { useState } from 'react';
// import './App.css';
// import IconList from './component/IconList/IconList';
// import OrHeader from './component/OrHeader/OrHeader';
// import OrSlider from './component/OrSlider/OrSlider';

// function App() {
//   const [searchTerm, setSearchTerm] = useState<string>('');

//   const handleSearch = (term: string) => {
//     setSearchTerm(term);
//     // در اینجا می‌توانید نتایج جستجو را مدیریت کنید
//   };

//   return (
//     <div>
//       <div>
//         <OrHeader onSearch={handleSearch} />{/* Header */}
//       </div>
//       <div>
//         <OrSlider value={borderSize} onChange={handleSliderChange} />
//       </div>
//       <div> {/* main-view */}
//         <IconList searchTerm={searchTerm} borderSize={borderSize} /> {/* نمایش دسته‌بندی‌ها */}
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import './App.css';
import IconList from './component/IconList/IconList';
import OrHeader from './component/OrHeader/OrHeader';
import Slider from './component/OrSlider/OrSlider';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [borderSize, setBorderSize] = useState<number>(1);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSliderChange = (value: number) => {
    setBorderSize(value);
  };

  return (
    <div>
      <OrHeader onSearch={handleSearch} />
      <Slider value={borderSize} onChange={handleSliderChange} />
      <IconList searchTerm={searchTerm} borderSize={borderSize} />
    </div>
  );
}

export default App;
