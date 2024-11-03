// src/Translator.js

import React, { useState } from 'react';


const Translator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');

  const handleTranslate = async () => {
    try {
      const response = await fetch('https://api-free.deepl.com/v2/translate', {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      });

      setTranslatedText(response.data.translatedText); // Adjust based on the API response format
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  return (
    <div>
      <h1>Simple Google Translate Clone</h1>
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
        />
      </div>
      <div>
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          {/* Add more languages as needed */}
        </select>
        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="es">Spanish</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          {/* Add more languages as needed */}
        </select>
      </div>
      <button onClick={handleTranslate}>Translate</button>
      <h2>Translated Text:</h2>
      <p>{translatedText}</p>
    </div>
  );
};

export default Translator;
