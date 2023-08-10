import axios from "axios";

export const getArtistAlbums = async (accessToken, artistId) => await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
  headers: {
      'Authorization': `Bearer ${accessToken}`
  }
})
.then((data) => data.data)
.catch((error) => console.error('Failed to get access token', error));
