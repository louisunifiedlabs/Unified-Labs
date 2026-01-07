'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function FluidGridBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene Setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.0015)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, -10, 40)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Grid System
    const geometry = new THREE.PlaneGeometry(150, 150, 60, 60)

    // Custom Shader for "Liquid Grid"
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
        uColor: { value: new THREE.Color(0xffffff) }
      },
      wireframe: true,
      transparent: true,
      vertexShader: `
        uniform float uTime;
        uniform vec3 uMouse;
        varying float vElevation;

        void main() {
          vec3 newPos = position;

          float wave = sin(newPos.x * 0.1 + uTime * 0.5) * sin(newPos.y * 0.1 + uTime * 0.5) * 1.5;

          float dist = distance(uMouse.xy, newPos.xy);
          float radius = 25.0;
          float interaction = 0.0;

          if (dist < radius) {
            float strength = 1.0 - (dist / radius);
            interaction = sin(dist * 0.5 - uTime * 3.0) * strength * 5.0;
            newPos.z += interaction;
          }

          newPos.z += wave;
          vElevation = newPos.z + interaction;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vElevation;

        void main() {
          float alpha = 0.15 + (vElevation * 0.05);
          alpha = clamp(alpha, 0.05, 0.4);

          vec3 color = uColor + (vElevation * 0.02);

          gl_FragColor = vec4(color, alpha);
        }
      `
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Mouse Tracking
    const mouse = new THREE.Vector3()
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouse.set(x * 60, y * 60, 0)
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation Loop
    const clock = new THREE.Clock()
    let frameId: number

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      material.uniforms.uTime.value = time
      material.uniforms.uMouse.value.lerp(mouse, 0.1)
      mesh.rotation.z = time * 0.02

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (mount && renderer.domElement) mount.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 z-0 bg-black pointer-events-none" />
}
