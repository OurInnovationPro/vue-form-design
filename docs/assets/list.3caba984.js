var k=Object.defineProperty,C=Object.defineProperties;var v=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var _=(e,t,l)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[t]=l,u=(e,t)=>{for(var l in t||(t={}))x.call(t,l)&&_(e,l,t[l]);if(p)for(var l of p(t))y.call(t,l)&&_(e,l,t[l]);return e},b=(e,t)=>C(e,v(t));import{S as w,$ as D,i as L,p as g,q,r as m,o as R,y as V,a as o,w as s,h as $,v as i}from"./vendor.df12524c.js";import{_ as U}from"./index.2f3756f1.js";const B={name:"list",props:{},components:{},setup(){w(),D();const e=L(),t=g({tableData:{config:{},columns:[{label:"\u52FE\u9009",prop:"__selection",type:"selection"},{label:"\u5E8F\u53F7",prop:"__index",type:"index"},{prop:"name",label:"\u7528\u6237\u540D"},{prop:"tel",label:"\u624B\u673A\u53F7"},{prop:"sex",label:"\u6027\u522B"},{label:"\u64CD\u4F5C",prop:"__control"}]},searchData:{list:[{name:"name",type:"input",control:{modelValue:""},slot:{},config:{},item:{label:"\u7528\u6237\u540D",showLabel:!1},rules:[],customRules:[]},{name:"tel",type:"input",control:{modelValue:""},slot:{},config:{},item:{label:"\u624B\u673A\u53F7",showLabel:!1},rules:[],customRules:[]}],config:{labelWidth:"",class:"",size:"",name:"form1636711196545",rulesComm:[]}},requestUrl:"",tableList:[{name:"\u5F20\u4E8C",tel:"13800138000",sex:"\u7537"},{name:"\u674E\u4E94",tel:"13800138000",sex:"\u5973"}]}),l=()=>{e.value.searchClick()},a=(d,f)=>{};return b(u({},q(t)),{onSubmit:l,tableListEl:e,btnClick:a})}},E={class:"form-list-page"},N=$("h3",null,"\u5217\u8868\u6570\u636E",-1),S=i("\u67E5\u770B"),z=i("\u7F16\u8F91"),T=i("\u5220\u9664");function W(e,t,l,a,d,f){const n=m("el-button"),h=m("ak-table-list");return R(),V("div",E,[N,o(h,{ref:"tableListEl",searchData:e.searchData,tableData:e.tableData,tableList:e.tableList,requestUrl:e.requestUrl},{__control:s(r=>[o(n,{type:"text",onClick:c=>a.btnClick(r.row.id,"show")},{default:s(()=>[S]),_:2},1032,["onClick"]),o(n,{type:"text",onClick:c=>a.btnClick(r.row.id,"edit")},{default:s(()=>[z]),_:2},1032,["onClick"]),o(n,{type:"text",onClick:c=>a.btnClick(r.row.id,"del")},{default:s(()=>[T]),_:2},1032,["onClick"])]),_:1},8,["searchData","tableData","tableList","requestUrl"])])}var G=U(B,[["render",W]]);export{G as default};
