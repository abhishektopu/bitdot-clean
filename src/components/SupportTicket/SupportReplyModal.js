import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { replysupport } from "../../actions/userActions";
import { withRouter } from "react-router-dom";
import { toast, ToastContainer} from "react-toastify";
import $ from 'jquery';
import axios from "axios";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import { Editor } from '@tinymce/tinymce-react';
import 'react-toastify/dist/ReactToastify.css';
import keys from "../../actions/config";
import { Link } from 'react-router-dom';
const url = keys.baseUrl;

class SupportReplyModal extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params,'propssssdfdfd');
        this.state = {
            id: "",
            email_add:"",
            subject:"",
            description:"",
            attachment:"",
            errors: {},
            query_image:"",
            reply:[],
            message_query:"",
            records: {},
        };
    }
componentDidMount() {
        this.getData()
    };

     handleChange = (event) => {
        console.log(event.target.files,'event.targetevent.target')
      this.setState({
        query_image: event.target.files[0]
      })
    }


      getData() {
        //alert("styctdsbucftdyfu");
        const id = this.props.match.params;
        axios
            .post(url+"api/support-reply", {_id:id})
            .then(res => {
                console.log(res,'ressupply');
                this.setState(res.data)
            })
            .catch()
            console.log(this.state,'zzsedrfvtguyvz€zayxhs');
    }

  
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                query_image: nextProps.query_image,
                message_query: nextProps.message_query,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        console.log(nextProps);
        console.log(nextProps,'xjsadhnxskaucfysducfhsdjkcnhjnpropse');
        if (nextProps.auth !== undefined
            && nextProps.auth.support_reply !== undefined
            && nextProps.auth.support_reply.data !== undefined
            && nextProps.auth.support_reply.data.message !== undefined) {
            toast(nextProps.auth.support_reply.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        if(nextProps.auth.support_reply.data.success == true)
         toast(nextProps.auth.support_reply.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            nextProps.auth.support_reply = "";
        }
    }
   onSubmitQuery = async(e) => {
        e.preventDefault();
        const newReply = {
            _id: this.props.match.params.id,
            message_query: this.state.message_query,
            type: "Admin"
        };
        const { status, message, errors } = await replysupport(newReply);

        if(!status){
            this.setState({errors:errors})
        }
        if(status){
            toast(message, {
                position: toast.POSITION.TOP_CENTER
            });
            this.getData()
            this.setState({message_query:""}) 
        }
    };

    render() {
        const { errors } = this.state;
        console.log(this.state,'this.state');
        return (
           <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <h3 className="mt-2 text-secondary">Support Ticket</h3>
                            <form noValidate onSubmit={this.onSubmitQuery} id="support-reply" >
                            <div class="card">
                             <div class="card-header"><b>View Ticket Details</b></div>
                             <div class="card-body card-block">
                              <div class="card-body text-secondary">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                              
                                                value={this.state.email_add}
                                                id="email_add"
                                                type="email"
                                                error={errors.email_add}
                                                className={classnames("form-control", {
                                                    invalid: errors.email_add
                                                })} readOnly/>
                                            <span className="text-danger">{errors.email_add}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Subject</label>
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                              
                                                value={this.state.subject}
                                                id="subject"
                                                type="text"
                                                error={errors.subject}
                                                className={classnames("form-control", {
                                                    invalid: errors.subject
                                                })} readOnly/>
                                            <span className="text-danger">{errors.subject}</span>
                                        </div>
                                    </div>


                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Description</label>
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                               
                                                value={this.state.description}
                                                id="description"
                                                type="text"
                                                error={errors.description}
                                                className={classnames("form-control", {
                                                    invalid: errors.description
                                                })} readOnly/>
                                            <span className="text-danger">{errors.description}</span>
                                        </div>
                                    </div>
                                    {/*<div className="row mt-2">
                                        <div className="col-md-3">
                                        <br/>
                                        <label htmlFor="attachment">Query images</label>
                                        </div>
                                        {this.state.attachment!==null?
                                      <div className="col-md-6">
                                         <a href={keys.baseUrl + 'support_images/' + this.state.attachment} target="blank" download>Download</a>
                                     </div>:''}
                                    </div>*/}

                                   </div>
                                    </div>
                                    </div>
                     <div class="card">
                     <div class="card-header"><b>Reply Message</b></div>
                     <div class="card-body card-block">
                      {this.state.reply.map((array, i) => {
                      return ( 
                       <section class="card-body text-secondary">{array.replytype}<b> : </b> {array.message_query}
                      
                       </section>
                    )
                             })}
                            </div>
                            </div>   
                             <div class="card">
                             <div class="card-header"><b>Reply to Ticket</b></div>
                             <div class="card-body card-block">
                                   {/* <div className="row mt-2">
                                        <div className="col-md-3">
                                        <br/>
                                        <label htmlFor="query_image">Image</label>
                                        </div>
                                        <div className="col-md-6">
                                        <input type="file" onChange={this.handleChange}
                                        />
                                        <img width="100px" src={this.state.query_image} />
                                        
                                        </div>
                                    </div>*/}

                                    
                                   <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="message_query">Message</label>
                                        </div>
                                        <div className="col-md-6">
                                             <textarea
                                                onChange={this.onChange}
                                                value={this.state.message_query}
                                                id="message_query"
                                                type="text"
                                                error={errors.message_query}
                                                className={classnames("form-control", {
                                                    invalid: errors.message_query
                                                })}/>
                                            <span className="text-danger">{errors.message_query}</span>
                                        </div>
                                    </div>
                                  
                                    </div>
                                    </div>
                                </form>
                                    <br />
                                <button
                                    form="support-reply"
                                    type="submit"
                                    className="btn btn-primary">
                                    Reply
                                </button>
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        )
    }
}

SupportReplyModal.propTypes = {
    replysupport: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { replysupport }
)(withRouter(SupportReplyModal));