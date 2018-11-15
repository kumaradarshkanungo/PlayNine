import React, { Component } from 'react';
import _ from 'lodash';
import Numbers from './Numbers';

class Stars extends Component {

    render(){
        // const numberOfStars = 1+Math.floor(Math.random()*9);

        // let stars = [];
        // for(let i=0; i< numberOfStars;i++){
        //     stars.push(<i className="fa fa-star"></i>)
        // }

        return(
            <div className="col-5">
                {_.range(this.props.numberOfStars).map(i => 
                    <i className="fa fa-star" key={i}></i>   
                )}
            </div>
        )
    }
}


export default Stars;