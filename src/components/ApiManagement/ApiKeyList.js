// import package
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import clsx from 'classnames'

// import component
import CustromBtn from './CustromBtn';

// import action
import { keyList } from '../../actions/apiMgmtAction'

const ApiKeyList = forwardRef((props, ref) => {

    // status
    const [record, setRecord] = useState([])
    const [loader, setLoader] = useState(false)

    // function
    const fetchKey = async () => {
        try {
            setLoader(true)
            const { status, loading, result } = await keyList();
            setLoader(loading)
            if (status == 'success') {
                setRecord(result)
            }
        } catch (err) { }
    }

    useEffect(() => {
        fetchKey()
    }, [])

    const handleRefetch = (data) => {
        setRecord(data)
    }

    useImperativeHandle(
        ref,
        () => ({
            listData(data) {
                setRecord(data)
            }
        }),
    )

    return (
        <>
            <h5 class="dash_subtitle mt-3">Your API Keys</h5>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Enabled</th>
                            <th>Name</th>
                            <th>Id</th>
                            <th>IP Address</th>
                            <th>Created</th>
                            <th>Permissions</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loader && <tr>Loading...</tr>
                        }

                        {
                            !loader && record && record.length > 0 && record.map((item, key) => {
                                return (
                                    <tr>
                                        <td><i className={clsx({ "fas fa-check text-success": item.status == 'active' }, { "fas fa-times text-red": item.status == 'deactive' })}></i></td>

                                        <td>{item.name}</td>
                                        <td>{item._id}</td>
                                        <td>{item.ipRestriction == true ? item.ipList.join(',') : '0.0.0.0'}</td>
                                        <td>{item.createdAt}</td>
                                        <td><span className="bgHighlight mr-2 py-1 px-2">Read</span></td>
                                        <td>
                                            <CustromBtn
                                                keyId={item.keyId}
                                                status={item.status}
                                                handleRefetch={handleRefetch}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        {
                            !loader && record && record.length == 0 && <tr>No Record</tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
})

export default ApiKeyList;