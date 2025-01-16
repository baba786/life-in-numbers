#!/bin/bash

# Create public directory if it doesnt exist
mkdir -p public

# Download Earth textures
curl -o public/earth_texture.jpg https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74393/world.200412.3x5400x2700.jpg
curl -o public/earth_bump.jpg https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74393/world.topo.200412.3x5400x2700.jpg
curl -o public/earth_specular.jpg https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74393/world.lights.3x5400x2700.jpg
