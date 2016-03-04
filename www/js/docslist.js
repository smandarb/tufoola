
//var serviceDocsURL = "http://localhost/tufoola/pkg15/services.php?service=list&OP=home";
var serviceDocsURL = "http://tufoola.com/services.php?service=list&OP=home";

var docs;
var rows;
var tmp = "";
var t1;

$('#pageFrame').bind('pageinit', function(event) {
	getDocsList();

	getSiteMenu();
});

function getDocsList() {
	$.getJSON(serviceDocsURL , function(data) {
		console.log(serviceDocsURL);
		$('#docsList li').remove();
		$('#detailsPage').html('');


		docs = data.items;

		$.each(docs, function(index, row) {
			if ( row.SUB_CATEGORY_LIST.length > 0 ) {
		    	for ( i=0;i<row.SUB_CATEGORY_LIST.length;i++){
		    		t1 = row.SUB_CATEGORY_LIST[i];
		    		tmp += t1['AR_NAME'] + " - ";
		    	}
		    }
			
			$('#docsList').append('<li><a href="doctor_details.html?id=' + row.ID + '">' +
					'<img src="' + row.Photo + '"/>' +
					'<h4>' + row.Name + '</h4>' +
					'<p>' + tmp + '<br/><span class="ui-li-count"><div class="docCounter">likes: ' + row.Likes + ', questions: ' + row.Questions + ' ,answers: ' + row.Answers + '</div></span>' + '</p>' +
					'</a></li>');
		});
		$('#docsList').listview('refresh');
		$('#mainList').show();
	});
}