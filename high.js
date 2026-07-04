document.addEventListener('DOMContentLoaded', function () {

  /*  MOBILE NAV  */
  const hamburger    = document.getElementById('hamburger');
  const mobileNav    = document.getElementById('mobileNav');
  const mobileClose  = document.getElementById('mobileClose');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMobile()  { mobileNav.classList.add('active'); mobileOverlay.classList.add('active'); document.body.style.overflow='hidden'; }
  function closeMobile() { mobileNav.classList.remove('active'); mobileOverlay.classList.remove('active'); document.body.style.overflow=''; }

  hamburger.addEventListener('click', openMobile);
  mobileClose.addEventListener('click', closeMobile);
  mobileOverlay.addEventListener('click', closeMobile);

  /*  STICKY HEADER  */
  const sticky = document.getElementById('stickyHeader');
  window.addEventListener('scroll', function () {
    sticky.classList.toggle('visible', window.scrollY > 200);
  });

  /*  HERO SLIDESHOW (only present on the home page)  */
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dots   = document.querySelectorAll('.slider-dot');
  const prevSlideBtn = document.getElementById('prevSlide');
  const nextSlideBtn = document.getElementById('nextSlide');
  let current  = 0;
  let timer;

  if (slides.length && prevSlideBtn && nextSlideBtn) {
    function goTo(n) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 5000);
    }

    prevSlideBtn.addEventListener('click', () => goTo(current - 1));
    nextSlideBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.slide)));
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  /*  SEARCH OVERLAY (only present on the home page)  */
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose   = document.getElementById('searchClose');
  if (searchOverlay && searchClose) {
    searchClose.addEventListener('click', () => searchOverlay.classList.remove('active'));
    searchOverlay.addEventListener('click', function(e) { if(e.target===this) this.classList.remove('active'); });
  }

  /*  SCROLL ANIMATIONS  */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; } });
  }, { threshold: 0.1 });

  document.querySelectorAll('.vmv-card, .notice-card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });

});
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const searchBtn = document.getElementById('searchBtn');
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.querySelector('#searchBox input');
    const searchSubmitBtn = document.querySelector('#searchBox button');

    if (!searchBtn || !searchBox || !searchInput || !searchSubmitBtn) return;

    // Toggle search box visibility when clicking search icon
    searchBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();  // Auto-focus the input when opened
        }
    });

    // Close search box when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchBox.contains(event.target) && event.target !== searchBtn) {
            searchBox.classList.remove('active');
        }
    });

    // Keep the box open when interacting with the input/button themselves
    searchBox.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Site pages this search can find, keyed by page title + related keywords
    const pageIndex = [
        { url: 'highhome.html',        keywords: ['home'] },
        { url: 'profile.html',         keywords: ['our profile', 'profile'] },
        { url: 'history.html',         keywords: ['our history', 'history'] },
        { url: 'vision.html',          keywords: ['vision', 'mission', 'values', 'mission and values'] },
        { url: 'administration.html',  keywords: ['school administration', 'administration'] },
        { url: 'board-members.html',   keywords: ['board members', 'board'] },
        { url: 'policies.html',        keywords: ['school policies', 'policies', 'policy'] },
        { url: 'anthem.html',          keywords: ['school anthem', 'anthem'] },
        { url: 'news.html',            keywords: ['news and events', 'news', 'events'] },
        { url: 'noticeboard.html',     keywords: ['notice board', 'notice', 'noticeboard'] },
        { url: 'games.html',           keywords: ['games and sports', 'games', 'sports'] },
        { url: 'clubs.html',           keywords: ['clubs and societies', 'clubs', 'societies'] },
        { url: 'alumni.html',          keywords: ['notable alumni', 'alumni'] },
        { url: 'kcse.html',            keywords: ['kcse results', 'kcse', 'results'] },
        { url: 'senior-secondary.html',keywords: ['senior secondary', 'grade 10'] },
        { url: 'teachers.html',        keywords: ['our teachers', 'teachers'] },
        { url: 'adm-overview.html',    keywords: ['admission overview', 'overview', 'admission'] },
        { url: 'criteria.html',        keywords: ['admission criteria', 'criteria'] },
        { url: 'terms.html',           keywords: ['term dates', 'terms', 'calendar'] },
        { url: 'fee.html',             keywords: ['fee payment', 'fee', 'fees'] },
        { url: 'apply.html',           keywords: ['how to apply', 'apply', 'application'] },
        { url: 'gallery.html',         keywords: ['gallery', 'photos', 'images'] },
        { url: 'parents-zone.html',    keywords: ['parents zone', 'parents'] },
        { url: 'contact.html',         keywords: ['contact us', 'contact'] }
    ];

    function findBestMatch(query) {
        const q = query.toLowerCase().trim();
        if (!q) return null;

        let bestScore = 0;
        let bestMatch = null;
        pageIndex.forEach(function(entry) {
            entry.keywords.forEach(function(keyword) {
                let score = 0;
                if (keyword === q) score = 3;
                else if (keyword.startsWith(q) || q.startsWith(keyword)) score = 2;
                else if (keyword.includes(q) || q.includes(keyword)) score = 1;
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = entry;
                }
            });
        });
        return bestMatch;
    }

    function showSearchMessage(text) {
        let msg = searchBox.querySelector('.search-box-message');
        if (!msg) {
            msg = document.createElement('div');
            msg.className = 'search-box-message';
            searchBox.appendChild(msg);
        }
        msg.textContent = text;
    }

    // Function to perform search
    function performSearch() {
        const query = searchInput.value.trim();
        if (query === '') {
            showSearchMessage('Please enter a search term.');
            return;
        }

        const match = findBestMatch(query);
        if (match) {
            window.location.href = match.url;
        } else {
            showSearchMessage('No matching page found. Try "admission", "gallery" or "contact".');
        }
    }

    // Search when clicking the Search button
    searchSubmitBtn.addEventListener('click', performSearch);

    // Search when pressing Enter key
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});

