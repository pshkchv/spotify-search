import axios from "axios";

export const getAlbumTracks = async (accessToken, albumId) => await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
  headers: {
      'Authorization': `Bearer ${accessToken}`
  }
})
.then((data) => data.data)
.catch((error) => console.error('Failed to get access token', error));
