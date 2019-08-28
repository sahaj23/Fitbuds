var muriDinner=null,suri=null,muriDinnerArray=[];

function searchDinner(){
    var selectedItem=$("#inlineFormCustomSelectDinner option:selected").text();
    $("#inlineFormCustomSelectDinner option:selected").addClass('active');
    $("#inlineFormCustomSelectDinner").show();
    $('#foodresultDinner').show();
	var item = $("#dropdownDinner").val();
	$("#inlineFormCustomSelectDinner").empty();
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
            if($("#nameDinner").text()===name) isSame=true;
            else isSame=false;
            $("#nameDinner").text(name);
            if(!isSame) {
                muriDinner=null;
            }*/
            $("#inlineFormCustomSelectDinner").append("<option value='0' selected>"+data.hints[0].measures[0].label+"</option>");
            muriDinnerArray[0]=data.hints[0].measures[0].uri;
            for (var i = 1; i < data.hints[0].measures.length; i++) {
                var m = data.hints[0].measures[i].label;
                var uri = data.hints[0].measures[i].uri;
                if(m===selectedItem )
				$("#inlineFormCustomSelectDinner").append("<option selected value='"+i+"'>"+m+"</option>");
            else
                $("#inlineFormCustomSelectDinner").append("<option value='"+i+"'>"+m+"</option>");
				muriDinnerArray[i+1]=uri;
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
            alert("search dinner before");
                displayDinner(jsonData.hints[0].food.foodId);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Oops! Something went wrong!");

        },
    });
	}
	function checkDinner(index){

		muriDinner=muriDinnerArray[index+1];
		searchDinner();
	}
	function displayDinner(fid) { 
        if(muriDinner==null) muriDinner=muriDinnerArray[0];
    if (suri !== null) {
        var food = {
            ingredients: [
                {
                    "quantity": 1,
                    "measureURI": muriDinner,
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
                    "measureURI": muriDinner,
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
            $("#nameDinner").text(data.ingredients[0].parsed[0].food);
            $("#sp1Dinner").empty();
            $("#sp1Dinner").append(" ("+data.ingredients[0].parsed[0].weight+"g)");
            var num=$("#num").val();
            var check = data.totalNutrients;
			$("#caloriesDinner").text(Math.round(check.ENERC_KCAL.quantity*100)/100 + check.ENERC_KCAL.unit);
			$("#proteinDinner").text(Math.round(check.PROCNT.quantity*100)/100 + check.PROCNT.unit);
			$("#fatsDinner").text(Math.round(check.FAT.quantity*100)/100 + check.FAT.unit);
			$("#carbsDinner").text(Math.round(check.CHOCDF.quantity*100)/100  + check.CHOCDF.unit);
			$("#piechartDinner").append("<canvas id='foodpiechartDinner'></canvas>");
           updateDinner(Math.round(check.PROCNT.quantity*100)/100,Math.round(check.FAT.quantity*100)/100,Math.round(check.CHOCDF.quantity*100)/100  + check.CHOCDF.unit);
			

        }
    });
}
	
	function addDinner(){
	if($("#nameDinner").text()!='Eggbro'){
       $("#dinner").append("<tr>" +
       		"<th scope='row' style='width:20%'>"+$('#nameDinner').text()+"</th>" +
       		"<td style='width:10%'>"+$('#caloriesDinner').text()+"</td>" +
       				"<td style='width:10%'>"+$('#proteinDinner').text()+"</td>" +
       						"<td style='width:10%'>"+$('#carbsDinner').text()+"</td>" +
       								"<td style='width:10%'>"+$('#fatsDinner').text()+"</td></tr>");
	}
	$("#caloriesTotal").text(parseFloat($("#caloriesTotal").text())+parseFloat($('#caloriesDinner').text(),10));
	$("#proteinTotal").text(parseFloat($("#proteinTotal").text())+parseFloat($('#proteinDinner').text(),10));
	$("#carbsTotal").text(parseFloat($("#carbsTotal").text())+parseFloat($('#carbsDinner').text(),10));
	$("#fatsTotal").text(parseFloat($("#fatsTotal").text())+parseFloat($('#fatsDinner').text(),10));
       $("#exampleModalDinner").modal('toggle');
	}