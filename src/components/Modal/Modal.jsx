import { MetadataContent } from './MetadataContent';
import './styles.css';

export const Modal = ({ isOpen, onClose, item, accessToken }) => {
  if (!isOpen) return null;

  return (
    <div className='modalStyles' onClick={onClose}>
      <div className='modalContentStyles' onClick={e => e.stopPropagation()}> {/* This prevents modal from closing when its content is clicked */}
        <MetadataContent item={item} onClose={onClose} accessToken={accessToken} />
      </div>
    </div>
  );
}
