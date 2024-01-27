mapboxgl.accessToken = mapToken;
const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
mapboxClient.geocoding
  .forwardGeocode({
    query: locationQuery + ', Algeria',
    autocomplete: false,
    limit: 1,
  })
  .send()
  .then((response) => {
    if (
      !response ||
      !response.body ||
      !response.body.features ||
      !response.body.features.length
    ) {
      console.error("Invalid response:");
      console.error(response);
      return;
    }
    const feature = response.body.features[0];

    const map = new mapboxgl.Map({
      container: "map",
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: feature.center,
      zoom: 14,
    });

    // Create a marker and add it to the map.
    new mapboxgl.Marker().setLngLat(feature.center).addTo(map);

    // controls
    map.addControl(new mapboxgl.NavigationControl());
  });
