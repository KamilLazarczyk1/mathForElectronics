# Math for Electronics — Lectures 1 & 2

Open `index.html` in a modern browser. It works offline; no installation or server is required.

The guide is divided into 13 linked pages:

- `index.html`: course home
- `models.html`, `events.html`, `counting.html`: Lecture 1 topics
- `probability.html`, `conditional.html`, `poker.html`: Lecture 2 topics
- `practice-1.html`, `practice-2.html`: worked exercises, grouped by lecture
- `formulas.html`, `quiz.html`: formula reference and 40-question self-test
- `photos.html`, `references.html`: all eight lecture photos and reading references

Lecture 2 follows the supplied photos. The circle-in-a-square problem and completion of all poker categories are marked as extensions. Bayes' theorem and dedicated independence exercises remain for a future chapter.

- Progress and theme are saved in the current browser. Quiz attempts are session-only.
- Theme is also carried in internal page URLs, so it survives page changes and refreshes even when the browser isolates or blocks storage for local files.
- Print opens worked solutions on the current page and omits the interactive quiz.
- Keep this folder alongside `lists`, `img/lec2`, and the two course-book PDFs so the source links and photos continue to work.
- The local `katex` folder is copied from the supplied Physics for Electronics guide, allowing offline equation rendering.
- New lists and lectures require an explicit update; the page does not monitor the folder.

Content lives in the individual HTML pages. Appearance: `style.css`. Interactions and quiz questions: `app.js`. Global search and topic routing: `search-index.js` (update it when editing page content). Original `index.html#topic` bookmarks redirect to the corresponding new pages.
