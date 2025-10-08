import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_LINK,
  NODE_HEADING,
  NODE_LI,
  NODE_OL,
  NODE_PARAGRAPH,
  NODE_QUOTE,
  NODE_UL,
  render,
} from "storyblok-rich-text-react-renderer";

import { StoryblokRichtext } from "@/storyblok-types";

import BlockQuote from "./rich-text-components/blockquote/blockquote";
import Heading from "./rich-text-components/heading/heading";
import ListItem from "./rich-text-components/list-item/list-item";
import Paragraph from "./rich-text-components/paragraph/paragraph";

interface TextAreaProps {
  className?: string;
  richText?: StoryblokRichtext;
}

export function Richtext(props: TextAreaProps) {
  const { className, richText } = props;

  return (
    <div>
      {render(richText, {
        nodeResolvers: {
          [NODE_HEADING]: (children, props) => {
            const { level } = props;

            if (level === 1) {
              return <Heading heading="h1">{children}</Heading>;
            }

            if (level === 2) {
              return <Heading heading="h2">{children}</Heading>;
            }
            if (level === 3) {
              return <Heading heading="h3">{children}</Heading>;
            }

            return <h4 className="">{children}</h4>;
          },
          [NODE_QUOTE]: (children) => {
            return <BlockQuote>{children}</BlockQuote>;
          },
          [NODE_PARAGRAPH]: (children) => {
            return <Paragraph className={className}>{children}</Paragraph>;
          },
          [NODE_LI]: (children) => {
            return <ListItem>{children}</ListItem>;
          },
          [NODE_UL]: (children) => {
            return <ul className="">{children}</ul>;
          },
          [NODE_OL]: (children) => {
            return <ol className="">{children}</ol>;
          },
        },
        markResolvers: {
          [MARK_BOLD]: (children) => {
            return <strong className="">{children}</strong>;
          },
          [MARK_ITALIC]: (children) => {
            return <em className="">{children}</em>;
          },
          //   [MARK_LINK]: (children, props) => {
          //     const { href, target, linktype } = props;

          //     if (!href) return <span>{children}</span>;

          //     if (linktype === "email") {
          //       const emailHref = href.startsWith("mailto:")
          //         ? href
          //         : `mailto:${href}`;
          //       return (
          //         <a href={emailHref} target={target}>
          //           {children}
          //         </a>
          //       );
          //     }

          //     if (
          //       linktype === "phone" ||
          //       (typeof href === "string" && href.startsWith("tel:"))
          //     ) {
          //       const phoneHref = href.startsWith("tel:") ? href : `tel:${href}`;
          //       return (
          //         <a href={phoneHref} target={target}>
          //           {children}
          //         </a>
          //       );
          //     }

          //     if (typeof href === "string" && href.startsWith("mailto:")) {
          //       return (
          //         <a href={href} target={target}>
          //           {children}
          //         </a>
          //       );
          //     }

          //     // return (
          //     // //   <Link link_type="plain-link" href={href} target={target}>
          //     // //     {children}
          //     // //   </Link>
          //     // );
          //   },
        },
      })}
    </div>
  );
}
