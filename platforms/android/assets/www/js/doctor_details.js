//var serviceProfileURL = "http://localhost/tufoola/pkg15/services.php?service=profile&OP=get";
var serviceProfileURL = "http://tufoola.com/services.php?service=profile&OP=get";

$('#pageFrame').bind('pageinit', function(event) {
	getSiteMenu();
	var id = getUrlVars()["id"];
	console.log(serviceProfileURL + '&ID='+id);
	$.getJSON(serviceProfileURL + '&ID='+id, displayMDoctor);
});



function displayMDoctor(data) {
	var doctor = data.info;
	
	console.log(doctor);

	$('#employeePic').attr('src',  doctor.Photo);
	$('#fullName').text("الاختصاصات:");
	tmp = "";
	if ( data.SUB_CATEGORY_LIST.length > 0 ) {
		    for ( i=0;i<data.SUB_CATEGORY_LIST.length;i++){
		    	t1 = data.SUB_CATEGORY_LIST[i];
		    	tmp += t1['AR_NAME'] + " - ";
		    }
	}
	$('#docName').text("د. " + doctor.FullName);

	$('#employeeTitle').text(tmp);
	$('#city').text('');
	console.log(doctor.Phone);

	$('#actionList').append('<li><a href="wall.html?id=' + doctor.id + '"><h3>Page</h3>' +
				'<p>' + "زيارة صفحة  المراسلات مع الطبيب" + '</p></a></li>');

	//if (doctor.Likes>0) {		
		$('#actionList').append('<li><a href="reportlist.html?id=' + doctor.id + '"><h3>Likes</h3>' +
				'<p>' + doctor.Likes + '</p></a></li>');
	//}
	//if (doctor.Questions>0) {
		$('#actionList').append('<li><a href="reportlist.html?id=' + doctor.id + '"><h3>Questions</h3>' +
				'<p>' + doctor.Questions + '</p></a></li>');
	//}
	//if (doctor.Answers>0) {
		$('#actionList').append('<li><a href="reportlist.html?id=' + doctor.id + '"><h3>Answers</h3>' +
				'<p>' + doctor.Answers + '</p></a></li>');
	//}	
	if (doctor.EMail) {
		$('#actionList').append('<li><a href="mailto:' + doctor.EMail + '"><h3>Email</h3>' +
				'<p>' + doctor.EMail + '</p></a></li>');
	}
	if (doctor.Phone) {
		$('#actionList').append('<li><a href="tel:' + doctor.Phone + '"><h3>Call Office</h3>' +
				'<p>' + doctor.Phone + '</p></a></li>');
	}
	if (doctor.Mobile) {
		$('#actionList').append('<li><a href="tel:' + doctor.Mobile + '"><h3>Call Cell</h3>' +
				'<p>' + doctor.Mobile + '</p></a></li>');
		$('#actionList').append('<li><a href="sms:' + doctor.Mobile + '"><h3>SMS</h3>' +
				'<p>' + doctor.Mobile + '</p></a></li>');
	}

	$('#actionList').append('<li><a href="mailto:' + doctor.EMail + '"><h3>معلومات أكثر:</h3>' +
				'<p>' + doctor.CV + '</p></a></li>');	

	$('#actionList').listview('refresh');

	
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}