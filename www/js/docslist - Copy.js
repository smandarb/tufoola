//var serviceDocsURL = "http://www.thebestinsyria.net/testapp/";
//var serviceMenuURL = "http://www.thebestinsyria.net/testapp/";
var serviceDocsURL = "http://localhost/tufoola/pkg15/services?service=list&OP=home";
var serviceMenuURL = "http://localhost/tufoola/pkg15/services?service=list&OP=briefcats";
var docs;
var rows;
var rows2;
var tmp = "";
var tmp2 = "";
var t1;

$('#docsListPage').bind('pageinit', function(event) {
	getDocsList();

	//getSiteMenu();
});

function getDocsList() {
	$.getJSON(serviceDocsURL , function(data) {
		$('#docsList li').remove();

		docs = data.items;

		$.each(docs, function(index, row) {
			if ( row.SUB_CATEGORY_LIST.length > 0 ) {
		    	for ( i=0;i<row.SUB_CATEGORY_LIST.length;i++){
		    		t1 = row.SUB_CATEGORY_LIST[i];
		    		tmp += t1['AR_NAME'] + " - ";
		    	}
		    }
			
			$('#docsList').append('<li><a href="show_doc.html?id=' + row.id + '">' +
					'<img src="' + row.Photo + '"/>' +
					'<h4>' + row.Name + '</h4>' +
					'<p>' + tmp + '<br/><span class="ui-li-count"><div class="docCounter">likes: ' + row.Likes + ', questions: ' + row.Questions + ' ,answers: ' + row.Answers + '</div></span>' + '</p>' +
					'</a></li>');
		});
		$('#docsList').listview('refresh');
	});
}

function getSiteMenu() {
	$.getJSON(serviceMenuURL , function(data) {
		$('#siteMenuList li').remove();

		rows2 = data.items;

		$.each(rows2, function(index, row2) {
			if ( row2.items != false && row2.items.length > 0 ) {
				tmp2 = "<ul>";
		    	for ( i=0;i<row2.items.length;i++){
		    		t1 = row2.items[i];
		    		tmp2 += "<li><a href='#'>" + t1['AR_NAME'] + "</a></li>";
		    	}
		    	tmp2 += "</ul>";
		    }
			
			$('#siteMenuList').append('<li><a href="show_doc.html?id=' + row2.id + '">' + row2.Name +	'</a>' + tmp2 + '</li>');
		});
		$('#siteMenuList').listview('refresh');
	});
}