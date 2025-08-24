import React from 'react';
import { useLazyImage } from '../../lib/utils';

const LazyImage = React.memo(({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  loadingClassName = 'bg-muted animate-pulse',
  ...props 
}) => {
  const { imgRef, imageSrc, isLoaded, isError } = useLazyImage(src);

  if (isError) {
    return (
      <div 
        ref={imgRef} 
        className={`flex items-center justify-center text-muted-foreground ${className}`}
        {...props}
      >
        Failed to load image
      </div>
    );
  }

  return (
    <div ref={imgRef} className={className} {...props}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      )}
      {!isLoaded && (
        placeholder || (
          <div className={`w-full h-full flex items-center justify-center ${loadingClassName}`}>
            <div className="text-sm text-muted-foreground">Loading...</div>
          </div>
        )
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;
