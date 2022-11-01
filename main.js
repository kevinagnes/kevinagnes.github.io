const THREE = window.MINDAR.IMAGE.THREE;
import {mockWithVideo, mockWithImage} from './libs/camera-mock.js';
import {loadGLTF} from "./libs/loader.js";
import { Vector3 } from './libs/three.js-r132/build/three.module.js';
console.log(THREE);

let anchors = [];
const models = [
    ["./static/models/chair/scene.gltf", "Chair"],
    ["./static/models/musicband-raccoon/scene.gltf", "Raccoon"],
    ["./static/models/softmind/scene.gltf", "SoftMind"],
    ["./static/models/earring/scene.gltf", "Earring"],
    ["./static/models/robot/RobotExpressive.glb", "Robot"],
    ["./static/models/hat1/scene.gltf", "Hat"],
    ["./static/models/musicband-bear/scene.gltf", "Bear"]
]; 
const transforms = [
    // scale, rotation, position
    [new Vector3(0.30,0.30,0.30),new Vector3(0,0,0),new Vector3(0,0,0)],
    [new Vector3(0.15,0.15,0.15),new Vector3(0,0,0),new Vector3(0,0,0)],
    [new Vector3(0.01,0.01,0.01),new Vector3(0,0,0),new Vector3(0,0,0)],
    [new Vector3(0.40,0.40,0.40),new Vector3(0,0,0),new Vector3(0,0,0)],
    [new Vector3(0.40,0.40,0.40),new Vector3(0,0,0),new Vector3(0,0,0)],
    [new Vector3(0.10,0.10,0.10),new Vector3(0,0,0),new Vector3(0,0,0)],
    [new Vector3(0.15,0.15,0.15),new Vector3(0,0,0),new Vector3(0,0,0)]
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
        //mockWithVideo("./mock.mp4");

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './targets.mind'
        });

        const {renderer,scene,camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff,0xbbbbff,1);
        scene.add(light);

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