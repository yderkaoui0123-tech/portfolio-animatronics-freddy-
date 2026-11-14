const video = document.querySelector('#demo-video');
const caption = document.querySelector('#video-caption');
const options = {
  'tete-finale': {title:'Démonstration de la tête assemblée', caption:'01 — Tête assemblée · Yeux et paupières en mouvement'},
  'mecanisme-yeux': {title:'Démonstration du mécanisme des yeux', caption:'02 — Mécanisme seul · Essai du prototype sur platine'}
};
function selectVideo(key) {
  video.pause();
  video.src = `media/${key}.mp4`;
  video.poster = `media/${key}.jpg`;
  video.setAttribute('aria-label', options[key].title);
  caption.textContent = options[key].caption;
  document.querySelectorAll('[data-video]').forEach(button => {
    const active = button.dataset.video === key;
    button.classList.toggle('selected', active);
    button.setAttribute('aria-pressed', String(active));
  });
  video.load();
}
document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => selectVideo(button.dataset.video)));
document.querySelector('#mechanism-link').addEventListener('click', () => selectVideo('mecanisme-yeux'));
const lightbox = document.querySelector('#lightbox');
const fullImage = document.querySelector('#lightbox-image');
document.querySelectorAll('.zoom').forEach(button => {
  const img = button.querySelector('img');
  button.setAttribute('aria-label', `Agrandir : ${img.alt}`);
  button.addEventListener('click', () => {
    fullImage.src = img.src;
    fullImage.alt = img.alt;
    document.querySelector('#lightbox-caption').textContent = button.dataset.caption;
    lightbox.showModal();
    document.body.style.overflow = 'hidden';
  });
});
document.querySelector('#close-lightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', e => { if (e.target === lightbox) {const r = lightbox.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) lightbox.close();} });
lightbox.addEventListener('close', () => {document.body.style.overflow = '';});
