import Table from "./components/Table";
import AddItem from "./components/AddItem";
import './main.css'
import Clock from "./components/Clock";

function App() {
  return (
    <div className="App">
      <header>
        <Clock />
      </header>
      <AddItem />
      <Table />
    </div>
  );
}

export default App;
