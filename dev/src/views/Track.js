window._gaq = window._gaq || [];
_gaq.push(["_setAccount", "UA-19390409-5"]);
_gaq.push(["_trackPageview"]);
if (localStorage.chrome_id) {
    _gaq.push(["_setCustomVar", 1, "chrome_id", localStorage.chrome_id]);
}
(function() {
    var ga = document.createElement("script");
    ga.type = "text/javascript";
    ga.async = true;
    ga.src = "https://ssl.google-analytics.com/ga.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(ga, s);
})();
