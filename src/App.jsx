import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ArrowUpRight, ChevronRight, ChevronDown, Check, X,
  Thermometer, Wind, Ruler,
  MoveHorizontal, DoorOpen, Layers,
  Clock, ShieldCheck, Building2, ClipboardCheck,
  MapPin, Phone, Mail, Instagram, Linkedin, MessageCircle, Send,
  FileText, PackageCheck, Award, Users,
  Volume2, Flame, Sparkles, Waves, CheckCircle2
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  TOKENS DE MARCA — EVOLUTION STYLE (Vibrante y Dinámico)           */
/* ------------------------------------------------------------------ */
const C = {
  bg: "#ffffff",
  bgAlt: "#f8fafc",
  panel: "#ffffff",
  panelAlt: "#f1f5f9",
  line: "#e2e8f0",
  navy: "#0f172a",
  navyDeep: "#091222",
  textSecondary: "#334155",
  textMuted: "#64748b",
  accent: "#0066cc",       // Azul vibrante
  accentHover: "#0052a3",
  brandGreen: "#00a86b",   // Verde acento dinámico (WhatsApp / Badges)
  white: "#ffffff",
};

const displayFont = "'Space Grotesk', 'Inter', sans-serif";
const bodyFont = "'Inter', sans-serif";
const monoFont = "'JetBrains Mono', monospace";

/* ------------------------------------------------------------------ */
/*  IMÁGENES (Podés reemplazar las URLs por las tuyas)               */
/* ------------------------------------------------------------------ */
const IMG = {
  corredizos: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  abrir: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
  fachadas: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  complementos: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
  p1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  p2: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
  p3: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80",
  p4: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=80",
  p5: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
  p6: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
  puertaExtA: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=1200&q=80",
  puertaExtB: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
  puertaIntA: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80",
  puertaIntB: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80",
  nosotros: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
};

/* ------------------------------------------------------------------ */
/*  STYLES & UTILS                                                    */
/* ------------------------------------------------------------------ */

