"use client";

import clsx from "clsx";
import { useLayoutStore } from "@/store/layoutStore";

export default function PageLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const layoutState = useLayoutStore((state) => state.state);

  return (
    <div
      className={clsx("pt-24 pr-8 pb-8 transition-default", {
        "pl-80": layoutState,
        "pl-28": !layoutState,
      })}
    >
      {children}
    </div>
  );
}
