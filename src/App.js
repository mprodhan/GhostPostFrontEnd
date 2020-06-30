import React from 'react';
import logo from './logo.svg';
import './App.css';
// import moment from 'moment';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ghostpost: [],
      boast: true
    };
  };


componentDidMount(){
  fetch('http://127.0.0.1:8000/api/ghostpost/').
  then(res => res.json()).
  then(data => {
    this.setState({ghostpost: data})
  });
}
handleClickUp = (id) => {
  fetch(`http://127.0.0.1:8000/api/ghostpost/${id}/up_vote/`, {method: 'POST'}).
  then(res => res.json()).
  then(data => {
    window.location.reload()
  })
};
handleClickDown = (id) => {
  fetch(`http://127.0.0.1:8000/api/ghostpost/${id}/down_vote/`, {method: 'POST'}).
  then(res => res.json()).
  then(data => {
    window.location.reload()
  })
};
handleBoast = (allPosts) => {
  this.setState({ghostpost: allPosts.filter(
    boast => boast.is_boast === true
  )})
};
handleRoast = (allPosts) => {
  this.setState({ghostpost: allPosts.filter(
    boast => boast.is_boast === false
  )})
};
handleMost = (allPosts) => {
  this.setState({ghostpost: allPosts.sort(
    (post1, post2) => post2.total_votes - post1.total_votes
  )})
}
handleLeast = (allPosts) => {
  this.setState({ghostpost: allPosts.sort(
    (post1, post2) => post1.total_votes - post2.total_votes
  )})
}
handleTotal = (post) => {
  this.setState({ghostpost: post.sort(
   (post) => post.up_votes - post.down_votes
  )})
}


// getSubmissionTime = () => {
//   return this.ghostpost.submission.moment().format('MMMM Do YYYY, h:mm:ss a')
// }let dateP = gostpost.submission.moment().format('MMMM Do YYYY, h:mm:ss a')


render(){
  return(
    <React.Fragment>
    <h1>Boast or ROAST!</h1>
    <button onClick={() => this.handleBoast(this.state.ghostpost)}>Boast</button>
    <button onClick={() => this.handleRoast(this.state.ghostpost)}>Roast</button>
    <button onClick={() => this.handleMost(this.state.ghostpost)}>UpVotes</button>
    <button onClick={() => this.handleLeast(this.state.ghostpost)}>DownVotes</button>
    <button onClick={() => this.handleTotal(this.state.ghostpost)}>TotalVotes</button>
    <div>
        {this.state.ghostpost.map((gpost) => {
          return(<ul>
        <h1>{gpost.is_boast ? "boast": "roast"}</h1>
        {/* <li>{gpost.is_boast ? "boast": "roast"}</li> */}
        <li>{gpost.post}</li>
        <li>{gpost.up_votes}</li>
        <li>{gpost.down_votes}</li>
        <li>{gpost.total_votes}</li>
        <li>{gpost.submission}</li>

      <button onClick={() => this.handleClickUp(gpost.id)}>upvotes</button>
      <button onClick={() => this.handleClickDown(gpost.id)}>downvote</button>
      </ul>)
    })
  }
  </div>
  </React.Fragment>
  
)
}
}


export default App;

/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a> */

