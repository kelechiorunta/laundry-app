import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register'
import About from './Pages/About'
import Services from './Pages/Services'
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux'
import store from './Redux/store';
import PriceListTable from './Pages/Page_Components/PriceListTable';
import LaundryForm from './Pages/Page_Components/LaundryForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <Router>
            <Routes>
              <Route path="/" Component={App} />
              <Route path="/register" Component={Register} />
              <Route path="/about" Component={About} />
              <Route path="/services" Component={Services} />
              <Route path="/register/pricelist" Component={PriceListTable} />
              <Route path="/register/pricelist/laundryform" Component={LaundryForm} />
            </Routes>
          {/* <App /> */}
        </Router>
      </Provider>  
    </ChakraProvider> 
    </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
