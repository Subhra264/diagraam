import { useState } from 'react';
import ComponentSelector from '../ComponentList/ComponentList';
import ComponentMetaEditor from '../ComponentMetaEditor/ComponentMetaEditor';
import DiagramEditor from '../DiagramEditor/DiagramEditor';
import './AppWrapper.scss';

export default function AppWrapper (props) {
    const [editorGraph, setEditorGraph] = useState(null);
    const [editorPaper, setEditorPaper] = useState(null);
    const [cellType, setCellType] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    return (
        <div className="app-wrapper">
            <ComponentSelector 
                editorGraph={editorGraph}
                editorPaper={editorPaper}
            />
            <DiagramEditor
                setEditorGraph={setEditorGraph}
                setEditorPaper={setEditorPaper}
                editorGraph={editorGraph}
                editorPaper={editorPaper}
                setCellType={setCellType}
                setTitle={setTitle}
                title={title}
                setDescription={setDescription}
                description={description}
            />
            <ComponentMetaEditor
                cellType={cellType}
                setTitle={setTitle}
                title={title}
                setDescription={setDescription}
                description={description}
            />
        </div>
    );
}