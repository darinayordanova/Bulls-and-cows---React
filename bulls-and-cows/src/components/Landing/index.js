import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
var results = JSON.parse(localStorage.getItem('results')) || [];
var sorted = []
var result = []
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],

    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    sorted = results.sort((a, b) => b.wins - a.wins).slice(0, 25)
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      this.setState({
        users: usersList,
        loading: false,
      });
    });
    //console.log(sorted)
  }
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    for(var i = 0; i<sorted.length; i++){
      for(var y = 0; y<users.length; y++){
        if(sorted[i].uid===users[y].uid && !result.find(k => k.uid === users[y].uid)){
          users[y].wins = sorted[i].wins
          result.push(users[y])
        }
      }
    }

    return (
      <div className="landing">
        <h1>Bulls And Cows Championship</h1>
        <p></p>
        <div className="box-res">
        {loading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
        <UserList users={result} />
        </div>
      </div>
    );
  }

}

const UserList = ({ users }) => (
  <ol>
    {
    
    users.map(user => (
      <li key={user.uid}>
        
          <strong>{user.username}</strong> 
        
          <span className="right">{user.wins} wins</span>
        
      </li>
    ))
    }
  </ol>
);


export default withFirebase(Landing);