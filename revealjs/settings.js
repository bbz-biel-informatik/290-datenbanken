import Reveal from './dist/reveal.esm.js';
import RevealZoom from './plugin/zoom/zoom.esm.js';
import RevealNotes from './plugin/notes/notes.esm.js';
import RevealSearch from './plugin/search/search.esm.js';
import RevealMarkdown from './plugin/markdown/markdown.esm.js';
import RevealHighlight from './plugin/highlight/highlight.esm.js';
import mermaid from './node_modules/mermaid/dist/mermaid.esm.min.mjs';

mermaid.initialize({ startOnLoad: true });

window.Reveal = Reveal;

Reveal.initialize({
  controls: true,
  progress: true,
  center: true,
  hash: true,

  plugins: [
    RevealZoom,
    RevealNotes,
    RevealSearch,
    RevealMarkdown,
    RevealHighlight,
  ],
});
