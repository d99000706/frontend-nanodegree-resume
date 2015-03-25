


var bio = {
    "name" : "Chris Howard",
    "role" : "Programmer, Teacher",
    "email" : "d99000706@gmail.com",
    "phone" : "404-482-1962",
    "pictureURL" : "./images/chris2.jpg",
    "welcomeMsg" : "Feel free to look around my resume",
    "skills" : "programming, teaching, computer vision, web development",    
    "location" : "Alpharetta, GA"
};

bio.display = function() {
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    var formattedEmail = HTMLemail.replace("%data%", bio.email);
    var formattedPhone = HTMLmobile.replace("%data%", bio.phone);
    var formattedBioPic = HTMLbioPic.replace("%data%", bio.pictureURL);
    var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMsg);
    var formattedSkills = HTMLskills.replace("%data%", bio.skills);
    var formattedLocation = HTMLlocation.replace("%data%", bio.location);

    $("#header").prepend(formattedRole);
    $("#header").prepend(formattedName);
    $("#topContacts").append(formattedEmail);
    $("#topContacts").append(formattedLocation);
    $("#topContacts").after(formattedWelcomeMsg);
    $("#topContacts").after(formattedBioPic);
    $(".welcome-message").after(HTMLskillsStart);
    $("#skillsH3").after(formattedSkills);    
    
    // footer contact info
    $("#footerContacts").append(formattedEmail);
    $("#footerContacts").append(formattedPhone);
}

/*
    note that JSON does not allow for any line break for long strings
    for the work description, we use an array of strings to be combined with .join(" ")
    also, added mapText field for maps popup
*/

var work = {
    "jobList": [
        {
            "position" : "Software Engineer",
            "employer" : "Imaging Technology Solutions",
            "yearsWorked" : "2010 - present",
            "location" : "Roswell, GA",
            "descriptionJoin" : [
                "Developed machine vision applications using C++, OpenCV and Matrox Imaging Library MIL"
            ],
            "mapText" : "Around 2007, I began doing some consulting work developing software in the field of machine vision.  Most of this work has been for Imaging Technology Solutions in Roswell, GA."
        },
        {
            "position" : "Professor",
            "employer" : "DeVry University",
            "yearsWorked" : "1997 - present",
            "location" : "Decatur, GA",
            "descriptionJoin" : [
                "Taught numerous courses related to computer programming in the",
                "Computer Information Systems and Game and Simulation Programming degrees."
            ],
            "mapText" : "In 1998 I transferred from DeVry's Phoenix campus to their Atlanta location.  I currently reside here and still teach computer programming classes for DeVry."
        },
        {
            "position" : "Software Engineer",
            "employer" : "Rainbow Studios",
            "yearsWorked" : "1995 - 1997",
            "location" : "Phoenix, AZ",
            "descriptionJoin" : [
                "Developed game software and tools for Windows and Sony Playstation"
            ],
            "mapText" : "After graduate school in Utah, I developed game software and tools for Rainbow Studios in Phoenix, AZ."
        },
        {
            "position" : "Graduate Assistant",
            "employer" : "Utah State University",
            "yearsWorked" : "1993 - 1995",
            "location" : "Logan, UT",
            "descriptionJoin" : [
                "Taught undergraduate courses on C programing and Unix OS"
            ],
            "mapText" : "After several years working as an engineer for the Navy in Virginia, I attended Utah State University and worked as a Graduate Assistant.  In 1995, I earned an MS degree in Computer Science."
        },
        {
            "position" : "Naval Architect",
            "employer" : "Norfolk Naval Shipyard",
            "yearsWorked" : "1989 - 1992",
            "location" : "Portsmouth, VA",
            "descriptionJoin" : [
                "Designed structural modifications and repairs for US Naval surface ships"
            ],
            "mapText" : "After graduating from Virginia Tech, I worked for the Norfolk Naval Shipyard as a Structural Engineer/Naval Architect."
        }
    ]
};

