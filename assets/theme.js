document.body.style.backgroundColor = sessionStorage.getItem('bg');
document.body.style.color = sessionStorage.getItem('cc');
var headerLinks = document.querySelectorAll("[id='header-links']");
for (var i = 0; i < headerLinks.length; i++) {
    headerLinks[i].style.color = sessionStorage.getItem('cc');
}
document.getElementsByClassName("site-title").style.color = sessionStorage.getItem('cc');
function themeChange() {
     if ( sessionStorage.getItem('bg') === 'rgb(255, 255, 255)') {

            sessionStorage.setItem('bg', 'rgb(6, 23, 37)');
            sessionStorage.setItem('cc', '#777');
        
     }
    else if (sessionStorage.getItem('bg') == null || undefined) {
        sessionStorage.setItem('bg', 'rgb(6, 23, 37)');
        sessionStorage.setItem('cc', '#777');

    }
    else if( sessionStorage.getItem('bg') === 'rgb(6, 23, 37)') {

        sessionStorage.setItem('bg', 'rgb(255, 255, 255)');
        sessionStorage.setItem('cc', '#333');

    }

document.body.style.backgroundColor = sessionStorage.getItem('bg');
document.body.style.color = sessionStorage.getItem('cc');
for (var i = 0; i < headerLinks.length; i++) {
    headerLinks[i].style.color = sessionStorage.getItem('cc');
}
document.getElementsByClassName("site-title").style.color = sessionStorage.getItem('cc');

}