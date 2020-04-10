(this["webpackJsonpcorona-graphs"]=this["webpackJsonpcorona-graphs"]||[]).push([[0],{191:function(e,t,a){e.exports=a(394)},196:function(e,t,a){},198:function(e,t,a){},394:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(20),o=a.n(c),l=(a(196),a(28)),i=a.n(l),s=a(62),u=a(9),h=a(10),p=a(11),d=a(12),f=a(13),v=a(88),b=a(3),m=a(40),y=(a(198),a(89)),C=a.n(y),w=a(45),g=a(17),k=["#426600","#FF0010","#990000","#E0FF66","#FFFF80","#F0A3FF","#993F00","#005C31","#2BCE48","#FFCC99","#808080","#94FFB5","#8F7C00","#FFA405","#5EF1F2","#9DCC00","#FFFFFF","#C20088","#FFA8BB","#0075DC","#00998F","#740AFF","#FFFF00","#FF5005"],D=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).renderCustomizedLegend=function(e){var t=e.payload,n="",c=null;return r.a.createElement("div",{className:"customized-legend",style:{marginBottom:40}},t.map((function(e){n!==e.country?(n=e.country,c=r.a.createElement("span",{className:"Legend-country"},r.a.createElement("br",null),e.country,r.a.createElement("br",null))):c=null;var t=e.dataKey,o=e.color,l=e.label,i=a.state.disabled.includes(t);return r.a.createElement("span",null,c,r.a.createElement("span",{onClick:function(){return a.handleClick(t)},style:{marginRight:10,color:"#AAA"}},r.a.createElement(g.e,{width:20,height:20,style:{marginBottom:-5}},r.a.createElement(g.f,{cx:10,cy:10,type:"circle",size:50,fill:o})),r.a.createElement("input",{type:"checkbox",checked:!i}),r.a.createElement("span",{className:"Legend-per-country"},l)))})))},a.getMaxNonDisabled=function(){var e=!0,t=!1,n=void 0;try{for(var r,c=a.state.yLabelPrioritizedKeys[Symbol.iterator]();!(e=(r=c.next()).done);e=!0){var o=r.value;if(a.state.perCapita){if(!o.includes("PerCapita"))continue}else if(o.includes("PerCapita"))continue;var l=!1,i=!0,s=!1,u=void 0;try{for(var h,p=a.state.disabled[Symbol.iterator]();!(i=(h=p.next()).done);i=!0){var d=h.value;if(o.includes(d)){l=!0;break}}}catch(f){s=!0,u=f}finally{try{i||null==p.return||p.return()}finally{if(s)throw u}}if(!l)return o}}catch(f){t=!0,n=f}finally{try{e||null==c.return||c.return()}finally{if(t)throw n}}return""},a.state={scale:"linear",perCapita:!1},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"handleClick",value:function(e){this.state.disabled.includes(e)?this.setState({disabled:this.state.disabled.filter((function(t){return t!==e}))}):this.setState({disabled:this.state.disabled.concat(e)})}},{key:"handleOptionChange",value:function(e){this.setState({scale:e}),this.forceUpdate()}},{key:"handlePerCapitaChange",value:function(e){this.setState({perCapita:e}),this.forceUpdate()}},{key:"render",value:function(){var e=this,t=this.props.dataPoints;if(!t)return null;var a=t,n=this.state.perCapita?"PerCapita":"",c=this.getMaxNonDisabled();return r.a.createElement("div",null,r.a.createElement("div",{style:{width:"85%",display:"inline-block"}},r.a.createElement("span",{style:{float:"left","margin-left":"1rem"}},r.a.createElement("span",{onClick:function(){return e.handleOptionChange("linear")}},r.a.createElement("input",{type:"radio",id:"linear",name:"scale",value:"linear",checked:"linear"===this.state.scale}),r.a.createElement("span",{style:{color:"#AAA"}},"Linear")),r.a.createElement("span",{onClick:function(){return e.handleOptionChange("log")}},r.a.createElement("input",{type:"radio",id:"log",name:"scale",value:"log",checked:"log"===this.state.scale}),r.a.createElement("span",{style:{color:"#AAA"}},"Log"))),r.a.createElement("span",{style:{float:"right","margin-right":"1rem"},onClick:function(){return e.handlePerCapitaChange(!e.state.perCapita)}},r.a.createElement("input",{type:"checkbox",id:"perCapita",name:"perCapita",checked:this.state.perCapita}),r.a.createElement("span",{style:{color:"#AAA"}},"Per Million Capita"))),r.a.createElement(g.d,{height:800,className:"chart-container"},r.a.createElement(g.c,{width:800,height:800,data:a,margin:{top:25,right:25,left:40,bottom:25}},this.state.chartLines.filter((function(t){return!e.state.disabled.includes(t.dataKey)})).map((function(e){return r.a.createElement(g.b,{connectNulls:!0,name:"".concat(e.country," ").concat(e.label.toLowerCase()),type:"monotone",dataKey:"".concat(e.dataKey).concat(n),stroke:e.color,yAxisId:0,dot:{r:2}})})),r.a.createElement(g.h,{dataKey:"date",textAnchor:"end",tick:{angle:-70,fontSize:20},height:225,padding:{right:3,left:3}}),r.a.createElement(g.i,{dataKey:c,domain:"log"===this.state.scale?[1,"dataMax"]:[0,"dataMax"],tick:{fontSize:20},width:40,scale:this.state.scale,allowDataOverflow:!0,padding:{top:3,bottom:3}},"/>"),r.a.createElement(g.g,{formatter:function(t,a){return[null===t?0:t,"".concat(a," ").concat(e.state.perCapita?"per million capita":"")]},itemSorter:function(e){return-e.value},filterNull:!1,wrapperStyle:{borderColor:"white",boxShadow:"2px 2px 3px 0px rgb(204, 204, 204)"},contentStyle:{backgroundColor:"rgba(255, 255, 255, 0.8)"},labelStyle:{fontWeight:"bold",color:"#666666"}}),r.a.createElement(g.a,{wrapperStyle:{top:550},align:"center",height:100,content:this.renderCustomizedLegend,payload:this.state.chartLines}))))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var a,n,r=e.dataPoints,c=e.countries;if(!r||t.prevCountries===c)return null;if(t.prevCountries){for(var o=new Set(t.prevCountries),l=new Set(c),i=(a=o,n=l,new Set(Object(w.a)(a).filter((function(e){return!n.has(e)})))),s=t.chartLines.length-1;s>=0;s--)i.has(t.chartLines[s].country)&&(k.push(t.chartLines[s].color),t.chartLines.splice(t.chartLines.indexOf(t.chartLines[s]),1));for(var u=t.disabled.length-1;u>=0;u--){var h=!1,p=!0,d=!1,f=void 0;try{for(var v,b=i[Symbol.iterator]();!(p=(v=b.next()).done);p=!0){var m=v.value;t.disabled[u].includes(m)&&(h=!0)}}catch(j){d=!0,f=j}finally{try{p||null==b.return||b.return()}finally{if(d)throw f}}h&&t.disabled.splice(t.disabled.indexOf(t.disabled[u]),1)}}var y=t.chartLines||[],C=t.disabled||[],g=!0,D=!1,E=void 0;try{for(var x,O=c[Symbol.iterator]();!(g=(x=O.next()).done);g=!0){var F=x.value;(!t.prevCountries||t.prevCountries&&!t.prevCountries.includes(F))&&(y.push({country:F,dataKey:"newCases".concat(F),color:k.pop(),label:"New cases"}),y.push({country:F,dataKey:"newDeaths".concat(F),color:k.pop(),label:"New deaths"}),y.push({country:F,dataKey:"totalCases".concat(F),color:k.pop(),label:"Total cases"}),y.push({country:F,dataKey:"totalDeaths".concat(F),color:k.pop(),label:"Total deaths"}),C.push("totalCases".concat(F)),C.push("totalDeaths".concat(F)))}}catch(j){D=!0,E=j}finally{try{g||null==O.return||O.return()}finally{if(D)throw E}}var S=function(e,t){var a={},n=!0,r=!1,c=void 0;try{for(var o,l=t[Symbol.iterator]();!(n=(o=l.next()).done);n=!0){var i=o.value;a["newCases".concat(i)]=0,a["totalCases".concat(i)]=0,a["totalDeaths".concat(i)]=0,a["newDeaths".concat(i)]=0,a["newCases".concat(i,"PerCapita")]=0,a["totalCases".concat(i,"PerCapita")]=0,a["totalDeaths".concat(i,"PerCapita")]=0,a["newDeaths".concat(i,"PerCapita")]=0;var s=!0,u=!1,h=void 0;try{for(var p,d=e[Symbol.iterator]();!(s=(p=d.next()).done);s=!0){var f=p.value;f["newCases".concat(i)]>a["newCases".concat(i)]&&(a["newCases".concat(i)]=f["newCases".concat(i)],a["newCases".concat(i,"PerCapita")]=f["newCases".concat(i,"PerCapita")]),f["totalCases".concat(i)]>a["totalCases".concat(i)]&&(a["totalCases".concat(i)]=f["totalCases".concat(i)],a["totalCases".concat(i,"PerCapita")]=f["totalCases".concat(i,"PerCapita")]),f["totalDeaths".concat(i)]>a["totalDeaths".concat(i)]&&(a["totalDeaths".concat(i)]=f["totalDeaths".concat(i)],a["totalDeaths".concat(i,"PerCapita")]=f["totalDeaths".concat(i,"PerCapita")]),f["newDeaths".concat(i)]>a["newDeaths".concat(i)]&&(a["newDeaths".concat(i)]=f["newDeaths".concat(i)],a["newDeaths".concat(i,"PerCapita")]=f["newDeaths".concat(i,"PerCapita")])}}catch(j){u=!0,h=j}finally{try{s||null==d.return||d.return()}finally{if(u)throw h}}}}catch(j){r=!0,c=j}finally{try{n||null==l.return||l.return()}finally{if(r)throw c}}return Object.keys(a).map((function(e){return{key:e,value:a[e]}})).sort((function(e,t){return t.value-e.value})).map((function(e){return e.key}))}(r,c);return{chartLines:y,disabled:C,prevCountries:c,yLabelPrioritizedKeys:S}}}]),t}(n.Component),E=function(e){return 0===Number(e)?null:Number(e)},x=a(161),O=[{value:"Italy",label:"Italy"},{value:"Spain",label:"Spain"}],F=function(e,t){var a={},n={},r=String(e).split("\n"),c=String(t).split("\n"),o={};c.splice(1,c.length).forEach((function(e,t,a){var n=e.split(","),r=Object(m.a)(n,5),c=r[1],l=r[4];o[c]=l}));var l=!0,i={},s=!0,u=!1,h=void 0;try{for(var p,d=r[Symbol.iterator]();!(s=(p=d.next()).done);s=!0){var f=p.value;if(l)l=!1;else{var y=f.split(","),C=Object(m.a)(y,6),w=C[0],g=C[1],k=C[2],D=C[3],x=C[4],O=C[5];if(g){var F=o[g];if(n[g]=!0,!i[g]){if(0===Number(k)&&0===Number(D)&&0===Number(x)&&0===Number(O))continue;i[g]=!0}var S=new Date(w).toISOString().substring(0,10);if(a[S]){var j,P=a[S];a[S]=Object(v.a)((j={},Object(b.a)(j,"newCases".concat(g),E(k)),Object(b.a)(j,"newDeaths".concat(g),E(D)),Object(b.a)(j,"totalCases".concat(g),E(x)),Object(b.a)(j,"totalDeaths".concat(g),E(O)),Object(b.a)(j,"popData".concat(g),E(F)),j),P)}else{var N;a[S]=(N={date:S},Object(b.a)(N,"newCases".concat(g),E(k)),Object(b.a)(N,"newDeaths".concat(g),E(D)),Object(b.a)(N,"totalCases".concat(g),E(x)),Object(b.a)(N,"totalDeaths".concat(g),E(O)),Object(b.a)(N,"popData".concat(g),E(F)),N)}}}}}catch(A){u=!0,h=A}finally{try{s||null==d.return||d.return()}finally{if(u)throw h}}return[Object.values(a).sort((function(e,t){return e.date.localeCompare(t.date)})),Object.keys(n)]},S={option:function(e,t){return Object(v.a)({},e,{color:t.isSelected?"orange":"black"})}},j=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={selectableCountries:O,currentCountries:O},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"getData",value:function(){var e=Object(s.a)(i.a.mark((function e(t){var a,n,r,c,o,l,s,u,h,p,d,f,v,b,y,C,w,g,k;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=3;break}return this.setState({currentCountries:[],multiCountryData:null}),e.abrupt("return");case 3:if(a=this.state.newParsedData,n=[],!t){e.next=64;break}r=!1,c=0,o=Object.values(a);case 8:if(!(c<o.length)){e.next=64;break}l=o[c],s=!0,u=!1,h=void 0,e.prev=13,p=t[Symbol.iterator]();case 15:if(s=(d=p.next()).done){e.next=23;break}if(f=d.value,!l["newCases".concat(f.value)]){e.next=20;break}return r=!0,e.abrupt("break",23);case 20:s=!0,e.next=15;break;case 23:e.next=29;break;case 25:e.prev=25,e.t0=e.catch(13),u=!0,h=e.t0;case 29:e.prev=29,e.prev=30,s||null==p.return||p.return();case 32:if(e.prev=32,!u){e.next=35;break}throw h;case 35:return e.finish(32);case 36:return e.finish(29);case 37:if(!r){e.next=61;break}for(v={},b=!0,y=!1,C=void 0,e.prev=42,w=function(){var e=k.value,t=l["newCases".concat(e.value)]||null,a=l["newDeaths".concat(e.value)]||null,n=l["totalCases".concat(e.value)]||null,r=l["totalDeaths".concat(e.value)]||null;v["newCases".concat(e.value)]=t,v["newDeaths".concat(e.value)]=a,v["totalCases".concat(e.value)]=n,v["totalDeaths".concat(e.value)]=r;var c=l["popData".concat(e.value)]||null,o=[t,a,n,r].map((function(e){return Number(Number(e/c*1e6).toFixed(2))})),i=Object(m.a)(o,4),s=i[0],u=i[1],h=i[2],p=i[3];v["newCases".concat(e.value,"PerCapita")]=s,v["newDeaths".concat(e.value,"PerCapita")]=u,v["totalCases".concat(e.value,"PerCapita")]=h,v["totalDeaths".concat(e.value,"PerCapita")]=p},g=t[Symbol.iterator]();!(b=(k=g.next()).done);b=!0)w();e.next=51;break;case 47:e.prev=47,e.t1=e.catch(42),y=!0,C=e.t1;case 51:e.prev=51,e.prev=52,b||null==g.return||g.return();case 54:if(e.prev=54,!y){e.next=57;break}throw C;case 57:return e.finish(54);case 58:return e.finish(51);case 59:v.date=l.date,n.push(v);case 61:c++,e.next=8;break;case 64:this.setState({currentCountries:t,multiCountryData:n});case 65:case"end":return e.stop()}}),e,this,[[13,25,29,37],[30,,32,36],[42,47,51,59],[52,,54,58]])})));return function(t){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=Object(s.a)(i.a.mark((function e(){var t,a,n,r,c,o,l,s,u;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([C.a.get("".concat("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/ecdc/full_data.csv")),C.a.get("".concat("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/ecdc/locations.csv"))]);case 2:return t=e.sent,a=Object(m.a)(t,2),n=a[0],r=a[1],c=F(n.data,r.data),o=Object(m.a)(c,2),l=o[0],s=o[1],u=s.map((function(e){return{value:e,label:e}})),this.setState({selectableCountries:u,newParsedData:l}),e.next=11,this.getData(O);case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_onChange",value:function(){var e=Object(s.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData(t);case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state,a=t.selectableCountries,n=t.currentCountries,c=t.multiCountryData;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"Top-left"},"Source code on: ",r.a.createElement("a",{href:"https://github.com/mathiastj/corona-graphs"},"GitHub")),r.a.createElement("div",{className:"Top-right"},"Sources: ECDC via ",r.a.createElement("a",{href:"https://github.com/owid/covid-19-data"},"OWID")," under ",r.a.createElement("a",{href:"https://creativecommons.org/licenses/by/4.0/"},"CC BY 4.0")),r.a.createElement("header",{className:"App-header"},r.a.createElement("div",{style:{width:"80%"}},r.a.createElement(x.a,{isMulti:!0,options:a,onChange:function(t){return e._onChange(t)},defaultValue:O,styles:S,value:n})),r.a.createElement("div",{style:{width:"95%",height:"90%"}},r.a.createElement(D,{dataPoints:c,countries:n.map((function(e){return e.value}))}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[191,1,2]]]);
//# sourceMappingURL=main.6eba33af.chunk.js.map