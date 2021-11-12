import React, { useEffect, useRef } from 'react';
import 'jointjs/dist/joint.core.css';
import { dia, highlighters, shapes } from 'jointjs';

export default function DiagramEditor () {
    const canvas = useRef(null);
    
    useEffect(() => {
        const graph = new dia.Graph();
        const paper = new dia.Paper({
            el: canvas.current,
            model: graph,
            background: {
                color: '#1B283F'
            },
            width: 700,
            height: 499,
            gridSize: 40,
            drawGrid: {
                name: 'mesh',
                args: { color: '#2C2E41', thickness: 1 , }, // settings for the primary mesh
            },
            frozen: true,
            async: true
        });

        paper.on('cell:pointerclick', function (cellView) {
            console.log(this);
            resetAll(this);
            highlighters.mask.remove(cellView);
            highlighters.mask.add(cellView, { selector: 'root' }, 'my-cell-highlight', {
                padding: 0,
                deep: true,
                attrs: {
                    'stroke': 'orange',
                    'stroke-width': 3
                }
            });
        });

        const resetAll = paper => {
            let cells = paper.model.getCells();
            console.log(cells);
            for (let i = 0; cells.length; i++) {
                let cellView = paper.findViewByModel(cells[i]);
                console.log("cell is ", cellView);
                highlighters.mask.remove(cellView);
            }
        }

        const rect = new shapes.standard.Rectangle({
            position: { x: 100, y: 100 },
            size: { width: 100, height: 50 },
            attrs: {
                body: {
                    fill: '#DDBE51',
                    stroke: null,
                },
                label: {
                    text: 'Hello World',
                    fill: 'white',
                }
            }
        });

        graph.addCell(rect);
        let rect2 = rect.clone();
        rect2.attr('label/text', 'how world');
        rect2.translate(300, 0);
        graph.addCell(rect2);
        let link = new shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.addTo(graph);
        rect2 = rect.clone();
        rect2.attr('label/text', 'howdy world');
        rect2.translate(100, 0);
        graph.addCell(rect2);
        link = new shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.addTo(graph);
        rect2 = rect.clone();
        rect2.attr('label/text', 'hail world');
        rect2.translate(300, 199);
        graph.addCell(rect2);
        link = new shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.addTo(graph);

        paper.unfreeze();
    }, [])

    return (
        <div className="diagram-editor" ref={canvas}></div>
    );
}