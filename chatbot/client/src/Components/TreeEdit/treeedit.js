import React, { useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  updateEdge,
} from 'react-flow-renderer';
import Sidebar from './Sidebar';
import Modal from 'react-modal';
import FaqEdit from '../FaqEdit/faqedit';
import arrayToTree from '../../Utils/ArrayToTree';
import treeToArray from '../../Utils/TreeToArray';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement(`#root`);

const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

let id = 1;
const getId = () => `${++id}`;

const TreeEdit = (props) => {
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState('');
  const [payload, setPayload] = useState('');
  const [placeholders, setPlaceholders] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
        x: event.clientX - 500,
        y: event.clientY - 40,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setSelectedID(newNode.id);
      setNodeName(newNode.data.label);
      setAction('');
      setPlaceholders('');
      setPayload('');

      setElements((es) => es.concat(newNode));
    }
  };

  const onElementClick = (event, element) => {
    if (element.data) {
      setSelectedID(element.id);
      setNodeName(element.data.label);
      setAction(element.data.action);
      setPlaceholders(element.data.placeholder);
      setPayload(element.data.payload);
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
            payload: payload,
          };
        }
        return el;
      }),
    );
  }, [action, nodeName, payload, placeholders, setElements, selectedID]);

  useEffect(() => {
    if (props && props.item) {
      let { i, array } = treeToArray(props.item);
      setElements(array);
      id = i;
      console.log('.');
    }
  }, [props]);

  const submit = async (elems) => {
    console.log(elems);
    let postObject = arrayToTree(elems);
    try {
      if (props && props.item) {
        await fetch(`/chat/${props.item._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postObject),
        });
      } else {
        await fetch('/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postObject),
        });
      }
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
            <label>Node Placeholders (Seperated by '---'): </label>
            <input
              value={placeholders}
              onChange={(evt) => setPlaceholders(evt.target.value)}
            />
            <label>
              Node Payload:{' '}
              <button onClick={openModal}>Create New FAQ payload</button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <FaqEdit />
              </Modal>
            </label>

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
