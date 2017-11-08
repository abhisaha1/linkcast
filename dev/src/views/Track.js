window._gaq = window._gaq || [];
if (process.env.NODE_ENV) {
    _gaq.push(["_setAccount", "UA-19390409-5"]);
    _gaq.push(["_trackPageview"]);
    (function() {
        var ga = document.createElement("script");
        ga.type = "text/javascript";
        ga.async = true;
        ga.src = "https://ssl.google-analytics.com/ga.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(ga, s);
    })();
}
