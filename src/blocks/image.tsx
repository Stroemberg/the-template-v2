import { storyblokEditable } from "@storyblok/react/rsc";
import { SbBlokData } from "@storyblok/react/rsc";
import { StoryblokAsset } from "@/storyblok-types";
import { SbImage } from "@/components/_media/sb-image";

interface SbImageBlockData extends SbBlokData {
  image: StoryblokAsset;
  _uid: string;
}

interface ImageBlockProps {
  blok: SbImageBlockData;
}

const ImageBlock: React.FunctionComponent<ImageBlockProps> = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)}>
      <SbImage
        asset={blok.image}
        aspectRatio="square"
        className=""
        sizes="(max-width: 768px) 100vw, 50vw"
        widths={[400, 800, 1200]}
      />
    </div>
  );
};

export default ImageBlock;
