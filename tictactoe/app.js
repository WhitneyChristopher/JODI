var baseUrl = 'https://ids.lib.harvard.edu/ids/iiif/43337862';
var map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0,
});

var iiifLayer = L.tileLayer.iiif(baseUrl + '/info.json').addTo(map);

var areaSelect = L.areaSelect({
  width:200, height:300
});

areaSelect.addTo(map);

$('#urlArea').html(baseUrl)

areaSelect.on('change', function() {
  var bounds = this.getBounds();
  var zoom = map.getZoom();
  var min = map.project(bounds.getSouthWest(), zoom);
  var max = map.project(bounds.getNorthEast(), zoom);
  var imageSize = iiifLayer._imageSizes[zoom];
  var xRatio = iiifLayer.x / imageSize.x;
  var yRatio = iiifLayer.y / imageSize.y;
  var region = [
    Math.floor(min.x * xRatio),
    Math.floor(max.y * yRatio),
    Math.floor((max.x - min.x) * xRatio),
    Math.floor((min.y - max.y) * yRatio)
  ];
  var url = baseUrl + '/' + region.join(',') + '/full/0/native.jpg';
  $('#urlArea').html(
    '<a href=' + url + 'target=_blank>' + url + '</a>'
  )
});

function loadNewImage(){
  baseUrl = 'https://ids.lib.harvard.edu/ids/iiif/18791646';
  iiifLayer = L.tileLayer.iiif(baseUrl + '/info.json').addTo(map);
  $('#urlArea').html(baseUrl);
}
$('#hamimage').on('click',loadNewImage);
