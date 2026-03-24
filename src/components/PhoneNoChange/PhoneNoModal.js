// import package
import React from 'react';
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

// import component
import PhoneNoForm from './PhoneNoForm';

// import action
import { closePhoneModal } from '../../actions/modalAction'

const PhoneNoChangeModal = () => {
    const dispatch = useDispatch();

    // redux-state
    const { isPhoneNoModal } = useSelector(state => state.modal);

    return (
        <Modal
            show={isPhoneNoModal}
            size="lg"
            centered
            onHide={() => closePhoneModal(dispatch)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Change Mobile Number</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PhoneNoForm />
            </Modal.Body>
        </Modal>
    )
}

export default PhoneNoChangeModal