function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      section[id] { scroll-margin-top: 110px; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-up { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }

      @keyframes pulseRing {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(1.8); opacity: 0; }
      }
      .pulse-ring::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 9999px;
        background: ${C.brandGreen};
        animation: pulseRing 2s cubic-bezier(0,0,0.2,1) infinite;
      }

      ::selection { background: ${C.accent}; color: #ffffff; }
    `}</style>
  );
}

function Badge({ children, green = false }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4"
      style={{
        backgroundColor: green ? "rgba(0,168,107,0.12)" : "rgba(0,102,204,0.12)",
        color: green ? C.brandGreen : C.accent,
      }}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: green ? C.brandGreen : C.accent }} />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  {
    label: "Productos",
    type: "dropdown",
    matchIds: ["ventanas", "puertas"],
    children: [
      { label: "Ventanas", href: "#ventanas", desc: "Sistemas corredizos y abatibles" },
      { label: "Puertas", href: "#puertas", desc: "Interior, exterior y alta seguridad" },
    ],
  },
  { label: "Proyectos", href: "#proyectos", matchIds: ["proyectos"] },
  { label: "¿Aluminio o PVC?", href: "#aluminio-pvc", matchIds: ["aluminio-pvc"] },
  { label: "Nosotros", href: "#nosotros", matchIds: ["nosotros"] },
];

const SECTION_IDS = ["top", "ventanas", "puertas", "aluminio-pvc", "nosotros", "proyectos", "contacto"];

const VENTANAS_TIPOS = [
  {
    key: "corredizas",
    icon: MoveHorizontal,
    title: "Ventanas Corredizas",
    tag: "SC-200 / SC-400",
    img: "https://i.ibb.co/8gdvZwGw/IMG-0589.jpg",
    desc: "Sistemas de 2 a 6 hojas con desplazamiento suave sobre rieles reforzados. Ideales para integrar ambientes con el exterior sin perder espacio.",
    uso: "Recomendadas para living-comedor, galerías y salidas a jardines o balcones.",
    features: [
      "Configuraciones de 2 a 6 hojas",
      "Umbral embutido al nivel del piso",
      "Sellos de triple contacto hermético",
      "Apta para DVH de control solar",
    ],
  },
  {
    key: "oscilobatientes",
    icon: DoorOpen,
    title: "Oscilobatientes y Practicables",
    tag: "OB-70 / PR-60",
    img: "https://i.ibb.co/h1tbZX8R/IMG-0590.jpg",
    desc: "Apertura versátil: oscilante para ventilar sin abrir del todo, o batiente para una apertura completa y fácil limpieza.",
    uso: "Ideales para dormitorios, baños y ambientes con alta exigencia de aislación térmica y acústica.",
    features: [
      "Doble tipo de apertura en una sola hoja",
      "Cierre hermético con doble junta",
      "Herrajes de seguridad multipunto",
      "Máxima aislación contra el viento y lluvia",
    ],
  },
  {
    key: "fijas",
    icon: Layers,
    title: "Paños Fijos de Gran Formato",
    tag: "FZ / CW",
    img: "https://i.ibb.co/xtDYfBW9/IMG-0592.jpg",
    desc: "Grandes vanos vidriados sin apertura que priorizan el ingreso de luz natural y vistas panorámicas ininterrumpidas.",
    uso: "Dobles alturas, hall de entrada, escaleras y vistas directas al paisaje.",
    features: [
      "Estructuras calculadas para grandes dimensiones",
      "Perfilería de vista ultradelgada",
      "Vidrios laminados o templados de alta seguridad",
      "Máximo aprovechamiento de luz solar",
    ],
  },
];

const PUERTAS_TIPOS = {
  exterior: {
    title: "Puertas de Exterior",
    desc: "Diseñadas para brindar máxima seguridad y aislamiento térmico en el acceso principal o salidas al jardín.",
    materiales: [
      "Aluminio RPT o PVC multicámara",
      "Vidrio DVH laminado de seguridad",
      "Cerraduras multipunto de alta resistencia",
      "Sistemas de sellado contra filtraciones",
    ],
    img: [
      "https://i.ibb.co/ZZZWDpr/Puerta-negra-entrada.jpg",
      "https://i.ibb.co/rKJ4q6d6/Puerta-negra-jardin.jpg"
    ],
  },
  interior: {
    title: "Puertas de Interior",
    desc: "Elegancia, funcionamiento silencioso y terminaciones estéticas perfectamente integradas con la arquitectura del hogar.",
    materiales: [
      "Perfiles esbeltos de diseño contemporáneo",
      "Vidrio esmerilado, acústico o transparente",
      "Herrajes de deslizamiento ultra suave",
      "Cero mantenimiento y alta durabilidad",
    ],
    img: [
      "https://i.ibb.co/Jjfz74Sy/IMG-0587.jpg",
      "https://i.ibb.co/jvz44YDC/IMG-0588.jpg"
    ],
  },
};

const ALUMINIO_PVC = [
  {
    icon: Thermometer,
    criterio: "Aislación Térmica",
    aluminio: "Excelente con Rotura de Puente Térmico (RPT). Conserva la temperatura eficientemente.",
    pvc: "Máxima aislación natural gracias a sus cámaras internas de aire que evitan la pérdida de calor.",
  },
  {
    icon: Volume2,
    criterio: "Aislación Acústica",
    aluminio: "Gran desempeño acoplado con cristales DVH laminados.",
    pvc: "Absorción acústica superior por la densidad del material y sus uniones termoselladas.",
  },
  {
    icon: ShieldCheck,
    criterio: "Resistencia Mecánica",
    aluminio: "Rigidez extrema que permite aberturas de tamaño gigante y marcos hiperdelgados.",
    pvc: "Estructura reforzada internamente con perfiles de acero galvanizado para alta durabilidad.",
  },
  {
    icon: Sparkles,
    criterio: "Estética y Colores",
    aluminio: "Múltiples acabados anodizados, pintados o microtexturados.",
    pvc: "Variedad de folios símil madera hiperrealistas y tonos sólidos.",
  },
];

const PROYECTOS = [
  {
    name: "Residencia Nordelta",
    tipo: "Vivienda Unifamiliar",
    img: "https://i.ibb.co/6R7LD975/1-C939-A42-6C7-43-FC-8-C8-B-DA9-A69-DBCD60.png",
    descripcion: "Grandes paños fijos que integran el estar con la laguna principal.",
    specs: ["Aluminio con RPT (Ruptura de Puente Térmico)", "Vidrio DVH de Control Solar", "Paños Fijos de Gran Formato y Esquineros"],
  },
  {
    name: "Fábrica Bella Vista",
    tipo: "Desarrollo Parque Industrial",
    img: "https://i.ibb.co/DfZ6GTBC/0cedb7d3-c37d-4852-b1d6-953e1e618006.jpg",
    descripcion: "Fachada continua y carpinterías herméticas para máxima aislación sonora.",
    specs: ["Perfilería de Aluminio de Alto Rendimiento", "Alta Aislación Acústica e Ignífuga", "Vidrio Doble DVH para Eficiencia Térmica"],
  },
  {
    name: "Cerramiento Techo Pileta Nuñez",
    tipo: "Proyecto Institucional",
    img: "https://i.ibb.co/gLqDYX0p/F4-F3-A145-AD12-4-EC4-853-C-40-FBBA2-A4-D5-E.png",
    descripcion: "Diseño y montaje de cubierta vidriada de gran luz, optimizada para climatización y máxima iluminación natural.",
    specs: ["Perfilería estructural de alta resistencia", "Vidrio de Control Solar y UV", "Protección contra la humedad y condensación"],
  },
];

/* ------------------------------------------------------------------ */
/*  MODAL DE PROYECTOS                                                */
/* ------------------------------------------------------------------ */

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-transform active:scale-95"
        >
          <X className="w-5 h-5 text-slate-800" />
        </button>

        <div className="h-64 md:h-full relative">
          <img src={project.img} alt={project.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-8 flex flex-col justify-between">
          <div>
            <Badge>{project.tipo}</Badge>
            <h3 style={{ fontFamily: displayFont }} className="text-2xl font-bold text-slate-900 mb-3">
              {project.name}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {project.descripcion}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Características Principales
            </h4>
            <div className="space-y-2 mb-8">
              {project.specs.map((s) => (
                <div key={s} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#contacto"
            onClick={(e) => {
              onClose();
              const el = document.getElementById("contacto");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full py-3.5 px-6 rounded-xl font-medium text-center text-white bg-sky-600 hover:bg-sky-700 transition-colors shadow-lg shadow-sky-600/20"
          >
            Consultar por una obra similar
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAVBAR CON SCROLL CORREGIDO                                        */
/* ------------------------------------------------------------------ */

function Navbar({ activeSection, scrolled }) {
  const [productsOpen, setProductsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Función para desplazamiento suave a las secciones
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setProductsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)",
        boxShadow: scrolled ? "0 10px 30px -10px rgba(0,0,0,0.08)" : "none",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.line}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* LOGO */}
        <a href="#top" onClick={(e) => handleNavClick(e, "top")} className="flex items-center gap-2">
          <span style={{ fontFamily: displayFont }} className="text-2xl font-bold tracking-tight text-slate-900">
            VERKAUFF
          </span>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: C.accent }} />
        </a>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            if (item.type === "dropdown") {
              const isActive = item.matchIds.includes(activeSection);
              return (
                <div key={item.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProductsOpen((o) => !o)}
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors py-2"
                    style={{ color: isActive ? C.accent : C.textSecondary }}
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" style={{ transform: productsOpen ? "rotate(180deg)" : "rotate(0)" }} />
                  </button>

                  {productsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                      {item.children.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          onClick={(e) => handleNavClick(e, c.href.replace("#", ""))}
                          className="block p-3 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <div className="text-sm font-semibold text-slate-900">{c.label}</div>
                          <div className="text-xs text-slate-500">{c.desc}</div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = item.matchIds.includes(activeSection);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href.replace("#", ""))}
                className="text-sm font-medium transition-colors py-2 relative"
                style={{ color: isActive ? C.accent : C.textSecondary }}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: C.accent }} />
                )}
              </a>
            );
          })}
        </nav>

        {/* BOTÓN CONTACTO */}
        <a
          href="#contacto"
          onClick={(e) => handleNavClick(e, "contacto")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg active:scale-95"
          style={{ backgroundColor: C.accent }}
        >
          <span>Cotizar Obra</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN APP COMPONENT                                                */
/* ------------------------------------------------------------------ */

export default function VerkauffLanding() {
  const [activeVentana, setActiveVentana] = useState(VENTANAS_TIPOS[0].key);
  const [activePuerta, setActivePuerta] = useState("exterior");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [selectedProject, setSelectedProject] = useState(null);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", tipo: "Vivienda unifamiliar", m2: "", mensaje: "" });
  const [planoFileName, setPlanoFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ScrollSpy */
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setPlanoFileName(file ? file.name : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const waMessage = encodeURIComponent(
    "Hola VERKAUFF, quisiera solicitar asesoramiento técnico y presupuestar carpinterías para mi obra."
  );

  const activeVentanaData = VENTANAS_TIPOS.find((v) => v.key === activeVentana);
  const activePuertaData = PUERTAS_TIPOS[activePuerta];

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: C.bg, fontFamily: bodyFont }} className="min-h-screen text-slate-900">
      <FontLoader />
      <Navbar activeSection={activeSection} scrolled={scrolled} />

      {/* ---------------------------------------------------------- HERO */}
      <section id="top" className="relative pt-36 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl fade-up">
            <Badge green>Calidad y Alta Prestación</Badge>
            <h1
              className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6"
              style={{ fontFamily: displayFont }}
            >
              Aberturas de <span style={{ color: C.accent }}>Aluminio</span> y <span style={{ color: C.accent }}>PVC</span> diseñadas para durar.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
              Fabricación e instalación de aberturas de alta gama. Máximo aislamiento térmico, acústico y diseño arquitectónico adaptado a tu proyecto.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#ventanas"
                onClick={(e) => handleSmoothScroll(e, "ventanas")}
                className="px-8 py-4 rounded-xl text-sm font-bold text-white shadow-lg transition-all hover:opacity-95 active:scale-95 flex items-center gap-2"
                style={{ backgroundColor: C.accent, boxShadow: "0 10px 25px -5px rgba(0,102,204,0.3)" }}
              >
                Explorar Catálogo
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#contacto"
                onClick={(e) => handleSmoothScroll(e, "contacto")}
                className="px-8 py-4 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
              >
                Solicitar Cotización
              </a>
            </div>
          </div>

          {/* TARJETAS DE CARACTERÍSTICAS DE IMPACTO */}
          <div className="grid sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-slate-100">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <Thermometer className="w-8 h-8 mb-3 text-sky-600" />
              <h3 className="font-bold text-slate-900 text-lg mb-1">Eficiencia Térmica</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Ahorro energético continuo reduciendo el consumo de calefacción y aire acondicionado.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <Volume2 className="w-8 h-8 mb-3 text-sky-600" />
              <h3 className="font-bold text-slate-900 text-lg mb-1">Aislación Acústica</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Sistemas de sellado hermético que aíslan ruidos molestos del exterior.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-8 h-8 mb-3 text-sky-600" />
              <h3 className="font-bold text-slate-900 text-lg mb-1">Garantía de Fábrica</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Materiales certificados con estándares de resistencia y seguridad superior.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- VENTANAS */}
      <section id="ventanas" className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-12">
            <Badge>Catálogo de Ventanas</Badge>
            <h2 style={{ fontFamily: displayFont }} className="text-3xl sm:text-4xl font-bold text-slate-900">
              Sistemas adaptados a cada necesidad
            </h2>
            <p className="text-slate-600 mt-3">
              Seleccioná un sistema para conocer sus ventajas y aplicaciones recomendadas.
            </p>
          </div>

          {/* TABS DE PRODUCTO */}
          <div className="flex flex-wrap gap-3 mb-10">
            {VENTANAS_TIPOS.map((v) => {
              const isActive = v.key === activeVentana;
              return (
                <button
                  key={v.key}
                  onClick={() => setActiveVentana(v.key)}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <v.icon className="w-4 h-4" />
                  {v.title}
                </button>
              );
            })}
          </div>

          {/* DETALLE DEL PRODUCTO SELECCIONADO */}
          <div className="bg-white rounded-3xl p-6 lg:p-10 border border-slate-200/80 shadow-xl grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 h-80 lg:h-96 rounded-2xl overflow-hidden relative">
              <img src={activeVentanaData.img} alt={activeVentanaData.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow">
                {activeVentanaData.tag}
              </div>
            </div>

            <div className="lg:col-span-6">
              <h3 style={{ fontFamily: displayFont }} className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                {activeVentanaData.title}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {activeVentanaData.desc}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mb-6 flex items-start gap-3">
                <Ruler className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Uso recomendado:</strong> {activeVentanaData.uso}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {activeVentanaData.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contacto"
                onClick={(e) => handleSmoothScroll(e, "contacto")}
                className="inline-flex items-center gap-2 font-bold text-sm text-sky-600 hover:text-sky-700"
              >
                Solicitar cotización de este modelo
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- PUERTAS */}
      <section id="puertas" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-12">
            <Badge green>Línea de Puertas</Badge>
            <h2 style={{ fontFamily: displayFont }} className="text-3xl sm:text-4xl font-bold text-slate-900">
              Seguridad, diseño y funcionalidad
            </h2>
          </div>

          <div className="flex gap-3 mb-8">
            {Object.entries(PUERTAS_TIPOS).map(([key, val]) => {
              const isActive = key === activePuerta;
              return (
                <button
                  key={key}
                  onClick={() => setActivePuerta(key)}
                  className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {val.title}
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center bg-slate-50 p-8 rounded-3xl border border-slate-200/60">
            <div className="lg:col-span-6">
              <h3 style={{ fontFamily: displayFont }} className="text-2xl font-bold text-slate-900 mb-3">
                {activePuertaData.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {activePuertaData.desc}
              </p>

              <div className="space-y-3 mb-8">
                {activePuertaData.materiales.map((m) => (
                  <div key={m} className="flex items-center gap-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contacto"
                onClick={(e) => handleSmoothScroll(e, "contacto")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
              >
                Consultar Diseños
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {activePuertaData.img.map((src, i) => (
                <div key={i} className="h-64 rounded-2xl overflow-hidden shadow-md">
                  <img src={src} alt="Puerta" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- ALUMINIO vs PVC */}
      <section id="aluminio-pvc" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-2xl mb-12">
            <Badge green>Guía de Materiales</Badge>
            <h2 style={{ fontFamily: displayFont }} className="text-3xl sm:text-4xl font-bold mb-4">
              ¿Aluminio o PVC? Elegí la opción ideal
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ambos materiales ofrecen un rendimiento excepcional. Te mostramos sus diferencias clave para ayudarte a elegir.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALUMINIO_PVC.map(({ icon: Icon, criterio, aluminio, pvc }) => (
              <div key={criterio} className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-slate-600 transition-all">
                <Icon className="w-7 h-7 text-sky-400 mb-4" />
                <h3 className="font-bold text-lg mb-3 text-white">{criterio}</h3>
                
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block mb-1">Aluminio</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{aluminio}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">PVC</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{pvc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- NOSOTROS */}
      <section id="nosotros" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge>Trayectoria y Confianza</Badge>
              <h2 style={{ fontFamily: displayFont }} className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                14 años creando soluciones a medida
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Acompañamos a estudios de arquitectura, constructoras y particulares en la concreción de sus proyectos, garantizando precisión en la fabricación y cumplimiento estricto en la entrega.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <div className="text-2xl font-bold text-sky-600">14+</div>
                  <div className="text-xs text-slate-500 font-medium">Años de experiencia</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sky-600">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Garantía técnica</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sky-600">1000+</div>
                  <div className="text-xs text-slate-500 font-medium">Obras instaladas</div>
                </div>
              </div>
            </div>

            <div className="h-96 rounded-3xl overflow-hidden shadow-2xl relative">
              <img src="https://i.ibb.co/CKbVrcLs/Foto-de-la-fabrica-de-verkauff.png" alt="Nosotros" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- PROYECTOS */}
      <section id="proyectos" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Badge>Obras Destacadas</Badge>
              <h2 style={{ fontFamily: displayFont }} className="text-3xl sm:text-4xl font-bold text-slate-900">
                Proyectos ejecutados
              </h2>
            </div>
            <a
              href="#contacto"
              onClick={(e) => handleSmoothScroll(e, "contacto")}
              className="inline-flex items-center gap-2 font-bold text-sm text-sky-600 hover:text-sky-700"
            >
              Cotizar mi proyecto <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PROYECTOS.map((p) => (
              <div
                key={p.name}
                onClick={() => setSelectedProject(p)}
                className="group bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200/80 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                    {p.tipo}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                    {p.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- CONTACTO */}
      <section id="contacto" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Badge green>Contacto Directo</Badge>
              <h2 style={{ fontFamily: displayFont }} className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Solicitá tu presupuesto
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Envianos las medidas o planos de tu obra y nuestro equipo técnico te enviará una propuesta detallada.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <MapPin className="w-5 h-5 text-sky-600 shrink-0" />
                  <span>Zona Norte, Buenos Aires, Argentina</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <Phone className="w-5 h-5 text-sky-600 shrink-0" />
                  <span>+54 9 11 2472-1912</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <Mail className="w-5 h-5 text-sky-600 shrink-0" />
                  <span>verkauffaberturas@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">¡Solicitud Enviada!</h3>
                  <p className="text-slate-600 text-sm">Nos pondremos en contacto con vos a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nombre</label>
                      <input required name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-sky-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email</label>
                      <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@ejemplo.com" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-sky-600" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teléfono</label>
                      <input required name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono de contacto" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-sky-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tipo de obra</label>
                      <select name="tipo" value={form.tipo} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-sky-600">
                        <option>Vivienda (Obra nueva)</option>
                        <option>Remodelación / Cambio de aberturas</option>
                        <option>Edificio / Complejo residencial</option>
                        <option>Comercial / Corporativo</option>
                        <option>Otro tipo de proyecto</option>
                      </select>
                    </div>
                  </div>

                  {/* NUEVO CAMPO: Cargar Planilla / Archivos */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Adjuntar Planilla de Carpinterías / Plano (PDF, DWG, Excel, PNG)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="file-upload"
                        accept=".pdf,.dwg,.dxf,.xlsx,.xls,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white border border-dashed border-slate-300 text-sm cursor-pointer hover:border-sky-600 transition-colors"
                      >
                        <span className={planoFileName ? "text-slate-800 font-medium truncate" : "text-slate-400"}>
                          {planoFileName || "Seleccionar archivo desde tu equipo..."}
                        </span>
                        <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg shrink-0 ml-2">
                          Buscar
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Mensaje o detalles</label>
                    <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={3} placeholder="Detalles adicionales sobre las aberturas..." className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-sky-600 resize-none" />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl text-sm font-bold text-white transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    style={{ backgroundColor: C.accent }}
                  >
                    {submitting ? "Enviando..." : "Enviar Consulta y Archivos"}
                    {!submitting && <Send className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
          <div>
            <span style={{ fontFamily: displayFont }} className="text-xl font-bold text-white tracking-wider">VERKAUFF</span>
            <p className="mt-1 text-slate-500">Carpintería Arquitectónica de Alta Prestación.</p>
          </div>

          {/* Redes Sociales */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/verkauff_aberturas/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-pink-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/aberturas.verkauff/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/verkauff-aberturas-986093428/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94Z" />
              </svg>
            </a>
          </div>

          <div>© {new Date().getFullYear()} VERKAUFF. Todos los derechos reservados.</div>
        </div>
      </footer>

      {/* WHATSAPP FLOTANTE */}
      <a
        href={`https://wa.me/5491100000000?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 pulse-ring"
        aria-label="Contactar por WhatsApp"
      >
        <span
          className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-transform hover:scale-105"
          style={{ backgroundColor: C.brandGreen }}
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </span>
      </a>

      {/* MODAL */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}