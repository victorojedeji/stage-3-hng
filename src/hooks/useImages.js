import { useEffect, useState } from "react";

function useImages() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;
      try {

        const response = await fetch(
          `https://pixabay.com/api/?q=all&image_type=photo&per_page=30&key=${API_KEY}`
        );

        if (response.status === 200) {
          const data = await response.json();
          setImages(data.hits);
          setIsLoading(false);
        } else {
          setError(new Error("Error fetching images from Pixabay"));
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { images, isLoading, error };
}

export default useImages;
