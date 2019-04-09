import axios from 'axios'
const config = require('../config.example.json');

// TODO move to config file
const apiPublicKey = config.YOUTUBE_API_KEY

const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: apiPublicKey
  }
})


export async function checkVideoById(videoId) {
  let response = await youtube.get('/videos',
    {
      params: {
        part: 'id',
        id: videoId
      }
    })

  return response.data.items.length ? videoId : false;
}

export async function findVideoByKeyWord(keyword) {

  let response = await youtube.get('/search',
    {
      params: {
        part: 'snippet',
        maxResults: 5,
        q: keyword
      }
    })
  return response.data.items;
}

