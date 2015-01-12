/**
 * @file 资源预加载程序
 * 以 AMD 模块的形式封装，支持 RequireJS
 * 支持 JavaScript、CSS、图片3种资源
 * 支持 Chrome、Firefox、IE6+浏览器
 *
 * @auther Yao Chang(wuhayao@gmail.com)
 */
define(function (require) {
    // Kissy插件，用于判断浏览器类型和版本号
    var UA = require('../../dep/ua');
    /**
     * 初始化资源预加载
     * @param {Array.<string>} params 需要预加载的资源地址
     */
    function init(params) {
        var o = null;
        // console.log(UA);
        // alert(UA);
        // alert(UA.ie);
        // alert(navigator.appName);

        for (var i = 0, len = params.length; i < len; i++) {
            if (UA.ie === 6 || UA.ie === 7 || UA.ie === 8) {
                // 如果是 IE6/7/8 浏览器，则所有类型的资源都用新建 Image 对象的方式加载。
                new Image().src = params[i];
                continue;
            }

            o = document.createElement('object');
            o.data = params[i];

            //如果是IE7/8，也可以通过下面四行触发加载。其他浏览器设置成0*0即可。
            // o.width = 1;
            // o.height = 1;
            // o.style.visibility = "hidden";
            // o.type = "text/plain"; //IE
            o.width  = 0;
            o.height = 0;
            // if (params[i].indexOf('css') !== -1) {
            //     o = document.createElement('link');
            //     o.type = 'text/css';
            //     o.rel = "stylesheet";
            //     o.href = params[i];
            // } else if (params[i].indexOf('js') !== -1) {
            //     o = document.createElement('script');
            //     o.type = 'text/javascript';
            //     o.src = params[i];
            // } else {
            //     new Image().src = params[i];
            // }

            // only FF appends to the head
            // all others require body
            document.body.appendChild(o);
        }
    }

    window.onload = function() {
        // reference to <head>
        var head = document.getElementsByTagName('head')[0];

        // a new CSS
        var css = document.createElement('link');
        css.type = "text/css";
        css.rel = "stylesheet";
        css.href = "new.css";

        // a new JS
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = "new.js";

        // preload JS and CSS
        head.appendChild(css);
        head.appendChild(js);
    };

    window.onload = function() {
        // XHR to request a JS and a CSS
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'new.js');
        xhr.send('');
        xhr = new XMLHttpRequest();
        xhr.open('GET', 'new.css');
        xhr.send('');
    };

    return {
        init: init
    };
});
