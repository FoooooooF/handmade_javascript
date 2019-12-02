

(function(win){
    /**
     * 创建xhr 构造函数
     * 屏蔽低版本IE的区别
     */
    function createXHR() {
        if(typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if(typeof ActiveXObject != "undefined") {
            if(typeof arguments.callee.activeXString != "string") {
                var versions = ["Msxml3.XMLHTTP", "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHTTP"];
                for(var i = 0, len = versions.length; i < len; i++) {
                    try {
                        var xhr = new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        return xhr;
                    } catch(ex) {
                        //跳过
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("NO XHR object available.")
        }
    }
    /**
     * ajax
     * @param {object} options
     *  - type {string} 方法
     *  - data {object} post传参
     *  - url  {string} 地址
     *  - async {boolean}  ture异步，false同步
     *  - success {function} 成功的回调
     *  - fail {function} 失败的回调
     */
    function Ajax(options){
        var xhr = createXHR();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                let res=JSON.parse(xhr.responseText);
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    options.success(res);
                }else{
                    options.fail(res);
                }
            }
        };
        xhr.open(options.type, options.url, options.async=true);//ture异步，false同步
        // xhr.withCredentials = true;  //跨域
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    }
    win.Ajax=Ajax;
})(window)

