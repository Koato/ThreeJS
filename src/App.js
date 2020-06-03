import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './main.css';

let escena, camara, renderer;
let controls;

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  
  //creando lo escena
  escena = new THREE.Scene();

  //creando la camara
  camara = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 100 );
  camara.position.z = 0.01;

  //habilito controles para movimiento de camara
  controls = new OrbitControls(camara, renderer.domElement);
  //desactivo el zoom
  controls.enableZoom = false;
  controls.enablePan = false;
  //habilito el efecto de transicion
  controls.enableDamping = true;
  //asigno una velocidad de rotacion
  controls.rotateSpeed = -0.25;
  //cargo la textura para el ambiente que tiene 6 fracciones
  let textures = getTexturesFromAtlasFile("textures/cube/sun_temple_stripe.jpg", 6);
  // let textures = getTexturesFromAtlasFile("textures/cube/sun_temple_stripe_stereo.jpg", 12);
  let materials = [];
  for (let i = 0; i < 6; i ++) {
    //agrego cada fraccion al arreglo
    materials.push(new THREE.MeshBasicMaterial( { map: textures[i]}));
  }

  //agrego la forma y la textura
  let skyBox = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), materials);
  skyBox.geometry.scale(1, 1, - 1);

  //agregando a la escena
  escena.add(skyBox);
  //controlando el evento del tamaño de la pagina
  window.addEventListener('resize', onWindowResize, false);
  //asignando la animacion
  animate();
}

function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {
  let textures = [];
  //facciono las taxturas
  for (let i = 0; i < tilesNum; i ++) {
    textures[ i ] = new THREE.Texture();
  }

  let imageObj = new Image();
  imageObj.onload = function () {
    let canvas, context;
    let tileWidth = imageObj.height;

    for (let i = 0; i < textures.length; i ++) {
      //creo un nuevo elemento en el DOM
      canvas = document.createElement('canvas');
      //asigno un contexto
      context = canvas.getContext('2d');
      canvas.height = tileWidth;
      canvas.width = tileWidth;
      //dibujo la imagen en el contexto
      context.drawImage(imageObj, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth);
      textures[ i ].image = canvas;
      textures[ i ].needsUpdate = true;
    }
  };
  imageObj.src = atlasImgUrl;
  return textures;
}

function onWindowResize() {
  camara.aspect = window.innerWidth / window.innerHeight;
  camara.updateProjectionMatrix();

  //tamaño de la imagen
  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
  requestAnimationFrame(animate);

  // animacion al cambiar de posicion
  controls.update(); // required when damping is enabled

  renderer.render(escena, camara);
}

function App() {
  return (
    <>
      {/* iniciando el evento */}
      {init()}
    </>
  );
}

export default App;
