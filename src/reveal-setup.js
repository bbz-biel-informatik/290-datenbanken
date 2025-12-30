
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';
import Search from 'reveal.js/plugin/search/search.esm.js';
import Zoom from 'reveal.js/plugin/zoom/zoom.esm.js';

import RevealDrawer from './plugins/drawer/drawer.esm.js';
import mermaid from 'mermaid';

// Styles
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import 'reveal.js/plugin/highlight/monokai.css';
import './plugins/drawer/drawer.css';

mermaid.initialize({ startOnLoad: true });

window.Reveal = Reveal;

Reveal.initialize({
  controls: true,
  progress: true,
  center: true,
  hash: true,
  plugins: [
    Zoom,
    Notes,
    Search,
    Markdown,
    Highlight,
    RevealDrawer,
  ],
});
