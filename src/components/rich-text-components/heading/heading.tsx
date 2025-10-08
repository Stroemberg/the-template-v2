import type { ReactNode } from "react";

interface HeadingProps {
  heading: "h1" | "h2" | "h3";
  children: ReactNode;
}

export default function Heading({ children, heading }: HeadingProps) {
  switch (heading) {
    case "h1":
      return <h1 className="text-4xl font-bold">{children}</h1>;
    case "h2":
      return <h2 className="text-3xl font-bold">{children}</h2>;
    case "h3":
      return <h3 className="text-2xl font-bold">{children}</h3>;
    default:
      return null;
  }
}
