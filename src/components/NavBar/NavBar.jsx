import { useState } from 'react';
import { DiagramType } from '../../utils/Types';
import Export from './Export/Export';
import './NavBar.scss';

export default function NavBar (props) {
    const navBarLeftIcons = [
        { type: DiagramType.ARCHITECTURE, label: 'G' },
        { type: DiagramType.DECISIONTREE, label: 'T' }
    ];

    return (
        <div className="navbar">
            <div className="left">
                <div className="icon logo">D</div>
                {
                    navBarLeftIcons.map(icon => (
                        <div 
                            className={'icon hoverable' + (icon.type === props.diagramType? ' active' : '')}
                            onClick={() => props.setDiagramType(icon.type)}
                        >
                            {icon.label}
                        </div>
                    ))
                }
                
            </div>
            <div className="middle">
                Diagraam
            </div>
            <div className="right">
                <Export />
            </div>
        </div>
    );
}