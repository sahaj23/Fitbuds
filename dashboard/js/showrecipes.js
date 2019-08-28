        $(document).ready(function () {
    var data = JSON.parse(window.localStorage.getItem('data'));
    var name = window.localStorage.getItem('name');
    var i;
    for (i = 0; i < 10; i++) {
        if (data.hits[i].recipe.label === name) {
            break;
        }
    }
    $("#name").html(name);     
    var code = '<div class="card">\
            <center><img class="card-img-top"  align="middle" style="width:300px;height:300px;margin:10px;" src="' + data.hits[i].recipe.image + '" alt="">\
            </center>\
            <div class="container" >\
            <div class="card" style="margin:50px;">\
                <div class="card-body">\
                    <h3 class="card-title">Ingredients</h3><hr><br>\
<p class="card-text">';
    var quick = data.hits[i].recipe;
    for (var j = 0; j < quick.ingredients.length; j++) {
        code += "<p class='card-text'>" + quick.ingredients[j].text + "&nbsp(" + quick.ingredients[j].weight + "g)</p>";
    }
    code += '</p>\
                </div>\
            </div>\
            <div class="card" style="margin:50px;">\
                <div class="card-body">\
                    <h3 class="card-title">Nutrition</h3><hr><br>\
                    <h5 class="card-subtitle text-muted">Calories(/serving):&nbsp;' + Math.round(quick.calories / quick.yield) + '&emsp;&emsp; Servings:&nbsp;' + quick.yield + ' </h4><br>\n\
<p class="card-text">\n\
Protein:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;'+Math.round(quick.totalNutrients.PROCNT.quantity/quick.yield)+quick.totalNutrients.PROCNT.unit+'</p>\
Carbohydrates:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'+Math.round(quick.totalNutrients.CHOCDF.quantity/quick.yield)+quick.totalNutrients.CHOCDF.unit+'</p>\
Fat:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'+Math.round(quick.totalNutrients.FAT.quantity/quick.yield)+quick.totalNutrients.FAT.unit+'</p>\
Cholesterol:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;'+Math.round(quick.totalNutrients.CHOLE.quantity/quick.yield)+quick.totalNutrients.CHOLE.unit+'</p>\
Iron:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;'+Math.round(quick.totalNutrients.FE.quantity/quick.yield)+quick.totalNutrients.FE.unit+'</p>\
Vitamin A:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'+Math.round(quick.totalNutrients.VITA_RAE.quantity/quick.yield)+quick.totalNutrients.VITA_RAE.unit+'</p>\
\n\
   </div>\
        </div>'
    code+='<div class="card" style="margin:50px;" >\
                <div class="card-body">\
                    <h3 class="card-title">Preparation</h3><hr><br>\
<p class="card-text">For  complete preparation guide, please follow the link<p/><br>\n\
<center><a href="'+quick.url+'">Instructions</a></center></div></div></div>';
    $("#sp1").append(code);
    //alert(data);
});