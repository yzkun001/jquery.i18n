# i18n.js

## 自述

> 基于 jQuery.js 的国际化插件， 使用最少的代码实现国际化

> 本插件默认读取当前 lang 为文件名， 请把文件名与 lang 保持一致

## 例子

### 快速开始

- HTML

```html
<p i18n-text="key"></p>
```

- JavaScript

```javascript
var jqI18n = new $.I18n({
  baseUrl: "./locale/",
});
```

### 可配置项

```javascript
var jqI18n = new $.I18n({
  baseUrl: "./locale/", //语言文件存放基础目录
  baseLang: 'zh-CN', //默认语言
  cache: Boolean, // true / false 是否使用http缓存 默认 ture
  callback: function (lang) { // 当语言改变的时候回调， 接收参数为当前语言
      ...
  }

});
```

### 常用API

- jqI18n.initLang()
> 从localStorage 初始化语言， 默认 baseLang

- jqI18n.changeLocale(lang)
> 从localStorage 手动设置改变语言 接收参数 `lang`

### 不常用API

- jqI18n.cacheLang()
> 更新localStorage, `语言改变会自动更新`

- jqI18n.load()
> 获取语言文件  `语言改变会自动获取`

- jqI18n.changeNodeText()
> 更新 i18n-text  `语言改变会自动更新`

- jqI18n.changeNodePlaceholder()
> 更新 i18n-placeholder  `语言改变会自动更新`
