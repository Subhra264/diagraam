import { DiagramType } from '../../utils/Types';
import { ReactComponent as ArchitectureIcon } from '../../assets/icons/ArchitectureIcon.svg';
import { ReactComponent as DecisionTreeIcon } from '../../assets/icons/DecisionTreeIcon.svg';
import Export from './Export/Export';
import './NavBar.scss';

export default function NavBar (props) {
    const navBarLeftIcons = [
        { type: DiagramType.ARCHITECTURE, label: <ArchitectureIcon />, title: 'Architecture Diagram' },
        { type: DiagramType.DECISIONTREE, label: <DecisionTreeIcon />, title: 'Decision Tree Diagram' }
    ];

    return (
        <div className="navbar">
            <div className="left">
                <div className="icon logo">D</div>
                {
                    navBarLeftIcons.map(icon => (
                        <div 
                            className={'icon hoverable' + (icon.type === props.diagramType? ' active' : '')}
                            title={icon.title}
                            onClick={() => props.setDiagramType(icon.type)}
                            key={icon.title}
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