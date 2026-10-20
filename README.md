# Math for Electronics — Lectures 1 & 2

Open `index.html` in a modern browser. It works offline; no installation or server is required.

The guide is divided into 13 linked pages:

- `index.html`: course home
- `models.html`, `events.html`, `counting.html`: Lecture 1 topics
- `probability.html`, `conditional.html`, `poker.html`: Lecture 2 topics
- `practice-1.html`, `practice-2.html`: worked exercises, grouped by lecture
- `formulas.html`, `quiz.html`: formula reference and a quiz drawing from 136 questions
- `photos.html`, `references.html`: all eight lecture photos and reading references

Lecture 2 follows the supplied photos. The circle-in-a-square problem and completion of all poker categories are marked as extensions. Bayes' theorem and dedicated independence exercises remain for a future chapter.

- The six lesson pages contain 96 original “Check your understanding” questions in 32 checkpoints, placed after the relevant explanations. These supplement the supplied exercise lists.
- Checkpoints mix numerical answers, multiple choice, and select-all questions, with hints, feedback, retries, and worked solutions. Viewed solutions are tracked separately from independently solved questions.
- Lesson progress, checkpoint answers, and theme are saved when browser storage is available. Quiz attempts are session-only.
- The quiz includes the 96 checkpoint questions and 40 review questions. Choose a topic and a 10-question, 20-question, or full set; review answers or retry missed questions. Its score uses the first valid answer to each question, and revealing a solution does not earn a point.
- Theme is also carried in internal page URLs, so it survives page changes and refreshes even when the browser isolates or blocks storage for local files.
- Print opens worked solutions and includes every checkpoint question with its answer and explanation on the current lesson page. The interactive quiz is omitted.
- Keep this folder alongside `lists`, `img/lec2`, and the two course-book PDFs so the source links and photos continue to work.
- The local `katex` folder is copied from the supplied Physics for Electronics guide, allowing offline equation rendering.
- New lists and lectures require an explicit update; the page does not monitor the folder.

Content lives in the individual HTML pages. Appearance: `style.css` and `practice.css`. General interactions and the original review questions: `app.js`. Checkpoint questions: `checks-data.js`; shared answer checking and saved checkpoint progress: `exercises.js`; quiz sessions: `quiz.js`. The printable checkpoint content also lives in the lesson HTML and should be kept in sync with the question bank. Global search and topic routing: `search-index.js` (update it when editing page content). Original `index.html#topic` bookmarks redirect to the corresponding new pages.
