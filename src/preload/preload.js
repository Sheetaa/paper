define(function (require) {

    function init(params) {
        var i = 0;
        var max = 0;
        var o = null;
        var isIE = navigator.appName.indexOf('Microsoft') === 0;

        for (i = 0, max = params.length; i < max; i += 1) {
            if (isIE) {
                new Image().src = params[i];
                continue;
            }
            o = document.createElement('object');
            o.data = params[i];

            //如果是IE7/8，也可以通过下面四行触发加载。其他浏览器设置成0*0即可。
            //o.width = 1;
            //o.height = 1;
            //o.style.visibility = "hidden";
            //o.type = "text/plain"; //IE
            o.width  = 0;
            o.height = 0;

            // only FF appends to the head
            // all others require body
            document.body.appendChild(o);
        }
    }

    return {
        init: init
    };
});
