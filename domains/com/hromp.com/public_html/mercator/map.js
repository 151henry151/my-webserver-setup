// Map dimensions and projection
const width = document.getElementById('map').clientWidth;
const height = document.getElementById('map').clientHeight;
const projection = d3.geoMercator()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

// Create SVG
const svg = d3.select('#map')
    .attr('width', width)
    .attr('height', height);

// Add background
svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', '#f5f6fa');

// Load world map data
d3.json('data/countries-110m.json')
    .then(data => {
        const countries = topojson.feature(data, data.objects.countries);
        
        // Draw countries
        svg.append('g')
            .selectAll('path')
            .data(countries.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', '#e0e0e0')
            .attr('stroke', '#fff')
            .attr('stroke-width', 0.5);
        
        // Start the animation
        updateTerminator();
        setInterval(updateTerminator, 1000);
    });

// Update time display
function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString();
    document.getElementById('current-date').textContent = now.toLocaleDateString();
}

// Calculate and draw the terminator
function updateTerminator() {
    const now = new Date();
    const julianDate = (now.getTime() / 86400000) + 2440587.5;
    
    // Calculate sun position
    const sunLongitude = calculateSunLongitude(julianDate);
    const sunLatitude = calculateSunLatitude(julianDate);
    
    // Create terminator points
    const terminatorPoints = [];
    for (let lon = -180; lon <= 180; lon += 1) {
        const lat = calculateTerminatorLatitude(lon, sunLongitude, sunLatitude);
        terminatorPoints.push([lon, lat]);
    }
    
    // Draw terminator
    const terminatorLine = d3.geoPath()
        .projection(projection)
        .pointRadius(1);
    
    // Remove previous terminator
    svg.selectAll('.terminator').remove();
    
    // Draw new terminator
    svg.append('path')
        .datum({type: 'LineString', coordinates: terminatorPoints})
        .attr('class', 'terminator')
        .attr('d', terminatorLine)
        .attr('stroke', '#666')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    
    // Update time display
    updateTime();
}

// Calculate sun's longitude
function calculateSunLongitude(julianDate) {
    const T = (julianDate - 2451545.0) / 36525;
    const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
    const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
    const C = (1.914602 - T * (0.004817 + 0.000014 * T)) * Math.sin(M * Math.PI / 180) +
              (0.019993 - 0.000101 * T) * Math.sin(2 * M * Math.PI / 180) +
              0.000289 * Math.sin(3 * M * Math.PI / 180);
    const L = 280.46646 + T * (36000.76983 + 0.0003032 * T) + C;
    return L % 360;
}

// Calculate sun's latitude (simplified)
function calculateSunLatitude(julianDate) {
    const T = (julianDate - 2451545.0) / 36525;
    return 23.439 - 0.00000036 * T;
}

// Calculate terminator latitude for a given longitude
function calculateTerminatorLatitude(longitude, sunLongitude, sunLatitude) {
    const sunLongitudeRad = sunLongitude * Math.PI / 180;
    const sunLatitudeRad = sunLatitude * Math.PI / 180;
    const longitudeRad = longitude * Math.PI / 180;
    
    const terminatorLatitude = Math.asin(
        Math.sin(sunLatitudeRad) * Math.cos(longitudeRad - sunLongitudeRad)
    ) * 180 / Math.PI;
    
    return terminatorLatitude;
} 