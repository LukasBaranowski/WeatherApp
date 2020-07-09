window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.degree');
    let locationTimezone = document.querySelector('.location-timezone');

    let temperatureSection = document.querySelector('.temperature');

    let temperatureSymbol = document.querySelector('.temperature span');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/02b953141f5303d08559e5935dd62c4f/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                /* {} will pull all the information form the currently*/
                console.log(data)
                const {temperature, summary, icon} = data.currently;
                
                //Set DOM Elements from API
               
                temperatureDegree.textContent = Math.floor((temperature - 32)*5/9);

                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Set icon
                setIcons(icon, document.querySelector('.icon'))
                //Change temperature to Fehrenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSymbol.textContent === "C"){
                        temperatureDegree.textContent = temperature;
                        temperatureSymbol.textContent  = "F"
                    }else{
                        temperatureSymbol.textContent  = "C"
                        temperatureDegree.textContent = Math.floor((temperature - 32)*5/9);
                    };
                });
            });
        });
  
    }else {
        h1.textContent = 'it doesn\'t work because you didn\'t allow your location or your browser doesn\'t support geolocation'
    }

    //Setting icons from Skycons
    
    function setIcons(icon, iconId){
        const skycons = new Skycons({color:"white"});
        // (/-/g, "_") this will replace every "-" with underscore "_"
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    };
});