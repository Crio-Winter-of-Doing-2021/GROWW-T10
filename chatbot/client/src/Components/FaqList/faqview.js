import React, { useState } from 'react';
import FaqEdit from '../FaqEdit/faqedit';
import Modal from 'react-modal';
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
const FaqView = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="faqcard">
      <p>
        <strong>ID: </strong>
        <button
          className="id-button"
          onClick={() => {
            navigator.clipboard.writeText(
              `FAQ---http://localhost:8080/faq/${props.id}`,
            );
          }}
        >
          {props.id}
        </button>
      </p>
      <p>
        <strong>Question: </strong>
        {props.item.question}
      </p>
      <p>
        <strong>Answer: </strong>
        {props.item.answer}
      </p>
      <div>
        <button onClick={openModal}>edit</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <FaqEdit item={props.item} id={props.id} />
        </Modal>
      </div>
    </div>
  );
};

export default FaqView;
