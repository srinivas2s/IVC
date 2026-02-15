const { spawn } = require('child_process');

// Get arguments passed to the script (skip 'node' and 'dev.js')
const args = process.argv.slice(2);

// Filter out the '--' that npm sometimes leaves in process.argv depending on shell/version
const filteredArgs = args.filter(arg => arg !== '--');

// If there are arguments, prepare them to be passed to the client script
// We use '-- ' to ensure npm passes them through to the underlying vite command
const clientArgs = filteredArgs.length > 0 ? '-- ' + filteredArgs.join(' ') : '';

const concurrentlyArgs = [
    'concurrently',
    '--kill-others',
    '--prefix-colors', 'blue,green',
    '--names', 'server,client',
    '"npm run dev --prefix server"',
    `"npm run dev --prefix client ${clientArgs}"`
];

const child = spawn('npx', concurrentlyArgs, {
    shell: true,
    stdio: 'inherit'
});

child.on('exit', (code) => {
    process.exit(code || 0);
});
