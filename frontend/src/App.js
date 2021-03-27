import './App.css';

import Forms from './components/Forms';
import Posts from './components/Posts';
import ListOfUsers from './components/ListOfUsers'
import {BrowserRouter as Browser, Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';

function App({loggedUser}) {



  if(loggedUser){
    var links = 
    <>
      <Switch>
        <Route path='/posts' component={Posts} />
        <Route path='/users' component={ListOfUsers} />
        <Redirect to='/posts'/>
      </Switch>
    </>
  }else{
    links = <>
    <Switch>
        <Route exact path='/' component={Forms} />
        <Route path='/posts' component={Posts} />
        <Route path='/users' component={ListOfUsers} />
        <Redirect to='/'/>
    </Switch>
    </>
  }
  return (
    <Browser>
        {links}
    </Browser>
    
  );
}

const mapStateToProps = state =>{
  return{
    loggedUser: state.users.loggedUser,
    allPosts: state.posts.allPosts

  }
}
export default connect(mapStateToProps)(App);
