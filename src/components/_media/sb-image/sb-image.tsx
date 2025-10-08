import type { SbImageProps } from './sb-image.types';
import { getImageUrl } from './sb-image-utils';

export function SbImage({
  asset,
  widths,
  sizes,
  aspectRatio,
  loading = 'lazy',
  quality,
  className,
}: SbImageProps) {
  // Return null if no asset is provided
  if (!asset) {
    return null;
  }

  // Generate srcset with correct URLs
  const srcset = widths
    .map((width) => {
      const url = getImageUrl({ asset, width, aspectRatio, quality });
      return `${url} ${width}w`;
    })
    .join(', ');

  // Default source (smallest width)
  const smallestWidth = Math.min(...widths);
  const defaultSrc = getImageUrl({
    asset,
    width: smallestWidth,
    aspectRatio,
    quality,
  });

  const altText = asset.alt || '';

  return (
    <img
      src={defaultSrc}
      srcSet={srcset}
      sizes={sizes}
      alt={altText}
      loading={loading}
      className={className}
    />
  );
}
