import { useState } from 'react';
import { DebouncedInput } from '../DebouncedInput';

export const SpotifySearch = () => {
  const [itemCount, setItemCount] = useState(5);

  const handleItemCountChange = (e) => {
    setItemCount(parseInt(e.target.value, 10));
  };

  return (
    <div className='container'>
      <DebouncedInput onValueChange={() => console.log('debouncedInput')} className='searchInput' />

      <label>
        Number of Items:
        <input type='number' value={itemCount} onChange={handleItemCountChange} min='1' max='50' />
      </label>
    </div>
  );
};
