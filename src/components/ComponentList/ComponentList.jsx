import { useRef, useEffect } from 'react';
import loadShapes from '../../utils/loadShapes';
import './ComponentList.scss';

export default function ComponentSelector (props) {
    const componentListRef = useRef(null);

    useEffect(() => {
        if (props.editorGraph && props.editorPaper) {
            loadShapes(componentListRef, props.editorGraph, props.editorPaper);
        }
    }, [props.editorGraph, props.editorPaper]);

    return (
        <div className="component-selector">
            <div className="shapes-container">
                <div className="shapes-type-heading">
                    Components
                </div>
                <div className="shapes" ref={componentListRef}>
                    
                </div>
            </div>
        </div>
    );
}