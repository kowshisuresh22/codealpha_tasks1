document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  const cover = document.getElementById("cover");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const progress = document.getElementById("progress");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  const volumeSlider = document.getElementById("volume");
  const playlistItems = document.querySelectorAll("#song-list li");

  let currentIndex = 0;
  let isPlaying = false;

  function loadSongFromElement(el) {
    title.textContent = el.getAttribute("data-title");
    artist.textContent = el.getAttribute("data-artist");
    audio.src = el.getAttribute("data-src");
    cover.src = el.getAttribute("data-cover");
  }

  function playSong() {
    audio.play();
    playBtn.textContent = "⏸";
    isPlaying = true;
  }

  function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶️";
    isPlaying = false;
  }

  function playPauseToggle() {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }

  function updateProgress() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }

  function setProgress(e) {
    const percent = e.target.value;
    audio.currentTime = (percent / 100) * audio.duration;
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function changeSong(index) {
    currentIndex = index;
    loadSongFromElement(playlistItems[currentIndex]);
    playSong();
  }

  function nextSong() {
    currentIndex = (currentIndex + 1) % playlistItems.length;
    changeSong(currentIndex);
  }

  function prevSong() {
    currentIndex = (currentIndex - 1 + playlistItems.length) % playlistItems.length;
    changeSong(currentIndex);
  }

  playBtn.addEventListener("click", playPauseToggle);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  progress.addEventListener("input", setProgress);
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", nextSong);
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
  });

  playlistItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      changeSong(index);
    });
  });

  // Load first song by default
  loadSongFromElement(playlistItems[currentIndex]);
});
