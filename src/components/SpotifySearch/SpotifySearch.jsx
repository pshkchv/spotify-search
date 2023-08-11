import { useState, useEffect, useRef, useCallback } from 'react';
import { throttle } from 'lodash';
import { DebouncedInput } from '../DebouncedInput';
import { Modal } from '../Modal';
import './styles.css';
import { searchReq } from '../../api/searchReq';
import { getToken } from '../../api/getToken';
import { TABS_DATA } from '../../const';

export const SpotifySearch = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [results, setResults] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [itemCount, setItemCount] = useState(5);
  const [activeTab, setActiveTab] = useState('artists');
  const lastQueryRef = useRef('');

  useEffect(() => {
    if (accessToken) return;

    const getTokenReq = async () => {
      const token = await getToken();
      setAccessToken(token);
    };

    getTokenReq();
  }, [accessToken]);

  const throttledSearch = throttle(async (query) => {
    if (!accessToken) return;

    setIsLoading(true);
    const res = await searchReq(accessToken, query, itemCount);
    if (res) {
      setResults(res);
    }
    setIsLoading(false);
  }, 1000);

  const searchSpotify = (query) => {
    if (!query.trim() || lastQueryRef.current === query) return;
    lastQueryRef.current = query;
    throttledSearch(query);
  };

  const handleItemClick = (type, item) => {
    setSelectedItem({ type, data: item });
  };

  const closeModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleItemCountChange = (e) => {
    setItemCount(parseInt(e.target.value, 10));
  };

  // Trigger refetch when itemCount changes
  useEffect(() => {
    if (lastQueryRef.current) {
      throttledSearch(lastQueryRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCount]);

  return (
    <div className='container'>
      <div className='input-container'>
        <DebouncedInput onValueChange={searchSpotify} className='searchInput' />

        <label>
          {`Number of Items: `}
          <input type='number' value={itemCount} onChange={handleItemCountChange} min='1' max='50' />
        </label>
      </div>

      <div className='tabs'>
        {TABS_DATA.map((tab) => (
          <div
            key={tab.value}
            className={`tab ${activeTab === tab.value ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {isLoading ? (
        <p className='text-center'>Loading...</p>
      ) : (
        <div>
          {activeTab === 'artists' && (
            <div>
              {results.artists?.items.map((artist) => (
                <div key={artist.id} onClick={() => handleItemClick('artist', artist)} className='item'>
                  <img className='itemImage' src={artist.images[0]?.url} alt={artist.name} />
                  <p>{artist.name}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'albums' && (
            <div>
              {results.albums?.items.map((album) => (
                <div key={album.id} onClick={() => handleItemClick('album', album)} className='item'>
                  <img className='itemImage' src={album.images[0]?.url} alt={album.name} />
                  <p>{album.name}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tracks' && (
            <div>
              {results.tracks?.items.map((track) => (
                <div key={track.id} onClick={() => handleItemClick('track', track)} className='item'>
                  <img className='itemImage' src={track.album.images[0]?.url} alt={track.name} />
                  <p>{track.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Modal isOpen={!!selectedItem} onClose={closeModal} item={selectedItem} accessToken={accessToken} />
    </div>
  );
};
