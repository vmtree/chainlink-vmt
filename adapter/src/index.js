const app = require('./app');

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Now listening on http://localhost:${PORT}`);
});