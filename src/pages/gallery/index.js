import React, { useState, useEffect } from 'react';
import useImages from '../../hooks/useImages';
import GalleryImage from './GalleryImage';
import Navbar from './Navbar';

const GalleryPage = () => {
  const { images, isLoading, error } = useImages();
  const [stateImages, setStateImages] = useState([]);

  useEffect(() => {
    if (images && images.length > 0) {
      setStateImages(images);
    }
  }, [images]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = [...stateImages];
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    setStateImages(reorderedImages);
  };

  return (
    <div className='bg-[#1d2951]'>
      <Navbar />
      <GalleryImage images={stateImages} onDragEnd={handleDragEnd} />
    </div>
  );
};

export default GalleryPage;
