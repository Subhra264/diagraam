import { ExportType } from '../../../utils/Types';
import { useState } from 'react';
import './Export.scss';

export default function Export () {
    const [showExportMenu, setShowExportMenu] = useState(false);

    const toggleShowExportMenu = () => {
        setShowExportMenu(showExportMenu => !showExportMenu);
    };

    const exportAs = (exportType) => {
        // Code to export diagram
    };

    return (
        <div className="export-as-selector">
                    
            <div className="export-as-label" onClick={toggleShowExportMenu}>Export as</div>
            <div className={'export-select-options' + (!showExportMenu? ' display-none' : '')}>
                {
                    Object.keys(ExportType).map(key => (
                        <div className='select-option' key={key} onClick={() => exportAs(key)}>Export as {key}</div>
                    ))
                }
            </div>
        </div>
    );
}