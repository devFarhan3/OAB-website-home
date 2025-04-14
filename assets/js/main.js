(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  // document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
  //   faqItem.addEventListener('click', () => {
  //     faqItem.parentNode.classList.toggle('faq-active');
  //   });
  // });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


  // dark light mode js


  document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('themeSwitch');
    const rtlToggle = document.getElementById('rtlToggle');
    const htmlElement = document.documentElement;
    const languageDropdown = document.getElementById('languageDropdown');
    const languageItems = document.querySelectorAll('[data-lang]');

    // Initialize from localStorage
    const savedTheme = localStorage.getItem('theme');
    const savedDir = localStorage.getItem('dir');
    const savedLang = localStorage.getItem('lang');

    // Apply saved theme
    if (savedTheme) {
      htmlElement.setAttribute('data-bs-theme', savedTheme);
      if (savedTheme === 'dark') {
        themeSwitch.checked = true;
      }
    }

    // Apply saved direction
    if (savedDir) {
      htmlElement.setAttribute('dir', savedDir);
      rtlToggle.textContent = savedDir === 'rtl' ? 'LTR' : 'RTL';
    }

    // Apply saved language
    if (savedLang) {
      setLanguage(savedLang);
    }

    // Theme switcher functionality
    themeSwitch.addEventListener('change', function () {
      if (this.checked) {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        htmlElement.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });

    // RTL toggle functionality
    rtlToggle.addEventListener('click', function () {
      const currentDir = htmlElement.getAttribute('dir');
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';

      htmlElement.setAttribute('dir', newDir);
      rtlToggle.textContent = newDir === 'rtl' ? 'LTR' : 'RTL';
      localStorage.setItem('dir', newDir);
    });

    // Language selection functionality
    languageItems.forEach(item => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        setLanguage(lang);
        localStorage.setItem('lang', lang);

        // Update dropdown button text
        const langText = this.textContent.trim();
        languageDropdown.innerHTML = `<i class="bi bi-chevron-right"></i> ${langText.split(' ')[0]}`;
      });
    });

    function setLanguage(lang) {
      // In a real app, you would load translations here
      console.log(`Language set to: ${lang}`);

      // For RTL languages, automatically switch direction
      const rtlLanguages = ['ar', 'he', 'fa'];
      if (rtlLanguages.includes(lang)) {
        htmlElement.setAttribute('dir', 'rtl');
        rtlToggle.textContent = 'LTR';
        localStorage.setItem('dir', 'rtl');
      } else if (lang === 'en') {
        htmlElement.setAttribute('dir', 'ltr');
        rtlToggle.textContent = 'RTL';
        localStorage.setItem('dir', 'ltr');
      }
    }
  });


  // <!-- t menu js -->

  $(document).ready(function () {
    $('#show-hidden-menu').click(function () {
      $('.hidden-menu').slideToggle("slow");
    });
  });

  // t mentu


  $("#tmenu").click(function () {
    if ($(this).is(":checked")) {
      $(".hidden-menu").slideToggle(300);
    } else {
      $(".hidden-menu").slideToggle(200);
    }
  });



  // tabs js


  $(document).ready(function() {
    // Initially activate the first tab and content
    $('.tabs .tab-item:first-child a').addClass('active');
    $('.tab-content:first-child').addClass('active');

    // Handle click on tabs
    $('.tabs a').click(function(e) {
      e.preventDefault();
      var target = $(this).attr('href');

      // Remove active class from all tabs and content
      $('.tabs a').removeClass('active');
      $('.tab-content').removeClass('active');

      // Add active class to the clicked tab and corresponding content
      $(this).addClass('active');
      $(target).addClass('active');
    });

    // Handle change event on the dropdown menu
    $('.dropdown-menus').change(function() {
      var target = $(this).val();

      // Remove active class from all tabs and content
      $('.tabs a').removeClass('active');
      $('.tab-content').removeClass('active');

      // Find the corresponding tab link and content and activate them
      $('.tabs a[href="' + target + '"]').addClass('active');
      $(target).addClass('active');
    });
  });



})();