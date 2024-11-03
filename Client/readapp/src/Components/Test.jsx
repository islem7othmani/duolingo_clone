import {React, useState, useEffect} from 'react'

export default function Test() {
   
        const [voices, setVoices] = useState([]);
     
     useEffect(() => {
       if ("speechSynthesis" in window) {
         // Load voices and set state
         const synth = window.speechSynthesis;
         const loadVoices = () => {
           const availableVoices = synth.getVoices();
           setVoices(availableVoices);
         };
     
         loadVoices();
     
         if (synth.onvoiceschanged !== undefined) {
           synth.onvoiceschanged = loadVoices;
         }
       } else {
         alert("Sorry, your browser does not support text-to-speech!");
       }
     }, []);
     
     const readParagraph = () => {
       const paragraphText = "Welcome to our text-to-speech app. This application allows you to listen to this paragraph being read aloud using the browser's Web Speech API. It demonstrates how easy it is to implement text-to-speech functionality in modern browsers. Enjoy the experience!";
     
       if (voices.length > 0) {
         // Find an English voice
         const englishVoice = voices.find((voice) => voice.lang.includes("en"));
     
         if (englishVoice) {
           const utterance = new SpeechSynthesisUtterance(paragraphText);
           utterance.voice = englishVoice;
           utterance.lang = englishVoice.lang;
           utterance.pitch = 1;
           utterance.rate = 1;
     
           window.speechSynthesis.speak(utterance);
         } else {
           alert("Sorry, no English voice is available in your browser.");
         }
       }
     };
     
return (
    
    <>
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h1>Simple Text-to-Speech App</h1>
    <p>
      Welcome to our text-to-speech app. This application allows you to listen
      to this paragraph being read aloud using the browser's Web Speech API.
      It demonstrates how easy it is to implement text-to-speech functionality
      in modern browsers. Enjoy the experience!
    </p>
    <button
      onClick={readParagraph}
      style={{
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "15px 20px",
        fontSize: "16px",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        marginTop: "20px",
      }}
    >
      Read Paragraph
    </button>
  </div>



  <div className='flex justify-center'>
   <div>
   <h2>the question will be here</h2>
    <div className='border w-96 py-4 flex justify-center'>option 1</div>
    <div className='border w-96 py-4 flex justify-center'>option 1</div>
    <div className='border w-96 py-4 flex justify-center'>option 1</div>
  
    </div></div>
   </>
  )
}
