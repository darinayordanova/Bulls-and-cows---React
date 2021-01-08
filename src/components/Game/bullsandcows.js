import React, { Component } from "react";
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
var attempts = JSON.parse(localStorage.getItem('attemptsArray')) || [];
var secretNum = JSON.parse(localStorage.getItem('secretNum')) || "";
var guessNum = JSON.parse(localStorage.getItem('guessNum')) || "";
var results = JSON.parse(localStorage.getItem('results')) || [];
var gameW = JSON.parse(localStorage.getItem('gameW')) || "";


const INITIAL_STATE = {
  guessNumber: "",
      secretNumber: JSON.parse(localStorage.getItem('secretNum')) || Math.random()
        .toString()
        .slice(2, 6),
      attempts: [],
      gameWon: false
};

class BullsAndCows extends Component {
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
  }
  componentDidMount(){
    const guessNumber = JSON.parse(localStorage.getItem('guessNum')) || "";
    const secretNum = JSON.parse(localStorage.getItem('secretNum')) || "";
    const attemptsrev = JSON.parse(localStorage.getItem('attemptsArray')) || [];
    const attempts=attemptsrev.reverse()
  
    this.setState({ guessNumber, secretNum, attempts });
  };
  __handleInputChange = event => {
    if (event.target.value.length <= 4) {
      this.setState({
        guessNumber: event.target.value
      });
    }
  };
  __checkAnswer = event => {
    event.preventDefault();
    const { guessNumber, secretNumber } = this.state;
    console.log(secretNumber)

    const re = /^\d{4}$/;
    if (re.test(guessNumber)) {
      var secretArray = [],
        guessArray = [],
        bulls = 0,
        cows = 0;
      secretArray = secretNumber.split("");
      guessArray = guessNumber.split("");
      secretArray.forEach(function(key, index) {
        if (secretArray[index] === guessArray[index]) {
          bulls = bulls + 1;
          secretArray[index] = "X";
          guessArray[index] = "Z";
        }
      });
      secretArray.forEach(function(key, index) {
        if (secretArray.indexOf(guessArray[index]) >= 0) {
          secretArray[secretArray.indexOf(guessArray[index])] = "";
          cows = cows + 1;
        }
      });
      
      let newAttempt = {
        key: Date.now(),
        content: guessNumber,
        bullsCount: bulls,
        cowsCount: cows,
      };
      
      localStorage.setItem('secretNum', JSON.stringify(secretNumber));
      attempts.push(newAttempt);
      localStorage.setItem('attemptsArray', JSON.stringify(attempts));
      if (bulls === 4) {
        var newWins = JSON.parse(localStorage.getItem('authUser'))
        localStorage.removeItem('secretNum')
        localStorage.removeItem('attemptsArray')
        localStorage.removeItem('guessNum')
        
    var LSuid = JSON.parse(localStorage.getItem('authUser')).uid;
        
        var isInRes= results.find(k => k.uid === LSuid);
        if(isInRes){
          isInRes={
            uid: isInRes.uid,
            wins: parseInt(isInRes.wins) + 1
          }
          var newArr=[isInRes];
          var res = results.map(obj => newArr.find(o => o.uid === obj.uid) || obj);
          results = res;
        }
        else{
          
          var newUser={
            uid: LSuid,
            wins: 1
          }
          results.push(newUser)
        }
        localStorage.setItem('results', JSON.stringify(results));
        this.setState({
          gameWon: true
        });
        

      }
      this.setState(prevState => {
        return {
          guessNumber: "",
          attempts: [newAttempt, ...prevState.attempts]
        };
      });
    }
  };
  render() {
    const { guessNumber, attempts, gameWon } = this.state;
    let renderAttempted =
      attempts.length > 0
        ? attempts.map(item => {
            return (
              <div className="numbox" key={item.key}>
                
                <h2>{item.content}</h2>
                <p>
                  {item.bullsCount}{" "}
                  {item.bullsCount.length != 0 ? "Bulls" : "Bull"}{" & "}
                  {item.cowsCount}{" "}
                  {item.cowsCount.length != 0 ? "Cows" : "Cow"}{" "}
                </p>
              </div>
            );
          })
        : "";
        function refreshPage(){ 
          window.location.reload(); 
      }
    return (
      <div>
        {gameWon ? (
          <AuthUserContext.Consumer>
            {authUser => (
              <div className="win">
              <h1>Congratulations {authUser.username}!</h1><h1>You won the game!</h1>
              <button onClick={ refreshPage } className='button-primery'>New Game</button>
              </div>
            )}
          </AuthUserContext.Consumer>
        ) : (
          <div>
            <form noValidate autoComplete="off" onSubmit={this.__checkAnswer}>
              <input
                type="number"
                placeholder="0000"
                onFocus={e => (e.target.placeholder = "")}
                onBlur={e => (e.target.placeholder = "0000")}
                value={guessNumber}
                onChange={this.__handleInputChange}
              />
            </form>
            {renderAttempted}
          </div>
        )}
      </div>
    );
  }
}

export default BullsAndCows;