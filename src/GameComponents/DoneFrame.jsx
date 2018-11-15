import React, { Component } from 'react';
import _ from 'lodash';

class DoneFrame extends Component {
    render(){
        return(
            <div className="text-center" >
               <h2>{this.props.doneStatus}</h2>
            </div>
        )
    }
}

export default DoneFrame;