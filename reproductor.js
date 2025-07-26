const audio = document.getElementById("myAudio");
const btn = document.getElementById("playPauseBtn");
let isPlaying = false;
let hasInteracted = false;

// Botón de play/pause manual
btn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btn.classList.add("pause");
    btn.classList.remove("play");
    isPlaying = true;
  } else {
    audio.pause();
    btn.classList.add("play");
    btn.classList.remove("pause");
    isPlaying = false;
  }
});

// Primera interacción del usuario: tap o scroll
function activarAudioUnaVez() {
  if (!hasInteracted) {
    hasInteracted = true;
    audio.play()
      .then(() => {
        btn.classList.add("pause");
        btn.classList.remove("play");
        isPlaying = true;
      })
      .catch((e) => {
        console.warn("No se pudo reproducir el audio automáticamente:", e);
      });

    // Remover los listeners para que no se repita
    document.removeEventListener("scroll", activarAudioUnaVez);
    document.removeEventListener("click", activarAudioUnaVez);
    document.removeEventListener("touchstart", activarAudioUnaVez);
  }
}

// Detecta primer scroll o tap
document.addEventListener("scroll", activarAudioUnaVez);
document.addEventListener("click", activarAudioUnaVez);
document.addEventListener("touchstart", activarAudioUnaVez);