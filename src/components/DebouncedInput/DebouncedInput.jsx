import { useState, useEffect } from 'react';
import './styles.css';

// I didn't add suggestions and instead of them I just render items with trottle function
// and debounce. I did it because Spotify API is not providing api like this +
// to avoid trottling. It help with trottling because of count of requests will multiply 2 OR will be +1
// in case of suggestions.
export const DebouncedInput = ({ onValueChange, debounceTime = 500 }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onValueChange(inputValue);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onValueChange, debounceTime]);

  return <input className="materialInput" value={inputValue} onChange={e => setInputValue(e.target.value)} />;
}
