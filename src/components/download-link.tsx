import type { ComponentProps } from "react";
import { DOWNLOAD_FILE, DOWNLOAD_URL } from "@/lib/site";

/** Direct link to the latest release ZIP. Accepts anchor props so it works with `Button asChild`. */
export function DownloadLink({ children, ...props }: Omit<ComponentProps<"a">, "href" | "download">) {
  return (
    <a {...props} href={DOWNLOAD_URL} download={DOWNLOAD_FILE} rel="noopener" data-download="publishrank-zip">
      {children}
    </a>
  );
}
