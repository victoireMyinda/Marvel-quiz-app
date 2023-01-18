import React, { Component } from 'react';

class QUiz extends Component {
    render() {
        const { pseudo } = this.props.userdata
        console.log(pseudo)
        return (
            <div>
                <h2>Pseudo : {pseudo}</h2>
            </div>
        )
    }
}

export default QUiz;