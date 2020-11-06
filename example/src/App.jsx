import React, { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import { listUsers, changePassword} from "./userServices";
import firebase from "./loginServices";
import styles from "./App.module.scss";

//end of firebase stuff
const App = () => {
  const {register, handleSubmit} = useForm();
  const [user, setUser] = useState();
  //admin stuff should proabbly be on a separate page
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => {
      if(u){
        setUser(u);
        if(u.uid == "reehCHOJM8hVh4QI01ZuaaGsczu1"){
          listUsers().then(r => setUserList(r))
        };
      }else{
        setUser(null);
      }
    })
    return () => {
      return () => {console.log("should probably unsubscribe from this")}
    }
  }, [])

  const signUp = (formData) => {
    firebase.auth().createUserWithEmailAndPassword(`${formData.username}@madeupemail.com`, formData.password)
    .then(r => alert("signed up"))
    .catch(e => alert(e));
  }

  const signIn = (formData) => {
    firebase.auth().signInWithEmailAndPassword(`${formData.usernameSignIn}@madeupemail.com`, formData.passwordSignIn)
    .then(r => alert("signed in"))
    .catch(e => alert(e));
  }

  const signOut = () => {
    firebase.auth().signOut();
    alert("signed out")
  }

  const handleChangePassword = (uid) => {
    const newPass = document.getElementById(uid).value;
    changePassword(uid,newPass)
    .then(r => alert(r))
  }

  return(
  <div className={styles.App}>
    <h1>Auth Test</h1>
    {user ? 
      <button onClick={signOut}>Sign Out</button> 
    :
      <>
        <form onSubmit={handleSubmit(signUp)}>
          <h2>SignUp</h2>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" autoComplete="username" ref={register} pattern="[a-zA-Z1-9_-]+" title="Letters, numbers, _ and -"/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" ref={register} autoComplete="new-password"/>
          <input type="submit" />
        </form>

        <form onSubmit={handleSubmit(signIn)}>
          <h2>SignIn</h2>
          <label htmlFor="usernameSignIn">Username</label>
          <input type="text" id="usernameSignIn" name="usernameSignIn" autoComplete="username" ref={register} pattern="[a-zA-Z1-9_-]+" title="Letters, numbers, _ and -" />
          <label htmlFor="passwordSignIn">Password</label>
          <input type="password" id="passwordSignIn" name="passwordSignIn" ref={register} autoComplete="current-password"/>
          <input type="submit" />
        </form>
      </>
    }

    
    <div>
      {!user ? null : <><h1>username: {user.email.replace(/@madeupemail.com/,"")}</h1><h1>uid: {user.uid}</h1></>}
    </div>
    {user ? user.uid =="reehCHOJM8hVh4QI01ZuaaGsczu1" ? //This is the admin account uid
    <div>
      <h1>I am the admin, here are my users</h1>
      {userList.map(user => {
        return (
          <form key={user.uid}>
            <p>{user.uid}</p>
            <p>{user.email}</p>
            <p>Change Password:</p>
            <input id={user.uid} type="password" autoComplete="new-password"/>
            <button onClick={() => {handleChangePassword(user.uid)}}>change password</button>
          </form>
        )
      })}
    </div>
    : null : null}
  </div>
  )
}

export default App;