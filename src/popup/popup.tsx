import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  getStoredSymbols,
  setStoredSymbols,
  setTempStoredSymbols,
} from '../../utils/storage';
import './popup.css';

const App: React.FC<{}> = () => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [enteredSymbol, setEnteredSymbol] = useState<string>('');

  useEffect(() => {
    getStoredSymbols().then((symbols) => setSymbols(symbols));
  }, []);

  function submitHandler(event) {
    event.preventDefault();
    const symbolArrays = enteredSymbol.split(',').map((item) => item.trim());
    setStoredSymbols(symbolArrays);
    setSymbols(symbolArrays);
  }

  const startExport = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const symbols = await getStoredSymbols();
    await setTempStoredSymbols(symbols);
    console.log(symbols);
    console.log('Started Running Script');
    chrome.tabs.sendMessage(tabs[0].id, { url: tabs[0].url });

    // 1 on completed downloading files
    // 2 read files
    // 3 delete files    
  };

  return (
    <>
      <p>Trading View Export</p>
      <form onSubmit={submitHandler}>
        <textarea
          value={enteredSymbol}
          onChange={(event) => setEnteredSymbol(event.target.value)}
        ></textarea>
        <br></br>
        <button type="submit">Upload Symbols</button>
      </form>
      <hr></hr>
      <button onClick={startExport}>Export</button>
      <br></br>
      <ol>
        {symbols.map((symbol) => (
          <li>{symbol}</li>
        ))}
      </ol>
    </>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
