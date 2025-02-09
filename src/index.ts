import { KeyDisplay } from './utils';
import { CharacterControls } from './characterControls';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import page from 'page';
import { initializeRoutes } from './routes';

initializeRoutes();

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa8def0);

// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 5);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// CONTROLS
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.minDistance = 5;
orbitControls.maxDistance = 15;
orbitControls.enablePan = false;
orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
orbitControls.update();

// LIGHTS
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-60, 100, -10);
dirLight.castShadow = true;
scene.add(dirLight);

// FLOOR
generateFloor();

function generateFloor() {
    const textureLoader = new THREE.TextureLoader();
    const greenGrass = textureLoader.load("./textures/sand/greengrass.jpg");
    const sandHeightMap = textureLoader.load("./textures/sand/Sand 002_DISP.jpg");
    const sandAmbientOcclusion = textureLoader.load("./textures/sand/Sand 002_OCC.jpg");

    const WIDTH = 80;
    const LENGTH = 80;
    const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 512, 512);
    const material = new THREE.MeshStandardMaterial({
        map: greenGrass,
        normalMap: greenGrass,
        displacementMap: sandHeightMap,
        displacementScale: 0.1,
        aoMap: sandAmbientOcclusion
    });

    wrapAndRepeatTexture(material.map);
    wrapAndRepeatTexture(material.normalMap);
    wrapAndRepeatTexture(material.displacementMap);
    wrapAndRepeatTexture(material.aoMap);

    const floor = new THREE.Mesh(geometry, material);
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);
}

function wrapAndRepeatTexture(map: THREE.Texture) {
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(5, 5);
}

// CHARACTER CONTROLS
var characterControls: CharacterControls;
new GLTFLoader().load('models/RobotExpressive.glb', function (gltf) {
    const model = gltf.scene;
    model.traverse(function (object: any) {
        if (object.isMesh) object.castShadow = true;
    });
    scene.add(model);

    const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
    const mixer = new THREE.AnimationMixer(model);
    const animationsMap: Map<string, THREE.AnimationAction> = new Map();
    gltfAnimations.filter(a => a.name != 'TPose').forEach((a: THREE.AnimationClip) => {
        animationsMap.set(a.name, mixer.clipAction(a));
    });

    characterControls = new CharacterControls(model, mixer, animationsMap, orbitControls, camera, 'Idle');
});

// 🌳 LOAD TREE MODEL (ADD THIS CODE HERE)
new GLTFLoader().load('models/tree.glb', function (gltf) {
    const tree = gltf.scene;
    tree.traverse(function (object: any) {
        if (object.isMesh) object.castShadow = true;
    });

    tree.position.set(10, -2, 2);  // Adjust position
    tree.scale.set(2, 1, 2);       // Resize tree if needed

    scene.add(tree);
});

new GLTFLoader().load('models/tree.glb', function (gltf) {
    const tree = gltf.scene;
    tree.traverse(function (object: any) {
        if (object.isMesh) object.castShadow = true;
    });

    tree.position.set(32, -2, 5);  // Adjust position
    tree.scale.set(2, 1, 2);       // Resize tree if needed

    scene.add(tree);
});

new GLTFLoader().load('models/Tree GLB.glb', function (gltf) {
    const tree = gltf.scene;
    tree.traverse(function (object: any) {
        if (object.isMesh) object.castShadow = true;
    });

    tree.position.set(12, -2, 17);  // Adjust position
    tree.scale.set(2, 1, 2);       // Resize tree if needed

    scene.add(tree);
});
// 🌳 TREE 1 - Near Center
new GLTFLoader().load('models/tree.glb', function (gltf) {
    const tree = gltf.scene;
    tree.traverse(function (object: any) {
        if (object.isMesh) object.castShadow = true;
    });

    tree.position.set(-15, -2, 40);  // Adjusted position
    tree.scale.set(2, 2, 2);         // Adjusted size

    scene.add(tree);
});

// 🌳 TREE 2 - Closer to Task Area
new GLTFLoader().load('models/tree.glb', function (gltf) {
    const tree = gltf.scene;
    tree.traverse(function (object: any) {
        if (object.isMesh) object.castShadow = true;
    });

    tree.position.set(25, -2, -20);   // Adjusted position
    tree.scale.set(2.5, 2.5, 2.5);   // Adjusted size

    scene.add(tree);
});

// 🌳 TREE 3 - Near Weekly Challenge Board
new GLTFLoader().load('models/tree.glb', function (gltf) {
    const tree = gltf.scene;
    tree.traverse(function (object: any) {
        if (object.isMesh) object.castShadow = true;
    });

    tree.position.set(0, -2, 18);    // Adjusted position
    tree.scale.set(2, 2.2, 2);      // Adjusted size

    scene.add(tree);
});

// 🌳 TREE 4 - Near Rewards Board
new GLTFLoader().load('models/tree.glb', function (gltf) {
    const tree = gltf.scene;
    tree.traverse(function (object: any) {
        if (object.isMesh) object.castShadow = true;
    });

    tree.position.set(-20, -2, 50);  // Adjusted position
    tree.scale.set(2.5, 2.5, 2.5);  // Adjusted size

    scene.add(tree);
});

// 🌳 TREE 5 - Near Leaderboard
new GLTFLoader().load('models/tree.glb', function (gltf) {
    const tree = gltf.scene;
    tree.traverse(function (object: any) {
        if (object.isMesh) object.castShadow = true;
    });

    tree.position.set(5, -2, -5);    // Adjusted position
    tree.scale.set(1.8, 1.8, 1.8);  // Adjusted size

    scene.add(tree);
});

