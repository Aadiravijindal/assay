# 🕊️ Ek Chhoti Si Udaan — birthday game

Open `index.html` (or the GitHub Pages URL + `/bday/`). Password: the fav nickname.

## What to edit
Everything personal is in **`content.js`**:
- `song` per level → put mp3s in `songs/` and write e.g. `"songs/level1.mp3"` (if empty, a music-box Happy Birthday plays)
- `question` per level → `{ q: "question", a: "answer" }` (`a: ""` means any answer is accepted)
- `photo` / `photos` → put images in `img/` (Level 1 takes several baby pics)
- `places` in the last level → the 20 places the gifts came from
- `text` → all the Hinglish lines

Test locally: `python3 -m http.server` inside this folder, then open http://localhost:8000
