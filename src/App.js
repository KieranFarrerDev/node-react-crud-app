// my-react-app/src/App.js
import React, { useState } from 'react';
import FreeTextForm from './components/page-components/FreeTextForm';

function App() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onDataReceived = (fetchedData) => {
      setData(fetchedData);
    };

    const onLoad = (state) => {
      setIsLoading(state);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>React & Node.js piece ✌️</h1>
                {isLoading ? (
                  <p>I'm Loading...</p>
              ) : (
                  !data && <p>Enter text and submit...</p>
              )}
              {!isLoading && data && !data.error && <p>current text: <b>{data.name}</b></p>}
              {data && data.error && <p>Error: <b>{data.error}</b></p>}
                <FreeTextForm onDataReceived={onDataReceived} isLoading={isLoading} onLoad={onLoad} textId={data ? data.id : undefined}/>
            </header>
        </div>
    );
}

export default App;
