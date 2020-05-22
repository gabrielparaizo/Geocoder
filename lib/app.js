import mapboxgl from 'mapbox-gl';

// TODO: Write your JS code in here
// API Key from MapBox
const apiKey = "pk.eyJ1IjoiZ2FicmllbGxvcGVlcyIsImEiOiJja2FnOTRxOHowMHpoMnhuNGk3OGJnaGdsIn0.VkbSyXG9T6Sv8f0jceExkg";
// Select the element
const inputForm = document.querySelector('#submit-form');
// Add some event listener to the element we just selected


const renderMap = (lat, long) => {
  // Add Map
  mapboxgl.accessToken = apiKey;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [long, lat],
    zoom: 12
  });

  // Add marker
  new mapboxgl.Marker()
    .setLngLat([long, lat])
    .addTo(map);
};

inputForm.addEventListener('submit', (event) => {
  // Prevents our browser from refreshing automatically based on the event
  event.preventDefault();
  // Get the value the user just typed
  const userInput = document.querySelector("#address").value;
  // Gets the element that shows coordinates
  const showCoordinates = document.querySelector("#coordinates");
  // Gets the element that show the map
  const showMap = document.querySelector('#map');
  // API Endpoint with user input and API Key
  const apiEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userInput}.json?access_token=${apiKey}`;
  // Gets API JSON
  fetch(apiEndpoint)
    .then(reponse => reponse.json())
    .then((data) => {
      const long = data.features[0].center[0];
      const lat = data.features[0].center[1];
      const paragraph = `<p>Longitude: ${lat}, Latitude: ${long}</p>`;
      // Set coordinates to zero
      showCoordinates.innerHTML = "";
      // Sets map to zero
      showMap.innerHTML = "";
      showCoordinates.insertAdjacentHTML("beforeend", paragraph);
      renderMap(lat, long);
    });
});
