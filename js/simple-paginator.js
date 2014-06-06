// STRING FORMATTER - This is the function.
String.prototype.format = function (args) {
    var str = this;
    return str.replace(String.prototype.format.regex, function(item) {
        var intVal = parseInt(item.substring(1, item.length - 1));
        var replace;
        if (intVal >= 0) {
            replace = args[intVal];
        } else if (intVal === -1) {
            replace = "{";
        } else if (intVal === -2) {
            replace = "}";
        } else {
            replace = "";
        }
        return replace;
    });
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
// end

var paginatorTemplate = "<span class='btn-wrap'>"+
                                "{2}"+ /* first */
                            "</span>"+
                            "<span class='btn-wrap'>"+
                                "{3}"+ /* previous three */
                            "</span>"+
                            "<span class='btn-wrap'>"+
                                "{5}"+ /* previous */
                            "</span>"+
                            "<span class='btn-wrap'>"+
                                "{0}"+ /* current */
                            "</span>"+
                            "<span class='btn-wrap'>"+
                                "{6}"+ /* next */
                            "</span>"+
                            "<span class='btn-wrap'>"+
                                "{4}"+ /* next three */
                            "</span>"+
                            "<span class='btn-wrap'>"+
                                "{1}"+ /* last */
                            "</span>"; 

var btnDefault = "<a href='#' page={0} class='btn btn-default btn-sm paginator-btn'>{0}<a/>";
var btnPrimary = "<a href='#' page={0} class='btn btn-primary btn-sm paginator-btn'>{0}</a>";
var btnDefaultCustom = "<a href='#' page={0} class='btn btn-default btn-sm paginator-btn {2}'>{1}<a/>";

//Paginator
function paginator(current_v, last_v, ba_num){
     
    current_v = parseInt(current_v);
    last_v= parseInt(last_v);
    
    current = btnPrimary.format([ current_v ]);
    last = btnDefaultCustom.format([ last_v,"last","" ]);
    first = "";
    
    previous = btnDefaultCustom.format([ current_v - 1, "<", "" ]);
    next = btnDefaultCustom.format([ current_v + 1, ">", "" ]);
    
    beforeArray = [ ];
    afterArray = [ ];
    
    numofba = 3;
    if(ba_num != undefined ){
        numofba = ba_num;   
    }
    
    for (var i = numofba; i > 0; i--) {
        iterator = parseInt([i]);
        beforeArray.push( btnDefault.format([ current_v - iterator ]) );
        
        
    };
    for (var i = 0; i < numofba; i++) {
        iterator = parseInt([i])+1;
        afterArray.push( btnDefault.format([ current_v + iterator ]) );
    };
    
    if (current_v <= numofba){
        differenceBefore = current_v-1;
        beforeArray = beforeArray.slice(numofba - differenceBefore ,numofba);
    };
    
    if (last_v - current_v <= numofba){
        differenceAfter = last_v - current_v;
        afterArray = afterArray.slice(0 ,differenceAfter);
    }
     
    
    beforeThree = beforeArray.join("");
    afterThree = afterArray.join("");



    if (current_v == last_v){
        current = btnPrimary.format([ last_v ]);
        last = "";
        next = "";
    };

    if (current_v == 1){
        previous = "";
    };


    if (current_v > numofba+1){
        first = btnDefaultCustom.format([ 1,"first","" ]);
    };


    if (last_v - current_v <= numofba){
        last = "";
    }


    paginateResults = paginatorTemplate.format([current, last, first, beforeThree, afterThree, previous, next]);

    if (last_v == 1 || last_v == 0){
        paginateResults = "";
    }

    return paginateResults;

};