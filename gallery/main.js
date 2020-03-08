// retrieved from: http://msbarry.github.io/threejs-tool-page/
window.onload = drawScatter;
let mouse = new THREE.Vector2();
let INTERSECTED;
const canvas_width = 1200;
const canvas_height = 650;
const canvas_offset_x = 200;

let target_images = [];
const axes = ["tsne-X", "tsne-Y", "tsne-Z"];

// create the scene
let scene = new THREE.Scene();
// create the camera with 45-degree field of view and an aspect ratio that matches the viewport
let camera = new THREE.Camera(30, window.innerWidth / window.innerHeight, 0.3, 2000);
camera.position.set(0, 0, 1000);
// move the camera 10 units back from the origin
console.log(camera.position);
camera.position.z = 20;
// camera.Translate(0, 0, -10);

// create the renderer
let renderer = new THREE.WebGLRenderer({ alpha: true });

function v(x,y,z){ return new THREE.Vector3(x,y,z); }

function drawScatter(){
  // make the renderer fill the viewport
  renderer.setSize(canvas_width, canvas_height);

  // add the DOM element that the renderer will draw to to the page
  let canvas = document.getElementById("canvas_holder");
  canvas.appendChild(renderer.domElement);

  let controls = new THREE.OrbitControls( camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  // set the background color to almost-white
  renderer.setClearColor(0x00bcd4, 1.0);
  renderer.clear();

  let scatterPlot = new THREE.Object3D();
  scene.add(scatterPlot);

  scatterPlot.rotation.y = 0.5;

  const box_size = 50;
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
  $.getJSON("all_illust.json", function(data) {
    target_images = data.slice(0,100);
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

      let texture = loader.load("./thumbnails/" + d["id"] + ".png");

      let mat = new THREE.PointsMaterial(
        { color:0xFFFFFF,
          size: 30,
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
      pointGeo.vertices.push(new THREE.Vector3(x,y,z));

      let points = new THREE.Points(pointGeo, mat);
      pointGeo.name = d["id"].toString()
      points.name = d["id"].toString()

      scatterPlot.add(points);
    });
    console.log(scene.children);
  });

  // add a spotlight to the scene
  let light = new THREE.SpotLight();
  light.position.set( -10, 20, 16 );
  scene.add(light);

  const geometry = new THREE.SphereGeometry(100, 32, 32);

  renderer.setSize(canvas_width, canvas_height);
  controls.update();
  renderer.render(scene, camera);

  animate(new Date().getTime() * 0.0001);
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  // window.requestAnimationFrame(animate, renderer.domElement);

  function animate(t) {
    // update the aspect ratio and renderer size in case the window was resized
    camera = new THREE.PerspectiveCamera( 40, canvas_width / canvas_height, 0.3, 2000 );

    // request the next animation frame to render again
    window.requestAnimationFrame(animate, renderer.domElement);

    renderer.setSize(canvas_width, canvas_height);
    // spin the camera in a circle
    camera.position.x = Math.sin(t/3000)*250;
    camera.position.y = 100;
    camera.position.z = Math.cos(t/3000)*250;
    // point the camera at the origin
    camera.lookAt(scene.position);
    // render the scene again
    controls.update();
    renderer.setViewport(-1 * canvas_offset_x, 0,  canvas_width, canvas_height);
    renderer.render(scene, camera);
  };
}

function onDocumentMouseMove( event )
{
  // the following line would stop any other event handler from firing
  // (such as the mouse's TrackballControls)
  // event.preventDefault();
  let raycaster = new THREE.Raycaster();

  let mouse = THREE.Vector2;
  let mousePosition = calcMousePositionInCanvas(renderer.domElement, event);
  mouse.x = ((mousePosition[0] + canvas_offset_x) / canvas_width) * 2 - 1;
  mouse.y = - (mousePosition[1] / canvas_height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  let intersects = raycaster.intersectObjects(scene.children[0].children.slice(1), true);

  // scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000) );

  // console.log(intersects);
  if (intersects.length>0){
      intersects.forEach((item, i) => {
        // console.log('name is:' + item.object.name);
        // item.object.material.color.setHex( Math.random() * 0xffffff);

        let target_image = target_images.filter(img => img["id"] == item.object.name);

        document.getElementById("image_thumb").src = "http://embed.pixiv.net/decorate.php?illust_id=" + item.object.name + "&mode=sns-automator";

        if (target_image.length > 0){
          document.getElementById("image_title").innerHTML = target_image[0]["title"];
          document.getElementById("image_date").innerHTML = target_image[0]["date"].toString();
          document.getElementById("image_tags").innerHTML = target_image[0]["tags"].map( (tag) => "#" + tag["name"]).join(" ");

          document.getElementById("image_url").href = "https://www.pixiv.net/artworks/" + target_image[0]["id"];
        }
      });
  }
}

function calcMousePositionInCanvas(canvas, event) {
  let pos_x, pos_y;

  let offset = $(canvas).offset();
  pos_x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(offset.left);
  pos_y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(offset.top);
  return [pos_x, pos_y];
}
