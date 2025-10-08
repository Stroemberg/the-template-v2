import type { ImageAssetType, SbImageAspectRatios } from './sb-image.types';

/**
 * Utility functions for SbImage component
 */

export interface GetImageUrlOptions {
  asset: ImageAssetType;
  width: number;
  aspectRatio?: SbImageAspectRatios;
  quality?: number;
}

/**
 * Calculates height based on aspect ratio
 */
export const calculateHeight = (width: number, aspectRatio?: SbImageAspectRatios) => {
  if (!aspectRatio) {
    // Use 0 for auto height
    return 0;
  }
  switch (aspectRatio) {
    case '3:4':
      return Math.round(width / (3 / 4));
    case '2:1':
      return Math.round(width / (2 / 1));
    case '19:7':
      return Math.round(width / (19 / 7));
    case 'square':
      return width;
    case 'og-image':
      return Math.round(width / (1200 / 627)); // OpenGraph standard ratio
    case '3:2':
      return Math.round(width / (3 / 2));
    case '10:3':
      return Math.round(width / (10 / 3));
    case '16:9':
      return Math.round(width / (16 / 9));
    case '9:16':
      return Math.round(width / (9 / 16));
    default: {
      console.error(
        `Aspect ratio "${aspectRatio}" is not supported. Defaulting to auto height.`,
      );
      return 0;
    }
  }
};

/**
 * Builds a Storyblok image URL with the specified dimensions and settings
 */
export const buildStoryblokUrl = (
  baseUrl: string,
  width: number,
  height: number,
  focalPoint: string | undefined,
  quality?: number,
) => {
  // Prevent gifs from being processed by Storyblok (would increase file size)
  if (baseUrl?.endsWith('.gif')) return `${baseUrl}?`;

  let url = `${baseUrl}/m/${width}x${height}`;
  if (focalPoint || (quality !== undefined && quality !== null)) {
    url += '/filters';
    if (focalPoint) {
      url += `:focal(${focalPoint})`;
    }
    if (quality !== undefined && quality !== null) {
      url += `:quality(${quality})`;
    }
  }
  return url;
};

/**
 * Gets a URL for an image asset with the specified dimensions and settings
 */
export const getImageUrl = ({
  asset,
  width,
  aspectRatio,
  quality,
}: GetImageUrlOptions): string => {
  try {
    if (!asset) {
      console.error('getImageUrl: No asset provided');
      return '';
    }

    if (!width || width <= 0) {
      console.error('getImageUrl: Invalid width provided');
      return '';
    }

    const baseUrl = asset.filename; // : asset.url;

    if (!baseUrl) {
      console.error('getImageUrl: No base URL found in asset');
      return '';
    }

    const focalPoint = asset.focus ?? undefined;

    const height = calculateHeight(width, aspectRatio);

    return buildStoryblokUrl(baseUrl, width, height, focalPoint, quality);
  } catch (error) {
    console.error(error, 'getImageUrl: Error generating image URL');
    return '';
  }
};
