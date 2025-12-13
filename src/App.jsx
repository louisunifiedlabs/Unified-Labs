import React, { useState, useEffect, useRef } from 'react';
import { Shield, TrendingUp, Globe, Layers, ArrowRight, Activity, Cpu, Lock, X, Menu, ChevronDown, Coins, ArrowLeftRight } from 'lucide-react';
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
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-[0.15em] uppercase">
                {item}
              </a>
            ))}
            <button className="px-6 py-2 bg-white text-black font-serif font-bold text-sm hover:bg-gray-200 transition-colors tracking-wide">
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
  <div className="group relative border-l border-white/10 pl-8 py-6 hover:border-white transition-colors duration-500">
    <div className="absolute -left-[5px] top-0 h-0 w-[9px] bg-white group-hover:h-full transition-all duration-700 ease-in-out"></div>
    
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-gray-500">0{step}</span>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white group-hover:tracking-wide transition-all duration-500">{title}</h3>
      </div>
      <Icon className="text-gray-600 group-hover:text-white transition-colors" size={28} />
    </div>
    
    <p className="text-gray-400 mb-8 text-base leading-relaxed max-w-sm font-light">
      {desc}
    </p>

    <ul className="space-y-3">
      {features.map((f, i) => (
        <li key={i} className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">
          <span className="w-1.5 h-1.5 bg-gray-700 group-hover:bg-white mr-3 rounded-full transition-colors"></span>
          {f}
        </li>
      ))}
    </ul>
  </div>
);

// Updated Data Stat Item to handle text values gracefully
const DataStat = ({ value, label, subValue }) => (
  <div className="flex flex-col">
    <div className={`font-serif font-bold text-white mb-2 tracking-tight ${value === 'Coming Soon' ? 'text-lg text-cyan-400 font-mono tracking-wide' : 'text-3xl lg:text-4xl'}`}>
      {value}
    </div>
    <div className="text-sm text-gray-400 font-sans font-medium tracking-wide">{label}</div>
    {subValue && <div className="text-xs text-gray-600 font-mono mt-1">{subValue}</div>}
  </div>
);

