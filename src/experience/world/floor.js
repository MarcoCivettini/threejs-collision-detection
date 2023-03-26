import Experience from "../experience";
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
// import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier';


export default class Floor {
    constructor() {
        this.Experience = new Experience();
        this.scene = this.Experience.scene;
        this.resources = this.Experience.resources;
        this.physicsWord = this.Experience.physicsWold;

        this.resource = this.resources.items.floorModel;
        this.setModel();
        this.createPhysicsWorld();
    }
    setModel() {
        this.model = this.resource.scene;
        this.scene.add(this.model);

        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })

    }

    createPhysicsWorld() {

        const mesh = this.model.children[0];
        console.log('mesh', this.model);
        // const terrainShape = new CANNON.Trimesh.createMeshShape(this.model.children[0].geometry);

        // const simplifyModifier = new SimplifyModifier();
        // const simplifiedGeometry = simplifyModifier.modify(mesh.geometry, 1);
        console.log(mesh.geometry.index.array.length);
        const shape = this.createShapeFromGeometry(mesh);

        const body = new CANNON.Body({
            mass: 0,
            // shape,
            // material: this.physicsWord.world.defaultMaterial
        });


        body.quaternion.setFromAxisAngle(
            new CANNON.Vec3(1, 0, 0),
            -Math.PI / 2
        )

        body.position.x = -15
        body.position.z = 15



        body.addShape(shape, new CANNON.Vec3());
        this.physicsWord.world.addBody(body);

    }

    createShapeFromGeometry(mesh) {
        const matrix = [];
        const scale = mesh.scale.x;
        const yScale = mesh.scale.y;
        const dimension = scale;


        for (let x = -dimension; x <= dimension; x++) {
            matrix.push([]);
            for (let z = -dimension; z <= dimension; z++) {
                const origin = new THREE.Vector3(x / scale, 1, z / scale).applyMatrix4(mesh.matrixWorld);
                const direction = new THREE.Vector3(0, -1, 0).transformDirection(mesh.matrixWorld);
                const raycaster = new THREE.Raycaster(origin, direction);
                const intersects = raycaster.intersectObject(mesh, false);

                if (intersects.length > 0) {
                    matrix[x + dimension][-z + dimension] = (intersects[0].point.y * yScale) + 6;
                } else {
                    matrix[x + dimension][-z + dimension] = 0;
                }
            }
        }

        const terrainShape = new CANNON.Heightfield(matrix,);

        return terrainShape;
    }

    // createShapeFromGeometry(geometry) {
    //     // Get the vertices and indices of the geometry
    //     const positions = geometry.attributes.position.array;
    //     console.log('pos',geometry.attributes.position.array[0])
    //     console.log('normal',geometry.attributes.normal.array[0])

    //     const indices = geometry.index.array;

    //     // Convert the positions and indices to cannon-es vectors and arrays
    //     const vertices = [];
    //     const dimension = 1;
    //     for (let i = 0; i < positions.length; i += 3) {
    //         const vertex = new CANNON.Vec3(positions[i] * dimension, positions[i +1] * dimension, positions[i + 2] * dimension);
    //         vertices.push(vertex);
    //     }
    //     const faces = [];
    //     for (let i = 0; i < indices.length; i += 3) {
    //         const face = [indices[i], indices[i + 1], indices[i + 2]];
    //         faces.push(face);
    //     }

    //     console.log(vertices, faces);


    //     // Create a CANNON.ConvexPolyhedron shape from the vertices and faces
    //     const shape = new CANNON.ConvexPolyhedron({ vertices: vertices, faces: faces });

    //     return shape;
    // }



}