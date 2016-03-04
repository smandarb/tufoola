//var serviceProfileURL = "http://localhost/tufoola/pkg15/services.php?service=messages&OP=tl";
var serviceProfileURL = "http://tufoola.com/services.php?service=messages&OP=tl";

$('#pageFrame').bind('pageinit', function(event) {
	getSiteMenu();
	var id = getUrlVars()["id"];
    console.log(serviceProfileURL + '&DID='+id);
	$.getJSON(serviceProfileURL + '&DID='+id, displayMDoctor);
});



function displayMDoctor(data) {
	var doctor = data.info;
	var docs = data.messages;	
	
	console.log(doctor);

	$('#employeePic').attr('src',  doctor.Photo);
	$('#fullName').html("د. " + doctor.FullName );
	tmp = "";
	if ( data.SUB_CATEGORY_LIST.length > 0 ) {
		    for ( i=0;i<data.SUB_CATEGORY_LIST.length;i++){
		    	t1 = data.SUB_CATEGORY_LIST[i];
		    	tmp += t1['AR_NAME'] + " - ";
		    }
	}
	//$('#docName').text("د. " + doctor.FullName);

	$('#employeeTitle').text(tmp);
	$('#city').text('');
	console.log(doctor.Phone);

	
    console.log(docs);
	if ( doctor.status != "false") {
		$('#actionList li').remove();
		$.each(docs, function(index, row) {		
				$('#actionList').append('<li><a href="#"><h3>' +  row.Message + '</h3>' +
				'<p>' + row.Reply + '</p></a></li>');
				
		});
		$('#actionList').listview('refresh');
	}
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

function doBackToDetails(){
	var id = getUrlVars()["id"];
	window.location = "doctor_details.html?id=" + id;	
}
