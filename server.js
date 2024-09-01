// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const cors = require('cors');
// const app = express();
// const port = 3001;

// app.use(cors());

// const iconsPath = path.join(__dirname, 'src', 'icons');

// const getIcons = (dirPath) => {
//     let results = [];
//     const list = fs.readdirSync(dirPath);
//     list.forEach(file => {
//         file = path.resolve(dirPath, file);
//         const stat = fs.statSync(file);
//         if (stat && stat.isDirectory()) {
//             results = results.concat(getIcons(file));
//         } else {
//             results.push({
//                 name: path.basename(file),
//                 path: file.replace(__dirname, '').replace(/\\/g, '/')
//             });
//         }
//     });
//     return results;
// };


// //app.use('/icons', express.static(path.join(__dirname, 'src', 'icons')));
// app.use('/icons', express.static(path.join(__dirname, 'src/icons')));


// app.get('/api/icons', (req, res) => {
//     try {
//         const icons = getIcons(iconsPath);
//         res.json(icons);
//     } catch (error) {
//         res.status(500).json({ error: 'خطا در دریافت آیکون‌ها' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

const iconsPath = path.join(__dirname, 'src', 'icons');

const getIcons = (dirPath) => {
    let results = [];
    const list = fs.readdirSync(dirPath);
    list.forEach(file => {
        file = path.resolve(dirPath, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getIcons(file));
        } else {
            // حذف `src/` از مسیر
            results.push({
                name: path.basename(file),
                path: file.replace(iconsPath, '').replace(/\\/g, '/')
            });
        }
    });
    return results;
};

app.use('/icons', express.static(path.join(__dirname, 'src', 'icons')));

app.get('/api/icons', (req, res) => {
    try {
        const icons = getIcons(iconsPath);
        res.json(icons);
    } catch (error) {
        res.status(500).json({ error: 'خطا در دریافت آیکون‌ها' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
