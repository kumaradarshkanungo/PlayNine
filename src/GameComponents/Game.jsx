import React, { Component } from 'react';
import _ from 'lodash';
import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';
import DoneFrame from './DoneFrame';

var possibleCombinationSum = function(arr, n) {
    // alert(arr,n)
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };

class Game extends Component {
    static randomNumber = () => 1+Math.floor(Math.random()*9)
    state = {
        selectedNumbers: [],
        numberOfStars : Game.randomNumber(),
        answerIsCorrect : null,
        usedNumbers: [],
        redraws: 5,
        doneStatus: null
    }

    selectNumber = (clickedNumber) => {
        if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0){
            return;
        }
        if(this.state.usedNumbers.indexOf(clickedNumber) >= 0){
            return;
        }
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
            answerIsCorrect : null
        }));
    }

    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
            answerIsCorrect : null
        }));
    }

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc,n) => acc+n,0)
        }))
    }

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers : [],
            answerIsCorrect : null,
            numberOfStars : Game.randomNumber(),
        }),()=>this.updateDoneStatus())
    }

    redraw = () => {
        if(this.state.redraws === 0){
            return
        }
        this.setState(prevState => ({   
            selectedNumbers : [],
            answerIsCorrect : null,
            numberOfStars : Game.randomNumber(),
            redraws: prevState.redraws - 1
        }),()=>this.updateDoneStatus());
    }

    possibleSolutions = () => {
        const possibleNumbers = _.range(1,10).filter(number=>
            this.state.usedNumbers.indexOf(number) === -1    
        )

        return possibleCombinationSum(possibleNumbers, this.state.numberOfStars)
    }

    updateDoneStatus = () => {
        if(this.state.usedNumbers.length === 9){
            this.setState({
                doneStatus: "Done.Nice!"
            });
            return;
        }
        if( !(this.possibleSolutions()) && this.state.redraws === 0){
            this.setState({
                doneStatus: "Game Over!"
            });
        }
    }

    render(){
        const {selectedNumbers, numberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus} = this.state;
        return(
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars  numberOfStars={numberOfStars}         />
                    <Button redraws={redraws}
                            redraw={this.redraw}
                            acceptAnswer={this.acceptAnswer}
                            answerIsCorrect={answerIsCorrect}
                            checkAnswer={this.checkAnswer}
                            selectedNumbers={selectedNumbers}     />
                    <Answer selectedNumbers={selectedNumbers}
                            unselectNumber={this.unselectNumber}  />
                </div>
                <br         />
                {doneStatus ? 
                    <DoneFrame doneStatus={doneStatus} /> :
                    <Numbers    usedNumbers={usedNumbers}
                            selectedNumbers={selectedNumbers}
                            selectNumber={this.selectNumber}      />
                }
            </div>
            
        )
    }
}

export default Game;