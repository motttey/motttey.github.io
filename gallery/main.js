// retrieved from: http://msbarry.github.io/threejs-tool-page/

window.onload = drawScatter;

function drawScatter(){
  // create the scene
  let scene = new THREE.Scene();
  const canvas_width = 1200;
  const canvas_height = 600;

  // create the camera with 45-degree field of view and an aspect ratio that matches the viewport
  let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.3, 2000);
  // move the camera 10 units back from the origin
  camera.position.z = 10;
  // create the renderer
  let renderer = new THREE.WebGLRenderer({ alpha: true });
  // make the renderer fill the viewport
  renderer.setSize(canvas_width, canvas_height);
  // add the DOM element that the renderer will draw to to the page
  console.log(document.body)
  document.getElementById("canvas_holder").appendChild(renderer.domElement);
  // set the background color to almost-white
  renderer.setClearColor(0x00bcd4, 1.0);
  renderer.clear();

  let scatterPlot = new THREE.Object3D();
  scene.add(scatterPlot);

  scatterPlot.rotation.y = 0.5;
  function v(x,y,z){ return new THREE.Vector3(x,y,z); }

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

    let coordinate_bounds = {}
    const axes = ["tsne-X", "tsne-Y", "tsne-Z"];
    axes.forEach((axis, i) => {
      coordinate_bounds[axis] = [
        Math.max.apply(Math, target_images.map(function(o) { return o[axis]; })),
        Math.min.apply(Math, target_images.map(function(o) { return o[axis]; }))
      ];
    });
    console.log(coordinate_bounds);

    target_images.forEach(function (d) {
      let texture = new THREE.TextureLoader().load("http://embed.pixiv.net/decorate.php?illust_id=" + d["id"] + "&mode=sns-automator");
      let mat = new THREE.PointsMaterial(
        { color:0xFFFFFF,
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
      pointGeo.vertices.push(new THREE.Vector3(x,y,z));

      let points = new THREE.Points(pointGeo, mat);
      scatterPlot.add(points);
    });
  });

  // add a spotlight to the scene
  let light = new THREE.SpotLight();
  light.position.set( -10, 20, 16 );
  scene.add(light);

  renderer.setSize(canvas_width, canvas_height);
  animate(new Date().getTime());

  function animate(t) {
    // update the aspect ratio and renderer size in case the window was resized
    camera = new THREE.PerspectiveCamera( 30, canvas_width / canvas_height, 0.3, 2000 );
    renderer.setSize(canvas_width, canvas_height);
    // spin the camera in a circle
    camera.position.x = Math.sin(t/3000)*300;
    camera.position.y = 100;
    camera.position.z = Math.cos(t/3000)*300;
    // point the camera at the origin
    camera.lookAt(scene.position);
    // render the scene again
    renderer.render(scene, camera);
    // request the next animation frame to render again
    window.requestAnimationFrame(animate, renderer.domElement);
  };
}
