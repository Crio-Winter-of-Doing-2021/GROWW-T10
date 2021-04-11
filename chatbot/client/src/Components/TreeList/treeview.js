import React, { useState } from 'react';
import Modal from 'react-modal';
import TreeEdit from '../TreeEdit/treeedit';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    height: 'fit-content',
    width: '80%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement(`#root`);

const TreeView = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function deleteTree() {
    await fetch(`/chat/${props.item._id}`, {
      method: 'DELETE',
    });
    window.location = '/';
  }
  return (
    <div className="treeCard">
      {props.item.path}
      <div className="button-group">
        <button onClick={openModal}>Open</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <TreeEdit item={props.item} />
        </Modal>
        <button onClick={deleteTree}>Delete</button>
      </div>
    </div>
  );
};

export default TreeView;
