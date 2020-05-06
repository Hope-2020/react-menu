import React, { Component } from 'react';
import ErrorMessage from 'components/ErrorMessage';

export default class ErrorBoundry extends Component {
    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({ 
            error: true 
        });
    }

    render() {
       if (this.state.error) {
            return (
               <div className="item__page">
                   <ErrorMessage />
               </div>
            );
        }

       return this.props.children;
    };
};