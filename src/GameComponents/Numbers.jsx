import React, { Component } from 'react';
import _ from 'lodash';

class Numbers extends Component {
    render(){
        const numberClassName = (number) =>{
            if(this.props.selectedNumbers.indexOf(number) >= 0){
                return "selected";
            }
            if(this.props.usedNumbers.indexOf(number) >= 0){
                return "used";
            }
        }
        return(
            <div className="card text-center" >
                <div>
                    {Numbers.list.map((number,i) => 
                        <span key={i} className={numberClassName(number)} onClick={() => this.props.selectNumber(number)}>{number}</span>
                    )}
                </div>
            </div>
        )
    }
}


Numbers.list = _.range(1,10);
export default Numbers;