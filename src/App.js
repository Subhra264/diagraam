import { useState, useRef } from 'react';
import './App.scss';
import AppWrapper from './components/AppWrapper/AppWrapper';
import DiagramEditor from './components/DiagramEditor/DiagramEditor';
import NavBar from './components/NavBar/NavBar';
import { DiagramType } from './utils/Types';

function App() {
  const [diagramType, setDiagramType] = useState(DiagramType.ARCHITECTURE);
  const [editorGraph, setEditorGraph] = useState(null);
  const canvasRef = useRef(null);

  return (
    <div className="App">
      <NavBar
        diagramType={diagramType}
        setDiagramType={setDiagramType}
        editorGraph={editorGraph}
        canvasRef={canvasRef}
      />
      <AppWrapper
        canvasRef={canvasRef}
        editorGraph={editorGraph}
        setEditorGraph={setEditorGraph}
      />
    </div>
  );
}

export default App;
