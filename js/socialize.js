//  _____            _       _ _         
// /  ___|          (_)     | (_)        
// \ `--.  ___   ___ _  __ _| |_ _______ 
//  `--. \/ _ \ / __| |/ _` | | |_  / _ \
// /\__/ / (_) | (__| | (_| | | |/ /  __/
// \____/ \___/ \___|_|\__,_|_|_/___\___|
//
//
availableSocials = ["facebook", "twitter", "linkedin", "email"];
var options = {};
var btnsNb;
var btnWidth;
let path = '\\some\\some\\some\\some\\mainSome'.split('\\')


// @todo regroup availableSocials with icons
icons = { 
    facebook: ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29"><path d="M26.4 0H2.6C1.714 0 0 1.715 0 2.6v23.8c0 .884 1.715 2.6 2.6 2.6h12.393V17.988h-3.996v-3.98h3.997v-3.062c0-3.746 2.835-5.97 6.177-5.97 1.6 0 2.444.173 2.845.226v3.792H21.18c-1.817 0-2.156.9-2.156 2.168v2.847h5.045l-.66 3.978h-4.386V29H26.4c.884 0 2.6-1.716 2.6-2.6V2.6c0-.885-1.716-2.6-2.6-2.6z"/></svg>',
    twitter : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path d="M24.253 8.756C24.69 17.08 18.297 24.182 9.97 24.62a15.093 15.093 0 0 1-8.86-2.32c2.702.18 5.375-.648 7.507-2.32a5.417 5.417 0 0 1-4.49-3.64c.802.13 1.62.077 2.4-.154a5.416 5.416 0 0 1-4.412-5.11 5.43 5.43 0 0 0 2.168.387A5.416 5.416 0 0 1 2.89 4.498a15.09 15.09 0 0 0 10.913 5.573 5.185 5.185 0 0 1 3.434-6.48 5.18 5.18 0 0 1 5.546 1.682 9.076 9.076 0 0 0 3.33-1.317 5.038 5.038 0 0 1-2.4 2.942 9.068 9.068 0 0 0 3.02-.85 5.05 5.05 0 0 1-2.48 2.71z"/></svg>',
    linkedin : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path d="M25.424 15.887v8.447h-4.896v-7.882c0-1.98-.71-3.33-2.48-3.33-1.354 0-2.158.91-2.514 1.802-.13.315-.162.753-.162 1.194v8.216h-4.9s.067-13.35 0-14.73h4.9v2.087c-.01.017-.023.033-.033.05h.032v-.05c.65-1.002 1.812-2.435 4.414-2.435 3.222 0 5.638 2.106 5.638 6.632zM5.348 2.5c-1.676 0-2.772 1.093-2.772 2.54 0 1.42 1.066 2.538 2.717 2.546h.032c1.71 0 2.77-1.132 2.77-2.546C8.056 3.593 7.02 2.5 5.344 2.5h.005zm-2.48 21.834h4.896V9.604H2.867v14.73z"/></svg>',
    email : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.386 2.614H2.614A2.345 2.345 0 0 0 .279 4.961l-.01 14.078a2.353 2.353 0 0 0 2.346 2.347h18.771a2.354 2.354 0 0 0 2.347-2.347V4.961a2.356 2.356 0 0 0-2.347-2.347zm0 4.694L12 13.174 2.614 7.308V4.961L12 10.827l9.386-5.866v2.347z"/></svg></span>'
}

function span(cssClass, content) {
    return "<span class='" + cssClass + "'>" + content + "</span>";
}

function innerText(icon, text) {
    return span("sl-icon", icon) + span("sl-text", text.toUpperCase());
}

