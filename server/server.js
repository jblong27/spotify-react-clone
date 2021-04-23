const express = require('express')
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()
//to remove cors error
app.use(cors())
app.use(express.json())

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '9d2bed93807448fe9f8b765614e48133',
    clientSecret: 'fadaf2befb15499fab6173d4e2df0f7f'
  })

  spotifyApi.refreshAccessToken().then(
    (data) => {
      console.log(data.body);
    }).catch(() => {
      res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
  const code = req.body.code
  //client id and secretid from spotify dev app
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '9d2bed93807448fe9f8b765614e48133',
    clientSecret: 'fadaf2befb15499fab6173d4e2df0f7f'
  })
  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  }).catch((err) => {
    console.log(err)
    res.sendStatus(400)
  })
})

app.listen(3001)