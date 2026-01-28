import React, { useState, useEffect, useRef } from 'react';
import { Shield, TrendingUp, Globe, Layers, ArrowRight, Activity, Cpu, Lock, X, Menu, ChevronDown, Coins } from 'lucide-react';
import * as THREE from 'three';

// --- 1. Logo Component (Pixel Perfect Recreation) ---
const Logo = () => (
  <div className="flex items-center gap-4 select-none group">
    {/* The Symbol: From Void (Blur) to Solid */}
    <div className="relative w-16 h-10 flex items-center justify-end">
      {/* 1. The "Virtual" Trail (Left side blur) */}
      <div 
        className="absolute right-0 w-16 h-8 bg-gradient-to-l from-white to-transparent opacity-40 blur-md transform -translate-x-2 group-hover:-translate-x-4 transition-transform duration-700 ease-out"
        style={{ clipPath: 'polygon(0% 10%, 100% 0%, 100% 100%, 0% 90%)' }} // Tapered shape
      ></div>
      
      {/* 2. The "Motion" Mid-layer (Connecting blur) */}
      <div className="absolute right-2 w-8 h-8 bg-gradient-to-l from-white/80 to-transparent blur-[2px]"></div>

      {/* 3. The "Real" Solid Object (Right side square) */}
      <div className="relative z-10 w-8 h-8 bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>
    </div>

    {/* The Typography */}
    <div className="flex flex-col justify-center">
      <div className="font-serif text-2xl font-bold text-white leading-none tracking-wide">
        Unified
      </div>
      {/* The Separator Line */}
      <div className="h-[2px] w-full bg-white my-[2px] origin-left transform group-hover:scale-x-110 transition-transform duration-500"></div>
      <div className="font-serif text-2xl font-bold text-white leading-none tracking-wide">
        Labs
      </div>
    </div>
  </div>
);

