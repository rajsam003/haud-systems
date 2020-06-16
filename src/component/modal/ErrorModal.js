import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ErrorModal = ({modal, toggleModal, errorMsg}) => (
  <div>
    <Modal isOpen={modal} toggle={toggleModal} >
      <ModalHeader toggle={toggleModal}>Alert!!</ModalHeader>
      <ModalBody>
        {errorMsg}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
);

export default ErrorModal;