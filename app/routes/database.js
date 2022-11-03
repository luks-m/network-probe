const appRouter = (app, fs) => {
    //variables
    const dbPath = './../JSON/database.json';

    // READ
    app.get('/database', (req, res) => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
};

module.exports = appRouter;