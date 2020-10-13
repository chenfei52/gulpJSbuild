function Req(options, success, error){
    $.ajax({
        url: options.url,
        type: options.type || "GET",
        success: (res)=>{
            if(res.success){
                success && success(res);
            }else{
                alert("接口出现错误");
            }
        },
        error: (e)=>{
            error && error(e);
            alert("服务器出错");
        },
    })
}