import OrderContainer from "@containers/OrderContainer";
import "./App.css";
import Navbar from "@components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <OrderContainer />
    </div>
  );
}

export default App;
