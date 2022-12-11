window.addEventListener("DOMContentLoaded", function () {
    //הוספת מאזינים לכפתורים
    document.getElementById("find-me").addEventListener("click", geoFindMe);
    document.getElementById("shareBtn").addEventListener("click", share);
})


let globalLatitude = "";
let globalLongitude = "";


function geoFindMe() {
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
    const iframe = document.querySelector('#iframe');

    mapLink.href = '';
    mapLink.textContent = '';

    if (!navigator.geolocation) {
        status.textContent = 'הדפדפן אינו תומך בשירות זה';
    } else {
        status.textContent = 'מאתר את מיקומך...';
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = '';
        mapLink.textContent = `קו רוחב: ${latitude} °, קו אורך: ${longitude} °`;
        mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
        iframe.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`
        iframe.classList.remove("d-none")

        globalLatitude = latitude.toString();
        globalLongitude = longitude.toString();
    }

    function error() {
        status.textContent = 'מיקומך אינו זמין';
    }

}



function share() {

    const shareData = {
        title: 'נתוני המיקום שלי',
        text: 'קו רוחב' + globalLatitude + 'קו אורך' + globalLongitude
    }

    const btn = document.querySelector('#shareBtn');

    btn.addEventListener('click', async () => {
        try {
            await navigator.share(shareData);
        } catch (err) {
        }
    });
}