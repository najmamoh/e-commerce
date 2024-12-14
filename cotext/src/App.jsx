
import Header from './Components/header'
import Nav from './Components/Nav'
import Products from './Components/products'
import Allproducts from './Components/Allproducts'
import Cards from './Components/cards'
import FeaturesSection from './Components/FeaturesSection'
import Footer from './Components/Footer'
import Lastsection from './Components/lastsection'
import Oneproduct from './Components/OneProduct'
import AppRouter from './Components/Router';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {


  return (
    <>   
     {/* <Header/>
    <Nav/>
    <Products/>
    <Allproducts/>
    <Cards/>
    <FeaturesSection/>
    <Lastsection/>
    <Footer/>
    <Router>
      <Routes>
        <Route path="/Oneproduct" element={<Oneproduct />} />
       
      </Routes>
    </Router>  */}

<AppRouter />

      </>
  )
}

export default App
