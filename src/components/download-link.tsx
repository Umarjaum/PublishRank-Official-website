import type { ComponentProps } from "react";
import { DOWNLOAD_URL } from "@/lib/site";

/** Direct link to the latest release ZIP on GitHub. Accepts anchor props so it works with `Button asChild`. */
export function DownloadLink({ children, ...props }: Omit<ComponentProps<"a">, "href" | "download">) {
  return (
    <a {...props} href={DOWNLOAD_URL} download="PublishRank.zip" rel="noopener" data-download="publishrank-zip">
      {children}
    </a>
  );
}
