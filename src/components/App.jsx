import { useState, useEffect } from 'react';
import { fetchImages } from 'services/PixabayApi';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [imgs, setImgs] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreBtn, setLoadMoreBtn] = useState(false);

  useEffect(() => {
    if (searchRequest !== '') {
      setIsLoading(true);

      fetchImages(searchRequest, currentPage)
        .then(data => {
          setImgs(imgs => [...imgs, ...data.hits]);
          setLoadMoreBtn(currentPage < Math.ceil(data.totalHits / 12));
        })
        .catch(error => console.log(error))
        .finally(setIsLoading(false));
    }
  }, [searchRequest, currentPage]);

  const handleFormSubmit = searchRequest => {
    setSearchRequest(searchRequest);
    setImgs([]);
    setCurrentPage(1);
    setIsLoading(true);
    setLoadMoreBtn(false);
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage => currentPage + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {searchRequest && <ImageGallery imgs={imgs} />}
      {isLoadMoreBtn && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
    </div>
  );
};
