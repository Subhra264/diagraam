import React, { useEffect, useRef, useState } from 'react';
import 'jointjs/dist/joint.core.css';
import { dia, highlighters, linkTools, connectionStrategies, elementTools, shapes } from 'jointjs';

export default function DiagramEditor (props) {
    const canvas = useRef(null);
    const [currentId, setCurrentId] = useState(null);
    
    useEffect(() => {
        const graph = new dia.Graph();
        const paper = new dia.Paper({
            el: canvas.current,
            model: graph,
            background: {
                color: '#1B283F'
            },
            width: '100%',
            height: '100%',
            gridSize: 30,
            drawGrid: {
                name: 'mesh',
                args: { color: '#2C2E41', thickness: 1 }, // settings for the primary mesh
            },
            frozen: true,
            snapLinks: true,
            linkPinning: false,
            defaultLink: new shapes.standard.Link(),
            async: true,
            connectionStrategy: connectionStrategies.pinAbsolute,
        });

        props.setEditorGraph(graph);
        props.setEditorPaper(paper);

        /******** tools View *********/

        const verticesLinkTool = new linkTools.Vertices();
        const segmentsLinkTool = new linkTools.Segments();
        const removeLinkButton = new linkTools.Remove();

        const linkToolsView = new dia.ToolsView({
            name: 'link-tools',
            tools: [verticesLinkTool, segmentsLinkTool, removeLinkButton]
        });

        const removeElemTool = new elementTools.Remove();
        const LinkGenerateButton = elementTools.Button.extend({
            name: 'link-generate-button',
            options: {
                markup: [{
                    tagName: 'circle',
                    selector: 'button',
                    attributes: {
                        'r': 10,
                        'fill': '#64A0C1',
                        'stroke': 'white',
                        'stroke-width': 1,
                        'cursor': 'pointer'
                    }
                }],
                x: '100%',
                y: '50%',
                offset: {
                    x: 0,
                    y: 0
                },
                rotate: true,
                action: function (evt, elementView, buttonView) {
                    let link = new shapes.standard.Link({
                        label: {
                            text: 'link'
                        }
                    });
                    link.source(elementView.model, {
                        anchor: {
                            name: 'modelCenter'
                        }
                    });
                    link.set('target', { x: evt.pageX, y: evt.pageY });
                    link.addTo(paper.model);
                }
            }
        });
        const linkgenerationbutton = new LinkGenerateButton();

        const elemToolsView = new dia.ToolsView({
            name: 'element-tools',
            tools: [removeElemTool, linkgenerationbutton]
        });

        /************ *************/

        /************** Event Handlers ***************/

        paper.on('cell:pointerclick', function (cellView) {
            resetAll(this);
            let cell = cellView.model;
            console.log(cell);
            
            setCurrentId(cell.id);
            
            let cellType = cell.isElement()? 'element': 'link';
            if (cellType === 'element') {
                props.setCellMetaData(cell.attributes.attrs);
                props.setCellSize(cell.attributes.size);

                let elemType = cell.attributes.type.split('.')[1];
                cellType = cellType + '.'+ elemType;
                console.log(elemType, cellType);
            }

            props.setCellType(cellType);
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
                        'stroke': null
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
            setCurrentId(cell.id);
            
            let cellType = cell.isElement()? 'element': 'link';
            if (cellType==='element') {
                props.setCellMetaData(cell.attributes.attrs);
                props.setCellSize(cell.attributes.size);

                let elemType = cell.attributes.type.split('.')[1];
                cellType = cellType + '.'+ elemType;
                console.log(elemType, cellType);
            }

            props.setCellType(cellType);
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

        paper.on('cell:mouseout', function (cellView) {
            highlighters.mask.remove(cellView, 'my-hover-highlight');
            let cell = cellView.model;
            if (cell.isLink()) {
                if (!(highlighters.mask.get(cellView, 'my-cell-highlight'))) {
                    cell.attr('line/stroke', '#64A0C1');
                }
            }
        });

        paper.on('link:pointerclick', function (linkView) {
            paper.removeTools();
            linkView.addTools(linkToolsView);
        });

        paper.on('link:pointerdown', function (linkView) {
            this.removeTools();
            linkView.addTools(linkToolsView);
        });

        paper.on('link:pointerup', function (linkView, evt, x, y) {
            let linkmodel = linkView.model;
            if (linkmodel.getSourceElement() && linkmodel.getTargetElement()) {
                return;
            }
            let models = graph.findModelsFromPoint({ x: x, y: y });
            if (models.length) {
                let model = models[0];
                linkmodel.target(model);
            }
        });

        paper.on('element:pointerclick', function (elementView) {
            this.removeTools();
            elementView.addTools(elemToolsView);
        });

        paper.on('element:pointerdown', function (elementView) {
            this.removeTools();
            elementView.addTools(elemToolsView);
        });

        paper.on('blank:pointerclick', function () {
            resetAll(this);
            paper.removeTools();
            props.setCellType(null);
            setCurrentId(null);
        });
        /****************************************/

        const resetAll = paper => {
            let elems = paper.model.getElements();
            for (let i = 0; i < elems.length; i++) {
                let elemView = paper.findViewByModel(elems[i]);
                highlighters.mask.remove(elemView);
            }
            let links = paper.model.getLinks();
            for (let i=0; i< links.length; i++) {
                let link = links[i];
                link.attr('line/stroke', '#64A0C1');
                let linkView = paper.findViewByModel(link);
                highlighters.mask.remove(linkView);
            }
        };

        paper.unfreeze();
    }, []);

    useEffect(() => {
        const graph = props.editorGraph;
        const paper = props.editorPaper;
        if (graph && paper) {
            if (currentId) {
                let cell = graph.getCell(currentId);
                if (cell && !cell.isLink()) {
                    cell.attr({
                        ...cell.attributes.attrs,
                        ...props.cellMetaData
                    });

                    cell.resize(props.cellSize.width, props.cellSize.height);
                }
            }
        }
    }, [props.cellSize, props.cellMetaData, props.editorGraph, props.editorPaper]);

    return (
        <div className="diagram-editor" ref={canvas}></div>
    );
}