import { useState } from 'react';
import ComponentSelector from '../ComponentList/ComponentList';
import ComponentMetaEditor from '../ComponentMetaEditor/ComponentMetaEditor';
import DiagramEditor from '../DiagramEditor/DiagramEditor';
import './AppWrapper.scss';

export default function AppWrapper () {
    const [editorGraph, setEditorGraph] = useState(null);
    const [editorPaper, setEditorPaper] = useState(null);

    return (
        <div className="app-wrapper">
            <ComponentSelector 
                editorGraph={editorGraph}
                editorPaper={editorPaper}
            />
            <DiagramEditor
                setEditorGraph={setEditorGraph}
                setEditorPaper={setEditorPaper}
            />
            <ComponentMetaEditor />
        </div>
    );
}