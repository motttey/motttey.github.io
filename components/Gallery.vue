<template>
  <v-container fluid id="Gallery">
    <h1>Gallery</h1>
    <h3>これまでに描いたイラストなどです. </h3>
    <v-row class="mb-6" align="center">
      <v-col sm="8" cols="12">
        <div class="d-flex flex-row align-baseline">
          <v-text-field
            class="mb-6 mr-6"
            v-model="tagName"
            hide-details
            single-line
            label="Input Tag Name"
            @submit.prevent
          >
          </v-text-field>
          <v-btn
            color="white"
            elevation="1"
            @click="addNewTag()"
            outlined
          >
            Filter
          </v-btn>
        </div>
        <v-chip
          v-for="(tag, index) in tags"
          :key="tag"
          filter
          outlined
          close
          @click:close="removeTag(index)"
        >
          {{ tag }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row class="mb-6" align="center">
      <v-col sm="8" cols="12" v-resize="onResize">
        <div ref="canvas_holder" id="canvas_holder"
          @mousemove="onDocumentMouseMove($event)"
          @click="onTouch($event)"
          @touchend="onTouch($event)"
        >
        </div>
      </v-col>
      <v-col sm="4" cols="8" class="mx-auto">
        <v-card id="target_image">
          <a :href="target_illust.url" target="_blank">
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
            <h2>{{target_illust.title}}</h2>
            <p>{{target_illust.date}}</p>
            <p>{{target_illust.tags_text}}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import * as THREE from 'three/build/three.module.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { scaleSqrt } from 'd3-scale';

  export default {
    data: () => ({
      tagName: '',
      tags: [],
      target_illust: {
        title: 'dora1',
        date: '20200718',
        tags_text: '#doraemon',
        src: '/doraemon-namecard.webp',
        url: 'https://www.pixiv.net/users/415546', flex: 12
      },
      canvas_settings: {
        canvas_width: 1200,
        canvas_height: 650,
        canvas_offset_x: 0,
        canvas_offset_y: -50,
        box_size: 40,
        image_max: 200,
      },
      api_url: 'https://mochiduko-api.netlify.app/',
      pixiv_embed: 'http://embed.pixiv.net/decorate.php',
      pixiv_artwork: 'https://www.pixiv.net/artworks/',
      axes: ['tsne-X', 'tsne-Y', 'tsne-Z'],
      mousePosition: [],
      target_images: [],
      renderer: new Object(),
      canvas: new Object(),
      scene: new THREE.Scene(),
      camera: new Object(),
      controls: new Object(),
      MOUNTED: false,
      INTERSECTED: false,
    }),
    watch: {
      mousePosition: function (val) {
        if (val) this.selectImage(val);
      }
    },
    mounted: function() {
      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      this.canvas = this.$refs.canvas_holder;
      this.canvas_settings.canvas_width = this.canvas.clientWidth;

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

      this.MOUNTED = true;
    },
    methods: {
      v(x,y,z){ return new THREE.Vector3(x,y,z); },
      renderScene(){
        requestAnimationFrame(this.renderScene);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      },
      setTargetImageProperties(target_image){
        this.target_illust.src = this.pixiv_embed + '?illust_id=' + target_image['id'] + '&mode=sns-automator';

        this.target_illust.title = target_image['title'];
        this.target_illust.date = target_image['date'];
        this.target_illust.tags_text = target_image['tags']
          .map((tag) => '#' + tag['name']).join(' ');

        this.target_illust.url  = this.pixiv_artwork + target_image['id'];
      },
      calcMousePositionInCanvas(event) {
        let pos_x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(this.canvas.offsetLeft);
        let pos_y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(this.canvas.offsetTop);

        pos_x = ((pos_x + this.canvas_settings.canvas_offset_x) /  this.canvas_settings.canvas_width) * 2 - 1;
        pos_y = - ((pos_y + this.canvas_settings.canvas_offset_y) / this.canvas_settings.canvas_height) * 2 + 1;

        return [pos_x, pos_y];
      },
      onDocumentMouseMove(e) {
        this.mousePosition = this.calcMousePositionInCanvas(e);
      },
      onTouch(e) {
        if (e.touches && e.touches.length > 0) {
          this.mousePosition = this.calcMousePositionInCanvas(e.touches[0]);
        } else if (e.changedTouches && e.changedTouches.length > 0) {
          this.mousePosition = this.calcMousePositionInCanvas(e.changedTouches[0]);
        }
      },
      async selectImage(mousePos) {
        let raycaster = new THREE.Raycaster();

        let mouse =  new THREE.Vector2(mousePos[0], mousePos[1]);
        raycaster.setFromCamera(mouse, this.camera);

        let children = this.scene.children[0].children;
        let intersects = raycaster
          .intersectObjects(children.slice(0, children.length-1), true)
          .filter(o => o.object.name &&  o.object.visible);

        if (intersects.length > 0){
          // console.log('name is:' + intersects[0].object.name);
          let target_image = this.target_images
            .filter(img => img['id'] == intersects[0].object.name);

          if (target_image.length === 0) return
          await this.setTargetImageProperties(target_image[0]);
        }
      },
      onResize() {
        if (!this.MOUNTED) return;
        // 高さは一定
        const width = this.canvas.clientWidth;
        const height = this.canvas_settings.canvas_height;
        this.renderer.setSize(this.canvas.clientWidth, this.canvas_settings.canvas_height);

        // カメラのアスペクト比を正す
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      },
      filterImage(){
        let children = this.scene.children[0].children;
        if (this.tags.length === 0) {
          children.forEach((child) => child.visible = true);
          return;
        };
        const filtered_image_indices = this.target_images
          .filter((image) => image.tags
            .some((tag) => this.tags.includes(tag.name))
          )
          .map((image) => image.id.toString());

        children.forEach((child) => {
          child.visible = (filtered_image_indices.includes(child.name)) ? true: false;
        });
      },
      addNewTag() {
        if (!this.tags.includes(this.tagName)) {
          this.tags.push(this.tagName);
          this.tagName = '';
          this.filterImage();
        }
      },
      removeTag(index) {
        this.tags.splice(index, 1);
        this.filterImage();
      },
      async drawScatter() {
        let scatterPlot = new THREE.Object3D();
        const box_size = this.canvas_settings.box_size;
        const v = this.v;
        this.scene.add(scatterPlot);

        // Draw the bounding box
        // let lineGeo = new THREE.Geometry();
        /*
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
        */

        let coordinate_bounds = {}
        let axes = this.axes;
        const api_url = this.api_url;
        await this.$axios.$get(api_url + 'each_illusts.json')
          .then(data => {
          this.target_images = data.slice(0, this.canvas_settings.image_max);

          axes.forEach((axis, i) => {
            coordinate_bounds[axis] = [
              Math.max.apply(Math, this.target_images.map(function(o) { return o[axis]; })),
              Math.min.apply(Math, this.target_images.map(function(o) { return o[axis]; }))
            ];
          });

          this.target_images.forEach(function (d) {
            const loader = new THREE.TextureLoader();
            loader.setCrossOrigin('anonymous');
            loader.load(api_url + 'thumbs/' + d['id'] + '.webp', function(texture){
              let mat = new THREE.PointsMaterial({
                color:0xFFFFFF,
                size: 20,
                transparent: true,
                map: texture,
              });

              let scales = axes.map((axis) => {
                return scaleSqrt()
                  .domain(coordinate_bounds[axis])
                  .range([-box_size, box_size]);
              });

              const points = [];
              let x = scales[0](d['tsne-X']);
              let y = scales[1](d['tsne-Y']);
              let z = scales[2](d['tsne-Z']);
              points.push(v(x,y,z))

              let pointGeo = new THREE.BufferGeometry().setFromPoints(points);
              let pointsObj = new THREE.Points(pointGeo, mat);
              pointGeo.name = d['id'].toString()
              pointsObj.name = d['id'].toString()

              scatterPlot.add(pointsObj);
            });
          });
        }).catch(error => {
          console.log('response error', error)
        });
        // 1個イラストを表示する
        this.setTargetImageProperties(this.target_images[0]);

        // let lineMat = new THREE.LineBasicMaterial({color: 0xFFFFFF, linewidth: 1});
        // let line = new THREE.Line(lineGeo, lineMat);
        // scatterPlot.add(line);

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
@media all and (min-width: 480px) { 
  #canvas_holder {
    width: 100%;
  }
}
@media all and (max-width: 480px) { 
  #canvas_holder {
    width: 90%;
    margin: 5%;
  }
}

#target_image {
  top: 0%;
  background-color: none;
}
</style>
