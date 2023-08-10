import axios from "axios";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

export const getToken = async () => await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
  }
})
.then((data) => data.data.access_token)
.catch((error) => console.error('Failed to get access token', error));
