(() => {
  const synth = window.speechSynthesis;

  const voices = synth.getVoices();
  for (i = 0; i < voices.length; i++) {
    console.log(voices[i].name + " (" + voices[i].lang + ")");
  }

  const splitText = text => {
    let tabText = text.split("\n").map(item => item.trim());
    tabText = tabText.reduce((before, item) => {
      return [...before, ...item.split("!").map(item => item.trim())];
    }, []);
    tabText = tabText.reduce((before, item) => {
      return [...before, ...item.split("?").map(item => item.trim())];
    }, []);
    tabText = tabText.reduce((before, item) => {
      return [...before, ...item.split(".").map(item => item.trim())];
    }, []);
    return tabText;
  };

  const readText = text => {
    const reader = new SpeechSynthesisUtterance(text);
    reader.rate = 3
    synth.speak(reader);
  };

  /**
   *
   * @param {Event} e
   */
  const onSubmitForRead = e => {
    e.preventDefault();
    let $text = e.target.querySelector("textarea").value;
    splitText($text).map(t => readText(t));
    return false;
  };

  const $lecteur = document.querySelector("#lecteur");
  $lecteur.addEventListener("submit", onSubmitForRead);
})();
