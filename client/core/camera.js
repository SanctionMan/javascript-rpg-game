import { ArcRotateCamera, Vector3, TransformNode } from '@babylonjs/core';

export function createFollowCamera(scene, canvas, targetMesh) {
    // Create a transform node as camera root
    const cameraRoot = new TransformNode('cameraRoot', scene);
    cameraRoot.parent = targetMesh;
    cameraRoot.position = new Vector3(0, 1.5, 0);

    // ArcRotateCamera around the root
    const camera = new ArcRotateCamera(
        'playerCam',
        Math.PI / 2,
        Math.PI / 3,
        8,
        cameraRoot.position.clone(),
        scene
    );

    // Limits
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 30;
    camera.wheelPrecision = 25;
    camera.lowerBetaLimit = 0.2;
    camera.upperBetaLimit = Math.PI / 1.7;
    camera.inertia = 0.6;
    camera.panningInertia = 0.9;

    // Rotate only with middle mouse
    camera.inputs.attached.pointers.buttons = [1];
    camera.attachControl(canvas, true);

    const followSmoothness = 0.2;
    const rotationSmoothness = 0.05;
    let lastPlayerForward = new Vector3(0, 0, 1);
    let autoRotateEnabled = true;

    scene.onBeforeRenderObservable.add(() => {
        if (!targetMesh || !targetMesh.position) return;

        // Smoothly follow player
        const desiredRootPos = targetMesh.position.add(new Vector3(0, 1.5, 0));
        cameraRoot.position = Vector3.Lerp(cameraRoot.position, desiredRootPos, followSmoothness);
        camera.target = cameraRoot.position;

        // Auto-rotate behind player
        if (autoRotateEnabled && camera.inputs.attached?.pointers && !camera.inputs.attached.pointers.isPointerPressed) {
            const playerForward = new Vector3(0, 0, 1);
            const worldMatrix = targetMesh.getWorldMatrix();
            const forward = Vector3.TransformNormal(playerForward, worldMatrix);
            forward.y = 0;
            forward.normalize();

            const desiredAlpha = Math.atan2(forward.x, forward.z) + Math.PI;
            let delta = desiredAlpha - camera.alpha;
            delta = ((delta + Math.PI) % (2 * Math.PI)) - Math.PI; // wrap-around
            camera.alpha += delta * rotationSmoothness;

            lastPlayerForward.copyFrom(forward);
        }
    });

    scene.activeCamera = camera;
    return camera;
}