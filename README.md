# A little birthday story

A lightweight, dependency-free birthday story website made with HTML, CSS, and JavaScript.

## Run it

From this folder, serve the files with any static server. For example:

```bash
npx serve .
```

Then open the local URL it prints. Opening `index.html` directly also works in most browsers, but a local server is recommended for consistent asset loading.

## Personalize it

Edit the `CONFIG` object at the top of [`app.js`](app.js):

- Change `girlfriendName`.
- Edit each memory's `date`, `caption`, and `image`.
- Add/remove/reorder memories in the `memories` array.
- Set `musicPath` to `public/audio/birthday.mp3` when you add a music file.

Put photos in `public/images/`. Put future sprite sheets or character assets in `public/sprites/`; the current characters are CSS placeholders so replacing them later is straightforward. The attached couple photo is already copied to `public/images/couple-photo.png` and is used as the first memory.

The site uses a small state machine: `intro → birthday → memories`. It includes mouse/touch and keyboard interaction, responsive scrapbook layout, lazy-loaded memory images, music, and reduced-motion support.

## GitHub Pages

This project includes `.github/workflows/pages.yml`. Create an empty GitHub repository, then run:

```bash
git init
git add .
git commit -m "Create birthday story website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

In the repository, open **Settings → Pages** and choose **GitHub Actions** as the source. The workflow will publish the site after the first push; future pushes to `main` redeploy it automatically. GitHub Pages sites are public on the internet, so only use photos and audio you are comfortable publishing.
