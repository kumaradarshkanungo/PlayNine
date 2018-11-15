import React, { Component } from 'react';

class Button extends Component {
    render(){
        let button;
        switch(this.props.answerIsCorrect){
            case true:
                button = 
                    <button className="btn btn-success" onClick={this.props.acceptAnswer}>
                        <i className="fa fa-check"></i>
                    </button>
            break;
            case false:
                button =
                    <button className="btn btn-danger">
                        <i className="fa fa-times"></i>
                    </button>
            break;
            default:
                button =
                    <button className="btn" onClick={this.props.checkAnswer} disabled={this.props.selectedNumbers.length === 0}>
                    = 
                    </button>
        }
        return(
            <div className="col-2">
                {button}
                <br /> <br />
                <button className="btn btn-warning btn-sm" onClick={this.props.redraw} disabled={this.props.redraws === 0}>
                    <i className="fa fa-sync"></i> {this.props.redraws}
                </button>
            </div>
        )
    }
}

export default Button;