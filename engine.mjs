import { Marp } from "@marp-team/marp-core";
import mermaidPluginImport from "markdown-it-mermaid";

export default (opts) => {
  // Ensure HTML is allowed (needed if you inject scripts in Markdown)
  const marp = new Marp({ ...opts, html: true });

  marp.use(mermaidPluginImport.default);

  return marp;
};
