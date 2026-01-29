const fs = require('fs');
const path = require('path');

const tasks = [
    {
        src: '/Users/bharathkumara/.gemini/antigravity/brain/68ca9adc-091d-49ae-8413-dd9ab90773a5/uploaded_media_0_1769611037240.png',
        dest: 'client/public/smart-campus.png'
    },
    {
        src: '/Users/bharathkumara/.gemini/antigravity/brain/68ca9adc-091d-49ae-8413-dd9ab90773a5/uploaded_media_0_1769611122495.png',
        dest: 'client/public/health-ai.png'
    }
];

tasks.forEach(task => {
    try {
        const destPath = path.resolve(__dirname, task.dest);
        fs.copyFileSync(task.src, destPath);
        console.log(`Successfully copied to ${destPath}`);
    } catch (error) {
        console.error(`Error copying to ${task.dest}:`, error.message);
    }
});
