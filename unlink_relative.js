const fs = require('fs');
const paths = [
    'src/app/[locale]/born/[date]/page.tsx',
    'src/app/[locale]/born/[year]/page.tsx',
    'src/app/[locale]/birthdate/[date]/page.tsx'
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
