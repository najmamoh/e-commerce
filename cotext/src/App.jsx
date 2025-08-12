import { CartProvider } from "./Components/CartContext"; // Import the CartProvider
import AppRouter from "./Components/Router"; // Import your router

function App() {
  return (
    <CartProvider> 
      <AppRouter /> 
    </CartProvider>
  );
}

export default App;