function genBtn(social, options) {
    linkTag  = "";
    url = options.url;
    title = options.title;
    socialClass = "sl-" + social + (options.lightMode ? "-light" : "");

    switch (social) {
        case "facebook" : 
            linkTag = "<a href='https://www.facebook.com/sharer/sharer.php?u=" + url + "' class='popup sl-button "+ socialClass +"' >" + innerText(icons.facebook, social) + "</a>";
            break;
        case "twitter" :
            linkTag = "<a href='https://twitter.com/intent/tweet?text=" +  title + " " + url + "' class='popup sl-button " + socialClass + "' >" + innerText(icons.twitter, social) + "</a>";
            break;
        case "linkedin" :
            linkTag = "<a href='https://www.linkedin.com/sharing/share-offsite/?url=" + url + "' class='popup sl-button " + socialClass + "' >" + innerText(icons.linkedin, social) + "</a>";
            break;
        case "email" : 
            linkTag = "<a href='mailto:?Subject=" + title + "&body=" + url + "' class='sl-button " + socialClass +"'>" + innerText(icons.email, social) + "</a>";
            break;
    }
    return linkTag
}

function checkDataList() {
    args = $("#socialize-container").data("list").split(",");
    tmp = [];
    args.forEach(function(e){
        for( i = 0; i < availableSocials.length; i++) {
            sained = e.replace(" ", "");
            if(sained.match(availableSocials[i])) {
                tmp.push(sained);
                break;
            }   
        }
    })
    return tmp;
}

function checkHref() {
    href = $("#socialize-container").data("href") == "current" ? window.location.href : $("#socialize-container").data("href");
    if(href != null) {
        return href;
    }
    console.error("You need to specify a href link");
    return 1;
}

function popup(href, title, w, h) {
    window.open(href, title, "width=" + w + ", height=" + h);
}

function isLight() {
    return $("#socialize-container").data("light") == "yes" ? true : false;
}

// DEBUG
var eventNumber = 0;
var buffer = 0;


// resize only 
function resize(nbBtns) {
    // if ($("#sl-btn-wrapper").width() < 1000) {
    //     $(".sl-button").addClass("sl-tiny");
    // } else {
    //     $(".sl-button").removeClass("sl-tiny");
    // }
    btnSize = $(".sl-button")[0].scrollWidth;
    margin = nbBtns * 20;
    limit = (btnSize * nbBtns) + margin > $("#sl-btn-wrapper")[0].scrollWidth;
    //limit = (btnSize * nbBtns) + margin > test

    console.log((btnSize * nbBtns) + (80*nbBtns))
    console.log("sw" + $("#sl-btn-wrapper")[0].scrollWidth)
    if( limit &&  !$(".sl-button").hasClass("sl-tiny")) {
        $(".sl-button").addClass("sl-tiny");
        buffer = $(window).width();
    } else if (  $(window).width() > buffer && $(".sl-button").hasClass("sl-tiny")) {
        $(".sl-button").removeClass("sl-tiny");
    }
    console.log("buff: " + buffer);
    eventNumber++;

    //console.log($("#sl-btn-wrapper")[0].scrollWidth)
    //console.log("Event Number n°" + eventNumber+" sl-btn-wrapper width : " + $("#sl-btn-wrapper").width() + "  sl-btn-container width : " + $("#socialize-container").width());
}


// initialization function, initializes buttons, and read the options passed in html
function init() {
    options = {
        list : checkDataList(),
        url : checkHref(),
        title : document.title,
        lightMode : isLight()
    }
    btnsNb = options.list.length;
    btnWidth = 100/btnsNb;

    $("#socialize-container").append("<div id='sl-btn-wrapper'></div>");
    options.list.forEach(function(e) {
        $("#sl-btn-wrapper").append(genBtn(e, options));
    })
    // first resize initialization
    resize(options.list.length);
    $(".sl-button").css("width", 100 / options.list.length + "%");
}

// bounce animation
function bounce(element, times, distance, speed) {
    for(i = 0; i < times; i++) {
        element.animate({marginTop: '-='+distance},speed).animate({marginTop: '+='+distance},speed);
    }
}

$(document).ready(function(){
    init()

    console.log(path);
   
    $(".sl-button").on("click", function() {
        bounce($(this), 3, "10px", 250);
    })
    $(".sl-button.popup").on("click", function(e) {
        that = $(this);
        popup(that.attr("href"), that.find(".sl-text").html(), 200, 200);
        e.preventDefault();
    })

    $(window).on("resize", function(){
        resize(options.list.length);
    })
})


