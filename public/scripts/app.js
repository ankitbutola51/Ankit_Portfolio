//IIFE - Immediatly invoked function Expression
/*File name: app.js
 Student’s Name: Ankit Butola
 StudentID" 301146277
 Date: 01-03-2021 */
(function(){


function Start(){

    console.log("app started");
    let deleteButtons = document.querySelectorAll('.btn-danger')
   for(button of deleteButtons)
   {
       button.addEventListener('click', (event)=>{
             if(!confirm('Are you sure?'))
             {
                 event.preventDefault();
                 window.location.assign('/businessContactList');
             }
       });
   }
}
window.addEventListener("load",Start);



})();