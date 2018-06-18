    //browser-sync start --server --files "css/*.css,*.html,*.js,*images/*.jpg"
$(function(){
    _zx.init(750,1206,'/');
    _zx.zoomDom($(".box"),_zx.ssw,'center top');

    $(".commit").click(function(){
        var name = $(".name").val().trim();
        var age = $(".age").val().trim();
        var data = {name:name,age:age};
        console.log(data);
        $.ajax({  
            type : 'POST',  
            url : 'http://127.0.0.1:3000/users/addUser/',  
            data : data,  
            success : function(data){
                console.log(data);
                // if(data.status==1){
                //     alertInfo('提交成功');
                // }else{
                //     alert('提交失败');
                // }
            }  
        }) 
    
    });

});

