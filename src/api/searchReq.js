import axios from "axios";

export const searchReq = async (accessToken, query, itemCount) =>
  await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=artist,album,track&limit=${itemCount}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then((data) => data.data)
  .catch((error) => console.error('Failed to fetch results', error));
