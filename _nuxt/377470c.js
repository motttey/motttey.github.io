(window.webpackJsonp=window.webpackJsonp||[]).push([[16,10],{361:function(t,e,n){"use strict";n(8),n(6),n(9),n(10);var r=n(2),o=(n(17),n(7),n(49),n(348),n(45),n(21),n(39),n(44),n(50),n(215),n(1)),c=n(66),l=n(0);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v=["sm","md","lg","xl"],y=v.reduce((function(t,e){return t[e]={type:[Boolean,String,Number],default:!1},t}),{}),O=v.reduce((function(t,e){return t["offset"+Object(l.E)(e)]={type:[String,Number],default:null},t}),{}),j=v.reduce((function(t,e){return t["order"+Object(l.E)(e)]={type:[String,Number],default:null},t}),{}),h={col:Object.keys(y),offset:Object.keys(O),order:Object.keys(j)};function m(t,e,n){var r=t;if(null!=n&&!1!==n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return"col"!==t||""!==n&&!0!==n?(r+="-".concat(n)).toLowerCase():r.toLowerCase()}}var w=new Map;e.a=o.a.extend({name:"v-col",functional:!0,props:d(d(d(d({cols:{type:[Boolean,String,Number],default:!1}},y),{},{offset:{type:[String,Number],default:null}},O),{},{order:{type:[String,Number],default:null}},j),{},{alignSelf:{type:String,default:null,validator:function(t){return["auto","start","end","center","baseline","stretch"].includes(t)}},tag:{type:String,default:"div"}}),render:function(t,e){var n=e.props,data=e.data,o=e.children,l=(e.parent,"");for(var f in n)l+=String(n[f]);var d=w.get(l);return d||function(){var t,e;for(e in d=[],h)h[e].forEach((function(t){var r=n[t],o=m(e,t,r);o&&d.push(o)}));var o=d.some((function(t){return t.startsWith("col-")}));d.push((t={col:!o||!n.cols},Object(r.a)(t,"col-".concat(n.cols),n.cols),Object(r.a)(t,"offset-".concat(n.offset),n.offset),Object(r.a)(t,"order-".concat(n.order),n.order),Object(r.a)(t,"align-self-".concat(n.alignSelf),n.alignSelf),t)),w.set(l,d)}(),t(n.tag,Object(c.a)(data,{class:d}),o)}})},362:function(t,e,n){"use strict";var r=n(2),o=(n(54),n(44),n(7),n(49),n(348),n(45),n(21),n(39),n(8),n(6),n(9),n(10),n(215),n(1)),c=n(66),l=n(0);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v=["sm","md","lg","xl"],y=["start","end","center"];function O(t,e){return v.reduce((function(n,r){return n[t+Object(l.E)(r)]=e(),n}),{})}var j=function(t){return[].concat(y,["baseline","stretch"]).includes(t)},h=O("align",(function(){return{type:String,default:null,validator:j}})),m=function(t){return[].concat(y,["space-between","space-around"]).includes(t)},w=O("justify",(function(){return{type:String,default:null,validator:m}})),S=function(t){return[].concat(y,["space-between","space-around","stretch"]).includes(t)},x=O("alignContent",(function(){return{type:String,default:null,validator:S}})),k={align:Object.keys(h),justify:Object.keys(w),alignContent:Object.keys(x)},P={align:"align",justify:"justify",alignContent:"align-content"};function C(t,e,n){var r=P[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var _=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:d(d(d({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:j}},h),{},{justify:{type:String,default:null,validator:m}},w),{},{alignContent:{type:String,default:null,validator:S}},x),render:function(t,e){var n=e.props,data=e.data,o=e.children,l="";for(var f in n)l+=String(n[f]);var d=_.get(l);return d||function(){var t,e;for(e in d=[],k)k[e].forEach((function(t){var r=n[t],o=C(e,t,r);o&&d.push(o)}));d.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(t,"align-".concat(n.align),n.align),Object(r.a)(t,"justify-".concat(n.justify),n.justify),Object(r.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),_.set(l,d)}(),t(n.tag,Object(c.a)(data,{staticClass:"row",class:d}),o)}})},366:function(t,e,n){"use strict";n(153);var r=n(155);e.a=Object(r.a)("layout")},370:function(t,e,n){"use strict";n(153);var r=n(155);e.a=Object(r.a)("flex")},388:function(t,e,n){"use strict";n.r(e);n(21),n(67),n(68);var r={name:"StoryTable",props:{stories:{type:Array,default:function(){return[]},required:!0}},data:function(){return{search:""}},computed:{headers:function(){return[{text:"タイトル",value:"title"},{text:"あらすじ",value:"abstract"},{text:"巻数",value:"volume"},{text:"ひみつ道具",value:"gadgets"},{text:"タグ",value:"tags"}]}},methods:{filterText:function(t,e,n){return null!=t&&null!=e&&"string"==typeof t&&-1!==t.toString().indexOf(e)}}},o=n(73),c=n(97),l=n.n(c),f=n(398),d=n(446),v=n(439),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.stories.length>0?n("v-data-table",{staticClass:"story-table",attrs:{dense:"",headers:t.headers,items:t.stories,"items-per-page":50,"item-key":"id",search:t.search,"custom-filter":t.filterText,loading:"true","loading-text":"Loading data...","no-data-text":"There is a no data."},scopedSlots:t._u([{key:"top",fn:function(){return[n("v-text-field",{staticClass:"mx-4",attrs:{label:"Search (partial match))"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})]},proxy:!0},{key:"item.tags",fn:function(e){var r=e.item;return t._l(r.tags.split(","),(function(e,r){return n("v-chip",{key:r,attrs:{small:""}},[t._v(" "+t._s(e)+" ")])}))}},{key:"item.gadgets",fn:function(e){var r=e.item;return t._l(r.gadgets.split(","),(function(e,r){return n("v-chip",{key:r,attrs:{small:""}},[t._v(" "+t._s(e)+" ")])}))}}],null,!0)}):t._e()}),[],!1,null,null,null);e.default=component.exports;l()(component,{VChip:f.a,VDataTable:d.a,VTextField:v.a})},448:function(t,e,n){"use strict";n.r(e);var r=n(24),o=(n(82),{name:"Stories",components:{StoryTable:n(388).default},head:function(){return{title:" - Stories"}},data:function(){return{stories:[]}},methods:{getStories:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.$axios.$get("https://script.google.com/macros/s/AKfycbwQRlN8P96hl2b5egMjzMheakvzyPTq0o5fraajbKTcwbZSURwX0OgepkjPuDeBFlTZHg/exec").then((function(e){t.stories=e})).catch((function(t){console.log(t)}));case 1:case"end":return e.stop()}}),e)})))()}},created:function(){this.getStories()}}),c=n(73),l=n(97),f=n.n(l),d=n(361),v=n(341),y=n(370),O=n(366),j=n(362),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{column:"","justify-center":"","align-center":""}},[n("v-flex",{attrs:{xs12:"",sm9:"",md9:""}},[n("v-container",{attrs:{fluid:""}},[n("v-row",[n("h1",[t._v("コミックス概説")])]),t._v(" "),n("v-row",[n("v-col",[n("v-row",[t.stories?n("StoryTable",{attrs:{stories:t.stories}}):t._e()],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;f()(component,{StoryTable:n(388).default}),f()(component,{VCol:d.a,VContainer:v.a,VFlex:y.a,VLayout:O.a,VRow:j.a})}}]);