// 🌳 TREE 6 - Scattered Tree Near Entrance
new GLTFLoader().load('models/tree.glb', function (gltf) {
    const tree = gltf.scene;
    tree.traverse(function (object: any) {
        if (object.isMesh) object.castShadow = true;
    });

    tree.position.set(30, -2, 0);    // Adjusted position
    tree.scale.set(2, 2, 2);        // Adjusted size

    scene.add(tree);
});



// 🎯 TARGET POSITIONS
const leaderboardPosition = new THREE.Vector3(0, 1, -5);
const taskAreaPosition = new THREE.Vector3(18, 1, -25);
const rewardsPosition = new THREE.Vector3(-18, 1, -25);
const weeklyChallengePosition = new THREE.Vector3(0, 1, 10);
const triggerDistance = 2;

// 🎯 PROXIMITY CHECK
function checkProximity(targetPosition: THREE.Vector3, action: () => void) {
    if (!characterControls) return;
    const characterPosition = characterControls.model.position;
    const distance = characterPosition.distanceTo(targetPosition);
    
    if (distance <= triggerDistance) {
        action();
    }
}

// 🚀 REDIRECTION FUNCTIONS
function openCarbonFootprintPopup() {
    alert("🌍 Task of the Day: Track your Carbon Footprint!");
    setTimeout(() => page('/task'), 20);
}

function redirectToLeaderboardPage() {
    page('/leaderboard');
}

function redirectToRewardsPage() {
    page('/rewards');
}

// 📌 Weekly Challenge Popup Function
function openWeeklyChallengePopup() {
    alert("🌱 Weekly Challenge: No Plastic Week! 🌍");
}

// 🏆 BOARDS CREATION
const leaderboard = createBoard("🏆 Leaderboard", ["1. Player1: 100", "2. Player2: 80", "3. Player3: 60"], leaderboardPosition);
const taskBoard = createBoard("🌍 Task of the Day", ["🌱 Track your Carbon Footprint", "📉 Reduce your impact!"], taskAreaPosition);
const rewardsBoard = createBoard("🎁 Rewards", ["⭐ Points: 1250", "🎉 Tap to Redeem!"], rewardsPosition);
const weeklyChallengeBoard = createBoard("🌱 Weekly Challenge", ["No Plastic Week!", "♻️ Reduce Waste!"], weeklyChallengePosition);

function createBoard(title: string, content: string[], position: THREE.Vector3) {
    const boardCanvas = document.createElement('canvas');
    const boardCtx = boardCanvas.getContext('2d')!;
    boardCanvas.width = 512;
    boardCanvas.height = 350;

    boardCtx.clearRect(0, 0, boardCanvas.width, boardCanvas.height);
    const gradient = boardCtx.createLinearGradient(0, 0, 0, boardCanvas.height);
    gradient.addColorStop(0, "#3b3b3b");
    gradient.addColorStop(1, "#1a1a1a");

    boardCtx.fillStyle = gradient;
    boardCtx.fillRect(0, 0, boardCanvas.width, boardCanvas.height);

    boardCtx.strokeStyle = "gold";
    boardCtx.lineWidth = 6;
    boardCtx.strokeRect(0, 0, boardCanvas.width, boardCanvas.height);

    boardCtx.fillStyle = "white";
    boardCtx.font = "bold 40px Arial";
    boardCtx.fillText(title, 100, 50);

    boardCtx.font = "28px Arial";
    content.forEach((line, index) => {
        boardCtx.fillStyle = index === 0 ? "#FFD700" : "#C0C0C0";
        boardCtx.fillText(line, 50, 120 + index * 40);
    });

    const boardTexture = new THREE.CanvasTexture(boardCanvas);
    const boardMaterial = new THREE.MeshBasicMaterial({ map: boardTexture, side: THREE.DoubleSide });
    const boardGeometry = new THREE.PlaneGeometry(5, 2.5);
    const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
    boardMesh.position.copy(position);
    boardMesh.rotation.x = -0.1;

    scene.add(boardMesh);
    return boardMesh;
}

// 🔄 AUTO ORIENT BOARDS TO FACE CAMERA
function updateBoardsPosition() {
    leaderboard.lookAt(camera.position);
    taskBoard.lookAt(camera.position);
    rewardsBoard.lookAt(camera.position);
    weeklyChallengeBoard.lookAt(camera.position);
}

// 🎮 CONTROL KEYS & MOVEMENT HANDLING
const keysPressed: { [key: string]: boolean } = {};
const keyDisplayQueue = new KeyDisplay();

document.addEventListener('keydown', (event) => {
    keyDisplayQueue.down(event.key);
    if (event.shiftKey && characterControls) characterControls.switchRunToggle();
    else keysPressed[event.key.toLowerCase()] = true;
}, false);

document.addEventListener('keyup', (event) => {
    keyDisplayQueue.up(event.key);
    keysPressed[event.key.toLowerCase()] = false;
}, false);

// 🔄 ANIMATION FUNCTION
const clock = new THREE.Clock();

function animate() {
    let mixerUpdateDelta = clock.getDelta();
    if (characterControls) {
        characterControls.update(mixerUpdateDelta, keysPressed);
        checkProximity(leaderboardPosition, redirectToLeaderboardPage);
        checkProximity(taskAreaPosition, openCarbonFootprintPopup);
        checkProximity(rewardsPosition, redirectToRewardsPage);
        checkProximity(weeklyChallengePosition, openWeeklyChallengePopup);
    }
    orbitControls.update();
    updateBoardsPosition();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
