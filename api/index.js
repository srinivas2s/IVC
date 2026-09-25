let app;
let initError = null;

try {
    app = require('../server/index.js');
} catch (err) {
    console.error('[API INITIALIZATION ERROR]:', err);
    initError = err;
}

module.exports = (req, res) => {
    if (initError) {
        return res.status(500).json({
            error: 'Server initialization failed on Vercel',
            message: initError.message,
            stack: initError.stack
        });
    }
    return app(req, res);
};
