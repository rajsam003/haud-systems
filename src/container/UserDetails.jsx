import React, { Component } from 'react';
import ReactTable from 'react-table-v6';
import { connect } from 'react-redux';
import 'react-table-v6/react-table.css'
import { Button, CardImg } from 'reactstrap';
import axios from 'axios';
import FormModal from '../component/modal/FormModal';
import ErrorModal from '../component/modal/ErrorModal';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../store/action';

let isEditModal = false;

class UserDetails extends Component {
    state = {
        errorModal: false,
        formModal: false,
        loading: false
    }

    toggleModal = () => {
        this.setState(prevState => ({
            formModal: !prevState.formModal
        }));
    }

    toggleErrorModal = () => {
        this.setState(prevState => ({
            errorModal: !prevState.errorModal
        }));
    }

    editHandler = (user) => {
        this.setState({ formModal: !this.state.formModal });
        isEditModal = true
        this.props.onSetDataField({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            address1: user.address1,
            address2: user.address2,
            region: user.region,
            town: user.town,
            country: user.country,
            postCode: user.postCode,
            contactNumber: user.contactNumber
        })
    }

    deleteHandler = (id) => {
        this.setState({ loading: true });
        axios.delete(`/users/${id}.json`)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        loading: false
                    });
                    this.table.fireFetchData();
                } else {
                    this.setState({ loading: false });
                    this.props.onGetError(true, response)
                    this.toggleErrorModal();
                }
            }).catch(error => {
                this.setState({ loading: false });
                this.props.onGetError(true, "Something went wrong");
                this.toggleErrorModal();
            });
    }

    fetchData = (state) => {
        let arr = [];
        let ids = [];
        var i;
        axios.get('/users.json')
            .then(res => {
                arr = Object.values(res.data);
                ids = Object.keys(res.data);
                arr.shift();
                ids.shift();
                for (i = 0; i < ids.length; i++) {
                    arr[i].id = ids[i]
                }
                this.props.onGetUsers(arr)
            })
            .catch(err => {
                console.log("Error " + err)
                this.setState({ loading: false });
                this.props.onGetError(true, "Something went wrong");
                this.toggleErrorModal();
            });
    }

    setLoading = val => {
        this.setState({ loading: val });
    }
    setFormModal = val => {
        this.setState({ formModal: val });
    }
    fetchDataHandler = () => {
        this.table.fireFetchData()
    }

    render() {
        const columns = [
            {
                Header: props => <span className="column-header">First Name</span>,
                accessor: 'firstName'
            },
            {
                Header: props => <span className="column-header">Last Name</span>,
                accessor: 'lastName',
            },
            {
                Header: props => <span className="column-header">Address</span>,
                id: 'address1',
                accessor: el => (el.address1 + " " + el.address2)
            },
            {
                Header: props => <span className="column-header">Region</span>,
                accessor: 'region',
            },
            {
                Header: props => <span className="column-header">Town</span>,
                accessor: 'town',
            },
            {
                Header: props => <span className="column-header">Country</span>,
                accessor: 'country',
            },
            {
                Header: props => <span className="column-header">Post Code</span>,
                accessor: 'postCode',
            },
            {
                Header: props => <span className="column-header">Contact No</span>,
                accessor: 'contactNumber',
            },
            {
                Header: props => <span className="column-header">Actions</span>,
                Cell: props => {
                    return (
                        <div>
                            <Button size="sm" color="info" onClick={() =>
                                this.editHandler(props.original)
                            }>
                                <CardImg src={require('../assets/edit1.png')} />
                            </Button>
                            {"  "}
                            <Button size="sm" color="info" onClick={() =>
                                this.deleteHandler(props.original.id)
                            }><CardImg src={require('../assets/delete.png')} /></Button>
                        </div>
                    )
                },
                sortable: false
            }
        ]

        let errorModalView = null;
        if (this.props.isError) {
            errorModalView = (
                <ErrorModal modal={this.state.errorModal}
                    toggleModal={() => this.toggleErrorModal()}
                    errorMsg={this.props.errorMessage} />
            )
        }

        let formModal = (
            <FormModal modal={this.state.formModal}
                toggleModal={() => this.toggleModal()}
                newUser={true}
                setLoading={this.setLoading}
                setFormModal={this.setFormModal}
                tableFetch={this.fetchDataHandler}
                toggleErrorModal={this.toggleErrorModal}
                loading={this.state.loading}/>
        )
        if (isEditModal) {
            formModal = (
                <FormModal modal={this.state.formModal}
                    toggleModal={() => this.toggleModal()}
                    setLoading={this.setLoading}
                    setFormModal={this.setFormModal}
                    toggleErrorModal={this.toggleErrorModal}
                    tableFetch={this.fetchDataHandler}
                    newUser={false} />
            )
        }

        return (
            <div>
                {errorModalView}
                {formModal}
                <ReactTable
                    data={this.props.users}
                    columns={columns}
                    className="-striped highlight"
                    defaultPageSize={10}
                    loading={this.state.loading}
                    noDataText='No data found'
                    minRows={3}
                    ref={(instance) => { this.table = instance; }}
                    onFetchData={state => this.fetchData(state)}
                >
                    {(state, makeTable) => {
                        return (
                            <div>
                                <div style={{ padding: '2%' }}>
                                    <Button className="sm" onClick={() => {
                                        this.toggleModal()
                                        isEditModal = false
                                    }} >
                                        Add user
                                    </Button>
                                </div>
                                {makeTable()}
                            </div>
                        );
                    }}
                </ReactTable>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        dataField: state.dataField,
        isError: state.isError,
        errorMessage: state.errorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUsers: (users) => dispatch({ type: actionTypes.GET_ALL_USER, payload: users }),
        onSetDataField: (dataFields) => dispatch({ type: actionTypes.USE_DATA_FIELD, payload: dataFields }),
        onGetError: (hasError, errMsg) => dispatch({ type: actionTypes.GET_ERROR, payload: { isError: hasError, errorMessage: errMsg } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserDetails, axios));
