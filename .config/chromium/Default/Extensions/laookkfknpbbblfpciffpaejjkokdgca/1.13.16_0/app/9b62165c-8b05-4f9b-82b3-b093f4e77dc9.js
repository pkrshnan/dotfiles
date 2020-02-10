var fn_addin=function(g,u,e){var t=t||{};t.styles=t.styles||{},t.commands=t.commands||{},t.dependencies=e||t.dependencies||{},t.styles.style=function(){},t.views=t.views||{},t.collect=t.collect||{},t.models=t.models||{},t.templates=t.templates||{},t.info={addin:"9b62165c-8b05-4f9b-82b3-b093f4e77dc9",dependencies:["settings","bookmarks"],commands:["settings.panels.general"],id:"settings_general"},g.console.log(g.elapsed()+": "+t.info.id+" started"),t.templates=t.templates||{},t.templates.general=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,i,n){return'<header class="settings-header">\n\t<h3 data-test="general-header">General</h3>\n\t<p class="description">Customize your dashboard</p>\n</header>\n\n\n<h4>Show</h4>\n<ul id="apps-list" class="settings-list options-list"></ul>\n\n\n<h4>Customize</h4>\n<ul id="customize-list" class="settings-list options-list"></ul>\n\n\n<h4>Options</h4>\n<ul id="misc-list" class="settings-list options-list"></ul>\n\n\n<h5>Tip</h5>\n<p class="tip no-top-margin">Many items in Momentum can be edited by double-clicking on them, including <strong>your name</strong> and your <strong>to-dos</strong>.\n'},useData:!0});var i=t.dependencies.settings;return t.views.General=i.views.SettingsPanel.extend({attributes:{id:"settings-general",class:"settings-view settings-general","data-test":"settings-general"},template:t.templates.general,panelid:"general",events:{"click .slide-toggle":"toggleSlider","dblclick .slide-toggle":"eatDblClick","click .config-button":"configWidget","click .sync-option":"toggleSyncSlider","click .balanced-message":"switchToBalanceSettings","click .toggle-option":"toggleOption","click .nicknames-config":"nicknamesConfigClicked",webkitAnimationEnd:"onAnimationEnd"},initialize:function(){this.model=g.models.customization,this.initializeCustomizeItems(),this.listenTo(this.model,"change",this.customizationModelChanged)},initializeCustomizeItems:function(){var e=g.models.themeManager.getAvailableFonts();this.customizeItems=[{name:"Theme",dataId:"settings-general-theme",field:"themeColour",widget:"themeColour",options:[{label:"Dark",value:"dark"},{label:"Light",value:"light"},{label:"Custom",value:"custom",view_cmd:"settings.color.picker",view_opt:{settingName:"themeColour",ignoreClick:!0},show_always:!0}],default:"dark",plusOnly:!0,requiredFeature:"plus",section:"customize"},{name:"Font",dataId:"settings-general-font",field:"themeFont",widget:"themeFont",options:e,default:"default",plusOnly:!0,requiredFeature:"plus",section:"customize"},{name:"Links",dataId:"settings-general-links",widget:"linksVisible",field:"linksVisible",section:"widgets"},{name:"Bookmarks Bar",dataId:"settings-general-bookmarks-bar",widget:"bookmarksVisible",field:"bookmarksVisible",section:"widgets"},{name:"Search",dataId:"settings-general-search",widget:"searchVisible",field:"searchVisible",section:"widgets"},{name:"Weather",dataId:"settings-general-weather",widget:"weatherVisible",field:"weatherVisible",section:"widgets"},{name:"Focus",dataId:"settings-general-focus",widget:"focusVisible",field:"focusVisible",section:"widgets"},{name:"Todo",dataId:"settings-general-todo",widget:"todoVisible",field:"todoVisible",section:"widgets"},{name:"Quotes",dataId:"settings-general-quote",widget:"quoteVisible",field:"quoteVisible",section:"widgets"},{name:"Mantras",dataId:"settings-general-mantras",widget:"mantraVisible",field:"mantraVisible",message:"Simple phrases to build positive mental habits",section:"widgets",beta:!1},{name:"Countdowns",dataId:"settings-general-countdown",widget:"countdownVisible",field:"countdownVisible",plusOnly:!0,requiredFeature:"countdown",message:"Count down to important dates and deadlines",section:"widgets"},{name:"Metrics",dataId:"settings-general-metric",widget:"metricVisible",field:"metricVisible",plusOnly:!0,requiredFeature:"plus",message:"Keep your important metrics at a glance",section:"widgets"},{name:"Notes",dataId:"settings-general-notes",widget:"notesVisible",field:"notesVisible",plusOnly:!0,requiredFeature:"notes",message:"Take quick notes and store wisdom to review",section:"widgets"},{name:"World Clocks",dataId:"settings-general-world-clocks",widget:"multiClockVisible",field:"multiClockVisible",plusOnly:!0,requiredFeature:"plus",message:"Keep track of time anywhere on Earth",section:"widgets",beta:!1},{name:"Clock Format",field:"hour12clock",widget:"clock-format",boolean:!0,options:[{label:"12 hour",value:!0},{label:"24 hour",value:!1}],section:"misc"},{name:"Percent Clock",widget:"percentClock",field:"percentClock",message:"Visualize your progression through the work day",section:"misc",configLabel:"Customize",configCommand:"settings.display",configOptions:{section:"balance",scheduleVisible:!0}},{name:"Search Provider",field:"searchProvider",widget:"search-provider",options:[{label:"Google",value:"google"},{label:"Bing",value:"bing"},{label:"DuckDuckGo",value:"duckduckgo"}],section:"misc"}]},render:function(){g.models.customization.get("displayname"),localStorage.email;var e=g.isLoggedIn();this.$el.html(this.template({loggedIn:e})),this.$popBody=this.$(".pop-body");var t={customize:this.$el.find("#customize-list"),widgets:this.$el.find("#apps-list"),misc:this.$el.find("#misc-list")};return _.each(t,function(e){e.empty()}),_.each(this.customizeItems,function(e){e.hidden||(e.options?t[e.section].append(i.templates["general-toggle-options"](e)):t[e.section].append(i.templates["general-toggle-slider"](e)))}),this.updateControlStates(_.pluck(this.customizeItems,"field")),this},onAnimationEnd:function(e){removePulseClass(e)},customizationModelChanged:function(e){if(e){var t=e.changedAttributes(),i=_.keys(t);this.updateControlStates(i)}},updateControlStates:function(e){var r=this;g.conditionalFeatures.featureEnabled("plus");_.each(e,function(e){var i=_.findWhere(r.customizeItems,{field:e});if(i){var n=r.model.get(e);if(i.options){i.plusOnly&&!r.featureAvailable(i.requiredFeature)&&(n=i.default),r.$el.find("."+i.widget).removeClass("active");var s=r.$el.find("."+i.widget+"[data-option-value='"+n+"']").first();s.addClass("active"),_.each(i.options,function(e){if(e.view_cmd){var t=(s=r.$el.find("."+i.widget+"[data-option-value='"+e.value+"']").first()).find(".sub-view").first();if(!e.view&&e.show_always&&(e.view=g.commandManager.execute(e.view_cmd,e.value,e.view_opt)),0==t.children().length&&(t.html(e.view.render().$el),t.css("display","inline-block")),e.value!=n)return e.show_always||t.hide(),e.view&&e.view.dismiss&&e.view.dismiss(),void(e.view&&e.view.setInactive&&e.view.setInactive());e.view&&e.view.setActive&&e.view.setActive()}})}else{var t=r.model.getComputedSetting(e);n=!(i.plusOnly&&!r.featureAvailable(i.requiredFeature))&&!!n;var a=r.$el.find("[data-related-widget='"+i.widget+"']");if(a&&1===a.length){var o=a.first();if(o.toggleClass("on",n),n!==t){var l=r.model.overrides[e];l===r.model.settingOverriders.TEAM?(o.toggleClass("on",t),o.append('<span class="option-message"> &nbsp; &nbsp;Currently managed by team</span>'),o.addClass("balanced")):l===r.model.settingOverriders.BALANCE&&(o.append('<span class="option-message balanced-message"> &nbsp; &nbsp;Currently hidden by Balance mode (Customize here)</span>'),o.addClass("balanced"))}}}}})},setOption:function(e){var t=e.attr("data-related-widget"),i=e.attr("data-option-value"),n=_.findWhere(this.customizeItems,{widget:t});if(!n)return null;if(n.plusOnly&&!this.featureAvailable(n.requiredFeature)){var s={targetRegion:"settings",sourceEvent:t,buttonText:"Learn more",title:"Custom Themes",description:"Make Momentum your own"};return g.commandManager.execute("upsell.message",s)}this.$el.find("."+t).removeClass("active"),e.addClass("active");var a={};return n.boolean?a[n.field]=JSON.parse(i):a[n.field]=i,this.model.save(a),n},toggleOption:function(e){var t=u(e.currentTarget),i=u(e.currentTarget).attr("data-option-value"),n=this.setOption(t);if(!0!==n){if(n){var s=_.findWhere(n.options,{value:i});if(s&&s.view&&s.view.handleClick){if(0<u(e.target).closest(".sub-view").length&&s.view.ignoreClickEvent&&s.view.ignoreClickEvent(e.target))return;if(s.view.handleClick(e,!0),s.view.scrollIntoViewElement){var a=s.view.scrollIntoViewElement();a&&this.scrollIntoView(a)}}}g.trigger("globalEvent:settingsclick",e)}else e.stopPropagation()},scrollIntoView:function(e){var t=u(e),i=t.closest(".settings-view-container"),n=t.offset().top,s=i.offset().top;n-s-12<0&&i.animate({scrollTop:i[0].scrollTop+n-s-12})},configWidget:function(e){e.stopPropagation();var t=u(e.currentTarget).closest(".slide-toggle").attr("data-related-widget");if(t){var i=_.findWhere(this.customizeItems,{widget:t});g.commandManager.execute(i.configCommand,null,i.configOptions)}},featureAvailable:function(e){return g.conditionalFeatures.featureEnabled(e)||g.conditionalFeatures.featureEnabled(e+"-degraded")},toggleSlider:function(e){if(!this.eatClicks){this.eatClicks=!0;var t,i=this;setTimeout(function(){i.eatClicks=!1},250);var n=u(".cp-color-picker");if(!(u(e.target).attr("data-option-value")||0<n.length&&u.contains(n[0],e.target)||u(e.currentTarget).hasClass("balanced"))){var s=u(e.currentTarget).attr("data-related-widget");if("bookmarksVisible"!=s){if(s){var a,o=_.findWhere(this.customizeItems,{widget:s}),l=this.model.get(o.field);if(o.options){for(t=0;t<o.options.length;t++)if(o.options[t].value==l){t==o.options.length-1&&(t=-1),a=o.options[t+1].value;break}var r=u(e.currentTarget).find("."+o.widget+"[data-option-value='"+a+"']").first();this.setOption(r)&&e.stopPropagation()}else{if("mantraVisible"===s&&!g.models.mantraSettings.get("firstMantraActivated"))return void g.commandManager.executeAsync("settings.display",null,{section:"mantra-settings"});var d;if(a=!this.model.get(s),o.plusOnly&&!this.featureAvailable(o.requiredFeature))return"Countdowns"===o.name?d={targetRegion:"settings",sourceEvent:s,buttonText:"Learn more",title:"Countdown",description:"Track your upcoming milestones"}:"Metrics"===o.name?d={targetRegion:"settings",sourceEvent:s,buttonText:"Learn more",title:"Metrics",description:"Keep your important metrics at a glance"}:"Notes"===o.name?d={targetRegion:"settings",sourceEvent:s,buttonText:"Learn more",title:"Notes",description:"Take longer form notes"}:"World Clocks"===o.name&&(d={targetRegion:"settings",sourceEvent:s,buttonText:"Learn more",title:"World Clocks",description:"Keep tabs on time anywhere on earth"}),void(g.commandManager.execute("upsell.message",d)&&e.stopPropagation());var c={};c[s]=a,this.model.save(c)}}g.trigger("globalEvent:settingsclick",e)}else this.enableBookmarks(e)}}},nicknamesConfigClicked:function(e){e.stopPropagation(),g.conditionalFeatures.featureEnabled("plus")?g.commandManager.execute("settings.display",null,{section:"nickname-settings"}):(options={targetRegion:"settings",sourceEvent:"nicknames",buttonText:"Learn more",title:"Nicknames",description:"Add your own nicknames and customize the default ones"},g.commandManager.execute("upsell.message",options))},loginClicked:function(e){e.preventDefault(),e.stopPropagation(),g.sendEvent("Settings","Login","Clicked"),g.commandManager.execute("settings.hide"),g.commandManager.execute("account.login")},logoutClicked:function(e){e.preventDefault(),e.stopPropagation(),u(".action-logout").addClass("action-logout-disabled").text("Logging out..."),g.sendEvent("Settings","Logout","Clicked"),g.commandManager.execute("logout")},accountClicked:function(e){e.preventDefault(),e.stopPropagation(),u(e.currentTarget).html("Launching..."),u.ajax({type:"POST",beforeSend:setMomentumAuthHeader,data:JSON.stringify({medium:"account"}),url:g.globals.urlRootApi+"login/onetime"}).done(function(e){e&&e.otp&&e.email&&(window.location.href="http://localdev:8995/onetime?email="+encodeURIComponent(e.email)+"&otp="+encodeURIComponent(e.otp))}).fail(function(e,t){}).always(function(){})},panelClosing:function(){_.each(this.customizeItems,function(e){_.each(e.options,function(e){e.view_cmd&&e.view&&e.view.close&&e.view.close()})})},switchToBalanceSettings:function(e){e&&(e.stopPropagation(),e.preventDefault()),g.commandManager.execute("settings.display",null,{section:"balance",showAdvanced:!0})},enableBookmarks:function(e){e&&(e.stopPropagation(),e.preventDefault()),g.commandManager.executeAsync("settings.enableBookmarks",{callback:function(){u(e.currentTarget).toggleClass("on",g.models.customization.get("bookmarksVisible"))}})}}),t.commands.SettingsPanelGeneral=g.models.Command.extend({defaults:{id:"settings.panels.general"},execute:function(){return t.styleLoaded||(t.styleLoaded=!0,t.styles.style()),new t.views.General}}),t};m.addinManager&&m.addinManager.registerAddinFn("9b62165c-8b05-4f9b-82b3-b093f4e77dc9",fn_addin);