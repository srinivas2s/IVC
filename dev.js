const concurrently = require('concurrently');

/**
 * Portable Development Runner
 * Directly uses the concurrently Node API for maximum stability 
 * across Windows, macOS, and Linux. No emojis used.
 */

// Gather arguments from both process.argv and npm environment variables
const args = process.argv.slice(2);

// Check if --host was passed via npm (npm run dev --host)
if (process.env.npm_config_host && !args.includes('--host')) {
    args.push('--host');
}

const clientArgs = args.length > 0 ? ` -- ${args.join(' ')}` : '';

console.log(`Starting development environment${clientArgs ? ' with args:' + clientArgs : ''}...`);

const { result } = concurrently([
    {
        command: 'npm run dev --prefix server',
        name: 'server',
        prefixColor: 'blue'
    },
    {
        command: `npm run dev --prefix client${clientArgs}`,
        name: 'client',
        prefixColor: 'green'
    }
], {
    killOthers: ['failure', 'success'],
    restartDelay: 0,
});

result.then(
    () => process.exit(0),
    () => process.exit(1)
);
