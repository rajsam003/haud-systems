import React, { Component } from 'react';

import Aux from '../_Aux/Aux';

import ErrorModal from '../../component/modal/ErrorModal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null,
            isError: false,
            modal: false
        }

        toggleModal = () => {
            this.setState(prevState => ({
                modal: !prevState.modal
            }));
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: null, isError: true });
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error, isError: true});
                console.log('Error Response' + error);
            });
        }


        render() {
            let errorModalView=null;
            if (this.state.isError) {
                errorModalView = (
                    <ErrorModal modal={this.state.modal}
                        toggleModal={() => this.toggleModal()}
                        errorMsg={this.state.errorMsg} />
                )
            }
            return (
                <Aux>
                    {errorModalView}
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;