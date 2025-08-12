import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import Store from './Redux/Store.tsx';
import FileUpload from './FileUpload.tsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}> {/* Corrected 'Store' to 'store' */}
      <App />
      {/* <FileUpload /> */}

    </Provider>
  </StrictMode>
);
