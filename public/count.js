/* MoCreative site counter. Counts three things for one site, by day:
   the enquiry form was seen, someone started it, someone sent it.
   It keeps nothing about the visitor: no cookie, no device address, nothing typed.

   Add to a page that has the enquiry form, just before </body>:
     <script src="/count.js" data-site="the-site-key" data-form="#enquiry" defer></script>
   data-form is a CSS selector for the form. If the form sends without leaving the
   page, call window.mcCount("finish") when it has succeeded, and add data-manual
   to the script tag so the submit event is not counted too. */
(function () {
  var tag = document.currentScript;
  var key = tag && tag.getAttribute("data-site");
  if (!key) return;
  var url = "https://wphdwifayyfbvgmymoia.supabase.co/functions/v1/site-counter";
  var sent = {};
  function count(event) {
    if (sent[event]) return; // once a page view for each event
    sent[event] = true;
    var body = JSON.stringify({ k: key, e: event });
    try {
      // text/plain keeps this a simple request: no extra round trip before it
      if (!(navigator.sendBeacon && navigator.sendBeacon(url, new Blob([body], { type: "text/plain" })))) {
        fetch(url, { method: "POST", body: body, keepalive: true, headers: { "content-type": "text/plain" } }).catch(function () {});
      }
    } catch (e) { /* a counter never breaks the page */ }
  }
  window.mcCount = count;
  var form = document.querySelector(tag.getAttribute("data-form") || "form");
  if (!form) return;
  // seen: the form has come into view
  if ("IntersectionObserver" in window) {
    // seen = 30% of the form, or 40% of the screen filled by it (a tall form never reaches 30% on a short screen)
    var io = new IntersectionObserver(function (entries) { if (entries.some(function (x) { return x.isIntersecting && (x.intersectionRatio >= 0.3 || x.intersectionRect.height >= window.innerHeight * 0.4); })) { count("view"); io.disconnect(); } }, { threshold: [0, 0.1, 0.2, 0.3, 0.5] });
    io.observe(form);
  } else count("view");
  // started: the first time anything in it is touched
  form.addEventListener("input", function () { count("start"); }, { once: true });
  // finished: it was sent
  if (!tag.hasAttribute("data-manual")) form.addEventListener("submit", function () { count("start"); count("finish"); });
})();
