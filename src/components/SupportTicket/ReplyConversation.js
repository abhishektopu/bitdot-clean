// import package
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

// import action
import { replyMessage, closeTicket } from '../../actions/supportAction';

// import lib
import validation from './validation';
import isEmpty from '../../lib/isEmpty';
import { toastAlert } from '../../lib/toastAlert';

const initialFormValue = {
    'message': '',
    'file':{}

}

const ReplyConversation = (props) => {

    // props
    const { ticketId, receiverId, replyChatFun, closeTicketFun } = props;

    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [validateError, setValidateError] = useState({});

    const { message, file } = formValue;

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
        setValidateError(validation(formData, 'replyMsg'))
    }
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        let formData = { ...formValue, ...{ [name]: files[0] } }

        setFormValue(formData)
    }

    const handleSubmit = async () => {
        let reqData = {
            message,
            'receiverId': receiverId,
            'ticketId': ticketId
        }
        let bodyformData = new FormData();
        bodyformData.append('receiverId',receiverId)
        bodyformData.append('ticketId',ticketId)
        bodyformData.append('message',message)
        bodyformData.append('file',file)
        try {
            const { status, loading, error, result } = await replyMessage(bodyformData);
            if (status == 'success') {
                setFormValue(initialFormValue)
                replyChatFun(result)
                // setValidateError(validation(initialFormValue, 'replyMsg'))
                // window.location.reload();

            }
        } catch (err) { }
    }

    const handleCloseTicket = async () => {
        let reqData = {
            'ticketId': ticketId
        }
        try {
            const { status, loading, error, message, result } = await closeTicket(reqData);
            if (status == 'success') {
                console.log('result123',result)
                closeTicketFun(result.status)
                toastAlert('success', message, 'supportTicket');
                window.location.reload();
            }
        } catch (err) { }
    }

    useEffect(() => {
        // setValidateError(validation(formValue, 'replyMsg'))
    }, [])

    return (
        <div className="messageTypeBox contact_form">
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label className="d-block">Reply to admin</label>
                        <textarea
                            rows="2"
                            className="form-control"
                            onChange={handleChange}
                            name="message"
                            value={message}
                        />
                    </div>

                    <div className="">
                        <label>
                         Upload the document (Allowed Only types jpg, jpeg, png, pdf or mp4. )
                        </label>
                        <input 
                            type="file"
                            className="form-control"
                            name={"file"}
                            onChange={handleFileChange} 
                        />
                        {
                            validateError.file && <p className="error-message">{validateError.file}</p>
                        }
                    </div>
                </div>
                <div className="col-md-12">
                    <p className="submitChat">
                        <button
                            type="button"
                            class="btn btn-outline text-uppercase py-2"
                            disabled={!isEmpty(validateError)}
                            onClick={handleSubmit}
                        >
                            Reply
                        </button>
                        <Link onClick={handleCloseTicket} className="ml-0 ml-sm-3">Satisfied, Close this ticket</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReplyConversation;