var baseURL, currURL, options, configs, themeConfigs, themeParentConfigs;

var initReady = false;

/**
 * Inject css
 * @param url Css text if type = 'text'; otherwise href url
 * @param tag Inject to target tag
 * @param type 'text' or others, optional
 */
function injectCSS(url, tag, type) {

    var style;

    if (type === 'text') {

        style = $('<style/>');

        style.text(url);

    } else {

        style = $('<link/>', {
            'rel': 'stylesheet',
            'type': 'text/css',
            'href': url
        });

    }

    $(tag).append(style);

}

function injectCSSnative(url, tag, type, callback, id) {

    var style;

    if (type == 'text') {
        style = document.createElement('style');
        style.textContent = url;
    } else {
        style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = url;
    }
    if (typeof id === typeof undefined) {
        id = 'azure-style-' + Math.random() * 100000;
    }
    style.id = id;

    var tags = document.getElementsByTagName(tag);

    if (tags.length > 0) {
        tags[0].appendChild(style);
    } else {
        document.documentElement.appendChild(style);
    }

    if (typeof callback === 'function')
        callback();

    return id;
}

/**
 * Inject css
 * @param url JS text if type = 'text'; otherwise src url
 * @param tag Inject to target tag
 * @param type 'text' or others, optional
 * @param callback
 */
function injectJS(url, tag, type, callback) {

    var script = document.createElement('script');
    script.type = 'text/javascript';

    if (type == 'text') {
        script.textContent = url;
    } else {
        script.src = url;
    }

    var tags = document.getElementsByTagName(tag);

    if (tags.length > 0) {
        tags[0].appendChild(script);
    } else {
        document.documentElement.appendChild(script);
    }

    if (typeof callback === 'function')
        callback();

}

function addCover(color) {
    var existCover = document.getElementById('azure-load-cover');
    if (existCover) {
        existCover.style.background = color;
    } else {
        var cover = document.createElement('div');
        cover.id = 'azure-load-cover';
        cover.className = 'azure-load-cover';
        cover.style.background = color;
        document.documentElement.appendChild(cover);
    }
}

/**
 * Test current browser type
 * @param name Supports: opera, firefox, safari, ie, edge, chrome
 * @returns {boolean}
 */
function isBrowser(name) {
    name = name.toLowerCase();
    if (name == 'opera')
        return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    else if (name == 'firefox')
        return /firefox/.test(navigator.userAgent.toLowerCase());
    else if (name == 'safari')
        return /constructor/i.test(window.HTMLElement) || (function (p) {
            return p.toString() === "[object SafariRemoteNotification]";
        })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    else if (name == 'ie')
        return /*@cc_on!@*/false || !!document.documentMode;
    else if (name == 'edge')
        return !isIE && !!window.StyleMedia;
    else if (name == 'chrome')
        return /chrome/.test(navigator.userAgent.toLowerCase());
    else
        return false;
}

function initAzure() {

    function init() {

        var hideBody = document.getElementById('azure-body-hide');

        if (!options.GLB_Enabled) {
            if (hideBody !== null) hideBody.remove();
            return;
        }

        // redirect to home
        if (options.GLB_AutoRedirectToLogin
            && (currURL.match(/\/notLoggedIn\.htm/i) || currURL.match(/\/logout\.htm/i))) {
            location.href = location.protocol + "//" + location.host + "/home.htm";
            return;
        }

        // init themeConfigs
        themeConfigs = getThemeConfigs(options.GLB_ThemeID);

        if (options.GLB_ThemeScheduled) {
            // theme schedule
            var currentT = new Date();
            var lightT = new Date();
            var darkT = new Date();
            lightT.setHours(options.GLB_ThemeScheduleTime.light[0], options.GLB_ThemeScheduleTime.light[1], 0);
            darkT.setHours(options.GLB_ThemeScheduleTime.dark[0], options.GLB_ThemeScheduleTime.dark[1], 0);

            var themeAppr;
            if (darkT > lightT) {
                if (currentT > lightT && currentT < darkT) {
                    // light
                    themeAppr = 0;
                } else {
                    // dark
                    themeAppr = 1;
                }
            } else {
                if (currentT > darkT && currentT < lightT) {
                    // dark
                    themeAppr = 1;
                } else {
                    // light
                    themeAppr = 0;
                }
            }

            if (themeConfigs.appearance !== themeAppr) {
                options.GLB_ThemeID = themeConfigs.siblingID;
                themeConfigs = getThemeConfigs(themeConfigs.siblingID);
            }
        }

        // overlay
        addCover(themeConfigs.overlayColor);

        // parent theme
        if (themeConfigs.hasOwnProperty('parentID'))
            themeParentConfigs = getThemeConfigs(themeConfigs.parentID);
        else
            themeParentConfigs = null;

        // hide body
        if (hideBody !== null) hideBody.remove();

        initReady = true;
    }

    if (isBrowser('firefox')) {
        injectCSSnative('body{opacity:0!important}', 'head', 'text', null, 'azure-body-hide');
    }

    baseURL = chrome.runtime.getURL('');
    currURL = window.location.href;
    configs = getOptionListDefault();
    chrome.storage.sync.get(configs, function (e) {
        options = e;
        init();
    });
}

initAzure();