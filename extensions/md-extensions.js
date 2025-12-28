(() => {
  let mermaidReady;

  const loadMermaid = () => {
    if (mermaidReady) return mermaidReady;

    mermaidReady = new Promise((resolve, reject) => {
      if (window.mermaid) return resolve(window.mermaid);

      const script = document.createElement("script");
      script.src = "./extensions/mermaid.min.js";
      script.onload = () => resolve(window.mermaid);
      script.onerror = () => reject(new Error("Mermaid failed to load."));
      document.head.appendChild(script);
    });

    return mermaidReady;
  };

  const renderMermaidBlocks = () => {
    const { mermaid } = window;
    if (!mermaid) {
      console.warn("Mermaid failed to load.");
      return;
    }

    const mermaidBlocks = Array.from(
      document.querySelectorAll(".language-mermaid")
    );
    console.log(mermaidBlocks);

    if (mermaidBlocks.length === 0) return;

    mermaid.initialize({ startOnLoad: false });

    mermaidBlocks.forEach((code) => {
      const pre = code.closest("marp-pre");
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

  const onReady = () => {
    start();

    // Re-run if new slides get added (e.g., presenter view clones).
    const observer = new MutationObserver(() => start());
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "complete") {
    onReady();
  } else {
    window.addEventListener("load", onReady, { once: true });
  }
})();
