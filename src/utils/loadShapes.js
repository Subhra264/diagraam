import { dia, shapes } from 'jointjs';

const SHAPE_FILL_COLOR = 'white';

export default function loadShapes (shapesContainerRef, editorGraph, editorPaper) {
    const componentListGraph = new dia.Graph();
    const componentListPaper = new dia.Paper({
        el: shapesContainerRef.current,
        model: componentListGraph,
        background: {
            color: '#1E1B31',
        },
        width: '100%',
        height: 250,
        interactive: false
    });

    const rectangleShape = new shapes.standard.Rectangle({
        position: { x: 10, y: 10 },
        size: { width: 120, height: 80 },
        attrs: {
            body: {
                fill: SHAPE_FILL_COLOR,
                stroke: null,
                rx: 10,
                ry: 10
            },
            label: {
                text: 'Rectangle',
                fill: 'black'
            }
        }
    });

    const circleShape = new shapes.standard.Circle({
        position: { x: 140, y: 10 },
        size: { width: 80, height: 80 },
        attrs: {
            body: {
                fill: SHAPE_FILL_COLOR,
                stroke: null,
            },
            label: {
                text: 'Circle',
                fill: 'black'
            }
        }
    });

    componentListGraph.addCells([rectangleShape, circleShape]);

    componentListPaper.on('cell:pointerdown', function(cellView, e, x, y) {
        const bodyElement = document.body;
        const flyPaperElementDiv = document.createElement('div');
        flyPaperElementDiv.id = 'flyPaper';
        flyPaperElementDiv.style = 'position:fixed;z-index:100;opacity:0.7;pointer-event:none;"></div>';
        bodyElement.append(flyPaperElementDiv);

        const flyPaperElement = document.getElementById('flyPaper');
        console.log('FlyPaperElement', flyPaperElement);
        
        let flyGraph = new dia.Graph();
        let flyPaper = new dia.Paper({
            el: flyPaperElement,
            model: flyGraph,
            interactive: false
        });

        let flyShape = cellView.model.clone();
        let pos = cellView.model.position();
        let offset = {
            x: x - pos.x,
            y: y - pos.y
        };

        flyShape.position(0, 0);
        flyGraph.addCell(flyShape);
        
        const bodyMouseMoveHandler = (e) => {
            flyPaperElement.style.top = e.pageX - offset.x;
            flyPaperElement.style.left = e.pageY - offset.y;
        };
        
        const bodyMouseUpHandler = (e) => {
            let x = e.pageX;
            let y = e.pageY;
            let target = componentListPaper.$el.offset();
            
            // Dropped over paper ?
            if (x > target.left && x < target.left + editorPaper.$el.width() && y > target.top && y < target.top + editorPaper.$el.height()) {
                let s = flyShape.clone();
                s.position(x - target.left - offset.x, y - target.top - offset.y);
                editorGraph.addCell(s);
            }

            bodyElement.removeEventListener('mousemove', bodyMouseMoveHandler);
            bodyElement.removeEventListener('mouseup', bodyMouseUpHandler);
            
            flyShape.remove();
            flyPaperElement.remove();
        };
        
        bodyMouseMoveHandler(e);
        bodyElement.addEventListener('mousemove', bodyMouseMoveHandler);
        bodyElement.addEventListener('mouseup', bodyMouseUpHandler);
    });
}