$(function(){
//render students function using ajax get call
var createStudents = function(){$.get('https://s3.amazonaws.com/dc-profiles/Students.json', function(data){
        //wipe students div
        $('.students').empty();
        var finalHtml = "";
        var modalHtml = "";
        var searchFilter = $('.search').val().toLowerCase();
        //create a filtered array of students based on search entry
        var filteredStudents = data.filter(function (el){
            var foundInName    = el.firstName.toLowerCase().indexOf(searchFilter) > -1;
            var foundInFull     = el.fullName.toLowerCase().indexOf(searchFilter) > -1;
            var foundInBio  = el.fullBio.toLowerCase().indexOf(searchFilter) > -1;
            var foundInMission = el.missionStatement.toLowerCase().indexOf(searchFilter) > -1;
            return foundInName || foundInFull || foundInBio || foundInMission;
        });
        //randomize the list of students
        var randomStudents = filteredStudents.sort(function(a,b){return 0.5 - Math.random()});
        //create bootstrap cards and modals for each student being displayed

        randomStudents.forEach(function (student) {
            finalHtml+='<div class="card my-2 mx-3" style="width: 18rem;"><div class="card-body d-flex flex-column"><h5 class="card-title">'+student.fullName;
            finalHtml+= '</h5><h6 class="card-subtitle mb-2 text-muted">'+student.missionStatement+'</h6><p class ="card-text">'+ student.fullBio;
            finalHtml+= '</p><button class ="btn btn-primary mt-auto" type="button" data-toggle="modal" data-target="#'+student.id+'">Full Information</button></div></div>';

            modalHtml+='<div class="modal fade" id="'+student.id+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">';
            modalHtml+='<div class="modal-dialog modal-dialog-centered" role="document">';
            modalHtml+='<div class="modal-content">';
            modalHtml+='<div class="modal-header d-block">';
            modalHtml+='<h5 class="modal-title" id="exampleModalLongTitle">'+student.fullName+'</h5>';
            modalHtml+='<h6 class="text-muted">'+student.missionStatement+'</h6></div>';
            modalHtml+='<div class="modal-body">';
            modalHtml+='<a class="text-dark" href="'+student.portfolioUrl+'">'+student.portfolioUrl+'</a><br>'
            modalHtml+= '<a class="text-dark" href="'+student.githubUrl+'">'+student.githubUrl+'</a><br>'
            modalHtml+= '<a class="text-dark" href="'+student.linkedinUrl+'">'+student.linkedinUrl+'</a><br><br>';
            modalHtml+= student.fullBio+'<br><br>'+student.email+'<br>';

            if (student.showcase.length > 0){
              modalHtml+='<hr><br><h5 class="card-title">Projects</h5><br>'
              for(var i=0; i < student.showcase.length; i++){
                modalHtml+='<div class="container-fluid"><div class="row"><div class="col-12 bg-secondary text-white mt-1"><h3 class="text-light">'+ student.showcase[i].projectName +'</h3>';
                modalHtml+= '<a class="text-white" href="'+student.showcase[i].githubUrl +'">' +student.showcase[i].githubUrl +'</a><br>';
                modalHtml+= '<a class="text-white" href="'+student.showcase[i].url +'">' +student.showcase[i].url +'</a><br></br>';
                modalHtml+= student.showcase[i].description+'<br><br>';
                modalHtml+= '<a class="text-white" href="'+student.showcase[i].demoVideo +'">' +student.showcase[i].demoVideo +'</a><br><br>';
                modalHtml+='</div></div></div>';
            };
          };
            modalHtml+='</div><div class="modal-footer">';
            modalHtml+='<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
            modalHtml+='</div></div></div></div>';
        });

        //send the cards to the page
        $('.students').append(finalHtml);
        $('.container').append(modalHtml);
    });
};
createStudents();

//search as you type
$('.search').keyup(function(){
    createStudents();
});

});
