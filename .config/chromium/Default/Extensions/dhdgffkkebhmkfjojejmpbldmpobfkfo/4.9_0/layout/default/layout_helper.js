Registry.require(["layout"],function(){var b=Registry.get("layout"),f=function(){return{origin:b.images.origin,brand:b.images.brand,get:function(a){return{about:"info-circle blue",bug:"bug",button_ok:"check green",cancel:"times red",check:"badge-check",clock:"clock green",cloud:"cloud",critical:"exclamation-triangle orange",contrib:"heart",db:"database grey",delete:"trash-alt",download:"spinner rotate",edit:"edit",edit_add:"plus-square",editor_cancel:"undo",enabler:"plus",enabler_enabled:"minus",
error:"bell red",exit:"times",filesave:"save",filter:"filter",flag:"flag",encrypted:"lock orange",save_to_disk:"download",help:"question-square",home:"home",import:"upload",info:"info-square",no_script:"info",lock:"cog",menu_cmd:"cogs",no:"minus-circle red",no_domain:"thumbs-down red",question_mark:"question-circle",resources:"cloud cyan",script_add:"plus-square",script_cancel:"industry-alt",script_download:"file-code cyan",script_search:"search",update:"sync",utilities:"cog",web:"globe blue",windowlist:"window-restore grey",
yes_domain:"thumbs-up green"}[a]||""}}}();Registry.register("layout/default/layout_helper","6095",{addStyle:function(a){var c="style.css layout/default/style.css layout/default/dark.css layout/default/darker.css layout/default/vendor/css/fontawesome-pro-core.css layout/default/vendor/css/fontawesome-pro-regular.css".split(" "),d=c.length,b=Array.prototype.slice.call(document.getElementsByTagName("link")).map(function(a){return a.href});c.forEach(function(c){var e=rea.extension.getURL(c);
-1!=b.indexOf(c)||-1!=b.indexOf(e)?0===--d&&a&&a():rea.page.addStyle(e,function(){0===--d&&a&&a()})})},images:f,formatBytes:function(a,c){if(0==a)return"0 Byte";var b=Math.floor(Math.log(a)/Math.log(1E3));return parseFloat((a/Math.pow(1E3,b)).toFixed(c||3))+" "+"Bytes KB MB GB TB PB EB ZB YB".split(" ")[b]}})});
