import './App.css';
import SignationModal from './Components/SignationModal';

function App() {

  return (
    <div className="App"  
      style={{
        width: "auto", height: "auto", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        }}>
      
      <SignationModal />
    </div>
  );
}

export default App;
