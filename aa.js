document.addEventListener("DOMContentLoaded", function () {
    const textInput = document.getElementById("text-input");
    const generateBtn = document.getElementById("generate-btn");
    const clearBtn = document.getElementById("clear-btn");
    const audioOutput = document.getElementById("audio-output");
    const themeSwitch = document.getElementById("theme-switch");
    const languageSelect = document.getElementById("language-select");

    const languages = [
        { code: "en-US", name: "English (US)" },
        { code: "hi-IN", name: "Hindi (India)" },
        { code: "te-IN", name: "Telugu (India)" },
        { code: "es-ES", name: "Spanish (Spain)" },
        { code: "fr-FR", name: "French (France)" },
        { code: "de-DE", name: "German (Germany)" },
        { code: "ja-JP", name: "Japanese (Japan)" },
        { code: "zh-CN", name: "Chinese (China)" },
    ];

    languages.forEach((lang) => {
        const option = document.createElement("option");
        option.value = lang.code;
        option.textContent = lang.name;
        languageSelect.appendChild(option);
    });

    generateBtn.addEventListener("click", () => {
        const text = textInput.value.trim();
        if (text === "") {
            alert("Please enter text to generate voice.");
            return;
        }

        const synth = window.speechSynthesis;
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = languageSelect.value;
        speech.volume = 1;
        speech.rate = audioOutput.playbackRate; // Sync playback rate
        speech.pitch = 1;

        synth.speak(speech);
    });

    audioOutput.addEventListener("ratechange", () => {
        if (!window.speechSynthesis.speaking) return;
        window.speechSynthesis.cancel();
        generateBtn.click(); // Restart with updated rate
    });

    clearBtn.addEventListener("click", () => {
        textInput.value = "";
        audioOutput.src = "";
        audioOutput.style.display = "none";
    });

    themeSwitch.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
    });
});
