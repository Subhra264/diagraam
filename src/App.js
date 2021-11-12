import { useState } from 'react';
import './App.scss';
import DiagramEditor from './components/DiagramEditor/DiagramEditor';
import NavBar from './components/NavBar/NavBar';
import { DiagramType } from './utils/Types';

function App() {
  const [diagramType, setDiagramType] = useState(DiagramType.ARCHITECTURE);

  return (
    <div className="App">
      <NavBar 
        diagramType={diagramType}
        setDiagramType={setDiagramType}
      />
      <DiagramEditor />
    </div>
  );
}

export default App;