export default function UnifiedLabsRedesign() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden">
      <FluidGridBackground />
      <Nav />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col justify-center px-6 relative z-10">
        <div className="max-w-7xl mx-auto w-full pt-20">
          <div className="inline-flex items-center gap-3 mb-10 border border-white/10 rounded-full px-4 py-1.5 bg-black/40 backdrop-blur-md">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] md:text-xs font-mono text-gray-400 uppercase tracking-[0.2em]">System Status: Active</span>
          </div>

          <div className="mb-12">
            {/* LAYER 1: The Context - Cold Code Style (Spacing Reduced) */}
            <div className="text-sm md:text-lg font-mono text-cyan-400 uppercase tracking-[0.6em] mb-4 md:mb-6 pl-1 opacity-80">
              The layer where
            </div>

            {/* LAYER 2: The Duality - Solid vs Wireframe Design (Size Increased) */}
            <div className="flex flex-col md:flex-row items-start md:items-baseline gap-4 md:gap-8 mb-4 md:mb-6">
              
              {/* TradFi: Solid, Heavy, Serif, Opaque */}
              <span className="text-6xl md:text-8xl font-serif font-black text-white tracking-tighter drop-shadow-2xl">
                TradFi
              </span>

              {/* Connector: Classic Ampersand (Size adjusted for balance) */}
              <span className="text-4xl md:text-6xl font-serif italic text-gray-500 px-2 opacity-70 font-light">
                &
              </span>

              {/* DeFi: Hollow, Outline, Mono, Glowing */}
              <span 
                className="text-6xl md:text-8xl font-sans font-bold text-transparent tracking-tighter"
                style={{ 
                  WebkitTextStroke: '2px #22d3ee', // Cyan outline
                  textShadow: '0 0 25px rgba(34, 211, 238, 0.35)' // Soft glow
                }}
              >
                DeFi
              </span>
            </div>

            {/* LAYER 3: The Fusion - Ethereal Gradient (Spacing Tighter) */}
            <div className="relative inline-block">
               {/* Backing Blur */}
               <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full transform scale-x-110"></div>
               <span className="relative text-5xl md:text-7xl font-serif italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-cyan-100 to-white tracking-wide mix-blend-overlay opacity-90">
                 become one.
               </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start md:items-end border-l border-white/20 pl-8 ml-2 mt-12">
            <p className="max-w-xl text-lg md:text-xl text-gray-400 leading-relaxed font-light">
              Unified Labs bridges the divide between <span className="text-white font-medium">Traditional Finance</span> solidity and <span className="text-white font-medium">DeFi</span> agility. We curate risk, make markets, and engineer the future of yield.
            </p>
            
            <button className="group flex items-center gap-4 text-white font-bold tracking-[0.15em] uppercase text-xs md:text-sm hover:text-gray-300 transition-colors">
              Explore The Platform
              <span className="p-3 border border-white/20 rounded-full group-hover:border-white group-hover:rotate-45 transition-all duration-300 bg-white/5">
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-0 w-full text-center animate-bounce opacity-40">
          <ChevronDown className="mx-auto text-white/50" size={24} />
        </div>
      </section>

      {/* --- DATA STREAM SECTION (UPDATED: Compact & Coming Soon) --- */}
      <section className="relative z-10 bg-black/80 backdrop-blur-xl border-y border-white/10 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
            
            {/* Column 1: Digital Assets */}
            <div>
              <h3 className="text-white/60 font-sans text-xs uppercase tracking-[0.2em] font-bold mb-8 pb-3 border-b border-white/10">
                Digital Assets
              </h3>
              <div className="space-y-10">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-4xl md:text-5xl font-serif font-bold text-white">AuM</span>
                    <span className="text-xs font-mono text-cyan-400 px-2 py-1 rounded bg-cyan-950/50 border border-cyan-900/50 tracking-wide">Coming Soon</span>
                  </div>
                  <div className="text-gray-500 text-sm tracking-wide font-medium">Assets under Management</div>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-4xl md:text-5xl font-serif font-bold text-white">TVL</span>
                    <span className="text-xs font-mono text-cyan-400 px-2 py-1 rounded bg-cyan-950/50 border border-cyan-900/50 tracking-wide">Coming Soon</span>
                  </div>
                  <div className="text-gray-500 text-sm tracking-wide font-medium">Total Value Locked</div>
                </div>
              </div>
            </div>

            {/* Column 2: Operating Ecosystem */}
            <div>
              <h3 className="text-white/60 font-sans text-xs uppercase tracking-[0.2em] font-bold mb-8 pb-3 border-b border-white/10">
                Operating Ecosystem
              </h3>
              <div className="grid grid-cols-2 gap-y-10 gap-x-12">
                <DataStat value="Coming Soon" label="Underlying blockchains" />
                <DataStat value="Coming Soon" label="Whitelisted protocols" />
                <DataStat value="Coming Soon" label="Monthly on-chain volume" />
                <DataStat value="Coming Soon" label="Curated vaults" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CORE BUSINESS --- */}
      <section id="services" className="relative z-10 py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-10">
            <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
              The Unified <br /> Architecture
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em] mt-6 md:mt-0 mb-2">
              Four Pillars of Infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24">
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
      <section id="technology" className="relative z-10 py-40 bg-white text-black overflow-hidden">
        {/* Abstract geometric decoration */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gray-50 transform skew-x-12 translate-x-48 z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-black text-white text-[10px] font-mono uppercase tracking-[0.2em] mb-8">
                Proprietary Tech
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                Agent-Based <br/>Simulation (ABS)
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
                Traditional risk models are static. Ours are alive. <br/><br/>
                We simulate millions of market scenarios daily, treating every protocol participant as an autonomous agent. This allows us to predict cascading liquidations and adjust parameters on-chain <strong className="font-semibold text-black border-b border-black">before</strong> the crisis hits.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="mt-1 p-2 bg-gray-100 rounded-full">
                     <Activity size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Dynamic Optimization</h4>
                    <p className="text-gray-500 text-base leading-relaxed">Real-time adjustment of LTVs and borrow caps based on liquidity depth.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="mt-1 p-2 bg-gray-100 rounded-full">
                     <Lock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Atomic Safety</h4>
                    <p className="text-gray-500 text-base leading-relaxed">Automated circuit breakers triggered by oracle deviations.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Representation of "Real to Virtual" Tech */}
            <div className="relative h-[600px] w-full bg-black flex items-center justify-center p-10 shadow-2xl">
              <div className="absolute inset-0 border border-gray-800/50">
                {/* Grid Lines inside the black box */}
                <div className="w-full h-full opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              </div>
              
              <div className="text-center relative z-10">
                 <div className="mb-8 relative inline-block">
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
                    <Cpu size={80} className="text-white relative z-10 animate-pulse" strokeWidth={1} />
                 </div>
                 
                 <div className="font-mono text-green-500 text-sm mb-3 tracking-widest">{'>'} SIMULATION_RUNNING</div>
                 <div className="font-mono text-gray-500 text-xs tracking-wider">Processing Block #1829304...</div>
                 
                 <div className="mt-12 grid grid-cols-3 gap-3 w-48 mx-auto">
                   {[...Array(9)].map((_, i) => (
                     <div key={i} className="aspect-square bg-white opacity-10 animate-ping rounded-sm" style={{ animationDelay: `${i * 150}ms`, animationDuration: '3s' }}></div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 bg-black text-white pt-32 pb-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="max-w-sm">
              <Logo />
              <p className="mt-8 text-gray-400 leading-relaxed text-sm font-light">
                Unified Labs is an institutional-grade DeFi infrastructure company. We combine deep liquidity networks with rigorous mathematical risk curation.
              </p>
            </div>
            
            <div className="flex gap-24">
              <div>
                <h4 className="font-serif font-bold text-lg mb-8">Business</h4>
                <ul className="space-y-5 text-gray-500 text-sm font-medium tracking-wide">
                  <li><a href="#" className="hover:text-white transition-colors">Risk Curator</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Market Making</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Advisory</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg mb-8">Connect</h4>
                <ul className="space-y-5 text-gray-500 text-sm font-medium tracking-wide">
                  <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10 text-[10px] md:text-xs text-gray-600 font-mono uppercase tracking-[0.1em]">
            <div>&copy; 2025 Unified Labs. All rights reserved.</div>
            <div className="mt-4 md:mt-0">Hong Kong • Singapore • Dubai</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
