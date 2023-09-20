import React, { useState, useEffect } from 'react';
import useImages from '../../hooks/useImages';
import GalleryImage from './GalleryImage';
import Navbar from '../../components/Navbar';
import { Ring } from '@uiball/loaders';



function ErrorDisplay({ message }) {
  return (
    <div>
      <div className="text-red-600">{message}</div>
    </div>
  );
}


const GalleryPage = () => {
  const { images, isLoading, error, filterImagesByTags } = useImages();
  const [stateImages, setStateImages] = useState([]);

  useEffect(() => {
    if (images && images.length > 0) {
      setStateImages(images);
    }
  }, [images, filterImagesByTags]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = [...stateImages];
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    setStateImages(reorderedImages);
  };

  if (error)
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorDisplay message="Failed to fetch images. Please try again later." />
      </div>
    );


    if (isLoading) return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ring color='#ffffff'/>
      </div>
    );

  const handleFilterImages = (tagInput) => {
    const filteredImages = filterImagesByTags(tagInput);
    setStateImages(filteredImages);
  };

  return (
    <div className='bg-[#1d2951] min-h-[100vh] pb-8'>
      <Navbar onFilterImages={handleFilterImages} />
      <GalleryImage images={stateImages} onDragEnd={handleDragEnd} />
    </div>
  );
};

export default GalleryPage;
