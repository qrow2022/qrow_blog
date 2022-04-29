
// When refreshing the page or first load,
    // check the session storage and see if the
    // colors are still set. If they are, then apply them.
setThemeColors();



// When the Dark/Light buttion is pressed,
    // Run this function to change the theme colors.
function themeChange() {
    // Check if the storage for the background color is set to white.
        // If it is, change the storage to dark.
    if ( sessionStorage.getItem('bg') === 'rgb(255, 255, 255)') {

        sessionStorage.setItem('bg', 'rgb(6, 23, 37)');
        sessionStorage.setItem('cc', '#777');
        
    }
    // Check if the storage for the background is nonexistent.
        // If it is, set the storage to dark.
    else if (sessionStorage.getItem('bg') == null || undefined) {
        
        sessionStorage.setItem('bg', 'rgb(6, 23, 37)');
        sessionStorage.setItem('cc', '#777');

    }
    // Check if the storage for the background is set to dark.
        // If it is, set the storage to white.
    else if( sessionStorage.getItem('bg') === 'rgb(6, 23, 37)') {

        sessionStorage.setItem('bg', 'rgb(255, 255, 255)');
        sessionStorage.setItem('cc', '#333');

    }

    // Get the storage values and set the corresponding values.
    setThemeColors();

}


function setThemeColors() {

        // Set background color to storage color
    document.body.style.backgroundColor = sessionStorage.getItem('bg');
        // Set standard text to storage color.
    document.body.style.color = sessionStorage.getItem('cc');
        // Get the title and set it's color.
    var siteTitle = document.getElementsByClassName("site-title");
    for (let titleCount of siteTitle) {
        titleCount.style.color = sessionStorage.getItem('cc');
    }

    // Get the header links and set their colors.
    var headerLinks = document.getElementsByClassName("page-link");
    for (let linkCount of headerLinks) {
        linkCount.style.color = sessionStorage.getItem('cc');
    }

}