import axios from 'axios';

let source;

export const searchReq = async (accessToken, query, itemCount) => {
  // If a previous request is ongoing, cancel it
  if (source) {
    source.cancel('Request cancelled due to a new one.');
  }

  source = axios.CancelToken.source();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=artist,album,track&limit=${itemCount}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cancelToken: source.token,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message);
    } else {
      console.error('Failed to fetch results', error);
    }
  }
};
