/*
  BIRTHDAY STORY CONFIG
  Edit this section first. Add your own files in public/images, public/sprites,
  and public/audio, then update the paths below.
*/
const CONFIG = {
  girlfriendName: 'Fauzi',
  musicPath: 'public/audio/birthday2.m4a',
  memories: [
    { image: 'public/images/IMG_7363.JPG', date: 'the beginning', caption: 'A day that felt a little like a promise.' },
    { image: 'public/images/couple-photo.png', date: 'the conference', caption: 'The kind of smile I could get used to.' },
    { image: 'public/images/att.GBT2BFOVi3TlOVkt0jrtNPpvFh_299Q-jUTISiVCVkw.jpg', date: 'October 2025', caption: 'You being brave and beautiful.' },
    { image: 'public/images/B1CA10EE-885A-4F9C-BF2C-ACDF1BB4B3E6.jpg', date: 'October 2025', caption: 'That day I couldn’t stop smiling.' },
    { image: 'public/images/CA3DC19E-1320-4974-BF7D-7A3059162D70.jpg', date: 'Malaysia', caption: 'A picture I love a lot' },
    { image: 'public/images/f17430464.jpeg', date: 'Khao Yai Trip', caption: 'My perfect girl' },
    { image: 'public/images/f17810752.jpeg', date: 'Khao Yai Trip', caption: 'Beauty and the beast hehe' },
    { image: 'public/images/IMG_4309.JPG', date: 'Kirk', caption: 'Kirk' },
    { image: 'public/images/IMG_5952.PNG', date: 'Eid', caption: 'An amazing Eid' },
  ],
};

const state = { scene: 'intro', busy: false, musicOn: false };
const scenes = { intro: document.querySelector('#intro'), birthday: document.querySelector('#birthday'), memories: document.querySelector('#memories') };
const beginButton = document.querySelector('#begin-button');
const memoriesButton = document.querySelector('#memories-button');
const replayButton = document.querySelector('#replay-button');
const musicToggle = document.querySelector('#music-toggle');
const audio = document.querySelector('#birthday-audio');

document.querySelectorAll('[data-girlfriend-name]').forEach((node) => { node.textContent = CONFIG.girlfriendName; });

function setScene(nextScene) {
  Object.entries(scenes).forEach(([name, scene]) => {
    const active = name === nextScene;
    scene.classList.toggle('is-active', active);
    scene.setAttribute('aria-hidden', String(!active));
  });
  state.scene = nextScene;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function tryStartMusic() {
  if (!CONFIG.musicPath || state.musicOn) return;
  audio.src = CONFIG.musicPath;
  audio.play().then(() => {
    state.musicOn = true;
    musicToggle.hidden = false;
    musicToggle.textContent = '♫';
  }).catch(() => {
    // Browsers may still require a second, explicit gesture. The story works without music.
  });
}

function startBirthdayScene() {
  if (state.busy || state.scene !== 'intro') return;
  state.busy = true;
  tryStartMusic();
  beginButton.disabled = true;
  setScene('birthday');
  window.setTimeout(() => {
    document.querySelector('#birthday-copy').classList.add('is-revealed');
  }, 1650);
  window.setTimeout(() => { state.busy = false; }, 3900);
}

function renderMemories() {
  const wall = document.querySelector('#memory-wall');
  wall.innerHTML = CONFIG.memories.map((memory, index) => {
    const imageMarkup = memory.image
      ? `<img src="${memory.image}" alt="${memory.caption}" loading="${index < 2 ? 'eager' : 'lazy'}" />`
      : `<div class="memory-placeholder"><span class="placeholder-label">your photo<br />goes here ✦</span></div>`;
    return `<article class="memory-card" style="animation-delay: ${Math.min(index * 80, 560)}ms">
      ${index % 3 === 0 ? '<span class="tape" aria-hidden="true"></span>' : ''}
      <div class="memory-image">${imageMarkup}</div>
      <div class="memory-meta"><p class="memory-date">${memory.date}</p><p class="memory-caption">${memory.caption}</p></div>
    </article>`;
  }).join('');
}

function showMemories() {
  if (state.busy || state.scene !== 'birthday') return;
  state.busy = true;
  renderMemories();
  setScene('memories');
  window.setTimeout(() => { state.busy = false; }, 850);
}

function replay() {
  if (state.busy) return;
  document.querySelector('#birthday-copy').classList.remove('is-revealed');
  beginButton.disabled = false;
  setScene('intro');
}

beginButton.addEventListener('click', startBirthdayScene);
memoriesButton.addEventListener('click', showMemories);
replayButton.addEventListener('click', replay);
musicToggle.addEventListener('click', () => {
  if (!audio.src) return;
  if (state.musicOn) { audio.pause(); state.musicOn = false; musicToggle.textContent = '♫'; }
  else { audio.play(); state.musicOn = true; musicToggle.textContent = 'Ⅱ'; }
});

// Keyboard support keeps the full-screen intro usable without a pointer.
beginButton.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') startBirthdayScene(); });
