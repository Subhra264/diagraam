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

        /************** Event Handlers ***************/

        paper.on('cell:pointerclick', function (cellView) {
            resetAll(this);
            let cell = cellView.model;
            if (cell.isLink()) {
                cell.attr({
                    line: {
                        stroke: 'orange'
                    }
                })
                highlighters.mask.add(cellView, { selector: 'root' }, 'my-cell-highlight', {
                    padding: 0,
                    deep: true,
                    layer: 'back',
                    attrs: {
                        'stoke': null
                    }
                });
                return;
            }
            highlighters.mask.add(cellView, { selector: 'root' }, 'my-cell-highlight', {
                padding: 0,
                deep: true,
                layer: 'front',
                attrs: {
                    'stroke': 'orange',
                    'stroke-width': 3
                }
            });
        });
        paper.on('cell:contextmenu', function (cellView) {
            cellView.pointerclick();
        });

        paper.on('cell:mouseover', function (cellView) {
            if (highlighters.mask.get(cellView, 'my-cell-highlight')) {
                return;
            }
            let cell = cellView.model;
            if (cell.isLink()) {
                cell.attr({
                    line: {
                        stroke: 'orange'
                    }
                })
                highlighters.mask.add(cellView, { selector: 'root' }, 'my-hover-highlight', {
                    padding: 0,
                    deep: true,
                    layer: 'back',
                    attrs: {
                        'stoke': null
                    }
                });
                return;
            }
            highlighters.mask.add(cellView, { selector: 'root' }, 'my-hover-highlight', {
                padding: 0,
                deep: true,
                layer: 'front',
                attrs: {
                    'stroke': 'orange',
                    'stroke-width': 3
                }
            });
        });

        paper.on('cell:pointerdown', function (cellView) {
            resetAll(this);
            let cell = cellView.model;
            if (cell.isLink()) {
                cell.attr({
                    line: {
                        stroke: 'orange'
                    }
                })
                highlighters.mask.add(cellView, { selector: 'root' }, 'my-cell-highlight', {
                    padding: 0,
                    deep: true,
                    layer: 'back',
                    attrs: {
                        'stoke': null
                    }
                });
                return;
            }
            highlighters.mask.add(cellView, { selector: 'root' }, 'my-cell-highlight', {
                padding: 0,
                deep: true,
                layer: 'front',
                attrs: {
                    'stroke': 'orange',
                    'stroke-width': 3
                }
            });
        })

        paper.on('cell:mouseout', function (cellView) {
            highlighters.mask.remove(cellView, 'my-hover-highlight');
            let cell = cellView.model;
            if (cell.isLink()) {
                if (!(highlighters.mask.get(cellView, 'my-cell-highlight'))) {
                    cell.attr('line/stroke', '#64A0C1');
                }
            }
        });

        paper.on('blank:pointerclick', function () {
            resetAll(this);
        })
        /****************************************/

        const resetAll = paper => {
            let elems = paper.model.getElements();
            for (let i = 0; i < elems.length; i++) {
                let elemView = paper.findViewByModel(elems[i]);
                highlighters.mask.remove(elemView);
            }
            let links = paper.model.getLinks();
            for (let i=0; i< links.length; i++) {
                link = links[i];
                link.attr('line/stroke', '#64A0C1');
                let linkView = paper.findViewByModel(link);
                highlighters.mask.remove(linkView);
            }
        };

        const rect = new shapes.standard.Rectangle({
            position: { x: 100, y: 100 },
            size: { width: 100, height: 50 },
            attrs: {
                body: {
                    fill: '#1E1B31',
                    stroke: null,
                    rx: 10,
                    ry: 10,
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
        link.attr('line/stroke', '#64A0C1');
        link.addTo(graph);
        rect2 = rect.clone();
        rect2.attr('label/text', 'howdy world');
        rect2.translate(100, 0);
        graph.addCell(rect2);
        link = new shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.attr('line/stroke', '#64A0C1');
        link.addTo(graph);
        rect2 = rect.clone();
        rect2.attr('label/text', 'hail world');
        rect2.translate(300, 199);
        graph.addCell(rect2);
        link = new shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.attr('line/stroke', '#64A0C1');
        link.addTo(graph);

        paper.unfreeze();
    }, []);

    return (
        <div className="diagram-editor" ref={canvas}></div>
    );
}