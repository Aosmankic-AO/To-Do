import Table from "./components/Table";
import AddItem from "./components/AddItem";
import './main.css'
import Clock from "./components/Clock";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="App">
      <header>
          <Clock />
          <Weather />
      </header>
      <AddItem />
      <Table />
    </div>
  );
}

export default App;
