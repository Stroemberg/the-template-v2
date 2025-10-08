import type { ReactNode } from "react";

interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

export default function Paragraph({ children }: ParagraphProps) {
  return <p className="">{children}</p>;
}
