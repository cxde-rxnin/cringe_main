document.addEventListener("DOMContentLoaded", function() {
    var loader = document.getElementById("load");

    function hideLoader() {
        loader.style.opacity = '0';
        loader.addEventListener('transitionend', function() {
            loader.style.display = 'none';
            document.body.classList.remove('no-overflow');
        }, { once: true });
    }

    function checkLoaderDisplay() {
        if (!sessionStorage.getItem('loaderDisplayed')) {
            window.addEventListener("load", function() {
                setTimeout(function() {
                    hideLoader();
                    sessionStorage.setItem('loaderDisplayed', 'true');
                }, 5000); // 5000 milliseconds = 5 seconds
            });
        } else {
            loader.style.display = 'none';
            document.body.classList.remove('no-overflow');
        }
    }

    // Initial check for loader display
    checkLoaderDisplay();
});
