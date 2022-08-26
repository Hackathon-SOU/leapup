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
        // alert("Loged in as "+email);
        document.getElementById('user-email').innerHTML = email;
        // console.log(user.uid);
      }else{
        alert("Please login First");  
        window.location.replace("../index.html");
      }
    })

    
    function signOut(){
      auth.signOut();
      alert("SignOut Successfully from System");
      window.location.replace("../index.html");
    }

    var form = document.getElementById('todoForm')
    form.addEventListener('submit', submitForm);
    var content = document.querySelector('.todo-content');
    
    function submitForm(e) {
      e.preventDefault();
      form.reset();
      getTask();
    }
    
    var taskid=0;

    var db = firebase.firestore();
    
     getTask();  
     //  deleteTask("1");
     
     function deleteTask(id){
       content.innerHTML="";
      // console.log(id);
       db.collection("todolist").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        // alert("Task Deleted Successfully");
        setTimeout(getTask(),2500);
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    }

    var takenTask_name="";
    var takenTask_date="";
    var takenTask_time="";

     function takeTask(id){
       db.collection("todolist").doc(id).get().then((querySnapshot) => {
         takenTask_name = querySnapshot.data().task;
         var seconds = querySnapshot.data().date.seconds * 1000;
         var dateObj = new Date(seconds);
  // console.log(item.date.seconds)
      var takenTask_month = dateObj.getUTCMonth() + 1; //months from 1-12
      var takenTask_day = dateObj.getUTCDate();
      var takenTask_year = dateObj.getUTCFullYear();
      var takenTask_hour = dateObj.getHours();
      var takenTask_min = dateObj.getMinutes();
      document.getElementById("takenTask-name").innerHTML=takenTask_name;
      document.getElementById("takenTask-date").innerHTML=takenTask_day+'/'+takenTask_month+'/'+takenTask_year;
      document.getElementById("takenTask-time").innerHTML=takenTask_hour+':'+takenTask_min;

      
      // console.log(takenTask);
      // alert("Task Deleted Successfully");
      // setTimeout(getTask(),2500);
    })
    var element = document.getElementById(id);
    element.parentElement.removeChild(element);
};

    // console.log(takenTask);

// var apiTask = "";

function storeData(e) {
  var task = document.getElementById("task").value;
  var date = document.getElementById("date").value;
  apiCall(task);
  var SuggestedTime = apiCall(task);
  // console.log(new Date(date));

  console.log(SuggestedTime,"This is time");
  
  // console.log(taskid);
  db.collection("todolist").doc().set({
        task: task,
        date: new Date(date),
        key: taskid,
    })
    .then(function() {
        console.log("Doc successful") ;
        alert("Task addedd successfully");
    })
    .catch(function(error) {
       console.error("Error writing doc", error);
      });
      content.innerHTML="";
  };

  // var SuggestedTime = apiCall(apiTask)

  // console.log(apiTask);
  var ml_min = document.getElementById("ml-min");
  var ml_sec = document.getElementById("ml-sec");
  const FinalResult = "";

  // console.log(ml_result, "from ml result");

async  function apiCall(apiTask){
    console.log(apiTask);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const data= fetch(`http://127.0.0.1:5000/?task=${apiTask}`, requestOptions)
      .then(response => response.json())
      .then((result) =>
      {
        FinalResult = JSON.parse(result.time);
        console.log(result.time);
        // return result.time
      })
      .catch(error => console.log('error', error));
      // console.log(res);
    }
    
    // console.log(FinalResult, "the final result");


  
  async function getPoints()
  {
    var points = 0;
    await db.collection("todolist").where("status", "==", "completed").get().then((querySnapshot) => {          
      querySnapshot.forEach((doc) => {
        console.info(doc.data())
        // let item=doc.data();
        points = points+10;
        return points;
      })
    })
  }
  console.log(getPoints());
    
var result = getPoints()
console.log(result);

var totaltask=[];
function getTask()
{
      db.collection("todolist").orderBy("key").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.data())
                let item=doc.data();
                // console.log(item.date.seconds);
                var seconds = item.date.seconds * 1000;
                var dateObj = new Date(seconds);
  // console.log(item.date.seconds)
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var hour = dateObj.getHours();
  var min = dateObj.getMinutes();
  
  var dateString =`${day}/${month}/${year} - ${hour}:${min}`;
  // console.log(dateString);
  var taskHtml= `<ul data-id="${doc.id}" style="border-bottom: 0.5px solid #7878785f; " class="list-group list-group-horizontal rounded-0 bg-transparent">
  <li
  class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
  <div class="form-check">
  <button type="button" onclick="takeTask(this.id)" id="${doc.id}" style="color:#3F6080; border-radius:10px  border-style: solid; border-color: #3f6080;"><i class="fas fa-play"></i></button>
  </div>
  
  
  <li
  class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
  <p class="lead fw-normal mb-0" id="${doc.id}">${item.task}</p>
  </li>
    <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
    <div class="d-flex flex-row justify-content-end mb-1">
    <button type="button" onclick="deleteTask(this.id)"  id="${doc.id}" class="text-danger" data-mdb-toggle="tooltip" title="Delete todo"><i
    class="fas fa-trash-alt"></i></button>
    </div>
    <div class="text-end text-muted">
    <span class="text-xmuted" style="font-size:14px;">Due Date:</span>
    <p class="mb-0" style="color:#3F6080">${dateString}</p>
    </span>
    </div>
    </li>
    </ul>`;
    // console.log(taskHtml);
    content.innerHTML+=taskHtml;   
    if(taskid!=querySnapshot.size || taskid==0){
      console.info("true");
      taskid = taskid + 1;
      // console.log(taskid);
    }
  })
  
})
}





// function printTask(){
  
  // var taskHtml=totaltask.map((item,i)=>{
  // // console.log(item.id);
  // var seconds = item.date.seconds * 1000;
  // var dateObj = new Date(seconds);
  // // console.log(item.date.seconds)
  // var month = dateObj.getUTCMonth() + 1; //months from 1-12
  // var day = dateObj.getUTCDate();
  // var year = dateObj.getUTCFullYear();
  // var hour = dateObj.getHours();
  // var min = dateObj.getMinutes();
  
  // var dateString =`${day}/${month}/${year} - ${hour}:${min}}`;
  // return `<ul data-id="${item.firebaseId}" class="list-group list-group-horizontal rounded-0 bg-transparent">
  // <li
  // class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
  // <div class="form-check">
  // <input class="form-check-input me-0" type="checkbox" value="" id="flexCheckChecked1"
  // aria-label="..." checked />
  // </div>
  
  
  // <li
  // class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
  // <p class="lead fw-normal mb-0">${item.task}</p>
  // </li>
  //   <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
  //   <div class="d-flex flex-row justify-content-end mb-1">
  //   <a class="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i
  //   class="fas fa-pencil-alt me-3"></i></a>
  //   <button type="button" onclick="deleteTask(this.id)"  id="${item.firebaseId}" class="text-danger" data-mdb-toggle="tooltip" title="Delete todo"><i
  //   class="fas fa-trash-alt"></i></button>
  //   </div>
  //   <div class="text-end text-muted">
  //   <a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="Created date">
  //   <p class="small mb-0"><i class="fas fa-info-circle me-2"></i>${dateString}</p>
  //   </a>
  //   </div>
  //   </li>
  //   </ul>`
  // }).join('');
  
  // content.innerHTML=taskHtml;
  // console.log(taskHtml);
// console.log(content);
// };
