const canvas_width = 1200;
const canvas_height = 650;
const canvas_offset_x = 200;
const box_size = 50;
const image_max = 120;

const api_url = "https://mochiduko-api.netlify.app/";

let renderer, canvas, scene, camera, controls;
let mouse = new THREE.Vector2();
let INTERSECTED;

let target_images = [];
const axes = ["tsne-X", "tsne-Y", "tsne-Z"];

window.addEventListener("load", init);

function v(x,y,z){ return new THREE.Vector3(x,y,z); }

function init() {
  //レンダラーを作成
  renderer = new THREE.WebGLRenderer({ alpha: true });

  canvas = document.getElementById("canvas_holder");
  canvas.appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //シーンを作成
  scene = new THREE.Scene();

  //カメラを作成
  camera = new THREE.PerspectiveCamera(60, canvas_width / canvas_height, 0.3, 1000);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  // make the renderer fill the viewport
  renderer.setSize(canvas_width, canvas_height);

  // set the background color to almost-white
  renderer.setClearColor(0x00bcd4, 1.0);
  renderer.clear();

  // render objects
  drawScatter();
  renderScene();

  // mouse events
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('touchend', onTouchStart, true);
}

//アニメーション
function renderScene() {
  requestAnimationFrame(renderScene);
  controls.update();
  renderer.render(scene, camera);
}

function drawScatter(){
  let scatterPlot = new THREE.Object3D();
  scene.add(scatterPlot);

  // Draw the bounding box
  let lineGeo = new THREE.Geometry();
  lineGeo.vertices.push(
    v(-box_size, box_size, -box_size), v(box_size, box_size, -box_size),
    v(-box_size, -box_size, -box_size), v(box_size, -box_size, -box_size),
    v(-box_size, box_size, box_size), v(box_size, box_size, box_size),
    v(-box_size, -box_size, box_size), v(box_size, -box_size, box_size),

    v(box_size, -box_size, -box_size), v(box_size, box_size, -box_size),
    v(-box_size, -box_size, -box_size), v(-box_size, box_size, -box_size),
    v(box_size, -box_size, box_size), v(box_size, box_size, box_size),
    v(-box_size, -box_size, box_size), v(-box_size, box_size, box_size),

    v(box_size, box_size, -box_size), v(box_size, box_size, box_size),
    v(box_size, -box_size, -box_size), v(box_size, -box_size, box_size),
    v(-box_size, box_size, -box_size), v(-box_size, box_size, box_size),
    v(-box_size, -box_size, -box_size), v(-box_size, -box_size, box_size)
  );

  let lineMat = new THREE.LineBasicMaterial({color: 0xFFFFFF, linewidth: 1});
  let line = new THREE.Line(lineGeo, lineMat);
  line.type = THREE.Lines;
  scatterPlot.add(line);

  let coordinate_bounds = {}
  $.getJSON(api_url + "each_illusts.json", function(data) {
    target_images = data.slice(0, image_max);
    console.log(target_images);

    axes.forEach((axis, i) => {
      coordinate_bounds[axis] = [
        Math.max.apply(Math, target_images.map(function(o) { return o[axis]; })),
        Math.min.apply(Math, target_images.map(function(o) { return o[axis]; }))
      ];
    });

    target_images.forEach(function (d) {
      const loader = new THREE.TextureLoader();
      loader.crossOrigin = true;
      let texture = loader.load(api_url + "thumbs/" + d["id"] + ".png");

      let mat = new THREE.PointsMaterial({
        color:0xFFFFFF,
        size: 20,
        transparent: true,
        map: texture,
      });

      let scales = axes.map(function (axis) {
        return d3.scaleSqrt()
            .domain(coordinate_bounds[axis])
            .range([-box_size, box_size]);
      });

      let pointGeo = new THREE.Geometry();

      let x = scales[0](d["tsne-X"]);
      let y = scales[1](d["tsne-Y"]);
      let z = scales[2](d["tsne-Z"]);
      pointGeo.vertices.push(v(x,y,z));

      let points = new THREE.Points(pointGeo, mat);
      pointGeo.name = d["id"].toString()
      points.name = d["id"].toString()

      scatterPlot.add(points);
    });
  });

  renderer.setSize(canvas_width, canvas_height);
  renderer.setViewport(-1 * canvas_offset_x, 0,  canvas_width, canvas_height);

  controls.update();
  renderer.render(scene, camera);

  camera.position.set(100, 100, 100);
}

function onDocumentMouseMove( event )
{
  // event.preventDefault();
  let mousePosition = calcMousePositionInCanvas(renderer.domElement, event);
  selectImage(event, mousePosition);
}

function onTouchStart( event )
{
  // the following line would stop any other event handler from firing
  // (such as the mouse's TrackballControls)
  // event.preventDefault();
  let mousePosition = calcMousePositionInCanvas(renderer.domElement, event.touches[0]);
  selectImage(event, mousePosition);
}

function selectImage(event, mousePos){
  let raycaster = new THREE.Raycaster();
  mouse.x = ((mousePos[0] + canvas_offset_x) / canvas_width) * 2 - 1;
  mouse.y = - (mousePos[1] / canvas_height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  let intersects = raycaster.intersectObjects(scene.children[0].children.slice(1), true);

  // scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000) );

  if (intersects.length > 0){
    intersects.forEach((item, i) => {
      // console.log('name is:' + item.object.name);
      let target_image = target_images.filter(img => img["id"] == item.object.name);

      if (target_image.length > 0){
        setTargetImageProperties(target_image[0]);
      }
    });
  }
}

function setTargetImageProperties(target_image){
  document.getElementById("image_thumb").src = "http://embed.pixiv.net/decorate.php?illust_id=" + target_image["id"] + "&mode=sns-automator";

  document.getElementById("image_title").innerHTML = target_image["title"];
  document.getElementById("image_date").innerHTML = target_image["date"].toString();
  document.getElementById("image_tags").innerHTML = target_image["tags"].map( (tag) => "#" + tag["name"]).join(" ");

  document.getElementById("image_url").href = "https://www.pixiv.net/artworks/" + target_image["id"];
}

function calcMousePositionInCanvas(canvas, event) {
  let pos_x, pos_y;

  let offset = $(canvas).offset();
  pos_x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(offset.left);
  pos_y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(offset.top);
  return [pos_x, pos_y];
}
