import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import './styles.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    borderRadius: 'none'
  }
};

// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root');

function ModalComponent({ title, text }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      {/* Trigger modal manually: */}
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={} // save in localStorage
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel="Modal"
        overlayClassName="modal-background"
      >
        <div className="c-modal">
          <h2 className="modal-title">{title}</h2>
          <p className="modal-text">{text}</p>
          <div className="modal-button-wrapper">
            <button className="modal-button" onClick={() => setOpen(false)}>
              Ok, got it
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

ModalComponent.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
};

export default ModalComponent;
