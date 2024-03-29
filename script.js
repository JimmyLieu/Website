window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('.nav_links a');
    var currentSectionId = '';

    sections.forEach(function(section) {
        var top = section.offsetTop;
        var height = section.clientHeight;
        if (window.pageYOffset >= top && window.pageYOffset < top + height) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSectionId) {
            link.classList.add('active');
        }
    });
});
