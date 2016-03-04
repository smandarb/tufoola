
//var serviceMenuURL = "http://localhost/tufoola/pkg15/services.php?service=list&OP=briefcats";
//var serviceCategoryURL = "http://localhost/tufoola/pkg15/services.php?service=list&OP=in_cat";
//var serviceProfileURL = "http://localhost/tufoola/pkg15/services.php?service=profile&OP=get";

var serviceMenuURL = "http://tufoola.com/services.php?service=list&OP=briefcats";
var serviceCategoryURL = "http://tufoola.com/services.php?service=list&OP=in_cat";
var serviceProfileURL = "http://tufoola.com/services.php?service=profile&OP=get";

var rows2;
var tmp2 = "";
var t1;
var docs;
var rows;
var tmp = "";


function getSiteMenu() {
	$.getJSON(serviceMenuURL , function(data) {
		console.log(serviceMenuURL);
		$('#siteMenuList li').remove();


		rows2 = data.items;
		console.log(rows2);
		$('#siteMenuList').append("<li><a href=\"javascript: window.location=window.location;\">تحديث</a></li>");
		$('#siteMenuList').append("<li><a href=\"javascript: window.location='index.html';\">الرئيسية</a></li>");

		$.each(rows2, function(index, row2) {
			tmp2 = "";
			if ( row2.items != false && row2.items.length > 0 ) {
				tmp2 = "<ul>";
		    	for ( i=0;i<row2.items.length;i++){
		    		t1 = row2.items[i];
		    		tmp2 += "<li><a href='#'>" + t1['Name'] + "</a></li>";
		    	}
		    	tmp2 += "</ul>";
		    }
		    tmp2 = "";
			
			$('#siteMenuList').append("<li><a href=\"javascript: window.location='cat_details.html?cid=" + row2.id + "';\">" + row2.Name +	"</a>" + tmp2 + "</li>");

			//$(#menu-button).removeClass('open');
		});
		//$('#siteMenuList').listview('refresh');
	});
}


function fetchCategoryDoctors(cid) {
	$.getJSON(serviceCategoryURL + "&cid=" + cid, function(data) {
		$('#docsList li').remove();
		$('#detailsPage').html('');

		docs = data.items;
		$('#pageTitle').html("أطباء الإختصاص: " + data.category);

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
		$('#mainList').show();
		
	});
}

function getDoctorProfile(cid) {
	
	$.getJSON(serviceProfileURL + "&ID=" + cid, function(data) {
		$('#mainList').hide();
		$('#pageTitle').html("");

		docs = data.info;
		//$('#pageTitle').html("د: " + docs.FullName);
		

		var html = "";//<div data-role=\"header\"><h1>د: " + docs.FullName + "</h1></div>";
		//html += "<div data-role=\"content\">";
		html += "<img id=\"employeePic\"  src=\"" + docs.Photo + "\" border=0/>";
		html += "<div id=\"employeeDetails\">";

        tmp = "";
		if ( data.SUB_CATEGORY_LIST.length > 0 ) {
		    for ( i=0;i<data.SUB_CATEGORY_LIST.length;i++){
		    	t1 = data.SUB_CATEGORY_LIST[i];
		    	tmp += t1['AR_NAME'] + " - ";
		    }
		}

		html += "<h3 id=\"fullName\">د: " + docs.FullName + "</h3>";
		html += "<p id=\"employeeTitle\">" + tmp + "</p>";
		html += "<p id=\"city\"></p>";
		html += "</div>";
		//html += "</div>";

		var rows = data.items;
		html += "<ul id=\"actionList\" data-role=\"listview\" data-inset=\"true\">";

		//$.each(rows, function(index, row) {
			html += '<li><a href="mailto:' + rows.EMail + '"><h3>Email</h3><p>' + rows.EMail +
					'</p></a></li>';

			html += '<li><a href="tel:' + rows.Phone + '"><h3>Call Office</h3><p>' + rows.Phone +
					'</p></a></li>';	

			html += '<li><a href="tel:' + rows.Mobile + '"><h3>Call Cell</h3><p>' + rows.Mobile +
					'</p></a></li>';		

			html += '<li><a href="sms:' + rows.Mobile + '"><h3>SMS</h3><p>' + rows.Mobile +
					'</p></a></li>';		
			
		//});

		html += "</ul>";

		$('#detailsData').html(html);
		$('#detailsData').show();
		$('#pageFrame').hide().fadeIn('fast');
		
	});
}


