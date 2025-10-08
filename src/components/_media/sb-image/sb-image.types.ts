import type { StoryblokAsset } from '@/storyblok-types';

export type ImageAssetType = StoryblokAsset | null | undefined;

export type SbImageAspectRatios = '3:4' | '2:1' | '19:7' | "16:9" | 'square' | 'og-image' | '3:2' | '10:3' | '9:16';

export interface SbImageProps {
  /**
   * The image asset from Storyblok
   */
  asset: ImageAssetType;

  /**
   * Array of widths to generate in the srcset
   */
  widths: number[];

  /**
   * The sizes attribute for the img element
   */
  sizes: string /**
   * The aspect ratio
   * If not provided, will attempt to calculate from image
   */;
  aspectRatio?: SbImageAspectRatios;

  /**
   * Quality of the image (1-100)
   * @default 75
   */
  quality?: number;

  /**
   * Loading strategy
   * @default "lazy"
   */
  loading?: 'lazy' | 'eager';

  /**
   * Additional CSS class name
   */
  className?: string;
}