work.display = function() {
    for (jobIndex in work.jobList) {
        // console.log(work.jobList[jobIndex].position);
        $("#workExperience").append(HTMLworkStart);
        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobList[jobIndex].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", work.jobList[jobIndex].position);
        var formattedWorkDates = HTMLworkDates.replace("%data%", work.jobList[jobIndex].yearsWorked);
        var formattedWorkDesc = HTMLworkDescription.replace("%data%", work.jobList[jobIndex].descriptionJoin.join(" "));
        var formattedWorkLoc = HTMLworkLocation.replace("%data%", work.jobList[jobIndex].location); 
        var jobText = formattedEmployer + formattedTitle  + formattedWorkDesc+ formattedWorkDates + formattedWorkLoc;
        
        $(".work-entry:last").append(jobText);
    }

}

// JSON object includes an array of schools  [ , , ]
var education = {
    "schoolList": [          
        {
            "name": "Utah State University",
            "location": "Logan, UT",
            "degree": "MS",
            "major": "Computer Science",
            "dates" : "1992 - 1995",
            "mapText" : "After several years as a civilian engineer for the Navy in VA, I attended Utah State University and worked as a Graduate Assistant.  In 1995, I earned an MS degree in Computer Science"
        },
        {
            "name": "Virginia Tech",
            "location": "Blacksburg, VA",
            "degree": "BS",
            "major": "Aerospace Engineering",
            "dates" : "1984 - 1989",
            "mapText" : "I grew up in Virginia and went to Virginia Tech after high school.  In 1989 I earned a BS degree in Aerospace Engineering"
        }
    ]
};

education.display = function() {
    for (schoolIndex in education.schoolList) {
        $("#education").append(HTMLschoolStart);
        
        var formattedName     = HTMLschoolName.replace("%data%", education.schoolList[schoolIndex].name);
        var formattedDegree   = HTMLschoolDegree.replace("%data%", education.schoolList[schoolIndex].degree + " " + education.schoolList[schoolIndex].major);
        var formattedDates    = HTMLschoolDates.replace("%data%", education.schoolList[schoolIndex].dates);
        var formattedLocation = HTMLschoolLocation.replace("%data%", education.schoolList[schoolIndex].location);
        //        var formattedMajor    = HTMLschoolMajor.replace("%data%", ); 
        
        var educationText = formattedName  + formattedDegree +  formattedDates + formattedLocation;
        
        $(".education-entry:last").append(educationText);
    }    
}

var projects = {
    "projectsList": [
        {
            "title": "The Hive",
            "description" : "Rail shooter video game for Windows PC and Sony Playstation",
            "dates" : "1995",
            "images" : "./images/hive.png"
        },
        {
            "title": "MOG2 Change Detection",
            "description" : "Change Detection with Mixture of Gaussian Filter",
            "dates" : "2014",
            "images" : "./images/mog2.png"
        },
        {
            "title": "3D Scan and Measure",
            "description" : "3D Scan and measurement of embossed logo on a plastic bottle",
            "dates" : "2014",
            "images" : "./images/scan3d.png"
        }
    ]
};

projects.display = function() {
    for (projectIndex in projects.projectsList) {
        $("#projects").append(HTMLprojectStart);
        var formattedTitle       = HTMLprojectTitle.replace("%data%", projects.projectsList[projectIndex].title);
        var formattedDate        = HTMLprojectDates.replace("%data%", projects.projectsList[projectIndex].dates);
        var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projectsList[projectIndex].description);
        var formattedImage       = HTMLprojectImage.replace("%data%", projects.projectsList[projectIndex].images);
        var projectText = formattedTitle + formattedDate + formattedDescription + formattedImage;
        
        $(".project-entry:last").append(projectText);
    }
    
}

bio.display();

work.display();

projects.display();

education.display();

$("#mapDiv").append(googleMap);

