'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Music, Volume2, VolumeX, ArrowDown } from 'lucide-react';
import { playBoxOpenChime, startAmbientMusic } from '@/lib/audio';

interface KeepsakeBoxProps {
  onOpened: () => void;
}

export default function ThreeKeepsakeBox({ onOpened }: KeepsakeBoxProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isOpenStarted, setIsOpenStarted] = useState(false);
  const [isOpeningFinished, setIsOpeningFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const boxGroupRef = useRef<THREE.Group | null>(null);
  const lidGroupRef = useRef<THREE.Group | null>(null);
  const cardMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Gift Ribbon & Bow Refs for Untying Animation
  const ribbonGroupRef = useRef<THREE.Group | null>(null);
  const bowKnotRef = useRef<THREE.Mesh | null>(null);
  const bowLoopLeftRef = useRef<THREE.Mesh | null>(null);
  const bowLoopRightRef = useRef<THREE.Mesh | null>(null);
  const bowInnerLeftRef = useRef<THREE.Mesh | null>(null);
  const bowInnerRightRef = useRef<THREE.Mesh | null>(null);
  const tailLeftRef = useRef<THREE.Mesh | null>(null);
  const tailRightRef = useRef<THREE.Mesh | null>(null);

  const topBandLRef = useRef<THREE.Mesh | null>(null);
  const topBandRRef = useRef<THREE.Mesh | null>(null);
  const topBandFRef = useRef<THREE.Mesh | null>(null);
  const topBandBRef = useRef<THREE.Mesh | null>(null);

  const sideBandFRef = useRef<THREE.Mesh | null>(null);
  const sideBandBRef = useRef<THREE.Mesh | null>(null);
  const sideBandLRef = useRef<THREE.Mesh | null>(null);
  const sideBandRRef = useRef<THREE.Mesh | null>(null);

  const ribbonMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const ribbonInnerMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0xFDF6ED, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Ambient & Directional Lighting for Royal Gold & Ivory Realism
    const ambientLight = new THREE.AmbientLight(0xFFFAF0, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xFFF0D0, 2.5);
    mainLight.position.set(3, 6, 4);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xA1BC98, 1.0);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xD4AF37, 2.0, 10);
    rimLight.position.set(0, 3, -2);
    scene.add(rimLight);

    // 4. Create Procedural Gold Foil Monogram Texture ("A + R" and Floral Artwork)
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Soft Ivory Leather Background
      ctx.fillStyle = '#F5ECE1';
      ctx.fillRect(0, 0, 1024, 1024);

      // Gold Foil Metallic Gradient
      const goldGrad = ctx.createLinearGradient(100, 100, 924, 924);
      goldGrad.addColorStop(0, '#B8860B');
      goldGrad.addColorStop(0.3, '#E6CA65');
      goldGrad.addColorStop(0.5, '#AA771C');
      goldGrad.addColorStop(0.8, '#F3E5AB');
      goldGrad.addColorStop(1, '#996515');

      // Outer Gold Foil Filigree Border
      ctx.strokeStyle = goldGrad;
      ctx.lineWidth = 12;
      ctx.strokeRect(60, 60, 904, 904);

      ctx.lineWidth = 4;
      ctx.strokeRect(80, 80, 864, 864);

      // Botanical Corner Engravings
      const drawCornerPattern = (x: number, y: number, angle: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(40, 40, 100, 10);
        ctx.quadraticCurveTo(40, 40, 10, 100);
        ctx.strokeStyle = goldGrad;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.restore();
      };

      drawCornerPattern(100, 100, 0);
      drawCornerPattern(924, 100, Math.PI / 2);
      drawCornerPattern(924, 924, Math.PI);
      drawCornerPattern(100, 924, -Math.PI / 2);

      // Central Royal Monogram "A + R"
      ctx.font = '600 130px "Cormorant Garamond", serif';
      ctx.fillStyle = goldGrad;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(170, 119, 28, 0.4)';
      ctx.shadowBlur = 10;
      ctx.fillText('A  +  R', 512, 470);

      // Subtitle
      ctx.font = '400 36px "Cinzel", serif';
      ctx.letterSpacing = '6px';
      ctx.fillText('ASHLY  &  ROSHIN', 512, 600);

      ctx.font = 'italic 30px "Cormorant Garamond", serif';
      ctx.fillText('Engagement Invitation', 512, 660);
    }

    const lidTexture = new THREE.CanvasTexture(canvas);
    lidTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 5. Materials
    const ivoryMaterial = new THREE.MeshStandardMaterial({
      color: 0xFDF6ED,
      roughness: 0.35,
      metalness: 0.05,
    });

    const goldTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      roughness: 0.2,
      metalness: 0.85,
    });

    const lidMaterial = new THREE.MeshStandardMaterial({
      map: lidTexture,
      roughness: 0.3,
      metalness: 0.15,
    });

    const innerVelvetMaterial = new THREE.MeshStandardMaterial({
      color: 0x778873, // Luxury Dark Sage Velvet Inside
      roughness: 0.8,
      metalness: 0.05,
    });

    // 6. Build the Keepsake Box Geometry Group
    const boxGroup = new THREE.Group();
    boxGroupRef.current = boxGroup;

    // Box Base Dimensions
    const boxWidth = 2.6;
    const boxHeight = 0.6;
    const boxDepth = 1.9;

    // Main Box Outer Shell
    const baseGeo = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const baseMesh = new THREE.Mesh(baseGeo, ivoryMaterial);
    baseMesh.position.y = -boxHeight / 2;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    boxGroup.add(baseMesh);

    // Inner Velvet Lining
    const innerGeo = new THREE.BoxGeometry(boxWidth - 0.12, boxHeight - 0.05, boxDepth - 0.12);
    const innerMesh = new THREE.Mesh(innerGeo, innerVelvetMaterial);
    innerMesh.position.y = -boxHeight / 2 + 0.04;
    boxGroup.add(innerMesh);

    // Gold Beveled Edges
    const trimBottom = new THREE.Mesh(
      new THREE.BoxGeometry(boxWidth + 0.04, 0.05, boxDepth + 0.04),
      goldTrimMaterial
    );
    trimBottom.position.y = -boxHeight;
    boxGroup.add(trimBottom);

    const trimRim = new THREE.Mesh(
      new THREE.BoxGeometry(boxWidth + 0.02, 0.04, boxDepth + 0.02),
      goldTrimMaterial
    );
    trimRim.position.y = 0.01;
    boxGroup.add(trimRim);

    // 7. Hinged Lid Group
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0, -boxDepth / 2); // Back hinge pivot point
    lidGroupRef.current = lidGroup;

    const lidGeo = new THREE.BoxGeometry(boxWidth + 0.04, 0.08, boxDepth + 0.04);
    // Apply monogram texture on top face of lid
    const lidMaterials = [
      ivoryMaterial, // Right
      ivoryMaterial, // Left
      lidMaterial,   // Top
      goldTrimMaterial, // Bottom
      ivoryMaterial, // Front
      ivoryMaterial  // Back
    ];
    const lidMesh = new THREE.Mesh(lidGeo, lidMaterials);
    lidMesh.position.set(0, 0.04, boxDepth / 2); // Offset from hinge pivot
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    boxGroup.add(lidGroup);

    // --- 7.5. GIFT RIBBON & SATIN BOW ATTACHMENT ---
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      roughness: 0.22,
      metalness: 0.8,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide,
    });
    ribbonMatRef.current = ribbonMat;

    const ribbonInnerMat = new THREE.MeshStandardMaterial({
      color: 0xC5A059,
      roughness: 0.28,
      metalness: 0.7,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide,
    });
    ribbonInnerMatRef.current = ribbonInnerMat;

    const ribbonGroup = new THREE.Group();
    ribbonGroupRef.current = ribbonGroup;

    // Horizontal Ribbon across Lid (X-axis) - Left & Right Halves
    const topBandL = new THREE.Mesh(
      new THREE.BoxGeometry(boxWidth / 2 + 0.02, 0.015, 0.24),
      ribbonMat
    );
    topBandL.position.set(-(boxWidth / 4 + 0.01), 0.088, 0);
    topBandL.castShadow = true;
    ribbonGroup.add(topBandL);
    topBandLRef.current = topBandL;

    const topBandR = new THREE.Mesh(
      new THREE.BoxGeometry(boxWidth / 2 + 0.02, 0.015, 0.24),
      ribbonMat
    );
    topBandR.position.set(boxWidth / 4 + 0.01, 0.088, 0);
    topBandR.castShadow = true;
    ribbonGroup.add(topBandR);
    topBandRRef.current = topBandR;

    // Longitudinal Ribbon across Lid (Z-axis) - Front & Back Halves
    const topBandF = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.015, boxDepth / 2 + 0.02),
      ribbonMat
    );
    topBandF.position.set(0, 0.088, boxDepth / 4 + 0.01);
    topBandF.castShadow = true;
    ribbonGroup.add(topBandF);
    topBandFRef.current = topBandF;

    const topBandB = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.015, boxDepth / 2 + 0.02),
      ribbonMat
    );
    topBandB.position.set(0, 0.088, -(boxDepth / 4 + 0.01));
    topBandB.castShadow = true;
    ribbonGroup.add(topBandB);
    topBandBRef.current = topBandB;

    // Vertical Ribbon Strips down the side walls of base
    const sideBandF = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, boxHeight + 0.08, 0.015),
      ribbonMat
    );
    sideBandF.position.set(0, -boxHeight / 2 + 0.04, boxDepth / 2 + 0.025);
    ribbonGroup.add(sideBandF);
    sideBandFRef.current = sideBandF;

    const sideBandB = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, boxHeight + 0.08, 0.015),
      ribbonMat
    );
    sideBandB.position.set(0, -boxHeight / 2 + 0.04, -(boxDepth / 2 + 0.025));
    ribbonGroup.add(sideBandB);
    sideBandBRef.current = sideBandB;

    const sideBandL = new THREE.Mesh(
      new THREE.BoxGeometry(0.015, boxHeight + 0.08, 0.24),
      ribbonMat
    );
    sideBandL.position.set(-(boxWidth / 2 + 0.025), -boxHeight / 2 + 0.04, 0);
    ribbonGroup.add(sideBandL);
    sideBandLRef.current = sideBandL;

    const sideBandR = new THREE.Mesh(
      new THREE.BoxGeometry(0.015, boxHeight + 0.08, 0.24),
      ribbonMat
    );
    sideBandR.position.set(boxWidth / 2 + 0.025, -boxHeight / 2 + 0.04, 0);
    ribbonGroup.add(sideBandR);
    sideBandRRef.current = sideBandR;

    // Bow Center Knot
    const bowKnot = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      ribbonInnerMat
    );
    bowKnot.position.set(0, 0.13, 0);
    bowKnot.scale.set(1.2, 0.7, 0.9);
    bowKnot.castShadow = true;
    bowKnotRef.current = bowKnot;
    ribbonGroup.add(bowKnot);

    // Left & Right Main Bow Loops
    const loopGeo = new THREE.TorusGeometry(0.26, 0.048, 16, 32, Math.PI * 1.6);

    const bowLoopLeft = new THREE.Mesh(loopGeo, ribbonMat);
    bowLoopLeft.position.set(-0.2, 0.18, 0);
    bowLoopLeft.rotation.set(Math.PI / 12, -Math.PI / 8, Math.PI / 3.8);
    bowLoopLeft.castShadow = true;
    bowLoopLeftRef.current = bowLoopLeft;
    ribbonGroup.add(bowLoopLeft);

    const bowLoopRight = new THREE.Mesh(loopGeo, ribbonMat);
    bowLoopRight.position.set(0.2, 0.18, 0);
    bowLoopRight.rotation.set(Math.PI / 12, Math.PI / 8, -Math.PI / 3.8);
    bowLoopRight.castShadow = true;
    bowLoopRightRef.current = bowLoopRight;
    ribbonGroup.add(bowLoopRight);

    // Inner Accent Loops
    const innerLoopGeo = new THREE.TorusGeometry(0.17, 0.038, 16, 32, Math.PI * 1.6);

    const bowInnerLeft = new THREE.Mesh(innerLoopGeo, ribbonInnerMat);
    bowInnerLeft.position.set(-0.14, 0.15, 0.04);
    bowInnerLeft.rotation.set(Math.PI / 8, -Math.PI / 6, Math.PI / 4);
    bowInnerLeftRef.current = bowInnerLeft;
    ribbonGroup.add(bowInnerLeft);

    const bowInnerRight = new THREE.Mesh(innerLoopGeo, ribbonInnerMat);
    bowInnerRight.position.set(0.14, 0.15, 0.04);
    bowInnerRight.rotation.set(Math.PI / 8, Math.PI / 6, -Math.PI / 4);
    bowInnerRightRef.current = bowInnerRight;
    ribbonGroup.add(bowInnerRight);

    // Ribbon Tails
    const tailGeo = new THREE.PlaneGeometry(0.2, 0.65, 8, 8);
    const posAttr = tailGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const yVal = posAttr.getY(i);
      posAttr.setZ(i, Math.sin((yVal + 0.3) * 3) * 0.08);
    }
    tailGeo.computeVertexNormals();

    const tailLeft = new THREE.Mesh(tailGeo, ribbonMat);
    tailLeft.position.set(-0.16, -0.1, 0.28);
    tailLeft.rotation.set(-Math.PI / 6, 0.2, 0.25);
    tailLeft.castShadow = true;
    tailLeftRef.current = tailLeft;
    ribbonGroup.add(tailLeft);

    const tailRight = new THREE.Mesh(tailGeo, ribbonMat);
    tailRight.position.set(0.16, -0.1, 0.28);
    tailRight.rotation.set(-Math.PI / 6, -0.2, -0.25);
    tailRight.castShadow = true;
    tailRightRef.current = tailRight;
    ribbonGroup.add(tailRight);

    boxGroup.add(ribbonGroup);

    // 8. Invitation Card Inside Box
    const cardCanvas = document.createElement('canvas');
    cardCanvas.width = 512;
    cardCanvas.height = 768;
    const cCtx = cardCanvas.getContext('2d');
    if (cCtx) {
      cCtx.fillStyle = '#FDF6ED';
      cCtx.fillRect(0, 0, 512, 768);

      cCtx.strokeStyle = '#D4AF37';
      cCtx.lineWidth = 6;
      cCtx.strokeRect(20, 20, 472, 728);

      cCtx.font = '600 60px "Cormorant Garamond", serif';
      cCtx.fillStyle = '#778873';
      cCtx.textAlign = 'center';
      cCtx.fillText('ASHLY & ROSHIN', 256, 200);

      cCtx.font = '400 24px "Cinzel", serif';
      cCtx.fillStyle = '#AA771C';
      cCtx.fillText('ENGAGEMENT CEREMONY', 256, 270);

      cCtx.font = '400 20px "Plus Jakarta Sans", sans-serif';
      cCtx.fillStyle = '#778873';
      cCtx.fillText('15 AUGUST 2026', 256, 380);
      cCtx.fillText('ST. JOSEPH\'S CHURCH & MANGALATH RESORTS', 256, 420);

      cCtx.font = 'italic 22px "Cormorant Garamond", serif';
      cCtx.fillText('Tap to enter experience', 256, 560);
    }
    const cardTexture = new THREE.CanvasTexture(cardCanvas);

    const cardGeo = new THREE.PlaneGeometry(boxWidth - 0.25, boxDepth - 0.25);
    const cardMat = new THREE.MeshStandardMaterial({
      map: cardTexture,
      side: THREE.DoubleSide,
      roughness: 0.4,
    });
    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    cardMesh.rotation.x = -Math.PI / 2;
    cardMesh.position.set(0, -0.15, 0);
    cardMeshRef.current = cardMesh;
    boxGroup.add(cardMesh);

    // 9. Floating Floral Particles Engine in 3D
    const particleCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pRotations = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 6;
      pPositions[i + 1] = (Math.random() - 0.5) * 4 + 1;
      pPositions[i + 2] = (Math.random() - 0.5) * 6;

      pRotations[i] = Math.random() * Math.PI;
      pRotations[i + 1] = Math.random() * Math.PI;
      pRotations[i + 2] = Math.random() * Math.PI;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    // Soft Gold / Rose Petal Canvas Particle Sprite
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      pCtx.beginPath();
      pCtx.arc(32, 32, 24, 0, Math.PI * 2);
      pCtx.fillStyle = '#E6CA65';
      pCtx.fill();
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const pMat = new THREE.PointsMaterial({
      size: 0.12,
      map: pTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    particlesRef.current = particles;
    scene.add(particles);

    // Initial Box Angle Slight Rotation
    boxGroup.rotation.y = -Math.PI / 12;
    boxGroup.rotation.x = Math.PI / 18;
    scene.add(boxGroup);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle Gentle Floating
      if (boxGroupRef.current && !isOpenStarted) {
        boxGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
        boxGroupRef.current.rotation.y = -Math.PI / 12 + Math.cos(elapsedTime * 0.8) * 0.06;
      }

      // Animate Particles
      if (particlesRef.current) {
        const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < pos.length; i += 3) {
          pos[i] -= 0.003;
          if (pos[i] < -2) pos[i] = 3;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isOpenStarted]);

  // Handle Tap To Untie Ribbon & Open Sequence
  const handleOpenClick = () => {
    if (isOpenStarted) return;
    setIsOpenStarted(true);

    if (soundEnabled) {
      startAmbientMusic();
      playBoxOpenChime();
    }

    const startTime = performance.now();
    const duration = 3200; // 3.2s smooth luxury untying & box opening sequence

    const animateOpening = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Custom Smooth Easing (cubic-bezier out)
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

      // --- 1. Ribbon Untying Sequence (0 to 0.45 progress) ---
      const ribbonProgress = Math.min(progress / 0.42, 1);
      const ribbonEase = 1 - Math.pow(1 - ribbonProgress, 2);

      if (ribbonProgress > 0) {
        // Knot unravels & dissolves
        if (bowKnotRef.current) {
          const kScale = Math.max(0, 1 - ribbonEase * 1.25);
          bowKnotRef.current.scale.set(1.2 * kScale, 0.7 * kScale, 0.9 * kScale);
          bowKnotRef.current.position.y = 0.13 + ribbonEase * 0.25;
        }

        // Bow Loops pull apart and unroll outward
        if (bowLoopLeftRef.current) {
          bowLoopLeftRef.current.position.x = -0.2 - ribbonEase * 1.6;
          bowLoopLeftRef.current.position.y = 0.18 + ribbonEase * 0.35;
          bowLoopLeftRef.current.rotation.z = Math.PI / 3.8 + ribbonEase * Math.PI * 0.8;
          bowLoopLeftRef.current.rotation.y = -Math.PI / 8 - ribbonEase * 0.8;
        }
        if (bowLoopRightRef.current) {
          bowLoopRightRef.current.position.x = 0.2 + ribbonEase * 1.6;
          bowLoopRightRef.current.position.y = 0.18 + ribbonEase * 0.35;
          bowLoopRightRef.current.rotation.z = -Math.PI / 3.8 - ribbonEase * Math.PI * 0.8;
          bowLoopRightRef.current.rotation.y = Math.PI / 8 + ribbonEase * 0.8;
        }
        if (bowInnerLeftRef.current) {
          bowInnerLeftRef.current.position.x = -0.14 - ribbonEase * 1.3;
          bowInnerLeftRef.current.position.y = 0.15 + ribbonEase * 0.2;
        }
        if (bowInnerRightRef.current) {
          bowInnerRightRef.current.position.x = 0.14 + ribbonEase * 1.3;
          bowInnerRightRef.current.position.y = 0.15 + ribbonEase * 0.2;
        }

        // Ribbon Tails float down & curl away
        if (tailLeftRef.current) {
          tailLeftRef.current.position.x = -0.16 - ribbonEase * 0.9;
          tailLeftRef.current.position.y = -0.1 - ribbonEase * 0.6;
          tailLeftRef.current.position.z = 0.28 + ribbonEase * 0.5;
          tailLeftRef.current.rotation.z = 0.25 + ribbonEase * 0.8;
        }
        if (tailRightRef.current) {
          tailRightRef.current.position.x = 0.16 + ribbonEase * 0.9;
          tailRightRef.current.position.y = -0.1 - ribbonEase * 0.6;
          tailRightRef.current.position.z = 0.28 + ribbonEase * 0.5;
          tailRightRef.current.rotation.z = -0.25 - ribbonEase * 0.8;
        }

        // Top Bands slide away off lid center
        if (topBandLRef.current) {
          topBandLRef.current.position.x = -(2.6 / 4 + 0.01) - ribbonEase * 1.3;
          topBandLRef.current.rotation.z = ribbonEase * 0.6;
        }
        if (topBandRRef.current) {
          topBandRRef.current.position.x = (2.6 / 4 + 0.01) + ribbonEase * 1.3;
          topBandRRef.current.rotation.z = -ribbonEase * 0.6;
        }
        if (topBandFRef.current) {
          topBandFRef.current.position.z = (1.9 / 4 + 0.01) + ribbonEase * 1.3;
          topBandFRef.current.rotation.x = ribbonEase * 0.6;
        }
        if (topBandBRef.current) {
          topBandBRef.current.position.z = -(1.9 / 4 + 0.01) - ribbonEase * 1.3;
          topBandBRef.current.rotation.x = -ribbonEase * 0.6;
        }

        // Side Bands curl outward & drop
        if (sideBandFRef.current) {
          sideBandFRef.current.position.z = (1.9 / 2 + 0.025) + ribbonEase * 0.6;
          sideBandFRef.current.rotation.x = ribbonEase * 0.8;
        }
        if (sideBandBRef.current) {
          sideBandBRef.current.position.z = -(1.9 / 2 + 0.025) - ribbonEase * 0.6;
          sideBandBRef.current.rotation.x = -ribbonEase * 0.8;
        }
        if (sideBandLRef.current) {
          sideBandLRef.current.position.x = -(2.6 / 2 + 0.025) - ribbonEase * 0.6;
          sideBandLRef.current.rotation.z = -ribbonEase * 0.8;
        }
        if (sideBandRRef.current) {
          sideBandRRef.current.position.x = (2.6 / 2 + 0.025) + ribbonEase * 0.6;
          sideBandRRef.current.rotation.z = ribbonEase * 0.8;
        }

        // Fade ribbon materials smoothly
        if (ribbonMatRef.current) {
          ribbonMatRef.current.opacity = Math.max(0, 1 - ribbonEase * 1.25);
        }
        if (ribbonInnerMatRef.current) {
          ribbonInnerMatRef.current.opacity = Math.max(0, 1 - ribbonEase * 1.25);
        }
      }

      // --- 2. Box Lid Opening Sequence (0.18 to 1.0 progress) ---
      const lidProgress = Math.max(0, (progress - 0.18) / 0.82);
      const easedLidProgress = easeOut(lidProgress);

      if (boxGroupRef.current) {
        boxGroupRef.current.position.y = easedLidProgress * 0.4;
        boxGroupRef.current.rotation.x = Math.PI / 18 * (1 - easedLidProgress);
        boxGroupRef.current.rotation.y = -Math.PI / 12 * (1 - easedLidProgress);
      }

      if (lidGroupRef.current) {
        lidGroupRef.current.rotation.x = -easedLidProgress * 2.1;
      }

      // --- 3. Invitation Card Rising Sequence (0.35 to 1.0 progress) ---
      if (cardMeshRef.current && progress > 0.35) {
        const cardProgress = easeOut((progress - 0.35) / 0.65);
        cardMeshRef.current.position.y = -0.15 + cardProgress * 0.8;
        cardMeshRef.current.rotation.x = -Math.PI / 2 * (1 - cardProgress) - 0.2 * cardProgress;
        cardMeshRef.current.scale.set(1 + cardProgress * 0.25, 1 + cardProgress * 0.25, 1);
      }

      // --- 4. Camera Smooth Zoom ---
      if (cameraRef.current) {
        cameraRef.current.position.z = 5.5 - easedLidProgress * 2.2;
        cameraRef.current.position.y = 1.2 - easedLidProgress * 0.4;
      }

      if (progress < 1) {
        requestAnimationFrame(animateOpening);
      } else {
        setIsOpeningFinished(true);
        setTimeout(() => {
          onOpened();
        }, 600);
      }
    };

    requestAnimationFrame(animateOpening);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FDF6ED] flex flex-col items-center justify-center select-none">
      {/* Background Soft Glow Radial Effect */}
      <div className="absolute inset-0 bg-radial from-[#F3E5AB]/20 via-[#FDF6ED] to-[#DCCFC0]/40 pointer-events-none" />

      {/* Sound Toggle Control in Opening Screen */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FDF6ED]/80 backdrop-blur-md border border-[#DCCFC0] text-[#778873] text-xs font-sans-clean tracking-wider uppercase shadow-sm hover:border-[#D4AF37] transition-all duration-300"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              <span>Music On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-[#778873]" />
              <span>Muted</span>
            </>
          )}
        </button>
      </div>

      {/* Monogram Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-10 text-center z-20 px-4"
      >
        <p className="font-display text-xs tracking-[0.3em] uppercase text-[#AA771C] mb-1">
          Exclusive Royal Invitation
        </p>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#778873] tracking-widest font-semibold">
          Ashly & Roshin
        </h1>
      </motion.div>

      {/* Three.js Canvas Container */}
      <div 
        ref={mountRef} 
        onClick={handleOpenClick}
        className="w-full h-[65vh] sm:h-[70vh] cursor-pointer touch-none z-10"
      />

      {/* Tap To Open Call To Action */}
      <AnimatePresence>
        {!isOpenStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onClick={handleOpenClick}
            className="absolute bottom-12 z-20 flex flex-col items-center gap-3 cursor-pointer group px-6"
          >
            {/* Pulsing Gold Button Ring */}
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#D4AF37]/30 via-[#A1BC98]/40 to-[#D4AF37]/30 blur-md animate-pulse-soft" />
              <button className="relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FDF6ED] via-[#FAF3E0] to-[#FDF6ED] border border-[#D4AF37]/60 text-[#778873] shadow-lg shadow-[#D4AF37]/10 flex items-center gap-3 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" style={{ animationDuration: '8s' }} />
                <span className="font-display text-xs tracking-[0.25em] uppercase font-bold text-[#AA771C]">
                  Untie Ribbon & Open
                </span>
                <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" style={{ animationDuration: '8s' }} />
              </button>
            </div>
            <p className="font-serif-luxury text-sm italic text-[#778873]/80">
              Untie the handcrafted gold ribbon & reveal the invitation
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opening Overlay Particles */}
      {isOpenStarted && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="w-full h-full bg-radial from-transparent via-[#FDF6ED]/40 to-[#FDF6ED] transition-opacity duration-1000" />
        </div>
      )}
    </div>
  );
}
