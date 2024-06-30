import React, { useState } from 'react';
import { Image } from '@nextui-org/react';

const BlockImage = ({ imageSource }: any) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImages, setZoomedImages] = useState<string[]>([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageSources = imageSource.split('\n').map((src: any) => src.trim());

  const toggleZoom = (images: string[]) => {
    setZoomedImages(images);
    setIsZoomed(!isZoomed);
    setShowAllImages(true);
    setCurrentImageIndex(0);
  };

  const handleImageClick = (src: string) => {
    setZoomedImages([src]);
    setIsZoomed(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % zoomedImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + zoomedImages.length) % zoomedImages.length,
    );
  };

  return (
    <div className="flex justify-center mt-5 mb-5">
      {isZoomed ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            &times;
          </button>
          <button
            onClick={handlePrevImage}
            className="absolute left-4 text-white text-2xl"
          >
            &#10094;
          </button>
          <Image
            src={zoomedImages[currentImageIndex]}
            alt={`Zoomed Image ${currentImageIndex}`}
            sizes="lg"
            width={1400}
          />
          <button
            onClick={handleNextImage}
            className="absolute right-4 text-white text-2xl"
          >
            &#10095;
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap w-full justify-center gap-2 cursor-pointer">
          {imageSources.length > 2 ? (
            <>
              <div className="w-2/3">
                <Image
                  src={imageSources[0]}
                  alt="First Image"
                  onClick={() => handleImageClick(imageSources[0])}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-1/4 flex flex-col gap-2">
                <div>
                  <Image
                    src={imageSources[1]}
                    alt="Second Image"
                    onClick={() => handleImageClick(imageSources[1])}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  className="flex-1 flex items-center justify-center bg-gray-300 rounded-2xl"
                  onClick={() => toggleZoom(imageSources.slice(2))}
                >
                  <span className="text-5xl text-gray-700">{`+${imageSources.length - 2}`}</span>
                </div>
              </div>
            </>
          ) : (
            imageSources.map((src: any, index: any) => (
              <Image
                key={index}
                src={src.trim()}
                alt={`Image ${index}`}
                onClick={() => toggleZoom([src.trim()])}
                className=""
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BlockImage;
