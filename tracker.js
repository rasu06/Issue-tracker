var deleteall=()=>{
var issueList=document.querySelector("#issuesList");
var fordelete=document.querySelector(".fordelete");               //6. function for deleting all the issues
  var issues=JSON.parse(localStorage.getItem('issues'));
 issues=[];
   localStorage.setItem("issues",JSON.stringify(issues));
  issueList.innerHTML="";
}


console.log("welcome to page");
function setstatusclose(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    console.log("close request");
    for (var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = 'Closed';                                           
      }
    }
  
    localStorage.setItem('issues', JSON.stringify(issues));
  
    fetchIssues();
  }
                                                                         // 5.function for closing and deleting an issue
  function setstatusdelete(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
   console.log("delete request");
    for (var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
  
    localStorage.setItem('issues', JSON.stringify(issues));
  
    fetchIssues();
  }

  

function saveIssue(e) {
    //console.log("int submit event");
  var issueDesc = document.querySelector("#id1").value;
  var issueSeverity = document.querySelector("#id2").value;
  var issueAssignedTo = document.querySelector("#id3").value;
  var issueId = chance.guid();
  var issueStatus = 'Open';
  var issue = {
    id: issueId,
    description: issueDesc,                                     //  2.   creating object which have all the fetched data and adding  it to the issues array 
    severity: issueSeverity,                                          // used local storage for saving data (imp)
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if (localStorage.getItem('issues') == null) {
    console.log("fresh");
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    console.log("old");
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();                                                   //3. preventing the form from submitting and avoiding 
}




function fetchIssues() {
    //console.log("in add_issue_to_page");
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  if(issues!=null)                                                 
 {
  issuesList.innerHTML = '';
  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;                                     // 4.printing the fetched data dynamically to web page
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;
    issuesList.innerHTML += '<div class="fordelete">'+
                            '<div class="card" style="width:18rem;">'+
                               '<div class="card-body">'+
                                  '<p id="dynamic_id">Issue ID:'+id+'</p>'+
                                  '<p><span class="label label-info" id="dynamic_status">'+status+'</span></p>'+
                                  //'<p><span class="label label-info" id="dynamic_status">' + status + '</span></p>'+
                                  '<h3 id="dynamic_desc">'+desc+'</h3>'+
                                  '<p id="dynamic_sever"><span><img class="sever_icon" src="https://img.icons8.com/android/16/000000/clock.png"></span>  '+severity+'</p>'+
                                  '<p id="dynamic_assign"><span><img class="assign_icon" src="https://img.icons8.com/pastel-glyph/28/000000/person-male--v3.png"></span> '+assignedTo+'</p>'+
                                  '<a href="#" class="btn btn-warning" onclick="setstatusclose(\''+id+'\')">Close</a>'+                         // adding eventlistener to close and delete button
                                  '<a href="#" class="btn btn-danger" onclick="setstatusdelete(\''+id+'\')">Delete</a>'+                        // passing id of issue to it
                                 '</div>'+
                            '</div>'+
                            '</div>';
  }
}
}

document.querySelector("#issueInputForm").addEventListener('submit', saveIssue);      // 1. submit event
document.querySelector("#deleteall").addEventListener('click',deleteall);