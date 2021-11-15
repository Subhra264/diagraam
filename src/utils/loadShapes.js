import { dia, shapes } from 'jointjs';

const SHAPE_FILL_COLOR = '#333337'; //'#1E1B31';

export default function loadShapes (shapesContainerRef, editorGraph, editorPaper) {
    const componentListGraph = new dia.Graph();
    const componentListPaper = new dia.Paper({
        el: shapesContainerRef.current,
        model: componentListGraph,
        background: {
            color: '#1a253a',
        },
        width: '100%',
        height: 450,
        interactive: false
    });

    const rectangleShape = new shapes.standard.Rectangle({
        position: { x: 10, y: 10 },
        size: { width: 75, height: 50 },
        attrs: {
            body: {
                fill: SHAPE_FILL_COLOR,
                stroke: null,
                rx: 10,
                ry: 10
            },
            label: {
                text: 'Rectangle',
                fill: 'white'
            }
        }
    });

    const circleShape = new shapes.standard.Circle({
        position: { x: 110, y: 10 },
        size: { width: 50, height: 50 },
        attrs: {
            body: {
                fill: SHAPE_FILL_COLOR,
                stroke: null,
            },
            label: {
                text: 'Circle',
                fill: 'white'
            }
        }
    });

    const cylinderShape = new shapes.standard.Cylinder({
        position: { x: 10, y: 75 },
        size: { width: 75, height: 50 },
        attrs: {
            body: {
                fill: SHAPE_FILL_COLOR,
                stroke: null
            },
            top: {
                fill: 'grey'
            },
            label: {
                text: 'Cylinder',
                fill: 'white'
            }
        }
    });

    const ellipseShape = new shapes.standard.Ellipse({
        position: { x: 110, y: 75 },
        size: { width: 75, height: 50 },
        attrs: {
            body: {
                fill: SHAPE_FILL_COLOR,
                stroke: null
            },
            label: {
                text: 'Ellipse',
                fill: 'white'
            }
        }
    });

    const polygonShape = new shapes.standard.Polygon({
        position: { x: 10, y: 160 },
        size: { width: 75, height: 50 },
        attrs: {
            body: {
                fill: SHAPE_FILL_COLOR,
                stroke: null,
                refPoints: '0,10 10,0 20,10 10,20'
            },
            label: {
                text: 'Polygon',
                fill: 'white'
            }
        }
    });

    const headeredRectangleShape = new shapes.standard.HeaderedRectangle({
        position: { x: 110, y: 140 },
        size: { width: 75, height: 50 },
        attrs: {
            header: {
                fill: 'grey'
            },
            headerText: {
                text: 'Header',
                fill: 'black'
            },
            body: {
                fill: SHAPE_FILL_COLOR,
                stroke: null
            },
            bodyText: {
                text: ''
            }
        }
    });

    const imageShape = new shapes.standard.Image({
        position: { x: 10, y: 210 },
        size: { width: 75, height: 50 },
        attrs: {
            image: {
                xlinkHref: ''
            },
            body: {
                fill: SHAPE_FILL_COLOR,
                stroke: null
            },
            label: {
                text: 'Image',
                fill: 'white'
            }
        }
    });

    const embeddedImageShape = new shapes.standard.EmbeddedImage({
        position: { x: 110, y: 210 },
        size: { width: 75, height: 50 },
        attrs: {
            image: {
                xlinkHref: ''
            },
            body: {
                fill: SHAPE_FILL_COLOR,
                stroke: null
            },
            label: {
                text: 'Embedded Image',
                fill: 'white'
            }
        }
    });

    const inscribedImageShape = new shapes.standard.InscribedImage({
        position: { x: 10, y: 290 },
        size: { width: 75, height: 50 },
        attrs: {
            image: {
                xlinkHref: ''
            },
            body: {
                fill: SHAPE_FILL_COLOR,
                stroke: null
            },
            label: {
                text: 'Inscribed Image',
                fill: 'white'
            }
        }
    });

    const pathShape = new shapes.standard.Path({
        position: { x: 110, y: 290 },
        size: { width: 75, height: 50 },
        attrs: {
            body: {
                refD: 'M 0 5 10 0 C 20 0 20 20 10 20 L 0 15 Z',
                stroke: 'grey',
                fill: '#00000000'
            },
            label: {
                text: 'Path',
                fill: 'white'
            }
        }
    });

    componentListGraph.addCells([
        rectangleShape,
        circleShape,
        cylinderShape,
        ellipseShape,
        polygonShape,
        headeredRectangleShape,
        imageShape,
        embeddedImageShape,
        inscribedImageShape,
        pathShape,
    ]);

    componentListPaper.on('cell:pointerdown', function(cellView, e, x, y) {
        const bodyElement = document.body;
        const flyPaperElementDiv = document.createElement('div');
        flyPaperElementDiv.id = 'flyPaper';
        flyPaperElementDiv.style = 'position:fixed;z-index:100;opacity:0.7;pointer-event:none;';
        bodyElement.append(flyPaperElementDiv);

        const flyPaperElement = document.getElementById('flyPaper');
        
        let flyGraph = new dia.Graph();
        let flyPaper = new dia.Paper({
            el: flyPaperElement,
            model: flyGraph,
            height: 60,
            width: 80,
            background: {
                color: '#00000000'
            },
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
            flyPaperElement.style.left = e.pageX - offset.x + 'px';
            flyPaperElement.style.top = e.pageY - offset.y + 'px';
        };
        
        const bodyMouseUpHandler = (e) => {
            let x = e.pageX;
            let y = e.pageY;
            let target = editorPaper.$el.offset();

            // Dropped over paper ?
            if (x > target.left && x < target.left + editorPaper.$el.width() && y > target.top && y < target.top + editorPaper.$el.height()) {
                let s = flyShape.clone();
                s.position(x - target.left - offset.x, y - target.top - offset.y);
                s.resize(120, 80);
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