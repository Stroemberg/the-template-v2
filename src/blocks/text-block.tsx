import { Richtext } from "@/components/rich-text";
import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { StoryblokRichtext } from "@/storyblok-types";

import React from "react";

interface SbTextBlockData extends SbBlokData {
  text: StoryblokRichtext;
  links: string;
  _uid: string;
}

interface TextBlockProps {
  blok: SbTextBlockData;
}

const TextBlock: React.FunctionComponent<TextBlockProps> = ({ blok }) => {
  return (
    <section {...storyblokEditable(blok)}>
      {blok.text && <Richtext richText={blok.text} />}
    </section>
  );
};

export default TextBlock;
