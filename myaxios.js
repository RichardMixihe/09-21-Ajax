function myaxios({method,url,params,data}) {
    // 1.处理params参数，把对象参数转换为查询字符串
    let arr = [];
    for (const key in params) {
        arr.push(`${key}=${params[key]}`)
    }
    let querystring = arr.join('&');

    // 2.发送请求的基本五个步骤
    const xhr = new XMLHttpRequest();

        xhr. addEventListener('loadend',function () {
            if (xhr.status>=200&&xhr.status<300) {
                console.log('成功',JSON.parse(xhr.response));
                
            }else if(xhr.status>=300){
                console.log('失败',JSON.parse(xhr.response));

            }
        })//绑定事件
        xhr.open(method, url +'?'+querystring)
        // 判断请求题的类型

            // 判断data是那种格式的请求体
            // console.log(typeof data);
            //instanceof，判断对象的原型链上是否出现过构造函数
             if( data instanceof FormData){
                //说明data时ForData对象
                xhr.setRequestHeader('Content-Type','application/JSON')

                xht.send(data);//发FormData数据
             }else if(typeof data === 'object'){
                //  说明是普通的字面量对象
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
                xhr.send(JSON.stringify(data))
             }else if(typeof data == 'string'){
                // 说明data时查询字符串
                xhr.send(data)
             }else{
                //说明没有data
                xhr.send()
             }

}