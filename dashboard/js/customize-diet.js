var muri=null,suri=null,muriArray=[];
$(document).ready(function () {
    //$('#foodresult').show();
    $("#dropdown").typeahead({
        source: function (query, result) {
            var data = {
                q: query,
                app_id: 'a6471d58',
                app_key: '1371084639e0deae5ca2cae1f0b8a534'
            };
            $.ajax({
                url: 'http://api.edamam.com/auto-complete',
                method: 'GET',
                data: data,
                success: function (data) {
                    result($.map(data, function (item) {
                        return item;
                    }));
                }
            });
        }
    });
});
function search(){
	var item = $("#dropdown").val();
	$("#inlineFormCustomSelect").empty();
	$("#inlineFormCustomSelect").append("<option selected>serving size</option>");
	var link = "https://api.edamam.com/api/food-database/parser?ingr=" + item + "&app_id=a6471d58&app_key=1371084639e0deae5ca2cae1f0b8a534";
    $.ajax({
        url: link,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var jsonData = data;
            $("#measurements").empty();
            $("#qualified").empty();
            
            for (var i = 0; i < data.hints[0].measures.length; i++) {
                var m = data.hints[0].measures[i].label;
                var uri = data.hints[0].measures[i].uri;
				$("#inlineFormCustomSelect").append("<option value='"+i+"'>"+m+"</option>");
				muriArray[i+1]=uri;
            }
            //if ('qualified' in data.hints[0].measures[0]) {
              //  for (var i = 0; i < data.hints[0].measures[0].qualified.length; i++) {
                //    var m = data.hints[0].measures[0].qualified[i][0].label;
                  //  var uri = data.hints[0].measures[0].qualified[i][0].uri;
                    //$("#qualified").append("<a href='#' onclick=\"showsize('" + m + "','" + uri + "')\">" + m + "</a>");
                //}
            //}
            //if (search === null)
                display(jsonData.hints[0].food.foodId);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Oops! Something went wrong!");

        },
        data: JSON.stringify()
    });
    $(document).ready(function(){
        $('#dietbutton').click(function() {
            $('#foodresult').toggle();
            alert("called");
            // $('#piechart').append("<canvas id="foodpiechart"></canvas>");
        });
    });
	}
	function check(index){
		//alert(muriArray[index]+" "+index);
		muri=muriArray[index];
	}
	function display(fid) { 
    if (suri !== null) {
        var food = {
            ingredients: [
                {
                    "quantity": 1,
                    "measureURI": muri,
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
                    "measureURI": muri,
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
            $("#foodname").val(data.ingredients[0].parsed[0].food);
            var num=$("#num").val();
            var check = data.totalNutrients;
			//alert(check.ENERC_KCAL.quantity + check.ENERC_KCAL.unit);
			$("#calories").text(check.ENERC_KCAL.quantity + check.ENERC_KCAL.unit);
			$("#protein").text(check.PROCNT.quantity + check.PROCNT.unit);
			$("#fats").text(check.FAT.quantity + check.FAT.unit);
			$("#carbs").text(check.CHOCDF.quantity + check.CHOCDF.unit);
            //$("#facts").append("<tr><td>Energy</td><td>" + check.ENERC_KCAL.quantity*num + check.ENERC_KCAL.unit + "</td></tr>");
            //$("#facts").append("<tr><td>Protein</td><td>" + check.PROCNT.quantity*num + check.PROCNT.unit + "</td></tr>");
            //$("#facts").append("<tr><td>Fat</td><td>" + check.FAT.quantity*num + check.FAT.unit + "</td></tr>");
            //$("#facts").append("<tr><td>Carbohydrates</td><td>" + check.CHOCDF.quantity*num + check.CHOCDF.unit + "</td></tr>");
            //$("#facts").append("<tr><td>Cholesterol</td><td>" + check.CHOLE.quantity*num + check.CHOLE.unit + "</td></tr>");
            //$("#facts").append("<tr><td>Sugar</td><td>" + check.SUGAR.quantity*num + check.SUGAR.unit + "</td></tr>");
            //$("#facts").append("<tr><td>Vitamin A</td><td>" + check.VITA_RAE.quantity*num + check.VITA_RAE.unit + "</td></tr>");

        }
    });
}