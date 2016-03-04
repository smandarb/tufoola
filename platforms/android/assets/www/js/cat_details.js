//var serviceCategoryURL = "http://localhost/tufoola/pkg15/services.php?service=list&OP=in_cat";
var serviceCategoryURL = "http://tufoola.com/services.php?service=list&OP=in_cat";

$('#pageFrame').bind('pageinit', function(event) {
	getSiteMenu();
	var id = getUrlVars()["cid"];
	
	$.getJSON(serviceCategoryURL + '&cid='+id, displayMCategory);
});



function displayMCategory(data) {
	var docs = data.items;
	console.log(docs);

	$('#docName').text("أطباء الإختصاص: " + data.category);


	$('#docsList li').remove();


	$.each(docs, function(index, row) {
			if ( row.SUB_CATEGORY_LIST.length > 0 ) {
		    	for ( i=0;i<row.SUB_CATEGORY_LIST.length;i++){
		    		t1 = row.SUB_CATEGORY_LIST[i];
		    		tmp += t1['AR_NAME'] + " - ";
		    	}
		    }
			
			$('#docsList').append('<li><a href="doctor_details.html?id=' + row.id + '">' +
					'<img src="' + row.Photo + '"/>' +
					'<h4>' + row.Name + '</h4>' +
					'<p>' + tmp + '<br/><span class="ui-li-count"><div class="docCounter">likes: ' + row.Likes + ', questions: ' + row.Questions + ' ,answers: ' + row.Answers + '</div></span>' + '</p>' +
					'</a></li>');
			
	});
		

	$('#docsList').listview('refresh');

	
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
