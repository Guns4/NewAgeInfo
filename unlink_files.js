const fs = require('fs');
const paths = [
    'd:\\New Project website\\Project Website\\Ageinfo\\Ageinfo\\src\\app\\[locale]\\born\\[date]\\page.tsx',
    'd:\\New Project website\\Project Website\\Ageinfo\\Ageinfo\\src\\app\\[locale]\\born\\[year]\\page.tsx',
    'd:\\New Project website\\Project Website\\Ageinfo\\Ageinfo\\src\\app\\[locale]\\birthdate\\[date]\\page.tsx'
];

paths.forEach(p => {
    try {
        if (fs.existsSync(p)) {
            fs.unlinkSync(p);
            console.log('Deleted: ' + p);
        } else {
            console.log('Not found: ' + p);
        }
    } catch (e) {
        console.log('Error deleting ' + p + ': ' + e.message);
    }
});
