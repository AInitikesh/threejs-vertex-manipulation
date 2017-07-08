function init(){
    var scene = new THREE.Scene();
    
    var gui = new dat.GUI();
    var clock = new THREE.Clock();
    

    var planeMaterial = getMaterial('basic' , 'rgb(255, 255, 155)');
    var plane = getPlane(planeMaterial, 30, 60);
    
    plane.name = 'plane-1';
    
    plane.rotation.x =  - Math.PI/2;
 
    scene.add(plane);
    
    
    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );
    
    camera.position.z = 20;
	camera.position.x = 20;
	camera.position.y = 20;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
//    
    
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl').appendChild(renderer.domElement);
    
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    update(renderer, scene, camera, controls, clock);
    
    return scene;
}



function getPlane(material, size, segment){
    var geometry = new THREE.PlaneGeometry(size, size, segment, segment);
    
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    
    mesh.receiveShadow = true;
    return mesh;
}

function getMaterial(type, color){
    var selectedMaterial;
    var materialOptions = {
        color: color === undefined ? 'rgb(255,255,255)' : color,
        wireframe : true
        
    };
    switch(type){
        case 'basic':
            selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
            break;
        case 'phong':
            selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
            break;
        case 'lambert':
            selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
            break;
        case 'standard':
            selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
            break;
        default :
            selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
            break;
    }
    
    return selectedMaterial;
}

function update(renderer, scene, camera, controls, clock){
    renderer.render(
        scene,
        camera
    );
    controls.update();
    var elapsedTime = clock.getElapsedTime();
    
    var plane = scene.getObjectByName('plane-1');
    var planeGeo = plane.geometry;
    planeGeo.vertices.forEach(function(vertex, index){
        vertex.z += Math.sin(elapsedTime + index * 0.1) * 0.01;
    });
    planeGeo.verticesNeedUpdate = true;
    
    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls, clock);
    });
}

var scene = init();
