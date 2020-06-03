import React from 'react';
import * as THREE from 'three';
import './App.css';

let escena, camara, renderer, cubo;

function init() {
  //creando lo escena
  escena = new THREE.Scene();
  escena.background = new THREE.Color(0x2a3b4c);

  //creando la camara
  camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);

  //renderizando
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //agregando geometria
  let geometria = new THREE.BoxGeometry();
  let material =  new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
  cubo =  new THREE.Mesh(geometria, material);

  //agregando el cubo a la escena
  escena.add(cubo);

  camara.position.z = 5;

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  //rotacion del cubo
  cubo.rotation.x += 0.01;
  cubo.rotation.y += 0.01;

  renderer.render(escena, camara);
}

function App() {
  return (
    <div className="App">
      {init()}
    </div>
  );
}

export default App;
