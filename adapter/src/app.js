const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

const vmtMassUpdate = require('./endpoints/vmtMassUpdate');
const vmtUpdate = require('./endpoints/vmtUpdate');

app.use(cors());
app.use(bodyParser.json());

app.post('/vmtMassUpdate', vmtMassUpdate);
app.post('/vmtUpdate', vmtUpdate);

module.exports = app;