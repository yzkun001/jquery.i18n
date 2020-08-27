/**
 * I18n.js v1.0.0
 * 基于jQuery.js的国际化插件
 * 
 * Author yanzhenkun
 * 2020-08-27
 * 
 */

(function ($) {
    function I18n(options) {
        /**
         * @param options.lang string 当前语言
         * @param options.baseUrl string 语言文件基础url
         * @param options.callback 语言改变时候的回调函数
         * @param options.cache 是否缓存
         */
        if (!options) {
            options = {}
        }
        if (options.cache === undefined) {
            options.cache = true;
        }
        this.baseLang = options.baseLang || 'zh-CN';
        this.cache = options.cache;
        this.baseUrl = options.baseUrl;
        this.cb = options.callback;
        this.lang = '';
        this.locale = {}
        this.storeKey = {
            lang: 'LANGUAGE'
        }
        this.getStorage = function (name) {
            return localStorage.getItem(name)
        }
        this.setStorage = function (key, val) {
            return localStorage.setItem(key, val)
        }
    }
    I18n.prototype.initLang = function () {
        var lang = this.getStorage(this.storeKey.lang);
        $('html').attr('lang', lang)
        if (lang) {
            this.lang = lang;
        } else {
            this.lang = this.baseLang;
        }
        this.cacheLang()
        this.load()
    }
    I18n.prototype.cacheLang = function () {
        this.setStorage(this.storeKey.lang, this.lang)
    }

    I18n.prototype.load = function () {
        var _this = this;
        var url = this.baseUrl + this.lang + '.json';
        if (!this.cache) {
            url = url + '?t=' + Date.now()
        }
        $.getJSON(url,
            function (data, textStatus, jqXHR) {
                _this.locale = data;
                _this.changeNodeText()
                _this.changeNodePlaceholder()
            }
        );
    }

    I18n.prototype.changeLocale = function (lang) {
        if (lang === this.lang) {
            return;
        }
        $('html').attr('lang', lang)
        this.lang = lang;
        if (this.cb) {
            this.cb(this.lang)
        }
        this.call
        this.load()
        this.cacheLang()
    }

    I18n.prototype.changeNodeText = function () {
        var _this = this;
        $('[i18n-text]').each(function (i, node) {
            var curNode = $(this),
                key = $(this).attr('i18n-text')
            curNode.text(getLevelVal(key, _this.locale))
        })
    }
    I18n.prototype.changeNodePlaceholder = function () {
        var _this = this;
        $('[i18n-placeholder]').each(function (i, node) {
            var curNode = $(this),
                key = $(this).attr('i18n-placeholder')
            curNode.attr('placeholder', getLevelVal(key, _this.locale))
        })
    }

    function getLevelVal(key, obj) {
        var text = obj[key];
        var regexp = /\./g;
        var level = [];
        if (!text) {
            if (regexp.test(key)) {
                level = key.split('.');
                var prevObj = obj;
                for (var i = 0; i < level.length; i++) {
                    var item = level[i];
                    if (prevObj[item]) {
                        var val = prevObj[item];
                        if (typeof val === 'object') {
                            prevObj = val;
                        } else {
                            text = val;
                            break;
                        }
                    }
                }
            } else {
                text = key
            }
        }
        return text;
    }
    $.I18n = I18n;
})($);