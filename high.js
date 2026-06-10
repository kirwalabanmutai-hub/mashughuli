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

  /*  HERO SLIDESHOW  */
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dots   = document.querySelectorAll('.slider-dot');
  let current  = 0;
  let timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  document.getElementById('prevSlide').addEventListener('click', () => goTo(current - 1));
  document.getElementById('nextSlide').addEventListener('click', () => goTo(current + 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.slide)));
  timer = setInterval(() => goTo(current + 1), 5000);

  /*  SEARCH  */
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose   = document.getElementById('searchClose');
  searchClose.addEventListener('click', () => searchOverlay.classList.remove('active'));
  searchOverlay.addEventListener('click', function(e) { if(e.target===this) this.classList.remove('active'); });

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

    // Toggle search box visibility when clicking search icon
    searchBtn.addEventListener('click', function() {
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();  // Auto-focus the input when opened
        }
    });

    // Close search box when clicking outside (optional)
    document.addEventListener('click', function(event) {
        if (!searchBox.contains(event.target) && event.target !== searchBtn) {
            searchBox.classList.remove('active');
        }
    });

    // Function to perform search
    function performSearch() {
        const query = searchInput.value.trim();
        if (query === '') {
            alert('Please enter a search term');
            return;
        }
        
        // Option 1: Redirect to search results page
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
        
        // Option 2: Or filter products on the current page
        // filterProducts(query);
        
        // Option 3: Or just show an alert (for testing)
        // alert(`Searching for: ${query}`);
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

