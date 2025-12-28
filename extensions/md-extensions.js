(() => {
  const loadMermaid = () =>
    new Promise((resolve, reject) => {
      if (window.mermaid) return resolve(window.mermaid);

      const script = document.createElement("script");
      script.src = "./extensions/mermaid.min.js";
      script.onload = () => resolve(window.mermaid);
      script.onerror = () => reject(new Error("Mermaid failed to load."));
      document.head.appendChild(script);
    });

  const renderMermaidBlocks = () => {
    const { mermaid } = window;
    if (!mermaid) {
      console.warn("Mermaid failed to load.");
      return;
    }

    const mermaidBlocks = Array.from(
      document.querySelectorAll("pre > code.language-mermaid")
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

  const start = () => {
    loadMermaid()
      .then(() => renderMermaidBlocks())
      .catch((err) => console.error(err));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
