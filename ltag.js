'use strict';
var LTag = LTag || {};
LTag = {
    init:function(){
        $(document).ready(function(){
            LTag.loadStyles();
            LTag.loadTagsField();
            $(".LTtagInput").click(function(){
                $(".LTinputValue").focus();
            });
            $('.LTinputValue').on("keyup", function (key){
                if (key.keyCode === 13)
                {
                    LTag.tagInput();
                }
                if(key.keyCode === 8)
                {
                    LTag.removeLastTag();
                }
            });
            $(document).on('click','.LTremoveTag',function(){
                LTag.removeTag(this);
            });
        });
    },
    loadTagsField:function(){
        var ourHTML = '<div class="LTtagInput"><span id="LTtags"></span><input class="LTinputValue" id="LTwriteTag" type="text" name="" size="5" value=""></div>';
        $('#LTag').css("display","none");
        $('#LTag').before(ourHTML);
    },
    tagInput:function(){
        if($('#LTwriteTag').val().trim() == "")
        {
            return;
        }
        var storage = $("#LTwriteTag").val().trim();
        var newHTML = '<div class="LTtag">'+storage+'&nbsp;<span class="LTremoveTag">x</span></div>';
        $('#LTtags').append(newHTML);
        $(".LTinputValue").val("");
        $("#LTag").val($('#LTag').val()+storage+",");
        $(".LTinputValue").focus();
    },
    removeTag:function(elem){
        var valueToBeDeleted = $(elem).parent().text();
        valueToBeDeleted = valueToBeDeleted.replace('x', '');
        valueToBeDeleted = valueToBeDeleted.trim();
        $(elem).parent().remove();
        var deleteFrom = $("#LTag").val();
        var newValue = deleteFrom.replace(valueToBeDeleted+",",'');
        $("#LTag").val(newValue);
    },
    removeLastTag:function(){
        var lastTag = $('.LTtag').last();
        var lastText = $('.LTtag').last().text();
        lastText = lastText.replace('x', '').trim();
        $(lastTag).remove();
        var originalVal = $('#storeTag').val().trim();
        var newVal = originalVal.replace(lastText+',', '');
        $('#storeTag').val(newVal);
    },
    loadStyles:function(){
        var styleData = '.LTtagInput{border-radius:4px;border:1px solid #ddd;padding:6px 10px;width:400px;margin:5px 0px}.LTtagInput input{border:none}.LTtagInput input:focus{border:none;outline:none}div.LTtag{background:#e64108;color:#fff;padding:3px;margin:2px;display:inline-block}.LTremoveTag{cursor:pointer;color:#fff;font-weight:bold}';
        var styleTag = document.createElement('style');
        styleTag.type="text/css";
        styleTag.innerHTML = styleData;
        $('head').append(styleTag);
    },
}