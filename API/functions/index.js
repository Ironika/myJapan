'use strict';

const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");

const News = require('./helpers/News');
const Animes = require('./helpers/Animes');

const app = express()

const corsOptions = {
    // origin: 'https://yourdomain.com'
    origin: '*'
}

app.options('*', cors())

app.get("/news", cors(corsOptions), (request, response) => {
    const news = new News()
    news.getNews().then((news) => {
        response.json({status: 200, datas: news})
    }).catch(e => {
        response.json({status: 501, datas: [], message: e})
    }) 
})

app.get("/animes", cors(corsOptions), (request, response) => {
    const animes = new Animes()
    animes.getAnimes().then((animes) => {
        response.json({status: 200, datas: animes})
    }).catch(e => {
        response.json({status: 501, datas: [], message: e})
    }) 
})

const api = functions.https.onRequest(app)

module.exports = { api }
