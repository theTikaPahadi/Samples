"use strict";
var optor = function(selector, fields, input, namespace){
    
    namespace = '_field-' + namespace;
    
    createFields();
    
    $('body').on('click', 'button.addField', function(){
        var string = createFieldString(fields);
        $(this).parent().after(string);
    });


    $('body').on('click', 'button.removeField', function(){
        var divs = $(selector).children('div');
        if(divs.length > 1){
            $(this).parent().remove();
        } else {
            alert('At least one row is required');
        }
    });


    $('body').on('keyup', 'input[id^=_field]', function(){
        var string = getFieldJSON(selector, fields);
        $(input).val(JSON.stringify(string));
    });
    
    
    function createFieldString(){


        var str = "<div>";
        for (var item in fields){
            var type = fields[item];
            var itemId = namespace + '' +  item;
            str += "<input type='"+ type +"' id='" + itemId+ "' placeholder='"+item+"' />";
        }
        str += "<button class='addField'>Add</button>";
        str += "<button class='removeField'>Remove</button>";
        str += "<div>";

        return str;
    }

    function createFields(){

        var string = createFieldString(fields, namespace);

        $(selector).append(string);
    }

    function getFieldJSON(){

        var json = [];

        var divs = $(selector).children('div');

        for(var i = 0; i < divs.length; i++){

            var thisSet = {};

            var div = divs.eq(i);

            for (var field in fields){

                var value = div.children('#'+namespace+field);

                var fieldValue = value.val();

                thisSet[field] = fieldValue;

            }

            json.push(thisSet);

        }

        return json;
    }
    
}
