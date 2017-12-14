$(document).ready(function(){

    // Add your names here
    // var lemons = [];

    $('button').on('click', checkResults);

    var select = generateSelect(lemons);
    var randomLemons = shuffle(lemons);
    $('#results').text(`0/${lemons.length}`)

    randomLemons.forEach(function(lemon){
        $("#container").append(generateLemon(lemon));
    });

    function generateSelect(lemons) {
        var template = '<select><option value="adas">Select Name</option>';
        lemons.forEach(function(lemon){
            template += `<option value="${lemon}">${lemon}</option>`
        });
        template += "</select>";
        return template;
    }

    function generateLemon(name) {
      var url = name.split(" ").join("_").toLowerCase() + ".jpg";
      var template =
      `<div class="lemon" id="${name}"">
        <img src="assets/${url}" />
        ${select}
      </div>`;
      return template;
    }

    function checkResults(){
        var $lemons = $(".lemon");
        var countSuccess = 0;
        for(var i = 0; i < lemons.length; i++) {
            var lemon = $lemons[i];
            var name = lemon.id;
            var select = $(lemon).find("select")[0];
            var selected = select[select.selectedIndex].text;
            if(name === selected) {
                $(lemon).removeClass("fail");
                $(lemon).addClass("succeed");
                countSuccess++;
            } else {
                $(lemon).removeClass("succeed");
                $(lemon).addClass("fail");
            }
        };
        $("#results").text(`${countSuccess}/${$lemons.length}`);
        $("#results").show();
    }

    function shuffle(array) {
    var results = [];
    var copy = array.slice(0);
    while (copy.length > 0) {
      var randomIndex = Math.floor(Math.random() * (copy.length - 1));
      results.push(copy[randomIndex]);
      copy.splice(randomIndex, 1);
    }
    return results;
    };
})
