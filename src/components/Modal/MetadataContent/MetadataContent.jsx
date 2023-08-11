import { useState, useEffect } from 'react';
import './styles.css';
import { getArtistAlbums } from '../../../api/getArtistsAlbums';
import { getAlbumTracks } from '../../../api/getAlbumTracks';
import { getDuration } from '../../../utils/getDuration';

export const MetadataContent = ({ item, onClose, accessToken }) => {
  const [additionalMetaData, setAdditionalMetaData] = useState();

  useEffect(() => {
    if (!accessToken) return;
    const getAdditionalMetaData = async () => {
      if (item.type === 'artist') {
        const data = await getArtistAlbums(accessToken, item.data.id);
        const metadata = data.items.map((item) => ({ image: item.images[0], name: item.name }));
        setAdditionalMetaData(metadata);
      }

      if (item.type === 'album') {
        const data = await getAlbumTracks(accessToken, item.data.id);
        const metadata = data.items.map((item) => ({ duration: item.duration_ms, name: item.name }));
        setAdditionalMetaData(metadata);
      }
    };
    getAdditionalMetaData();
  }, [accessToken, item.data.id, item.type]);

  if (!item) return null;

  const { type, data } = item;

  return (
    <div className='container'>
      <button className='closeButton' onClick={onClose}>
        Close
      </button>
      {type === 'artist' && (
        <div>
          <img className='image' src={data.images[0]?.url} alt={data.name} />
          <h2>{data.name}</h2>
          <div>
            Albums:
            {additionalMetaData &&
              additionalMetaData.map((artistMetadata) => (
                <div className='artistsAlbumImageContainer' key={artistMetadata.name}>
                  <img className='artistsAlbumImage' src={artistMetadata.image.url} alt={artistMetadata.name} />
                  <div className='albumName'>{artistMetadata.name}</div>
                </div>
              ))}
          </div>
        </div>
      )}
      {type === 'album' && (
        <div>
          <img className='image' src={data.images[0]?.url} alt={data.name} />
          <h2>{data.name}</h2>
          <p>Release Date: {data.release_date}</p>
          <div>
            Songs list:
            {additionalMetaData &&
              additionalMetaData.map((albumsMetadata) => (
                <p key={albumsMetadata.name}>
                  {albumsMetadata.name} - {getDuration(albumsMetadata.duration)}
                </p>
              ))}
          </div>
        </div>
      )}
      {type === 'track' && (
        <div>
          <img className='image' src={data.album.images[0]?.url} alt={data.name} />
          <h2>{data.name}</h2>
          <p>Album: {data.album.name}</p>
          <p>Release Album Date: {data.album.release_date}</p>
          <p>Duration: {getDuration(data.duration_ms)}</p>
        </div>
      )}
    </div>
  );
};
