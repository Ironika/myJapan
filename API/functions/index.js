'use strict';

const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");

const getNews = require('./helpers/News');
const getAnimes = require('./helpers/Animes');
const { getScans, getScansVA } = require('./helpers/Scans');

const app = express()

const corsOptions = {
    // origin: 'https://yourdomain.com'
    origin: '*'
}

app.options('*', cors())

app.get("/news", cors(corsOptions), (request, response) => {
    getNews().then((news) => {
        response.json({status: 200, datas: news})
    }).catch(e => {
        response.json({status: 501, datas: [], message: e})
    })
})

app.get("/animes", cors(corsOptions), (request, response) => {
    getAnimes().then((animes) => {
        response.json({status: 200, datas: animes})
    }).catch(e => {
        response.json({status: 501, datas: [], message: e})
    })
})

app.get("/scans", cors(corsOptions), (request, response) => {
    getScans().then((scans) => {
        response.json({status: 200, datas: scans})
    }).catch(e => {
        response.json({status: 501, datas: [], message: e})
    })
})

app.get("/scansva", cors(corsOptions), (request, response) => {
    getScansVA().then((scans) => {
        response.json({status: 200, datas: scans})
    }).catch(e => {
        response.json({status: 501, datas: [], message: e})
    })
})

const api = functions.https.onRequest(app)

module.exports = { api }
