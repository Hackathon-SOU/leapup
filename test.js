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
    
    var form = document.getElementById('todoForm')
    form.addEventListener('submit', submitForm);
    
    function submitForm(e) {
      e.preventDefault();
      form.reset();
      getTask();
    }
    
    var taskid

    var db = firebase.firestore();
    // var taskid = function(){
    //   db.collection("todolist")
    //   .get()
    //   .then((querySnapshot) =>
    //   { 
    //     return querySnapshot.size;
    //   })};
    
     getTask();  

    //  deleteTask("1");
    
    function deleteTask(id){
      db.collection("todolist").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    }


function storeData() {
  var task = document.getElementById("task").value;
  var date = document.getElementById("date").value;
  console.log(new Date(date));
  
    console.log(taskid);
    db.collection("todolist").doc(taskid.toString()).set({
        task: task,
        date: new Date(date)
    })
    .then(function() {
        console.log("Doc successful") ;
        alert("Task addedd successfully");
    })
    .catch(function(error) {
       console.error("Error writing doc", error);
    });
};

var totaltask=[];
function getTask()
{
      db.collection("todolist").get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
              totaltask.push(doc.data());
              totaltask[doc.id-1].id = doc.id;
              console.log(doc.data());
              console.log(totaltask[doc.id-1].id)
              // printTaskList(doc.data())
          })
          taskid = querySnapshot.size+1;
          printTask()
      });
}



function printTask(){

      
  // newdate = year + "/" + month + "/" + day;
var content = document.querySelector('.todo-content');


  // console.log(totaltask);

  var taskHtml=totaltask.map((item,i)=>{
  // console.log("hello");
  console.log(item.id);
  var seconds = item.date.seconds * 1000;
  var dateObj = new Date(seconds);
  console.log(item.date.seconds)
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var hour = dateObj.getHours();
  var min = dateObj.getMinutes();

  var dateString =`${day}/${month}/${year} - ${hour}:${min}}`;

  return `<ul data-id="${i}" class="list-group list-group-horizontal rounded-0 bg-transparent">
    <li
      class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
      <div class="form-check">
        <input class="form-check-input me-0" type="checkbox" value="" id="flexCheckChecked1"
          aria-label="..." checked />
      </div>
    
    
    <li
      class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
      <p class="lead fw-normal mb-0">${item.task}</p>
    </li>
    <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
      <div class="d-flex flex-row justify-content-end mb-1">
        <a href="#!" class="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i
            class="fas fa-pencil-alt me-3"></i></a>
        <a href="#!" class="text-danger" data-mdb-toggle="tooltip" title="Delete todo"><i
            class="fas fa-trash-alt" data-id="${i}"></i></a>
      </div>
      <div class="text-end text-muted">
        <a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="Created date">
          <p class="small mb-0"><i class="fas fa-info-circle me-2"></i>${dateString}</p>
        </a>
      </div>
    </li>
  </ul>`
}).join('')

// console.log(taskHtml);
content.innerHTML="a";
content.innerHTML=taskHtml;
// console.log(content);
};
