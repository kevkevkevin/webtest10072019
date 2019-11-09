(function(){
  function initInsights() {
    if (!window._contently) {
      var _contently = { siteId: "f2af1875bf2672f384adad4709424b57" };
      _contently.insights = new ContentlyInsights({site_id: _contently.siteId});
      window._contently = _contently;
    }
  }

  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('async', 'async');
  s.setAttribute('src', '//assets.contently.com/insights/insights.js');
  s.onreadystatechange = function() {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      initInsights();
    }
  };
  s.onload = initInsights;
  document.body.appendChild(s);
})();