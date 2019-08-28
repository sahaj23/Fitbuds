var muriLunch=null,suri=null,muriLunchArray=[];
$('#tableLunch').on('click', '.btn', function(){
    $(this).closest ('tr').remove ();
   // var val = $(this).closest('tr').find('#calories').text();
    var calories = $(this).closest('tr').find('.caloriesLunch').text();
    
    var protein = $(this).closest('tr').find('.proteinLunch').text();
    var carbs = $(this).closest('tr').find('.carbsLunch').text();
    var fats = $(this).closest('tr').find('.fatsLunch').text();
    alert(calories);
    $("#caloriesTotal").text(Number.parseFloat(parseFloat($("#caloriesTotal").text(),10)-parseFloat(calories,10)).toPrecision(4));
	$("#proteinTotal").text(Number.parseFloat(parseFloat($("#proteinTotal").text(),10)-parseFloat(protein,10)).toPrecision(4));
	$("#carbsTotal").text(Number.parseFloat(parseFloat($("#carbsTotal").text(),10)-parseFloat(carbs,10)).toPrecision(4));
	$("#fatsTotal").text(Number.parseFloat(parseFloat($("#fatsTotal").text(),10)-parseFloat(fats,10)).toPrecision(4));
    
   // alert(val);
});
function searchLunch(){
    var selectedItem=$("#inlineFormCustomSelectLunch option:selected").text();
    $("#inlineFormCustomSelectLunch option:selected").addClass('active');
    $("#inlineFormCustomSelectLunch").show();
    $('#foodresultLunch').show();
	var item = $("#dropdownLunch").val();
	$("#inlineFormCustomSelectLunch").empty();
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
            if($("#nameLunch").text()===name) isSame=true;
            else isSame=false;
            $("#nameLunch").text(name);
            if(!isSame) {
                muriLunch=null;
            }*/
            $("#inlineFormCustomSelectLunch").append("<option value='0' selected>"+data.hints[0].measures[0].label+"</option>");
            muriLunchArray[0]=data.hints[0].measures[0].uri;
            for (var i = 1; i < data.hints[0].measures.length; i++) {
                var m = data.hints[0].measures[i].label;
                var uri = data.hints[0].measures[i].uri;
                if(m===selectedItem )
				$("#inlineFormCustomSelectLunch").append("<option selected value='"+i+"'>"+m+"</option>");
            else
                $("#inlineFormCustomSelectLunch").append("<option value='"+i+"'>"+m+"</option>");
				muriLunchArray[i+1]=uri;
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
            alert("search lunch before");
                displayLunch(jsonData.hints[0].food.foodId);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Oops! Something went wrong!");

        },
    });
	}
	function checkLunch(index){

		muriLunch=muriLunchArray[index+1];
		searchLunch();
	}
	function displayLunch(fid) { 
        if(muriLunch==null) muriLunch=muriLunchArray[0];
    if (suri !== null) {
        var food = {
            ingredients: [
                {
                    "quantity": 1,
                    "measureURI": muriLunch,
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
                    "measureURI": muriLunch,
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
            $("#nameLunch").text(data.ingredients[0].parsed[0].food);
            $("#sp1Lunch").empty();
            $("#sp1Lunch").append(" ("+data.ingredients[0].parsed[0].weight+"g)");
            var num=$("#num").val();
            var check = data.totalNutrients;
			$("#caloriesLunch").text(Math.round(check.ENERC_KCAL.quantity*100)/100 + check.ENERC_KCAL.unit);
			$("#proteinLunch").text(Math.round(check.PROCNT.quantity*100)/100 + check.PROCNT.unit);
			$("#fatsLunch").text(Math.round(check.FAT.quantity*100)/100 + check.FAT.unit);
			$("#carbsLunch").text(Math.round(check.CHOCDF.quantity*100)/100  + check.CHOCDF.unit);
			$("#piechartLunch").append("<canvas id='foodpiechartLunch'></canvas>");
            updateLunch(Math.round(check.PROCNT.quantity*100)/100,Math.round(check.FAT.quantity*100)/100,Math.round(check.CHOCDF.quantity*100)/100  + check.CHOCDF.unit);
			

        }
    });
}
	
	function addLunch(){
	if($("#nameLunch").text()!='Eggbro'){
       $("#lunch").append("<tr>" +
       		"<th scope='row' style='width:20%' >"+$('#nameLunch').text()+"</th>" +
       		"<td style='width:10%'>"+$('#caloriesLunch').text()+"</td>" +
       				"<td style='width:10%'>"+$('#proteinLunch').text()+"</td>" +
       						"<td style='width:10%'>"+$('#carbsLunch').text()+"</td>" +
       								"<td style='width:10%'>"+$('#fatsLunch').text()+"</td>"+
       							"<td class='text-center' style='width:10%'><button type='button' class='btn'>Remove</button></td></tr>");;
	}
	$("#caloriesTotal").text(parseFloat($("#caloriesTotal").text())+parseFloat($('#caloriesLunch').text(),10));
	$("#proteinTotal").text(parseFloat($("#proteinTotal").text())+parseFloat($('#proteinLunch').text(),10));
	$("#carbsTotal").text(parseFloat($("#carbsTotal").text())+parseFloat($('#carbsLunch').text(),10));
	$("#fatsTotal").text(parseFloat($("#fatsTotal").text())+parseFloat($('#fatsLunch').text(),10));
       $("#exampleModalLunch").modal('toggle');
	}