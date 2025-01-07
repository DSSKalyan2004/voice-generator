const textarea = document.getElementById('textInput');
const button = document.getElementById('speakButton');
const languageSelect = document.getElementById('languageSelect');
let voices = [];


function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        console.error("No voices found. Please check browser compatibility.");
        return;
    }
    populateVoiceOptions();
}


function populateVoiceOptions() {
    languageSelect.innerHTML = ''; 

    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        languageSelect.appendChild(option);
    });

    
    if (voices.length > 0) {
        languageSelect.selectedIndex = 0;
    }
}


function speakText() {
    const text = textarea.value.trim();
    const selectedVoiceName = languageSelect.value;

    if (!text) {
        alert('Please enter some text to convert to speech.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);
    if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
    }

    
    utterance.onstart = () => console.log('Speech started');
    utterance.onend = () => console.log('Speech ended');
    utterance.onerror = (e) => console.error('Speech error:', e.error);

    
    window.speechSynthesis.speak(utterance);
}


button.addEventListener('click', speakText);
window.speechSynthesis.addEventListener('voiceschanged', loadVoices);


loadVoices();
