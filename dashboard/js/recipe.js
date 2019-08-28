$(document).ready(function () {
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
function showRecipes() {
    foodName = $("#dropdown").val();
    $("#sp1").empty();
    var url = 'https://api.edamam.com/search';
    var data = {
        q: foodName,
        app_id: '6940bd00',
        app_key: '54aba77a1d1cf67ea104f9539b78d96c',
		from:'0',
		to:'15'
    };
    $.ajax({
        url: url,
        method: 'GET',
        data: data,
        success: function (data) {
            var code = '<div class="container"><div class="row my-4">';
            window.localStorage.setItem('data', JSON.stringify(data));
			var end=data.hits.length;
			if(end>15) end=14;
			//alert(end);
            for (var j = 0; j < end; j++) {
                var arr = data.hits[j].recipe.dietLabels;
                
                code += ' <div class="col-4"><div class="card m-3 float-left">\
                <a href="showrecipes.html" onclick="fill(\'' + data.hits[j].recipe.label + '\')"><img class="card-img-top img-fluid" src=' + data.hits[j].recipe.image + ' alt="" ></a>\
                <div class="card-body">\
                    <h4 class="card-title">' + data.hits[j].recipe.label + '</h4>\
                    <p class="card-text">Calories: \
                        ' + data.hits[j].recipe.calories + '</p><p>   </div>';
                for (var i = 0; i < arr.length; i++) {
                    code += arr[i] + "&nbsp;&nbsp;&nbsp";
                }
                code += '</p></div></div>';
            }
            $("#sp1").append(code + '</div>\n\
                </div></div>');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Oops! Something went wrong!");

        }
    });
}
function fill(data) {
    // alert(data);
    window.localStorage.setItem('name', data);
    return true;
}