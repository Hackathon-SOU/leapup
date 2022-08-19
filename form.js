const firebaseConfig = {
    apiKey: "AIzaSyDpdMT-CGJWxBrj6Q-FJnEvL8cpg8HtSRQ",
    authDomain: "leapup-298db.firebaseapp.com",
    databaseURL: "https://leapup-298db-default-rtdb.firebaseio.com",
    projectId: "leapup-298db",
    storageBucket: "leapup-298db.appspot.com",
    messagingSenderId: "333450191510",
    appId: "1:333450191510:web:d009b0db7653756bf8d8b7",
    measurementId: "G-KS5PXVLQD2"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth();

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function signup(){
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;
    // console.log(name,email,password);
    const promise = auth.createUserWithEmailAndPassword(email,password);
    //
    promise.catch(e=>alert(e.message));
    alert("SignUp Successfully");
    window.location.replace("./home.html");
  }
  
  //signIN function
  function  signin(){
    var email = document.getElementById("signin-email").value;
    var password = document.getElementById("signin-password").value;
    const promise = auth.signInWithEmailAndPassword(email,password);
    promise.catch(e=>alert(e.message));
    window.location.replace("./AudioBooks/");
  };

  // active user to homepage
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      var email = user.email;
      alert("Active user "+email);
      window.location.replace("./AudioBooks/");

    }else{
      alert("No Active user Found")
    }
  })