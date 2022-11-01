const THREE = window.MINDAR.IMAGE.THREE;
import {mockWithVideo, mockWithImage} from './libs/camera-mock.js';
import {loadGLTF} from "./libs/loader.js";
console.log(THREE);

const models = [
    "./static/models/chair/scene.gltf",
    "./static/models/musicband-raccoon/scene.gltf",
    "./static/models/softmind/scene.gltf",
    "./static/models/earring/scene.gltf",
    "./static/models/robot/RobotExpressive.glb",
    "./static/models/hat1/scene.gltf",
    "./static/models/musicband-bear/scene.gltf"  
] 

async function LoadModelAttachToAnchorIndex(mindarThree, fileLocation,index){
    // This is the anchor of the Marker Index 0
    const anchor = mindarThree.addAnchor(index);
    // Loading GLTF
    const gltf = await loadGLTF(fileLocation);
    gltf.scene.scale.set(0.1,0.1,0.1);
    gltf.scene.rotation.set(0,0,0);
    gltf.scene.position.set(0,-0.5,0);
    // Adding gltf1 to marker index 0 group
    anchor.group.add(gltf.scene);
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
            await LoadModelAttachToAnchorIndex(mindarThree, models[i],i);
        }


        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }
    start();
});