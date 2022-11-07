const THREE = window.MINDAR.IMAGE.THREE;
import {mockWithVideo, mockWithImage} from './libs/camera-mock.js';
import {loadGLTF} from "./libs/loader.js";
import { Vector3, } from './libs/three.js-r132/build/three.module.js';
import { RGBELoader } from './libs/three.js-r132/examples/jsm/loaders/RGBELoader.js';
console.log(THREE);

let anchors = [];
const models = [
    ["./static/models/ExpoAR_Scenes/Guerra/Guerra.gltf", "Guerra"],
    ["./static/models/ExpoAR_Scenes/Adoracao/Adoracao.gltf", "Adoracao"],
    ["./static/models/ExpoAR_Scenes/Boqueirao/Boqueirao.gltf", "Boqueirao"],
    ["./static/models/ExpoAR_Scenes/Veado/Veado.gltf", "Veado"],
    ["./static/models/ExpoAR_Scenes/Beijo/Beijo.gltf", "Beijo"],
    ["./static/models/ExpoAR_Scenes/Acrobatas/Acrobatas.gltf", "Acrobatas"],
    ["./static/models/ExpoAR_Scenes/CacadaOnca/CacadaOnca.gltf", "CacadaOnca"]
]; 
const transforms = [
    // scale, rotation, position
    [new Vector3(1,1,1),new Vector3(0,0,0),new Vector3(0,0,0)],
    [new Vector3(1,1,1),new Vector3(0,0,0),new Vector3(0,0,0)],
    [new Vector3(1,1,1),new Vector3(0,0,0),new Vector3(0,0,0)],
    [new Vector3(1,1,1),new Vector3(0,0,0),new Vector3(0,0,0)],
    [new Vector3(1,1,1),new Vector3(0,0,0),new Vector3(0,0,0)],
    [new Vector3(1,1,1),new Vector3(0,0,0),new Vector3(0,0,0)],
    [new Vector3(1,1,1),new Vector3(0,0,0),new Vector3(0,0,0)]
]


async function LoadModelAttachToAnchorIndex(mindarThree, transform, model, index){
    // This is the anchor of the Marker Index 0
    const anchor = mindarThree.addAnchor(index);
    // Loading GLTF
    const gltf = await loadGLTF(model[0]);
    gltf.scene.transform
    gltf.scene.scale.copy(transform[0]);
    gltf.scene.rotation.copy(transform[1]);
    gltf.scene.position.copy(transform[2]);
    // Adding gltf1 to marker index 0 group
    anchor.group.add(gltf.scene);
    //anchors.push(anchor);
    anchor.onTargetFound = () => {
        console.log("Found anchor: "+ index +", name: " + model[1]);
    };
    anchor.onTargetLost = () => {
        console.log("Lost anchor: "+ index +", name: " + model[1]);
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const start = async () => {
        //mockWithImage();
        //mockWithVideo("./static/mov/test.mp4");

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './targets.mind',
            uiScanning: "no",
            //uiLoading: "no"
        });

        const {renderer,scene,camera} = mindarThree;

        AddLight(scene);

        for (let i=0;i<7;i++) {
            await LoadModelAttachToAnchorIndex(mindarThree, transforms[i], models[i],i);
        }

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }
    start();
});

function AddLight(scene){
    new RGBELoader()
    .setPath('./static/hdri/')
    .load('01.hdr', function ( texture ) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        let skyboxMat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
        fog: false,
        depthWrite: false,
        });
        //scene.background = texture;
        scene.environment = texture;
    }); 
}