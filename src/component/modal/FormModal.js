import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import * as actionTypes from '../../store/action';
import { handleValidation } from '../validation/formValidation';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';

const FormModal = ({
  modal,
  toggleModal,
  newUser,
  setLoading,
  setFormModal,
  tableFetch,
  toggleErrorModal
}) => {
  const dataField = useSelector(state => state.dataField);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [town, setTown] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostCode] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    if (newUser) {
      setFirstName("");
      setLastName("");
      setAddress1("");
      setAddress2("");
      setTown("");
      setRegion("");
      setCountry("");
      setPostCode("");
      setContactNumber("");
      setModalTitle("Add user detail");
    } else {
      setFirstName(dataField.firstName);
      setLastName(dataField.lastName);
      setAddress1(dataField.address1);
      setAddress2(dataField.address2);
      setTown(dataField.town);
      setRegion(dataField.region);
      setCountry(dataField.country);
      setPostCode(dataField.postCode);
      setContactNumber(dataField.contactNumber);
      setModalTitle("Update user detail");
    }
  }, [newUser, dataField]);

  let emptyObj = {
    id: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    region: '',
    town: '',
    country: '',
    postCode: '',
    contactNumber: ''
  }

  let obj = {
    firstName: firstName,
    lastName: lastName,
    address1: address1,
    address2: address2,
    region: region,
    town: town,
    country: country,
    postCode: postCode,
    contactNumber: contactNumber
  }

  const onSuccess = () => {
    setLoading(false)
    setFormModal(false)
    dispatch({ type: actionTypes.USE_DATA_FIELD, payload: emptyObj })
    tableFetch();
  }
  const onFail = (response) => {
    setLoading(false)
    dispatch({ type: actionTypes.GET_ERROR, payload: { isError: true, errorMessage: response } })
    toggleErrorModal();
  }

  const addHandler = () => {
    var errors = handleValidation(obj);
    if (Object.keys(errors).length !== 0) {
      setError(errors)
    } else {
      setError(emptyObj)
      setLoading(true)
      axios.post('/users.json', obj)
        .then((response) => {
          if (response.status === 200) {
            onSuccess();
          } else {
            onFail(response);
          }
        }).catch(error => {
          onFail("Something went wrong");
        });
    }
  }

  const updateHandler = () => {
    var errors = handleValidation(obj);
    if (Object.keys(errors).length !== 0) {
      setError(errors)
    } else {
      setError(emptyObj)
      setLoading(true)
      axios.put(`/users/${dataField.id}.json`, obj)
        .then((response) => {
          if (response.status === 200) {
            onSuccess();
          } else {
            onFail(response);
          }
        }).catch(error => {
          onFail("Something went wrong");
        });
    }
  }

  let modalButton = (<Button color="primary" onClick={addHandler}>ADD USER</Button>)
  if (!newUser) {
    modalButton = (<Button color="primary" onClick={updateHandler}>UPDATE USER</Button>)
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input id="firstName"
                value={firstName}
                placeholder="First Name"
                onChange={e => { setFirstName(e.target.value) }} />
              {error.firstName && <span className="validation-error">{error.firstName}</span>}
            </FormGroup>
            <FormGroup>
              <Input id="lastName"
                value={lastName}
                placeholder="Last Name"
                onChange={e => { setLastName(e.target.value) }} />
              {error.lastName && <span className="validation-error">{error.lastName}</span>}
            </FormGroup>
            <FormGroup>
              <Input id="address1"
                value={address1}
                placeholder="Address 1"
                onChange={e => { setAddress1(e.target.value) }} />
              {error.address1 && <span className="validation-error">{error.address1}</span>}
            </FormGroup>
            <FormGroup>
              <Input id="address2"
                value={address2}
                placeholder="Address 2"
                onChange={e => { setAddress2(e.target.value) }} />
            </FormGroup>
            <FormGroup>
              <Input id="region"
                value={region}
                placeholder="Region"
                onChange={e => { setRegion(e.target.value) }} />
              {error.region && <span className="validation-error">{error.region}</span>}
            </FormGroup>
            <FormGroup>
              <Input id="town"
                value={town}
                placeholder="Town"
                onChange={e => { setTown(e.target.value) }} />
              {error.town && <span className="validation-error">{error.town}</span>}
            </FormGroup>
            <FormGroup>
              <Input id="country"
                value={country}
                placeholder="Country"
                onChange={e => { setCountry(e.target.value) }} />
              {error.country && <span className="validation-error">{error.country}</span>}
            </FormGroup>
            <FormGroup>
              <Input id="postCode"
                value={postCode}
                placeholder="Post Code"
                onChange={e => { setPostCode(e.target.value) }} />
              {error.postCode && <span className="validation-error">{error.postCode}</span>}
            </FormGroup>
            <FormGroup>
              <Input id="contactNumber"
                value={contactNumber}
                placeholder="Contact Number"
                onChange={e => { setContactNumber(e.target.value) }} />
              {error.contactNumber && <span className="validation-error">{error.contactNumber}</span>}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {modalButton}{' '}
          <Button color="secondary" onClick={toggleModal}>CANCEL</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
};

export default FormModal;