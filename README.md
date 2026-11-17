# roomtest

Our case competition deck for Mesh, built as a web page. We are writing it together through our own team room, so the deck is also the test of the tool.

## Open the deck

Open `index.html` in a browser.

- Right and left arrow keys (or Space) move between slides.
- `F` goes full screen.
- Print to PDF from the browser to get one slide per page.

## Edit the deck

- `index.html` holds the slides. Each slide is one `<section class="slide">`, in presenting order. To add a slide, copy a whole section and edit it. Slide numbers are automatic.
- `deck.css` holds the look. Slides are laid out on a fixed 1920 x 1080 stage, so sizes are in stage pixels.
- `deck.js` handles scaling and moving between slides.

Anything with a dashed outline is a placeholder (`class="todo"`) that still needs real content. Don't put a number on a slide unless we can say where it came from.

The three thread colours (blue, amber, pink) only ever stand for one person's work. Don't use them as decoration.
