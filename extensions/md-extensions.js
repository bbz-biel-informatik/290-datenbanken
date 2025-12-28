import "./mermaid.min.js";

const renderMermaidBlocks = () => {
  const { mermaid } = window;
  if (!mermaid) {
    console.warn("Mermaid failed to load.");
    return;
  }

  const mermaidBlocks = Array.from(
    document.querySelectorAll("pre > code.language-mermaid"),
  );

  if (mermaidBlocks.length === 0) return;

  mermaid.initialize({ startOnLoad: false });

  mermaidBlocks.forEach((code) => {
    const pre = code.closest("pre");
    if (!pre) return;

    const container = document.createElement("div");
    container.className = "mermaid";
    container.textContent = code.textContent;

    pre.replaceWith(container);
  });

  mermaid.init(undefined, document.querySelectorAll(".mermaid"));
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderMermaidBlocks);
} else {
  renderMermaidBlocks();
}
