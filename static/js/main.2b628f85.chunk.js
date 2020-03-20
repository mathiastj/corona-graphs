(this["webpackJsonpcorona-graphs"]=this["webpackJsonpcorona-graphs"]||[]).push([[0],{190:function(e,t,a){e.exports=a(393)},195:function(e,t,a){},197:function(e,t,a){},393:function(e,t,a){"use strict";a.r(t);var n,r=a(1),l=a.n(r),i=a(20),o=a.n(i),c=(a(195),a(28)),s=a.n(c),u=a(60),d=a(9),h=a(10),m=a(11),f=a(12),p=a(13),b=a(147),y=a(160),g=(a(197),a(148)),v=a.n(g),w=a(16),E=["totalCases","newCases","totalDeaths","newDeaths"],C=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(m.a)(this,Object(f.a)(t).call(this,e))).renderCustomizedLegend=function(e){var t=e.payload;return l.a.createElement("div",{className:"customized-legend",style:{marginBottom:30}},t.map((function(e){var t=e.dataKey,n=e.color,r=e.label,i=a.state.disabled.includes(t),o={marginRight:10,color:i?"#000":"#AAA"};return l.a.createElement("span",{className:"legend-item",onClick:function(){return a.handleClick(t)},style:o},l.a.createElement(w.e,{width:20,height:20},l.a.createElement(w.f,{cx:10,cy:10,type:"circle",size:50,fill:n}),i&&l.a.createElement(w.f,{cx:10,cy:10,type:"circle",size:25,fill:"#FFF"})),l.a.createElement("span",null,r))})))},a.state={disabled:["totalCases","totalDeaths"],chartLines:[{dataKey:"newCases",color:"#ff7300",label:"Daily cases"},{dataKey:"newDeaths",color:"#ffff00",label:"Daily deaths"},{dataKey:"totalCases",color:"#ff00ff",label:"Total cases"},{dataKey:"totalDeaths",color:"#34c3eb",label:"Total Deaths"}],scale:"linear"},a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"handleClick",value:function(e){this.state.disabled.includes(e)?this.setState({disabled:this.state.disabled.filter((function(t){return t!==e}))}):this.setState({disabled:this.state.disabled.concat(e)})}},{key:"handleOptionChange",value:function(e){this.setState({scale:e}),this.forceUpdate()}},{key:"render",value:function(){var e=this,t=this.props.dataPoints;if(!t)return null;var a=t;return l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement("span",{onClick:function(){return e.handleOptionChange("linear")}},l.a.createElement("input",{type:"radio",id:"linear",name:"scale",value:"linear",checked:"linear"===this.state.scale}),l.a.createElement("span",{style:{color:"#AAA"}},"Linear")),l.a.createElement("span",{onClick:function(){return e.handleOptionChange("log")}},l.a.createElement("input",{type:"radio",id:"log",name:"scale",value:"log",checked:"log"===this.state.scale}),l.a.createElement("span",{style:{color:"#AAA"}},"Log"))),l.a.createElement(w.d,{height:800,className:"chart-container"},l.a.createElement(w.c,{width:800,height:800,data:a,margin:{top:25,right:25,left:40,bottom:25}},this.state.chartLines.filter((function(t){return!e.state.disabled.includes(t.dataKey)})).map((function(e){return l.a.createElement(w.b,{connectNulls:!0,name:e.label,type:"monotone",dataKey:e.dataKey,stroke:e.color,yAxisId:0})})),l.a.createElement(w.h,{dataKey:"date",textAnchor:"end",tick:{angle:-70,fontSize:20},height:225,padding:{right:3,left:3}}),l.a.createElement(w.i,{dataKey:E.filter((function(t){return!e.state.disabled.includes(t)}))[0],domain:"log"===this.state.scale?[1,"dataMax"]:[0,"dataMax"],tick:{fontSize:20},width:40,scale:this.state.scale,allowDataOverflow:!0,padding:{top:3,bottom:3}},"/>"),l.a.createElement(w.g,{formatter:function(e,t){return null===e?0:e},filterNull:!1,wrapperStyle:{borderColor:"white",boxShadow:"2px 2px 3px 0px rgb(204, 204, 204)"},contentStyle:{backgroundColor:"rgba(255, 255, 255, 0.8)"},labelStyle:{fontWeight:"bold",color:"#666666"}}),l.a.createElement(w.a,{verticalAlign:"top",height:45,content:this.renderCustomizedLegend,payload:this.state.chartLines}))))}}]),t}(r.Component),k=a(159),O="https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/ecdc/full_data.csv",N={value:"Italy",label:"Italy"},x=N.value,D=[N],j=function(e){if(n)return n;var t={},a=String(e).split("\n"),r=!0,l={},i=!0,o=!1,c=void 0;try{for(var s,u=a[Symbol.iterator]();!(i=(s=u.next()).done);i=!0){var d=s.value;if(r)r=!1;else{var h=d.split(","),m=Object(y.a)(h,6),f=m[0],p=m[1],b=m[2],g=m[3],v=m[4],w=m[5];if(p){if(t[p]||(t[p]=[]),!l[p]){if(0===Number(b)&&0===Number(g)&&0===Number(v)&&0===Number(w))continue;l[p]=!0}t[p].push({date:new Date(f).toISOString().substring(0,10),newCases:0===Number(b)?null:Number(b),newDeaths:0===Number(g)?null:Number(g),totalCases:0===Number(v)?null:Number(v),totalDeaths:0===Number(w)?null:Number(w)})}}}}catch(E){o=!0,c=E}finally{try{i||null==u.return||u.return()}finally{if(o)throw c}}return n=t},S={option:function(e,t){return Object(b.a)({},e,{color:t.isSelected?"orange":"black"})}},A=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"getData",value:function(){var e=Object(u.a)(s.a.mark((function e(t){var a,n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("".concat(O));case 2:a=e.sent,n=j(a.data),r=Object.keys(n).map((function(e){return{value:e,label:e}})),this.setState({dataForCountry:n[t],countries:r,country:t});case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=Object(u.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData(x);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_onChange",value:function(){var e=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData(t.value);case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"App"},l.a.createElement("header",{className:"App-header"},l.a.createElement("div",{style:{width:"40%"}},l.a.createElement(k.a,{options:this.state.countries||D,onChange:function(t){return e._onChange(t)},defaultValue:this.state.country||N,styles:S})),l.a.createElement("div",{style:{width:"98%",height:"80%"}},l.a.createElement(C,{dataPoints:this.state.dataForCountry}))),l.a.createElement("div",{className:"Bottom-right"},"Sources: ECDC via ",l.a.createElement("a",{href:O},"OWID")," under ",l.a.createElement("a",{href:"https://creativecommons.org/licenses/by/4.0/"},"CC BY 4.0")))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[190,1,2]]]);
//# sourceMappingURL=main.2b628f85.chunk.js.map