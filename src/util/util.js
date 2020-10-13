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

function getUrlParams(key) {
    let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function formatNum(str) {
    str = '' + str;
    let newStr = "";
    let count = 0;
    // 当数字是整数
    if (str.indexOf(".") == -1) {
        for (let i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr ; //自动补小数点后两位
        return str;
    }
    // 当数字带有小数
    else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
        return str;
    }
}