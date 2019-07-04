import React from 'react';
import './App.css';
import Lists from './components/Lists';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Sample App for Client Listing
        </h2>
      </header>
      <body>
        <div className="container">
        <div className="row">
          <div className="col-10">
            <Lists />
          </div>
        </div>
        </div>
        
      </body>

    </div>
  );
}

export default App;
