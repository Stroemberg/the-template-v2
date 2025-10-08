import type { ReactNode } from "react";

interface BlockQuoteProps {
  children: ReactNode;
}

export default function BlockQuote({ children }: BlockQuoteProps) {
  // TODO: Add styles
  return <blockquote className="italic">{children}</blockquote>;
}
