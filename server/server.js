const express = require('express');
const ReastSSR = require('react-dom/server');
const fs = require('fs');
const path = require('path');
const serverEntry = require('../dist/server-entry').default;

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');

const app = new express();

app.use('/public', express.static(path.join(__dirname, '../dist')));

app.get('*', function (req, res) {
    const appString = ReastSSR.renderToString(serverEntry);
    res.send(template.replace('<!--app-->', appString));
});

app.listen(3333, function () {
    console.log('Web Server Listen On 3333')
})