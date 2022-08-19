var firebaseConfig = {
    apiKey: "AIzaSyDpdMT-CGJWxBrj6Q-FJnEvL8cpg8HtSRQ",
        authDomain: "leapup-298db.firebaseapp.com",
        projectId: "leapup-298db",
        databaseURL: "https://leapup-298db-default-rtdb.firebaseio.com",
        storageBucket: "leapup-298db.appspot.com",
        messagingSenderId: "333450191510",
        appId: "1:333450191510:web:d009b0d"
      };
      firebase.initializeApp(firebaseConfig);
      const auth = firebase.auth();

      firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          var email = user.email;
          alert("Loged in as "+email);
        }else{
          alert("Please login First");  
          window.location.replace("../index.html");
        }
      })