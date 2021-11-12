import React, { useEffect, useRef } from 'react';
import { dia, ui, shapes } from 'jointjs';

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
            gridSize: 10,
            frozen: true,
            async: true
        });
        // const scroller = new ui.PaperScroller({
        //     paper,
        //     autoResizePaper: true,
        //     cursor: 'grab'
        // });

        const rect = new shapes.standard.Rectangle({
            position: { x: 100, y: 100 },
            size: { width: 100, height: 50 },
            attrs: {
                label: {
                text: 'Hello World'
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
        paper.unfreeze();
    }, [])

    return (
        <div className="diagram-editor" ref={canvas}></div>
    );
}