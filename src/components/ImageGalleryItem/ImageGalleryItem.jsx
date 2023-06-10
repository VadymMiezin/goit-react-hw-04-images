import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export default function ImageGalleryItem({ webURL, tags, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
        onClick={toggleModal}
      />

      {showModal && (
        <Modal
          onCloseModal={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
