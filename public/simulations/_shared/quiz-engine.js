/*
 * Shared 10-question end-of-unit quiz renderer for CodeNest canvas.html
 * lesson pages.
 *
 * Usage:
 *   renderQuiz("quizRoot", QUESTIONS[LANG], {
 *     submitLabel: "Check Answers", scoreLabel: (n, total) => `${n}/${total}`,
 *   });
 *
 * questions = [{ q: "...", choices: ["...", "...", "...", "..."], answer: 0 }, ...]
 * Grading is local/instant (no backend) — auto-saves picked answers to
 * localStorage per storageKey so a refresh doesn't lose progress.
 */
function renderQuiz(rootId, questions, opts) {
  const root = document.getElementById(rootId);
  if (!root) return;
  const o = Object.assign(
    {
      submitLabel: "Check Answers",
      resetLabel: "Try Again",
      correctText: "Correct",
      incorrectText: "Incorrect — correct answer:",
      scorePrefix: "Score:",
      storageKey: rootId + "-quiz",
    },
    opts || {}
  );

  let picked = {};
  try {
    const raw = localStorage.getItem(o.storageKey);
    if (raw) picked = JSON.parse(raw);
  } catch (e) {
    picked = {};
  }
  let graded = false;

  function save() {
    localStorage.setItem(o.storageKey, JSON.stringify(picked));
  }

  function render() {
    root.innerHTML = "";
    questions.forEach((item, qi) => {
      const card = document.createElement("div");
      card.className = "quiz-card";
      const qEl = document.createElement("p");
      qEl.className = "quiz-question";
      qEl.textContent = qi + 1 + ". " + item.q;
      card.appendChild(qEl);

      item.choices.forEach((choice, ci) => {
        const label = document.createElement("label");
        label.className = "quiz-choice";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "q" + qi;
        input.value = ci;
        input.checked = picked[qi] === ci;
        input.addEventListener("change", () => {
          picked[qi] = ci;
          save();
        });
        label.appendChild(input);
        label.appendChild(document.createTextNode(choice));

        if (graded) {
          if (ci === item.answer) label.classList.add("quiz-correct");
          else if (picked[qi] === ci) label.classList.add("quiz-wrong");
        }
        card.appendChild(label);
      });

      if (graded) {
        const fb = document.createElement("p");
        fb.className = "quiz-feedback";
        if (picked[qi] === item.answer) {
          fb.textContent = "✓ " + o.correctText;
          fb.classList.add("quiz-correct");
        } else {
          fb.textContent = "✗ " + o.incorrectText + " " + item.choices[item.answer];
          fb.classList.add("quiz-wrong");
        }
        card.appendChild(fb);
      }

      root.appendChild(card);
    });

    const controls = document.createElement("div");
    controls.className = "toolbar";
    controls.style.marginTop = "16px";

    const btn = document.createElement("button");
    btn.className = "tool-btn active";
    btn.textContent = graded ? o.resetLabel : o.submitLabel;
    btn.onclick = () => {
      if (graded) {
        graded = false;
      } else {
        graded = true;
      }
      render();
      if (graded) {
        const score = questions.reduce(
          (acc, item, qi) => acc + (picked[qi] === item.answer ? 1 : 0),
          0
        );
        scoreEl.textContent = o.scorePrefix + " " + score + " / " + questions.length;
      }
    };
    controls.appendChild(btn);

    const scoreEl = document.createElement("span");
    scoreEl.className = "quiz-score";
    scoreEl.style.marginLeft = "16px";
    scoreEl.style.fontWeight = "700";
    if (graded) {
      const score = questions.reduce(
        (acc, item, qi) => acc + (picked[qi] === item.answer ? 1 : 0),
        0
      );
      scoreEl.textContent = o.scorePrefix + " " + score + " / " + questions.length;
    }
    controls.appendChild(scoreEl);

    root.appendChild(controls);
  }

  render();
}
