
$(function(){
 

//render students function using ajax get call
var createStudents = function(){$.get('https://s3.amazonaws.com/dc-profiles/Students.json', function(data){
        //wipe students div
        $('.students').empty();
        var finalHtml = "";
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
            finalHtml +=('<div class="card my-2 mx-3" style="width: 18rem;"><div class="card-body d-flex flex-column"><h5 class="card-title">'+student.fullName + 
                '</h5><h6 class="card-subtitle mb-2 text-muted">'+student.missionStatement+'</h6><p class ="card-text">'+ student.fullBio + 
                '</p><a href="#" class ="mt-auto">Full Information</a></div></div>');
        });
        //send the cards to the page
        $('.students').append(finalHtml);
    });
};
createStudents();

//search as you type
$('.search').keyup(function(){
    createStudents();
});

}); 

