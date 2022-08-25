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

         
      let slideIndex = 1;
      var content = "";
      var chatbox = document.getElementById("chatbox");
      
      
      showSlides(slideIndex);
      
      function plusSlides(n) {
          showSlides(slideIndex += n);
      }
      
      function currentSlide(n) {
          showSlides(slideIndex = n);
      }
      
      function showSlides(n) {
          // for displaying button
          if (n>=4) {
            chatbox.style.display = 'block';   

              // Create new link Element
              var link = document.createElement('link');       
              // set the attributes for link element
              link.rel = 'stylesheet';
           
              link.type = 'text/css';
           
              link.href = './static/css/style.css';
       
              // Get HTML head element to append
              // link element to it
              document.getElementsByTagName('HEAD')[0].appendChild(link);
              // include('./static/js/script.js');

            }

          content = document.getElementById([n]).textContent;
          console.log(content);
          let i;
          let slides = document.getElementsByClassName("mySlides");
          let dots = document.getElementsByClassName("dot");
          if (n > slides.length) {slideIndex = 1}    
          if (n < 1) {slideIndex = slides.length}
          for (i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";  
              slides[i].style.display = "none";  
          }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += "active";
}


var msg ="";
var element="";

function speak(){
  var msg = new SpeechSynthesisUtterance();
  msg.text = content;
  window.speechSynthesis.speak(msg);
};

function stop() {
  window.speechSynthesis.cancel();
};

function navigate(){
  window.location.replace("../home.html")
}
