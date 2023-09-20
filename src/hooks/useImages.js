import { useEffect, useState } from "react";

function useImages() {
  const [originalImages, setOriginalImages] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCityImages = async () => {
      const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;
      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=cities&image_type=photo&per_page=30&key=${API_KEY}`
        );

        if (response.status === 200) {
          const data = await response.json();
          setOriginalImages(data.hits);
          setImages(data.hits);
          setIsLoading(false);
        } else {
          setError(new Error("Error fetching city images from Pixabay"));
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchCityImages();
  }, []);

  const filterImagesByTags = (tags) => {
    if (!tags) {
      setImages(originalImages);
    } else {
      const filteredImages = originalImages.filter((image) =>
        tags.split(",").some((tag) => image.tags.includes(tag.trim()))
      );

      setImages(filteredImages);
    }
  };

  return { images, isLoading, error, filterImagesByTags };
}

export default useImages;
