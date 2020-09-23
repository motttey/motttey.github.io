<template>
  <v-container fluid>
    <h1>Gallery</h1>
    <h3>これまでに描いたイラストなどです. </h3>

    <v-row class="mb-6" align="center">
      <v-col sm="8" cols="12" v-resize="onResize">
        <div ref="canvas_holder" id="canvas_holder"
          @mousemove="onDocumentMouseMove($event)"
          @mouseup="onDocumentMouseMove($event)"
          @click="onTouch($event)"
          @touchend="onTouch($event)"
        >
        </div>
      </v-col>
      <v-col sm="4" cols="8" class="mx-auto">
        <v-card id="target_image">
          <a :href="target_illust.url">
            <v-img
              :src="target_illust.src"
              class="white--text align-end"
              aspect-ratio="1"
            >
            </v-img>
          </a>
          <v-card-actions>
           <v-spacer></v-spacer>
          </v-card-actions>

          <v-card-text>
            <h3>{{target_illust.title}}</h3>
            <p>{{target_illust.tags_text}}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import * as THREE from 'three/build/three.module.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { scaleSqrt } from "d3-scale";

  export default {
    data: () => ({
      target_illust: {
        title: 'dora1',
        date: '20200718',
        tags_text: '#doraemon',
        src: '/mochiduko-20/doraemon-namecard.png',
        url: 'https://www.pixiv.net/users/415546', flex: 12 },
      canvas_settings: {
        canvas_width: 1200,
        canvas_height: 650,
        canvas_offset_x: 0,
        canvas_offset_y: -50,
        box_size: 40,
        image_max: 120,
      },
      axes: ["tsne-X", "tsne-Y", "tsne-Z"],
      mouse: new THREE.Vector2(),
      target_images: [],
      renderer: new Object(),
      canvas: new Object(),
      scene: new THREE.Scene(),
      camera: new Object(),
      controls: new Object(),
      MOUNTED: false,
      INTERSECTED: false,
    }),
    mounted: function(){
      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      this.canvas = this.$refs.canvas_holder;
      this.canvas_settings.canvas_width = this.canvas.clientWidth;

      console.log(this.$el);
      this.canvas.appendChild(this.renderer.domElement);
      this.renderer.setSize(this.canvas_settings.canvas_width, this.canvas_settings.canvas_height);

      //カメラを作成
      this.camera = new THREE.PerspectiveCamera(45, this.canvas_settings.canvas_width / this.canvas_settings.canvas_height, 0.5, 1000);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 1;
      this.controls.dampingFactor = 0.25;
      this.controls.enableZoom = true;

      this.renderer.setSize(this.canvas_settings.canvas_width, this.canvas_settings.canvas_height);

      this.renderer.setClearColor(0x000000, 0.0);
      this.renderer.clear();

      this.drawScatter();
      this.renderScene();

      console.log(this.target_images);
      if (this.target_images.length > 0) this.setTargetImageProperties(this.target_images[0]);
      this.MOUNTED = true;
    },
    destroyed: function () {
    },
    methods: {
      v(x,y,z){ return new THREE.Vector3(x,y,z); },
      renderScene(){
        requestAnimationFrame(this.renderScene);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      },
      setTargetImageProperties(target_image){
        let new_target_img = {};
        this.target_illust .src = "http://embed.pixiv.net/decorate.php?illust_id=" + target_image["id"] + "&mode=sns-automator";

        this.target_illust .title = target_image["title"];
        this.target_illust .date = target_image["date"].toString();
        this.target_illust .tags_text = target_image["tags"].map( (tag) => "#" + tag["name"]).join(" ");

        this.target_illust .url  = "https://www.pixiv.net/artworks/" + target_image["id"];
      },
      calcMousePositionInCanvas(event) {
        let pos_x, pos_y;

        let offset_left = this.canvas.offsetLeft;
        let offset_top = this.canvas.offsetTop;

        pos_x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(offset_left);
        pos_y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(offset_top);
        return [pos_x, pos_y];
      },
      onDocumentMouseMove(e) {
        let mousePosition = this.calcMousePositionInCanvas(e);
        this.selectImage(mousePosition);
      },
      onTouch(e) {
        if (e.touches && e.touches.length > 0) {
          let mousePosition = this.calcMousePositionInCanvas(e.touches[0]);
          this.selectImage(mousePosition);
        } else if (e.changedTouches && e.changedTouches.length > 0) {
          let mousePosition = this.calcMousePositionInCanvas(e.changedTouches[0]);
          this.selectImage(mousePosition);
        }
      },
      selectImage(mousePos) {
        let raycaster = new THREE.Raycaster();
        this.mouse.x = ((mousePos[0] + this.canvas_settings.canvas_offset_x) /  this.canvas_settings.canvas_width) * 2 - 1;
        this.mouse.y = - ((mousePos[1] + this.canvas_settings.canvas_offset_y) / this.canvas_settings.canvas_height) * 2 + 1;

        raycaster.setFromCamera(this.mouse, this.camera);

        let children = this.scene.children[0].children;
        let intersects = raycaster.intersectObjects(children.slice(0, children.length-1), true);

        if (intersects.length > 0){
          intersects.forEach((item, i) => {
            console.log(item);
            console.log('name is:' + item.object.name);
            let target_image = this.target_images.filter(img => img["id"] == item.object.name);

            if (target_image.length > 0){
              this.setTargetImageProperties(target_image[0]);
            }
          });
        }
      },
      onResize() {
        if (!this.MOUNTED) return;
        // 高さは一定
        const width = this.canvas.clientWidth;
        const height = this.canvas_settings.canvas_height;
        this.renderer.setSize(width, height);

        // カメラのアスペクト比を正す
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      },
      async drawScatter(){
        let scatterPlot = new THREE.Object3D();
        let box_size = this.canvas_settings.box_size;
        let v = this.v;
        this.scene.add(scatterPlot);

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

        let coordinate_bounds = {}
        let axes = this.axes;
        await this.$axios.$get("https://motttey.github.io/gallery/all_illust.json").then(data => {
          console.log(data);

          this.target_images = data.slice(0, this.canvas_settings.image_max);

          axes.forEach((axis, i) => {
            coordinate_bounds[axis] = [
              Math.max.apply(Math, this.target_images.map(function(o) { return o[axis]; })),
              Math.min.apply(Math, this.target_images.map(function(o) { return o[axis]; }))
            ];
          });

          this.target_images.forEach(function (d) {
            const loader = new THREE.TextureLoader();
            loader.crossOrigin = true;
            let texture = loader.load("https://motttey.github.io/gallery/thumbnails/" + d["id"] + ".png");

            let mat = new THREE.PointsMaterial({
              color:0xFFFFFF,
              size: 20,
              transparent: true,
              map: texture,
            });

            let scales = axes.map(function (axis) {
              return scaleSqrt()
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
          // console.log(scene.children);
        }).catch(error => {
          console.log("response error", error)
        });
        // 1個イラストを表示する
        this.setTargetImageProperties(this.target_images[0])

        let lineMat = new THREE.LineBasicMaterial({color: 0xFFFFFF, linewidth: 1});
        let line = new THREE.Line(lineGeo, lineMat);
        scatterPlot.add(line);

        this.renderer.setSize(this.canvas_settings.canvas_width, this.canvas_settings.canvas_height);
        this.renderer.setViewport(-1 * this.canvas_settings.canvas_offset_x, 0,  this.canvas_settings.canvas_width, this.canvas_settings.canvas_height);

        this.controls.update();
        this.renderer.render(this.scene, this.camera);

        this.camera.position.set(100, 100, 100);
      }
    }
  }
</script>

<style>
#canvas_holder {
  width: 100%;
  /* height: 650px; */
}
#target_image {
  top: 0%;
  background-color: none;
}
</style>
