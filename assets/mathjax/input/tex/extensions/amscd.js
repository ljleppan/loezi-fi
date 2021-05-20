!function(){"use strict";var e,t,a,o={769:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.AmsCdConfiguration=void 0;var o=a(251);a(704),t.AmsCdConfiguration=o.Configuration.create("amscd",{handler:{character:["amscd_special"],macro:["amscd_macros"],environment:["amscd_environment"]},options:{amscd:{colspace:"5pt",rowspace:"5pt",harrowsize:"2.75em",varrowsize:"1.75em",hideHorizontalLabels:!1}}})},704:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var o=a(871),n=a(945),r=a(834);new o.EnvironmentMap("amscd_environment",n.default.environment,{CD:"CD"},r.default),new o.CommandMap("amscd_macros",{minCDarrowwidth:"minCDarrowwidth",minCDarrowheight:"minCDarrowheight"},r.default),new o.MacroMap("amscd_special",{"@":"arrow"},r.default)},834:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var o=a(193),n=a(379),r=a(801),i=a(748),l={CD:function(e,t){e.Push(t);var a=e.itemFactory.create("array"),o=e.configuration.options.amscd;return a.setProperties({minw:e.stack.env.CD_minw||o.harrowsize,minh:e.stack.env.CD_minh||o.varrowsize}),a.arraydef={columnalign:"center",columnspacing:o.colspace,rowspacing:o.rowspace,displaystyle:!0},a},arrow:function(e,t){var a=e.string.charAt(e.i);if(!a.match(/[><VA.|=]/))return n.Other(e,t);e.i++;var c=e.stack.Top();c.isKind("array")&&!c.Size()||(l.cell(e,t),c=e.stack.Top());for(var s,d=c,m=d.table.length%2==1,u=(d.row.length+(m?0:1))%2;u;)l.cell(e,t),u--;var p={minsize:d.getProperty("minw"),stretchy:!0},M={minsize:d.getProperty("minh"),stretchy:!0,symmetric:!0,lspace:0,rspace:0};if("."===a);else if("|"===a)s=e.create("token","mo",M,"\u2225");else if("="===a)s=e.create("token","mo",p,"=");else{var f={">":"\u2192","<":"\u2190",V:"\u2193",A:"\u2191"}[a],h=e.GetUpTo(t+a,a),x=e.GetUpTo(t+a,a);if(">"===a||"<"===a){if(s=e.create("token","mo",p,f),h||(h="\\kern "+d.getProperty("minw")),h||x){var _={width:".67em",lspace:".33em"};if(s=e.create("node","munderover",[s]),h){var b=new o.default(h,e.stack.env,e.configuration).mml(),g=e.create("node","mpadded",[b],_);i.default.setAttribute(g,"voffset",".1em"),i.default.setChild(s,s.over,g)}if(x){var C=new o.default(x,e.stack.env,e.configuration).mml();i.default.setChild(s,s.under,e.create("node","mpadded",[C],_))}e.configuration.options.amscd.hideHorizontalLabels&&(s=e.create("node","mpadded",s,{depth:0,height:".67em"}))}}else{var v=e.create("token","mo",M,f);s=v,(h||x)&&(s=e.create("node","mrow"),h&&i.default.appendChildren(s,[new o.default("\\scriptstyle\\llap{"+h+"}",e.stack.env,e.configuration).mml()]),v.texClass=r.TEXCLASS.ORD,i.default.appendChildren(s,[v]),x&&i.default.appendChildren(s,[new o.default("\\scriptstyle\\rlap{"+x+"}",e.stack.env,e.configuration).mml()]))}}s&&e.Push(s),l.cell(e,t)},cell:function(e,t){var a=e.stack.Top();(a.table||[]).length%2==0&&0===(a.row||[]).length&&e.Push(e.create("node","mpadded",[],{height:"8.5pt",depth:"2pt"})),e.Push(e.itemFactory.create("cell").setProperties({isEntry:!0,name:t}))},minCDarrowwidth:function(e,t){e.stack.env.CD_minw=e.GetDimen(t)},minCDarrowheight:function(e,t){e.stack.env.CD_minh=e.GetDimen(t)}};t.default=l},955:function(e,t){MathJax._.components.global.isObject,t.BO=MathJax._.components.global.combineConfig,MathJax._.components.global.combineDefaults,t.r8=MathJax._.components.global.combineWithMathJax,MathJax._.components.global.MathJax},801:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.TEXCLASS=MathJax._.core.MmlTree.MmlNode.TEXCLASS,t.TEXCLASSNAMES=MathJax._.core.MmlTree.MmlNode.TEXCLASSNAMES,t.indentAttributes=MathJax._.core.MmlTree.MmlNode.indentAttributes,t.AbstractMmlNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlNode,t.AbstractMmlTokenNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlTokenNode,t.AbstractMmlLayoutNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlLayoutNode,t.AbstractMmlBaseNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlBaseNode,t.AbstractMmlEmptyNode=MathJax._.core.MmlTree.MmlNode.AbstractMmlEmptyNode,t.TextNode=MathJax._.core.MmlTree.MmlNode.TextNode,t.XMLNode=MathJax._.core.MmlTree.MmlNode.XMLNode},251:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.Configuration=MathJax._.input.tex.Configuration.Configuration,t.ConfigurationHandler=MathJax._.input.tex.Configuration.ConfigurationHandler,t.ParserConfiguration=MathJax._.input.tex.Configuration.ParserConfiguration},748:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=MathJax._.input.tex.NodeUtil.default},945:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=MathJax._.input.tex.ParseMethods.default},871:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractSymbolMap=MathJax._.input.tex.SymbolMap.AbstractSymbolMap,t.RegExpMap=MathJax._.input.tex.SymbolMap.RegExpMap,t.AbstractParseMap=MathJax._.input.tex.SymbolMap.AbstractParseMap,t.CharacterMap=MathJax._.input.tex.SymbolMap.CharacterMap,t.DelimiterMap=MathJax._.input.tex.SymbolMap.DelimiterMap,t.MacroMap=MathJax._.input.tex.SymbolMap.MacroMap,t.CommandMap=MathJax._.input.tex.SymbolMap.CommandMap,t.EnvironmentMap=MathJax._.input.tex.SymbolMap.EnvironmentMap},193:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=MathJax._.input.tex.TexParser.default},379:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.Other=MathJax._.input.tex.base.BaseConfiguration.Other,t.BaseTags=MathJax._.input.tex.base.BaseConfiguration.BaseTags,t.BaseConfiguration=MathJax._.input.tex.base.BaseConfiguration.BaseConfiguration}},n={};function r(e){var t=n[e];if(void 0!==t)return t.exports;var a=n[e]={exports:{}};return o[e](a,a.exports,r),a.exports}e=r(955),t=r(769),a=r(834),(0,e.r8)({_:{input:{tex:{amscd:{AmsCdConfiguration:t,AmsCdMethods:a}}}}}),function(t,a,o){var n,r,i,l=MathJax.config.tex;if(l&&l.packages){var c=l.packages,s=c.indexOf(t);s>=0&&(c[s]=a),o&&l[t]&&((0,e.BO)(l,(n={},r=a,i=l[t],r in n?Object.defineProperty(n,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[r]=i,n)),delete l[t])}}("amsCd","amscd",!0)}();