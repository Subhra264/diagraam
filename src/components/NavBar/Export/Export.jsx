import { ExportType } from '../../../utils/Types';
import { useRef, useState } from 'react';
import './Export.scss';

export default function Export (props) {
    const [showExportMenu, setShowExportMenu] = useState(false);
    const hiddenDownloadButton = useRef(null);

    const toggleShowExportMenu = () => {
        setShowExportMenu(showExportMenu => !showExportMenu);
    };

    const exportAs = (exportType) => {
        // Code to export diagram
        let outputJSON;
        let outputContent;

        if (props.editorGraph) {
            outputJSON = props.editorGraph.toJSON();
            outputContent = JSON.stringify(outputJSON, null, 4); // Default is JSON type

            // TODO: Add some more logic to support differect export types

            const outputBlob = new Blob([outputContent]);
            const outputFileURL = URL.createObjectURL(outputBlob);

            hiddenDownloadButton.current.href = outputFileURL;
            hiddenDownloadButton.current.download = 'Diagraam.' + exportType;
            hiddenDownloadButton.current.click();
        }
    };

    return (
        <div className="export-as-selector">
            <a className="display-none" ref={hiddenDownloadButton}></a>
            <div className="export-as-label" onClick={toggleShowExportMenu}>Export as</div>
            <div className={'export-select-options' + (!showExportMenu? ' display-none' : '')}>
                {
                    Object.keys(ExportType).map(key => (
                        <div className='select-option' key={key} onClick={() => exportAs(ExportType[key])}>Export as {key}</div>
                    ))
                }
            </div>
        </div>
    );
}