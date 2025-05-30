import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'; 
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';


//Рендеринг React-додатка:
ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
		<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
      <App />
    </BrowserRouter>
			  </PersistGate>
				  
		 </Provider>
      
 </React.StrictMode>
);