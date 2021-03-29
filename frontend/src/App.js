import './App.css';

import Forms from './components/Forms';
import Posts from './components/Posts';
import ListOfUsers from './components/ListOfUsers'
import {BrowserRouter as Browser, Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import userActions from './Redux/actions/userActions';
import EachUser from './components/EachUser';

function App({loggedUser, preserve}) {

  if(loggedUser){
    var links = 
    <>
      <Switch>
        <Route path='/posts' component={Posts} />
        <Route path='/users' component={ListOfUsers} />
        <Route exact path='/user/:id' component={EachUser}/>
        <Redirect to='/posts'/>
      </Switch>
    </>
  }else if(!loggedUser && localStorage.getItem('token')){
    preserve(localStorage.getItem('token'))
  }else{
    links = <>
    <Switch>
        <Route exact path='/' component={Forms} />
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

const mapDispatchToProps={
  preserve: userActions.preserve
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
