/**
 * @fileOverview 延迟（懒）加载组件
 * @require jQuery
 */

datalazyload = (function($){

    var config = {
        IMG_SRC_DATA : 'img-lazyload',
        AREA_DATA_CLS : 'area-datalazyload'
    };


    var IMG_SRC_DATA = '';
    var AREA_DATA_CLS = '';

    //用来存放需要懒加载的图片和数据块
    var imgArr = [];
    var areaArr = [];

    //支持用户回调的事件类型
    var eventType = 'lazy';

    /**
     * 提供给外部的接口
     * @param {Object} [userConfig] 用户自定义配置
     * @private
    */
    function _init(userConfig) {
        config = $.extend(config,userConfig);
        IMG_SRC_DATA = config.IMG_SRC_DATA;
        AREA_DATA_CLS = config.AREA_DATA_CLS;
        _filterItems();
        _initEvent();
    }

    /**
     * 处理需要懒加载的图片和数据块的入口
     * @private
    */
    function _filterItems() {
        _filterImgs();
        _filterAreas();
    }

    /**
     * 事件绑定
     * @private
    */
    function _initEvent() {
        $(window).scroll(_eventHandler);
        $(window).resize(_eventHandler);
        _eventHandler();
    }

    /**
     * 处理需要懒加载的图片
     * @private
    */
    function _filterImgs() {
        var $imgs = $("img");
        $imgs.each(function () {
            imgArr.push(this);
            var $img = $(this);
            $img.targetY = _getTargetY($img[0]);
            //先计算出每个图片距离页面顶部的高度，避免在事件处理函数中进行大量重复计算
            var dataSrc = $img.attr(IMG_SRC_DATA);
            //对于已存在IMG_SRC_DATA的，可能其它实例处理过，我们直接跳过去
            if (!dataSrc) {
                $img.attr(IMG_SRC_DATA, $img.attr('src'));
                $img.removeAttr('src');
            }
        });
    }

    /**
     * 处理需要懒加载的数据块
     * @private
    */
    function _filterAreas() {
        var $areas = $("textarea[class='"+AREA_DATA_CLS+"']");
        $areas.each(function() {
            areaArr.push(this);
            var $area = $(this);
            $area.targetY = _getTargetY($area[0]);
        });
    }

    /**
     * window节点的scroll和resize的事件处理函数
     * @private
    */
    function _eventHandler() {
        $.each(imgArr, function (i,el){
            if (el !== undefined) {
                var $img = $(el);
                if (_checkBounding($img)) {
                    $img.attr('src',$img.attr(IMG_SRC_DATA));
                    $img.trigger(eventType);
                    $img.unbind(eventType);
                    delete imgArr[i];
                }
            }
        });
        $.each(areaArr, function (i,el){
            if (el !== undefined) {
                var $area = $(el);
                if (_checkBounding($area)) {
                    $area.hide();
                    $area.removeClass(AREA_DATA_CLS);
                    var $div = $("<div></div>");
                    $div.insertBefore($area);
                    $div.html($area.val());
                    delete areaArr[i];
                }
            }
        });

    }
    /**
     * 检查需要懒加载的节点是否进入可视区域
     * @param {jQuery Object} [el]
     * @private
    */
    function _checkBounding($el) {
        //页面滚动条高度
        var scrollY = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0;
        //浏览器可视区域高度
        var seeY = window.innerHeight || document.documentElement.clientHeight;
        if ($el.targetY) {
            var targetY = $el.targetY;
        } else {
            var targetY = _getTargetY($el[0]);
        }

        //当目标节点进入可使区域
        if (Math.abs(targetY - scrollY) < seeY) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取目标节点距离页面顶部高度
     * @param {HTML Element} [el]
     * @private
    */
    function _getTargetY(el) {
        var tp = el.offsetTop;
        if (el.offsetParent) {
            while (el = el.offsetParent) {
                tp += el.offsetTop;
            }
        }
        return tp;
    }

    /**
     * 特定元素即将出现时的回调函数
     * @param {jQuery Obj} [$el]
     * @param {Function} [func]
     * @private
    */
    function _addCallBack($el, func) {
        $el.bind(eventType, function (event) {
            func.call($el,event);
        });
    }
    return {
        init : _init,
        addCallBack : _addCallBack
    };

})(jQuery);