// --- 2. Interactive Fluid Grid Background (Three.js) ---
const FluidGridBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    
    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0015); // Deep black fog

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Tilted camera for a "terrain" view
    camera.position.set(0, -10, 40); 
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Grid System
    const geometry = new THREE.PlaneGeometry(150, 150, 60, 60);
    
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
          
          // 1. Base undulating wave (The "Ocean" of liquidity)
          float wave = sin(newPos.x * 0.1 + uTime * 0.5) * sin(newPos.y * 0.1 + uTime * 0.5) * 1.5;
          
          // 2. Mouse Interaction (The "Disturbance")
          float dist = distance(uMouse.xy, newPos.xy);
          float radius = 25.0;
          float interaction = 0.0;
          
          if (dist < radius) {
            float strength = 1.0 - (dist / radius);
            // Ripple effect based on distance
            interaction = sin(dist * 0.5 - uTime * 3.0) * strength * 5.0;
            newPos.z += interaction;
          }

          newPos.z += wave;
          vElevation = newPos.z + interaction; // Pass to fragment for coloring

          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vElevation;

        void main() {
          // Color changes based on height/elevation
          float alpha = 0.15 + (vElevation * 0.05);
          alpha = clamp(alpha, 0.05, 0.4);
          
          // Peaks are brighter
          vec3 color = uColor + (vElevation * 0.02);
          
          gl_FragColor = vec4(color, alpha);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse Tracking logic
    const mouse = new THREE.Vector3();
    const handleMouseMove = (e) => {
      // Map screen coords to world coords roughly
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Simple projection for the plane
      mouse.set(x * 60, y * 60, 0);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      material.uniforms.uTime.value = time;
      // Smooth mouse lerping
      material.uniforms.uMouse.value.lerp(mouse, 0.1);
      
      // Subtle rotation of the whole grid
      mesh.rotation.z = time * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 bg-black pointer-events-none" />;
};

// --- 3. UI Components ---

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <div className="hidden md:flex space-x-12 items-center">
            {['Services', 'Technology', 'About', 'Insights'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-widest uppercase">
                {item}
              </a>
            ))}
            <button className="px-6 py-2 bg-white text-black font-serif font-bold hover:bg-gray-200 transition-colors">
              Access Vaults
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-black border-b border-white/10">
          <div className="flex flex-col p-6 space-y-4">
             {['Services', 'Technology', 'About', 'Insights'].map((item) => (
              <a key={item} href="#" className="text-lg text-gray-300 font-serif">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Card = ({ title, desc, icon: Icon, features, step }) => (
  <div className="group relative border-l border-white/10 pl-8 py-4 hover:border-white transition-colors duration-500">
    <div className="absolute -left-[5px] top-0 h-0 w-[9px] bg-white group-hover:h-full transition-all duration-700 ease-in-out"></div>
    
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-gray-500">0{step}</span>
        <h3 className="text-2xl font-serif font-bold text-white group-hover:tracking-wider transition-all duration-500">{title}</h3>
      </div>
      <Icon className="text-gray-600 group-hover:text-white transition-colors" size={24} />
    </div>
    
    <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-sm">
      {desc}
    </p>

    <ul className="space-y-2">
      {features.map((f, i) => (
        <li key={i} className="flex items-center text-xs text-gray-500 uppercase tracking-wider group-hover:text-gray-300 transition-colors">
          <span className="w-1.5 h-1.5 bg-gray-700 group-hover:bg-white mr-3 rounded-full transition-colors"></span>
          {f}
        </li>
      ))}
    </ul>
  </div>
);


export default function App() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden">
      <FluidGridBackground />
      <Nav />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col justify-center px-6 relative z-10">
        <div className="max-w-7xl mx-auto w-full pt-20">
          <div className="inline-flex items-center gap-3 mb-8 border border-white/20 rounded-full px-4 py-1 bg-black/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Protocol Systems Active</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-[0.9] tracking-tight mix-blend-exclusion">
            Liquidity <br />
            <span className="italic font-light opacity-80">Engineered.</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-12 items-start md:items-end border-l-2 border-white/20 pl-8 ml-2">
            <p className="max-w-xl text-lg text-gray-400 leading-relaxed">
              Unified Labs bridges the divide between <span className="text-white font-bold">Traditional Finance</span> solidity and <span className="text-white font-bold">DeFi</span> agility. We curate risk, make markets, and engineer the future of yield.
            </p>
            
            <button className="group flex items-center gap-4 text-white font-bold tracking-widest uppercase text-sm hover:text-gray-300 transition-colors">
              Explore The Platform
              <span className="p-2 border border-white/30 rounded-full group-hover:border-white group-hover:rotate-45 transition-all duration-300">
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 w-full text-center animate-bounce opacity-50">
          <ChevronDown className="mx-auto" />
        </div>
      </section>

      {/* --- CORE BUSINESS --- */}
      <section id="services" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              The Unified <br /> Architecture
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-4 md:mt-0">
              Four Pillars of Infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
            <Card 
              step="1"
              title="Risk Curator" 
              icon={Shield}
              desc="Providing institutional-grade curation services similar to Gauntlet. We curate risks, optimize parameters dynamically for customers, and offer Curator-as-a-Service."
              features={["Vault Curation (Morpho/Aave)", "Curator-as-a-Service", "Dynamic Parameter Optimization"]}
            />
            <Card 
              step="2"
              title="Market Making" 
              icon={TrendingUp}
              desc="Providing deep liquidity where it matters. Our algo-trading infrastructure bridges CEX and DEX liquidity across Asia-Pacific markets."
              features={["Launch Day Liquidity", "Delta Neutral Strategy", "Cross-Venue Arbitrage"]}
            />
            <Card 
              step="3"
              title="Advisory" 
              icon={Globe}
              desc="Guiding institutions through the digital transition. Strategic consultancy for RWA tokenization and treasury management."
              features={["RWA Tokenization", "Treasury Management", "Risk Curator"]}
            />
            <Card 
              step="4"
              title="Asset Management" 
              icon={Coins}
              desc="Proprietary active management for digital assets. We leverage quantitative strategies to capture on-chain alpha and maximize risk-adjusted returns."
              features={["Proprietary Quant Strategies", "Active Yield Management", "Multi-Chain Alpha Capture"]}
            />
          </div>
        </div>
      </section>

      {/* --- TECH SHOWCASE (Black Box) --- */}
      <section id="technology" className="relative z-10 py-32 bg-white text-black overflow-hidden">
        {/* Abstract geometric decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-100 transform skew-x-12 translate-x-32 z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-black text-white text-xs font-mono uppercase tracking-widest mb-6">
                Proprietary Tech
              </div>
              <h2 className="text-5xl font-serif font-bold mb-8">
                Agent-Based <br/>Simulation (ABS)
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed font-light">
                Traditional risk models are static. Ours are alive. <br/><br/>
                We simulate millions of market scenarios daily, treating every protocol participant as an autonomous agent. This allows us to predict cascading liquidations and adjust parameters on-chain <strong>before</strong> the crisis hits.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Activity size={24} className="mt-1" />
                  <div>
                    <h4 className="font-bold text-xl">Dynamic Optimization</h4>
                    <p className="text-gray-600 text-sm">Real-time adjustment of LTVs and borrow caps based on liquidity depth.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Lock size={24} className="mt-1" />
                  <div>
                    <h4 className="font-bold text-xl">Atomic Safety</h4>
                    <p className="text-gray-600 text-sm">Automated circuit breakers triggered by oracle deviations.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Representation of "Real to Virtual" Tech */}
            <div className="relative h-[500px] w-full bg-black flex items-center justify-center p-8 shadow-2xl">
              <div className="absolute inset-0 border border-gray-800">
                {/* Grid Lines inside the black box */}
                <div className="w-full h-full opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              </div>
              
              <div className="text-center relative z-10">
                 <Cpu size={64} className="text-white mx-auto mb-6 animate-pulse" />
                 <div className="font-mono text-green-500 text-sm mb-2">{'>'} SIMULATION_RUNNING</div>
                 <div className="font-mono text-gray-500 text-xs">Processing Block #1829304...</div>
                 
                 <div className="mt-8 grid grid-cols-3 gap-2">
                   {[...Array(9)].map((_, i) => (
                     <div key={i} className="w-2 h-2 bg-white opacity-20 animate-ping" style={{ animationDelay: `${i * 100}ms` }}></div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 bg-black text-white pt-24 pb-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
            <div className="max-w-md">
              <Logo />
              <p className="mt-8 text-gray-400 leading-relaxed text-sm">
                Unified Labs is an institutional-grade DeFi infrastructure company. We combine deep liquidity networks with rigorous mathematical risk curation.
              </p>
            </div>
            
            <div className="flex gap-20">
              <div>
                <h4 className="font-serif font-bold text-lg mb-6">Business</h4>
                <ul className="space-y-4 text-gray-500 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Risk Curator</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Market Making</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Advisory</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg mb-6">Connect</h4>
                <ul className="space-y-4 text-gray-500 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-600 font-mono uppercase tracking-wider">
            <div>&copy; 2025 Unified Labs. All rights reserved.</div>
            <div className="mt-4 md:mt-0">Hong Kong • Singapore • Dubai</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
