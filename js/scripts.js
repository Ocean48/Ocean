// Mobile menu icon
// var menuIcon = document.getElementById('menu_icon');
// var menu = document.querySelector('.menu');

// menuIcon.addEventListener('click', function() {
//     menu.classList.toggle('active');
// });

document.addEventListener("DOMContentLoaded", function () {
    var skillBars = document.querySelectorAll(".skill-bar");

    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function updateSkillBars() {
        skillBars.forEach(function (skillBar) {
            if (isInViewport(skillBar) && !skillBar.classList.contains("active")) {
                var percentage = skillBar.getAttribute("data-percentage");
                var fill = skillBar.querySelector(".fill");
                var percentageText = skillBar.querySelector(".percentage");

                fill.style.width = percentage + "%";
                percentageText.textContent = percentage + "%";

                skillBar.classList.add("active");
            }
        });
    }

    // Update skill bars on page load
    updateSkillBars();

    // Update skill bars on scroll
    window.addEventListener("scroll", updateSkillBars);
});


document.addEventListener("DOMContentLoaded", function () {
    var scrollToTopButton = document.querySelector(".scroll-to-top");

    scrollToTopButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    var scrollToTopButton = document.querySelector(".scroll-to-top-button");

    scrollToTopButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
