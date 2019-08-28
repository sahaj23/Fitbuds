var muriSnacks=null,suri=null,muriSnacksArray=[];

function searchSnacks(){
    var selectedItem=$("#inlineFormCustomSelectSnacks option:selected").text();
    $("#inlineFormCustomSelectSnacks option:selected").addClass('active');
    $("#inlineFormCustomSelectSnacks").show();
    $('#foodresultSnacks').show();
	var item = $("#dropdownSnacks").val();
	$("#inlineFormCustomSelectSnacks").empty();
	var link = "https://api.edamam.com/api/food-database/parser?ingr=" + item + "&app_id=a6471d58&app_key=1371084639e0deae5ca2cae1f0b8a534";
    $.ajax({
        url: link,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var jsonData = data;
            $("#measurements").empty();
            $("#qualified").empty();
            var name=data.hints[0].food.label;
            /*var isSame=false;
            if($("#nameSnacks").text()===name) isSame=true;
            else isSame=false;
            $("#nameSnacks").text(name);
            if(!isSame) {
                muriSnacks=null;
            }*/
            $("#inlineFormCustomSelectSnacks").append("<option value='0' selected>"+data.hints[0].measures[0].label+"</option>");
            muriSnacksArray[0]=data.hints[0].measures[0].uri;
            for (var i = 1; i < data.hints[0].measures.length; i++) {
                var m = data.hints[0].measures[i].label;
                var uri = data.hints[0].measures[i].uri;
                if(m===selectedItem)
				$("#inlineFormCustomSelectSnacks").append("<option selected value='"+i+"'>"+m+"</option>");
            else
                $("#inlineFormCustomSelectSnacks").append("<option value='"+i+"'>"+m+"</option>");
				muriSnacksArray[i+1]=uri;
            }
            // if ('qualified' in data.hints[0].measures[0]) {
              // for (var i = 0; i <
				// data.hints[0].measures[0].qualified.length; i++) {
                // var m = data.hints[0].measures[0].qualified[i][0].label;
                  // var uri = data.hints[0].measures[0].qualified[i][0].uri;
                    // $("#qualified").append("<a href='#' onclick=\"showsize('"
					// + m + "','" + uri + "')\">" + m + "</a>");
                // }
            // }
            // if (search === null)
                displaySnacks(jsonData.hints[0].food.foodId);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Oops! Something went wrong!");

        },
    });
	}
	function checkSnacks(index){
       
		muriSnacks=muriSnacksArray[index+1];
		
		searchSnacks();
	}
	function displaySnacks(fid) { 
        if(muriSnacks==null) muriSnacks=muriSnacksArray[0];
    if (suri !== null) {
        var food = {
            ingredients: [
                {
                    "quantity": 1,
                    "measureURI": muriSnacks,
                    "foodId": fid,
                    "qualifiers": [suri]
                }
            ]
        };
    } else {
        var food = {
            ingredients: [
                {
                    "quantity": 1,
                    "measureURI": muriSnacks,
                    "foodId": fid
                }
            ]
        };
    }
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "https://api.edamam.com/api/food-database/nutrients?app_id=a6471d58&app_key=1371084639e0deae5ca2cae1f0b8a534",
        data: JSON.stringify(food),
        success: function (data) {
            $("#facts").empty();
            $("#nameSnacks").text(data.ingredients[0].parsed[0].food);
            $("#sp1Snacks").empty();
            $("#sp1Snacks").append(" ("+data.ingredients[0].parsed[0].weight+"g)");
            var num=$("#num").val();
            var check = data.totalNutrients;
			$("#caloriesSnacks").text(Math.round(check.ENERC_KCAL.quantity*100)/100 + check.ENERC_KCAL.unit);
			$("#proteinSnacks").text(Math.round(check.PROCNT.quantity*100)/100 + check.PROCNT.unit);
			$("#fatsSnacks").text(Math.round(check.FAT.quantity*100)/100 + check.FAT.unit);
			$("#carbsSnacks").text(Math.round(check.CHOCDF.quantity*100)/100  + check.CHOCDF.unit);
			$("#piechartSnacks").append("<canvas id='foodpiechartSnacks'></canvas>");
            updateSnacks(Math.round(check.PROCNT.quantity*100)/100,Math.round(check.FAT.quantity*100)/100,Math.round(check.CHOCDF.quantity*100)/100  + check.CHOCDF.unit);
			

        }
    });
}
	
	function addSnacks(){
	if($("#nameSnacks").text()!='Eggbro'){
       $("#snacks").append("<tr>" +
       		"<th scope='row' style='width:20%' >"+$('#nameSnacks').text()+"</th>" +
       		"<td style='width:10%'>"+$('#caloriesSnacks').text()+"</td>" +
       				"<td style='width:10%'>"+$('#proteinSnacks').text()+"</td>" +
       						"<td style='width:10%'>"+$('#carbsSnacks').text()+"</td>" +
       								"<td style='width:10%'>"+$('#fatsSnacks').text()+"</td></tr>");
	}
	$("#caloriesTotal").text(parseFloat($("#caloriesTotal").text())+parseFloat($('#caloriesSnacks').text(),10));
	$("#proteinTotal").text(parseFloat($("#proteinTotal").text())+parseFloat($('#proteinSnacks').text(),10));
	$("#carbsTotal").text(parseFloat($("#carbsTotal").text())+parseFloat($('#carbsSnacks').text(),10));
	$("#fatsTotal").text(parseFloat($("#fatsTotal").text())+parseFloat($('#fatsSnacks').text(),10));
       $("#exampleModalSnacks").modal('toggle');
	}