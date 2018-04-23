
$(function(){
 

//render students function using ajax get call
var createStudents = function(){$.get('https://s3.amazonaws.com/dc-profiles/Students.json', function(data){
        //wipe students div
        $('.students').empty();
        var finalHtml = "";
        var modalHtml = "";
        var searchFilter = "";
        //check for default search string
        if($('.search').val() !== 'Search for students'){
            var searchFilter = $('.search').val().toLowerCase();
        }
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
            modalHtml+=''+student.portfolioUrl+'<br>'+student.githubUrl+'<br>'+student.linkedinUrl+'<br>'+student.fullBio+'<br>'+student.email+'<br>'+'</div>';
            modalHtml+='<div class="modal-footer">';
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
