(function() {
  var SOURCES = window.TEXT_VARIABLES.sources;
  var TOC_SELECTOR = window.TEXT_VARIABLES.site.toc.selectors;
  window.Lazyload.js(SOURCES.jquery, function() {
    var $window = $(window);
    var $articleContentLeft = $('.js-article-left-content');
    var $articleContentRight = $('.js-article-right-content');
    var $tocRoot = $('.js-toc-root'), $col2 = $('.js-col-aside');
    var toc;
    var tocDisabled = false;
    var hasSidebar = $('.js-page-root').hasClass('layout--page--sidebar');
    var hasToc = $articleContentLeft.find(TOC_SELECTOR).length > 0;

    function disabled() {
      return $col2.css('display') === 'none' || !hasToc;
    }

    tocDisabled = disabled();
//    console.log("test");
//    console.log($articleContentLeft);
//    console.log($articleContentRight);
//    console.log($tocRoot);
//    console.log($articleContentLeft.find(TOC_SELECTOR).filter('[id]'));
//    console.log($articleContentRight.find(TOC_SELECTOR).filter('[id]'));
//    assume the two side of the headings have a one to one correspondence
//    var $headingsArrayLeft = $articleContentLeft.find(TOC_SELECTOR).filter('[id]').clone()
//    $headingsArrayLeft.each(function (index) {
//      $(this).append("test");
//      console.log(index);
//      console.log($(this).text());
//      console.log($(this).prop('tagName'))
//    });
//    console.log($headingsArrayLeft.get(0).textContent)
    toc = $tocRoot.toc({
      selectors: TOC_SELECTOR,
      containerLeft: $articleContentLeft,
      containerRight: $articleContentRight,
      scrollTarget: hasSidebar ? '.js-page-main' : null,
      scroller: hasSidebar ? '.js-page-main' : null,
      disabled: tocDisabled,
    });

    $window.on('resize', window.throttle(function() {
      tocDisabled = disabled();
      toc && toc.setOptions({
        disabled: tocDisabled
      });
    }, 100));

  });
})();
