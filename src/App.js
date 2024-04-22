// import logo from './logo.svg';
// import mainPic from './Pics/picimg4.jpg'
import './App.css';
import { ChakraProvider, Box } from '@chakra-ui/react'
import Header from './Components/Header';
import MainGridSection from './Components/MainGridSection';
import Footer from './Components/Footer';
// import { Provider } from 'react-redux';
// import store from './Redux/store'
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import Home from './Home';
// import About from './About';
// import Services from './Services';

function App() {

  const theme = {
    breakpoints: {
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      custom: "1600px", // Define a custom breakpoint
    },
    // Other theme configurations
  };

  return (
    <ChakraProvider>
      {/* <Provider store={store}> */}
        <Box>
          <Header />
          <MainGridSection />
          <Footer />
        </Box> 
      {/* </Provider> */}
    </ChakraProvider>
  );
}

export default App;

/* <div className="App">
        <header className="App-header">
          <nav className="nav__menu">
            <ul className="ul ul__menu--primary">
              <li className="ul__menu-item">Home</li>
              <li className="ul__menu-item">About</li>
              <li className="ul__menu-item">Services</li>
            </ul>
          </nav>
        </header>
        <main className="App-main">
          <nav className="nav nav__sidebar--left">
            Additional Services
          </nav>
          <section className="section section__content--main">
            <img src={mainPic} alt={'Main Pic'} />
            {/* <!-- Content goes here --> */
      //     </section>
      //     <nav className="nav nav__sidebar--right">
      //       Book Our Services
      //     </nav>
      //   </main>
      // </div> */}