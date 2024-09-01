const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

// مسیر به فولدر آیکون‌ها
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
            results.push(file);
        }
    });
    return results;
};

app.get('/api/icons', (req, res) => {
    res.json(getIcons(iconsPath));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
