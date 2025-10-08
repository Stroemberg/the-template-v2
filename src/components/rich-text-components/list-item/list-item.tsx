import type { ReactNode } from "react";

interface ListItemProps {
  children: ReactNode;
}

export default function ListItem({ children }: ListItemProps) {
  return <li className="">{children}</li>;
}
