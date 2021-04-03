import React, { useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  updateEdge,
} from 'react-flow-renderer';
import Sidebar from './Sidebar';

const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

let id = 1;
const getId = () => `${++id}`;

const TreeEdit = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState();
  const [elements, setElements] = useState([
    {
      id: '1',
      type: 'input',
      data: { label: 'Enter Context Route' },
      position: { x: 280, y: 20 },
    },
  ]);
  const [nodeName, setNodeName] = useState('Enter Context Route');
  const [selectedID, setSelectedID] = useState('1');

  // required data
  const [action, setAction] = useState('');
  const [payload, setPayload] = useState();
  const [data, setData] = useState();
  const [placeholders, setPlaceholders] = useState('');

  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  const onDrop = (event) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY - 40,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setElements((es) => es.concat(newNode));
    }
  };
  const onElementClick = (event, element) => {
    if (element.data && element.data.label) {
      setSelectedID(element.id);
      setNodeName(element.data.label);
      setAction(element.data.action);
      setPlaceholders(element.data.placeholder);
      setPayload(element.data.payload);
      setData(element.data.data);
    }
  };

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === selectedID) {
          el.data = {
            ...el.data,
            label: nodeName,
            action: action,
            placeholder: placeholders,
            data: data,
            payload: payload,
          };
        }
        return el;
      }),
    );
  }, [action, nodeName, payload, placeholders, data, setElements, selectedID]);

  const submit = async (elems) => {
    let nodes = {},
      paths = {};
    elems.map((elem) => {
      if (elem.source) {
        if (paths[elem.source]) {
          paths[elem.source].push(elem.target);
        } else {
          paths[elem.source] = [elem.target];
        }
      } else {
        let curdata = elem.data;
        curdata.path = curdata.label;
        delete curdata.label;
        nodes[elem.id] = curdata;
      }
      return elem;
    });
    let postObject = nodes['1'],
      q = [postObject],
      qq = ['1'],
      el,
      cur;
    while (q.length) {
      cur = q.shift();
      el = qq.shift();
      if (!paths[el]) continue;
      // eslint-disable-next-line no-loop-func
      paths[el].map((pt) => {
        if (cur.childRoutes) {
          cur.childRoutes.push(nodes[pt]);
        } else {
          cur.childRoutes = [nodes[pt]];
        }
        qq.push(pt);
        return pt;
      });
      cur.childRoutes.map((elem) => {
        q.push(elem);
        return elem;
      });
    }
    console.log(postObject);

    try {
      await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postObject),
      });
    } catch (error) {
      console.log(error.message);
    }

    window.location = '/';
  };
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="updatenode__controls">
          <div className="control-wrapper">
            <label>
              Node Name:{' '}
              <em>
                <br />* name for the blue node is the context uri
              </em>
            </label>
            <input
              value={nodeName}
              onChange={(evt) => setNodeName(evt.target.value)}
            />
            <label>Node Placeholders (comma Seperated): </label>
            <input
              value={placeholders}
              onChange={(evt) => setPlaceholders(evt.target.value)}
            />
            <label>Node Data (only for FAQ Node): </label>
            <input value={data} onChange={(evt) => setData(evt.target.value)} />
            <label>Node Payload: </label>
            <input
              value={payload}
              onChange={(evt) => setPayload(evt.target.value)}
            />
            <label>Node action: </label>
            <input
              value={action}
              onChange={(evt) => setAction(evt.target.value)}
            />
          </div>
        </div>
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onEdgeUpdate={onEdgeUpdate}
            onLoad={onLoad}
            onDrop={onDrop}
            onElementClick={onElementClick}
            onDragOver={onDragOver}
          >
            <Controls />
          </ReactFlow>
          <button onClick={() => submit(elements)}>Submit</button>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default TreeEdit;
