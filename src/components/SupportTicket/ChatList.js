// import package
import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

// import component
import ReplyConversation from './ReplyConversation';
import config from '../../config';
import * as moment from "moment";

// import lib
import isEmpty from '../../lib/isEmpty';
import { capitalize } from '../../lib/stringCase'

const ChatList = (props) => {
    // props
    const { ticketRecord, eventKey, sender } = props

    // state
    const [ticketData, setTicketData] = useState({})

    // function
    const replyChatFun = (replyMsg) => {
        setTicketData({ ...ticketData, ...{ 'reply': replyMsg } })
    }

    const closeTicketFun = (status) => {
        setTicketData({ ...ticketData, ...{ 'status': status } })
    }

    useEffect(() => {
        if (ticketRecord) {
            setTicketData(ticketRecord)
        }
    }, [])

    return (
        <Card>
            <Card.Header>
                <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey={`${eventKey}`}>
 
                            <span className="stHeadText subjectWidth"><small>Subject</small>{ticketRecord.categoryName}</span>
                            <span className="stHeadText ticketIdWidth"><small>Ticket ID</small>#{ticketRecord.tickerId}</span>

                            {/* use "greenText" class name  when status is open */}

                            
                            <span className="stHeadText statusWidth"><small>Status</small><span className="yellowText">{capitalize(ticketRecord.status)}</span></span>
                     
                        <div>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </Accordion.Toggle>
                </h5>

            </Card.Header>
            <Accordion.Collapse eventKey={`${eventKey}`}>
                <Card.Body>

                    <p className="metaChatDetails">Create on:             
                       {moment(ticketRecord.createdAt).format("DD-MM-YYYY  h:mm a")}
</p>
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="ticketComments">
                                {     !isEmpty(ticketData) && ticketData.reply && ticketData.reply.length > 0 && ticketData.reply.map((el, index) => {
                                        if (el.senderId == sender._id) {
                                            return (
                                                <li>
                                                    <div className="ticketUserDetails">
                                                        <div className="userImg"><img src={require("../../assets/images/supportUserImg.jpg")} alt="" className="img-fluid" /></div>
                                                        <p>User</p>
                                                    </div>
                                                    <div className="ticketDetails">
                                                        {el.message}
                                                    </div>
                                                    { el.file &&
                                                        <div className="ticketDetails">
                                                            <a target="_blank" href= {config.API_URL+"/images/support/"+el.file} >View File</a>
                                                        </div>
                                                    } 
                                                </li>
                                            )
                                        } else {
                                            return (
                                                <li>
                                                    <div className="ticketUserDetails">
                                                        <div className="userImg">
                                                            <img
                                                                src={require("../../assets/images/supportAdminLogo.jpg")}
                                                                alt=""
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                        <p>Support Team</p>
                                                    </div>

                                                    <div className="ticketDetails">
                                                        <p className="metaChatDetails">
                                                            Admin reply on {el.createdAt}{/* 01-06-2020  15:35 */}
                                                        </p>
                                                        <p>{el.message}</p>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                            {
                                ticketRecord.status == 'open' && <ReplyConversation
                                    receiverId={ticketRecord.adminId}
                                    ticketId={ticketRecord._id}
                                    replyChatFun={replyChatFun}
                                    closeTicketFun={closeTicketFun}
                                />
                            }
                        </div>
                    </div>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default ChatList;