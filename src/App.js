import React from 'react';
// import React, { useRef, useState } from 'react';
// import './App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// const analytics = firebase.analytics(); 

firebase.initializeApp({
    // firebase config
})


const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    
    <div className="App">
      <header className="App-header">
      </header>

      <section>
        { user ? < SignOut /> : < Void0 /> }
        { user ? < ChatRoom /> : <SignIn /> }
      </section>

    </div>
  );
}

function Void0(){
  return '';
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={ () => auth.signOut() }>SignOut</button>
  )
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Sign in With Google</button>
  )
}

function ChatRoom(){
  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  // const [formValue, setFormValue] = useState('');

  // const sendMessage = async(e) => {
  //   e.preventDefault();

  //   const {uid} = auth.currentUser;

  //   await messageRef.add({
  //     text: formValue,
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //     uid
  //   })

  // }

  return (
    <>
    <div>
      <p>Logged In as {auth.currentUser.displayName}</p>
      ChatRoom :
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </div>

    {/* <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
      <button type="submit">Ok</button>
    </form> */}

    </>
  )
}

function ChatMessage(props){
  const { text, uid, photoURL } = props.message;
  // console.log('MESSAGE: ' .text);

  return <p> <img src={photoURL}></img> ${uid}:{text}</p>

  // const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  // return (
  //   // <div className={`message ${messageClass}`}>
  //     <p>${uid}:{text}</p>
  //   // </div>
  // )
}

export default App;
