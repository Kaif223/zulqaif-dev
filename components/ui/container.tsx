import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

// Page gutter: 16px on phones, 24px from `sm`, content capped at 1440px.
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cx("mx-auto w-full max-w-[90rem] px-4 sm:px-6", className)}
      {...props}
    />
  );
}
