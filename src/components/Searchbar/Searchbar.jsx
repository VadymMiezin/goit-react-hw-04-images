import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoSearchOutline } from 'react-icons/io5';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchRequest, setSearchRequest] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    const currentSearchRequest = e.currentTarget.text.value.trim();

    if (currentSearchRequest === '') {
      alert('Please enter at least one word');
    } else {
      onSubmit(currentSearchRequest);
    }
    reset();
  };

  const handleChangeInput = e => {
    setSearchRequest(e.currentTarget.value.toLowerCase().trim());
  };

  const reset = () => {
    setSearchRequest('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>
            <IoSearchOutline className={css.Icon} />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          value={searchRequest}
          type="text"
          name="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
