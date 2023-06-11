const express = require('express');
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

const API_PREFIX = '/api/v1';

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});

app.get(`/*`, function(req, res){
    res.sendFile(process.cwd()+'/dist/index.html')
});

app.get(`/page-error404`, function(req, res){
    res.sendFile(process.cwd()+'/dist/PageErrorTpl.*.html')
});