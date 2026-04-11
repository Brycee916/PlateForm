import { useEffect, useState, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8787";

const baseRestaurant = () => ({
  name: "",
  cuisine: "",
  phone: "",
  contactEmail: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  hours: { Monday: "", Tuesday: "", Wednesday: "", Thursday: "", Friday: "", Saturday: "", Sunday: "" },
  reservationUrl: "",
  orderUrl: "",
  deliveryUrl: "",
  story: "",
  heroTitle: "",
  heroSubtitle: "",
  templateKey: "modern",
  layoutDensity: "balanced",
  primaryColor: "#ea580c",
  accentColor: "#0f766e",
  seoTitle: "",
  seoDescription: "",
  customDomain: "",
  announcementEnabled: false,
  announcementText: "",
  instagramUrl: "",
  facebookUrl: "",
  tiktokUrl: "",
  showPhone: true,
  showEmail: true,
  showStory: true,
  isOffline: false,
  borderRadiusStyle: "rounded",
  navStyle: "split",
  fontStyle: "sans",
  themeMode: "light",
  heroStyle: "overlay",
  menuCategories: [{ id: crypto.randomUUID(), name: "Featured", items: [] }],
  gallery: [],
  sectionOrder: ["story", "location", "menu", "gallery"],
  extraLocations: []
});

const normalizeRestaurant = (r) => ({ 
  ...baseRestaurant(), 
  ...r, 
  gallery: r?.gallery || [], 
  menuCategories: r?.menuCategories || [],
  hours: (typeof r?.hours === 'object' && r.hours !== null) ? r.hours : baseRestaurant().hours,
  sectionOrder: Array.isArray(r?.sectionOrder) && r.sectionOrder.length > 0 ? r.sectionOrder : ["story", "location", "menu", "gallery"],
  extraLocations: Array.isArray(r?.extraLocations) ? r.extraLocations : []
});

const request = async (path, { method = "GET", token, body } = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
};

const Field = ({ label, value, onChange, type = "text" }) => (
  <label className="block text-sm font-medium text-slate-700">
    {label}
    <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2 text-sm transition-all focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 placeholder:text-slate-400" />
  </label>
);

const Area = ({ label, value, onChange, rows = 2 }) => (
  <label className="block text-sm font-medium text-slate-700">
    {label}
    <textarea rows={rows} value={value || ""} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2 text-sm transition-all focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 placeholder:text-slate-400" />
  </label>
);

function Landing({ onGetStarted }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center pt-10 pb-16">
        <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 mb-6 border border-orange-200 shadow-sm">Over 40+ Generative Themes Now Available</span>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
          Launch Your Restaurant's <br className="hidden sm:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Digital Home</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">
          Stop struggling with clunky website builders. Plateform generates stunning, mobile-first websites optimized for restaurants instantly with a Live WYSIWYG Template Editor.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <button onClick={onGetStarted} className="rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-slate-800">
            Start Building Free
          </button>
        </div>
      </div>
      
      <div className="mt-10 mb-20 grid gap-8 md:grid-cols-3 items-center">
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300/50 border border-white/50 transform hover:-translate-y-2 transition-transform duration-300">
          <img src="/mockup_bakery.png" alt="French Bakery Modern Theme" className="w-full h-auto object-cover" />
        </div>
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300/50 border border-white/50 transform md:-translate-y-8 hover:-translate-y-10 transition-transform duration-300">
          <img src="/mockup_sushi.png" alt="Neon Sushi Dark Theme" className="w-full h-auto object-cover" />
        </div>
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300/50 border border-white/50 transform hover:-translate-y-2 transition-transform duration-300">
          <img src="/mockup_steakhouse.png" alt="Steakhouse Classic Theme" className="w-full h-auto object-cover" />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="rounded-[2rem] bg-white/60 p-8 border border-white/80 shadow-md backdrop-blur-md">
          <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6 text-orange-600 text-xl font-bold shadow-sm">1</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Live Theme Editor</h3>
          <p className="text-slate-500 leading-relaxed">Watch your site compile instantly as you tweak fonts, shadow styles, and layouts in our split-screen simulator.</p>
        </div>
        <div className="rounded-[2rem] bg-white/60 p-8 border border-white/80 shadow-md backdrop-blur-md">
          <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6 text-orange-600 text-xl font-bold shadow-sm">2</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Immersive Galleries</h3>
          <p className="text-slate-500 leading-relaxed">Instantly generate masonry photo girds and immersive lightbox modals to show off your atmosphere.</p>
        </div>
        <div className="rounded-[2rem] bg-white/60 p-8 border border-white/80 shadow-md backdrop-blur-md">
          <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6 text-orange-600 text-xl font-bold shadow-sm">3</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Always Protected</h3>
          <p className="text-slate-500 leading-relaxed">Toggle your site offline instantly, hide your phone number, or update business hours from anywhere.</p>
        </div>
      </div>
    </div>
  );
}

function Auth({ onAuth }) {
  const [isReg, setIsReg] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await request(isReg ? "/api/auth/register" : "/api/auth/login", { method: "POST", body: form });
      onAuth(data);
    } catch (err) { setError(err.message); }
  }
  return (
    <div className="mx-auto mt-20 max-w-4xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl flex flex-col md:flex-row shadow-slate-200/50">
      <div className="md:w-1/2 p-10 lg:p-14 bg-gradient-to-br from-slate-50 to-white">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Plateform</h1>
        <p className="text-slate-500 mb-8">{isReg ? "Create your account to start building." : "Welcome back to your dashboard."}</p>
        <form className="space-y-4" onSubmit={submit}>
          {isReg && <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />}
          <Field label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
          {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
          <button className="mt-2 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] hover:shadow-orange-500/30">
            {isReg ? "Create Account" : "Sign In to Dashboard"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors" type="button" onClick={() => setIsReg(!isReg)}>
            {isReg ? "Already have an account? Sign in" : "New to Plateform? Create an account"}
          </button>
        </div>
      </div>
      <div className="md:w-1/2 p-10 bg-slate-900 text-white flex flex-col justify-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Restaurants run on Plateform.</h2>
          <p className="text-slate-400">Join thousands of owners managing their premium digital presence in minutes, without a single line of code.</p>
        </div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

function Onboarding({ token, onCreated }) {
  const [form, setForm] = useState(baseRestaurant());
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await request("/api/restaurants", { method: "POST", token, body: form });
      onCreated(normalizeRestaurant(data.restaurant));
    } catch (err) { setError(err.message); }
  }
  return (
    <div className="mx-auto max-w-3xl pt-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Let's set up your restaurant</h1>
        <p className="mt-2 text-lg text-slate-500">Provide a few basic details to generate your website.</p>
      </div>
      <form onSubmit={submit} className="grid gap-5 rounded-[2.5rem] border border-white/50 bg-white/70 p-8 shadow-xl shadow-slate-200/40 backdrop-blur-md sm:grid-cols-2 sm:p-10">
        <Field label="Restaurant Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="Primary Cuisine" value={form.cuisine} onChange={(v) => setForm({ ...form, cuisine: v })} />
        <Field label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Field label="Contact Email" value={form.contactEmail} onChange={(v) => setForm({ ...form, contactEmail: v })} />
        <div className="sm:col-span-2">
          <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.01] hover:shadow-orange-500/30">
            Generate My Website
          </button>
        </div>
      </form>
    </div>
  );
}

const PRESETS = [
  { name: "Steakhouse", templateKey: "classic", primaryColor: "#991b1b", accentColor: "#1e293b", borderRadiusStyle: "sharp", navStyle: "center", fontStyle: "serif", themeMode: "dim", heroStyle: "overlay" },
  { name: "Neon Sushi", templateKey: "bold", primaryColor: "#ec4899", accentColor: "#8b5cf6", borderRadiusStyle: "pill", navStyle: "split", fontStyle: "sans", themeMode: "dark", heroStyle: "overlay" },
  { name: "Rustic Cafe", templateKey: "modern", primaryColor: "#d97706", accentColor: "#4d7c0f", borderRadiusStyle: "rounded", navStyle: "center", fontStyle: "sans", themeMode: "light", heroStyle: "split" },
  { name: "Ocean Seafood", templateKey: "modern", primaryColor: "#0284c7", accentColor: "#0f766e", borderRadiusStyle: "pill", navStyle: "split", fontStyle: "sans", themeMode: "light", heroStyle: "overlay" },
  { name: "Midnight Lounge", templateKey: "classic", primaryColor: "#c084fc", accentColor: "#fbbf24", borderRadiusStyle: "sharp", navStyle: "split", fontStyle: "serif", themeMode: "dark", heroStyle: "overlay" },
  { name: "French Bakery", templateKey: "classic", primaryColor: "#f43f5e", accentColor: "#e11d48", borderRadiusStyle: "rounded", navStyle: "center", fontStyle: "playful", themeMode: "light", heroStyle: "split" },
  { name: "Cyberpunk Diner", templateKey: "bold", primaryColor: "#10b981", accentColor: "#f43f5e", borderRadiusStyle: "sharp", navStyle: "split", fontStyle: "mono", themeMode: "dark", heroStyle: "overlay" },
  { name: "Classic Italian", templateKey: "classic", primaryColor: "#b91c1c", accentColor: "#15803d", borderRadiusStyle: "rounded", navStyle: "center", fontStyle: "serif", themeMode: "dim", heroStyle: "split" },
  { name: "Modern Vegan", templateKey: "modern", primaryColor: "#84cc16", accentColor: "#14b8a6", borderRadiusStyle: "pill", navStyle: "split", fontStyle: "sans", themeMode: "light", heroStyle: "overlay" },
  { name: "BBQ Smokehouse", templateKey: "bold", primaryColor: "#ea580c", accentColor: "#dc2626", borderRadiusStyle: "sharp", navStyle: "center", fontStyle: "mono", themeMode: "dim", heroStyle: "overlay" },
  { name: "Minimalist Coffee", templateKey: "modern", primaryColor: "#525252", accentColor: "#171717", borderRadiusStyle: "sharp", navStyle: "split", fontStyle: "sans", themeMode: "light", heroStyle: "split" },
  { name: "Taco Stand", templateKey: "bold", primaryColor: "#f59e0b", accentColor: "#ef4444", borderRadiusStyle: "rounded", navStyle: "center", fontStyle: "playful", themeMode: "light", heroStyle: "overlay" },
  { name: "Fine Dining", templateKey: "classic", primaryColor: "#9ca3af", accentColor: "#d1d5db", borderRadiusStyle: "sharp", navStyle: "center", fontStyle: "serif", themeMode: "dark", heroStyle: "overlay" },
  { name: "Retro Diner", templateKey: "bold", primaryColor: "#06b6d4", accentColor: "#f43f5e", borderRadiusStyle: "pill", navStyle: "split", fontStyle: "playful", themeMode: "light", heroStyle: "split" },
  { name: "Tech Food Truck", templateKey: "modern", primaryColor: "#3b82f6", accentColor: "#8b5cf6", borderRadiusStyle: "sharp", navStyle: "center", fontStyle: "mono", themeMode: "light", heroStyle: "overlay" },
  { name: "Dim Sum Palace", templateKey: "classic", primaryColor: "#dc2626", accentColor: "#fbbf24", borderRadiusStyle: "rounded", navStyle: "split", fontStyle: "serif", themeMode: "dim", heroStyle: "split" },
  { name: "Boba Shop", templateKey: "modern", primaryColor: "#fbcfe8", accentColor: "#f472b6", borderRadiusStyle: "pill", navStyle: "center", fontStyle: "playful", themeMode: "light", heroStyle: "overlay" },
  { name: "Gastro Pub", templateKey: "classic", primaryColor: "#b45309", accentColor: "#78350f", borderRadiusStyle: "rounded", navStyle: "split", fontStyle: "sans", themeMode: "dim", heroStyle: "split" },
  { name: "Noodle Bar", templateKey: "bold", primaryColor: "#ef4444", accentColor: "#f59e0b", borderRadiusStyle: "sharp", navStyle: "split", fontStyle: "mono", themeMode: "dark", heroStyle: "overlay" },
  { name: "Breakfast Club", templateKey: "modern", primaryColor: "#fde047", accentColor: "#fdba74", borderRadiusStyle: "pill", navStyle: "center", fontStyle: "playful", themeMode: "light", heroStyle: "split" },
  
  // 20 NEW PRESETS
  { name: "Mediterranean", templateKey: "classic", primaryColor: "#0284c7", accentColor: "#eab308", borderRadiusStyle: "sharp", navStyle: "center", fontStyle: "serif", themeMode: "light", heroStyle: "overlay" },
  { name: "Matcha Cafe", templateKey: "modern", primaryColor: "#84cc16", accentColor: "#65a30d", borderRadiusStyle: "rounded", navStyle: "split", fontStyle: "sans", themeMode: "light", heroStyle: "split" },
  { name: "London Pub", templateKey: "classic", primaryColor: "#7f1d1d", accentColor: "#d97706", borderRadiusStyle: "sharp", navStyle: "center", fontStyle: "serif", themeMode: "dim", heroStyle: "overlay" },
  { name: "Neon Arcade", templateKey: "bold", primaryColor: "#f0abfc", accentColor: "#2dd4bf", borderRadiusStyle: "pill", navStyle: "split", fontStyle: "mono", themeMode: "dark", heroStyle: "overlay" },
  { name: "Brutalist Block", templateKey: "modern", primaryColor: "#000000", accentColor: "#525252", borderRadiusStyle: "sharp", navStyle: "center", fontStyle: "mono", themeMode: "light", heroStyle: "split" },
  { name: "Tropical Resort", templateKey: "modern", primaryColor: "#06b6d4", accentColor: "#d946ef", borderRadiusStyle: "rounded", navStyle: "split", fontStyle: "playful", themeMode: "light", heroStyle: "overlay" },
  { name: "Parisian Cafe", templateKey: "classic", primaryColor: "#db2777", accentColor: "#9333ea", borderRadiusStyle: "pill", navStyle: "center", fontStyle: "serif", themeMode: "light", heroStyle: "overlay" },
  { name: "Vintage 1950s", templateKey: "classic", primaryColor: "#be123c", accentColor: "#1d4ed8", borderRadiusStyle: "rounded", navStyle: "split", fontStyle: "playful", themeMode: "light", heroStyle: "split" },
  { name: "Nordic Kitchen", templateKey: "modern", primaryColor: "#9ca3af", accentColor: "#6b7280", borderRadiusStyle: "sharp", navStyle: "split", fontStyle: "sans", themeMode: "light", heroStyle: "split" },
  { name: "Spicy Hotpot", templateKey: "bold", primaryColor: "#ef4444", accentColor: "#b91c1c", borderRadiusStyle: "pill", navStyle: "center", fontStyle: "sans", themeMode: "dark", heroStyle: "overlay" },
  { name: "Miami Vaporwave", templateKey: "bold", primaryColor: "#22d3ee", accentColor: "#db2777", borderRadiusStyle: "sharp", navStyle: "split", fontStyle: "mono", themeMode: "dim", heroStyle: "split" },
  { name: "Sushi Omakase", templateKey: "classic", primaryColor: "#171717", accentColor: "#b91c1c", borderRadiusStyle: "sharp", navStyle: "center", fontStyle: "serif", themeMode: "dim", heroStyle: "overlay" },
  { name: "Urban Pizzeria", templateKey: "modern", primaryColor: "#eab308", accentColor: "#ea580c", borderRadiusStyle: "rounded", navStyle: "split", fontStyle: "sans", themeMode: "light", heroStyle: "split" },
  { name: "Bavarian Beer", templateKey: "classic", primaryColor: "#0369a1", accentColor: "#fcd34d", borderRadiusStyle: "rounded", navStyle: "split", fontStyle: "serif", themeMode: "dim", heroStyle: "overlay" },
  { name: "Poke Bowl", templateKey: "modern", primaryColor: "#f472b6", accentColor: "#34d399", borderRadiusStyle: "pill", navStyle: "center", fontStyle: "sans", themeMode: "light", heroStyle: "split" },
  { name: "Desert Oasis", templateKey: "classic", primaryColor: "#ca8a04", accentColor: "#c2410c", borderRadiusStyle: "sharp", navStyle: "center", fontStyle: "sans", themeMode: "light", heroStyle: "overlay" },
  { name: "Gothic Tavern", templateKey: "classic", primaryColor: "#4f46e5", accentColor: "#be185d", borderRadiusStyle: "sharp", navStyle: "split", fontStyle: "serif", themeMode: "dark", heroStyle: "overlay" },
  { name: "Pastel Gelato", templateKey: "bold", primaryColor: "#fbcfe8", accentColor: "#bbf7d0", borderRadiusStyle: "pill", navStyle: "center", fontStyle: "playful", themeMode: "light", heroStyle: "split" },
  { name: "Soul Food Yard", templateKey: "modern", primaryColor: "#b45309", accentColor: "#84cc16", borderRadiusStyle: "rounded", navStyle: "center", fontStyle: "sans", themeMode: "light", heroStyle: "overlay" },
  { name: "Dark Kitchen", templateKey: "bold", primaryColor: "#fbbf24", accentColor: "#10b981", borderRadiusStyle: "sharp", navStyle: "split", fontStyle: "mono", themeMode: "dark", heroStyle: "split" }
];

function LayoutEditor({ order, onChange }) {
  const moveUp = (idx) => {
    if (idx === 0) return;
    const next = [...order];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  };
  const moveDown = (idx) => {
    if (idx === order.length - 1) return;
    const next = [...order];
    [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
    onChange(next);
  };
  const names = { story: "Our Story", location: "Location & Hours", menu: "Menu Builder", gallery: "Photo Gallery" };
  return (
    <div className="space-y-2">
      {order.map((key, i) => (
        <div key={key} className="flex justify-between items-center bg-white border border-slate-200 p-3 rounded-xl shadow-sm hover:border-slate-300 transition">
          <span className="font-semibold text-sm text-slate-700">{i+1}. {names[key]}</span>
          <div className="flex gap-1">
            <button type="button" onClick={() => moveUp(i)} disabled={i === 0} className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg disabled:opacity-30 transition">↑</button>
            <button type="button" onClick={() => moveDown(i)} disabled={i === order.length - 1} className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg disabled:opacity-30 transition">↓</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function DeploymentsList({ deployments }) {
  if (!deployments || deployments.length === 0) return <p className="text-sm text-slate-400 italic">No deployments published yet.</p>;
  return (
    <div className="space-y-4">
      {deployments.slice(0, 5).map(d => (
        <div key={d.id} className="flex gap-4 p-4 bg-slate-50 border border-emerald-500/30 rounded-xl">
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(d.previewUrl)}`} alt="QR Code" className="w-16 h-16 rounded-md shadow-sm border border-slate-200 bg-white p-1" />
          <div className="flex-1 overflow-hidden">
            <div className="text-emerald-700 font-bold mb-1 text-xs uppercase tracking-wide flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live Version</div>
            <a href={d.previewUrl} target="_blank" rel="noreferrer" className="text-emerald-700 text-sm font-mono truncate block hover:underline">{d.previewUrl}</a>
            <div className="text-slate-500 text-[10px] mt-1 font-medium">Published on {new Date(d.createdAt).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LocationsBuilder({ value, onChange }) {
  const add = () => onChange([...value, { id: crypto.randomUUID(), name: "", address: "", city: "", state: "", mapUrl: "", hours: {} }]);
  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));
  const update = (idx, field, val) => { const next = [...value]; next[idx][field] = val; onChange(next); };
  return (
    <div className="space-y-4 mt-6">
      {value.length > 0 && <label className="block text-sm font-medium text-slate-700">Additional Branches</label>}
      {value.map((loc, idx) => (
        <div key={loc.id || idx} className="rounded-xl border border-slate-200 bg-slate-100/50 p-4 relative">
          <button type="button" onClick={() => remove(idx)} className="absolute top-3 right-3 text-red-500 text-sm font-bold">&times; Remove</button>
          <div className="grid gap-3 max-w-[90%]">
            <Field label="Branch Name (e.g. Downtown)" value={loc.name} onChange={(v) => update(idx, 'name', v)} />
            <Field label="Street Address" value={loc.address} onChange={(v) => update(idx, 'address', v)} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="City" value={loc.city} onChange={(v) => update(idx, 'city', v)} />
              <Field label="State / ZIP" value={loc.state} onChange={(v) => update(idx, 'state', v)} />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="w-full rounded-xl border border-dashed border-slate-300 py-2.5 text-xs font-bold text-slate-600 hover:border-slate-500 hover:bg-slate-50 transition">+ Add Restaurant Location</button>
    </div>
  );
}

function HoursBuilder({ value, onChange }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const update = (day, val) => onChange({ ...value, [day]: val });
  return (
    <div className="space-y-3 bg-white/30 p-4 rounded-xl border border-slate-200/50">
      <label className="block text-sm font-medium text-slate-700 mb-1">Business Hours</label>
      {days.map((day) => (
        <div key={day} className="flex items-center gap-3">
          <span className="w-24 text-xs text-slate-600 font-medium uppercase tracking-wider">{day}</span>
          <input type="text" placeholder="e.g. 9:00 AM - 5:00 PM or Closed" value={value?.[day] || ""} onChange={(e) => update(day, e.target.value)} className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/10" />
        </div>
      ))}
    </div>
  );
}

function GalleryManager({ value, onChange }) {
  const [input, setInput] = useState("");
  const add = () => { if (input) { onChange([...value, input]); setInput(""); } };
  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste image URL here..." className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none" />
        <button onClick={add} type="button" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800 shadow-sm">Add Photo</button>
      </div>
      {value.length === 0 && <p className="text-sm text-slate-400 italic">No photos added yet. Paste a URL to begin building your gallery.</p>}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {value.map((url, idx) => (
          <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button type="button" onClick={() => remove(idx)} className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold pb-0.5">&times;</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuBuilder({ value, onChange }) {
  const addCategory = () => onChange([...value, { id: crypto.randomUUID(), name: "New Category", items: [] }]);
  const removeCategory = (idx) => onChange(value.filter((_, i) => i !== idx));
  const updateCategory = (idx, name) => { const next = [...value]; next[idx].name = name; onChange(next); };
  const addItem = (catIdx) => { const next = [...value]; next[catIdx].items.push({ id: crypto.randomUUID(), name: "New Item", description: "", price: "$0.00" }); onChange(next); };
  const removeItem = (catIdx, itemIdx) => { const next = [...value]; next[catIdx].items.splice(itemIdx, 1); onChange(next); };
  const updateItem = (catIdx, itemIdx, field, val) => { const next = [...value]; next[catIdx].items[itemIdx][field] = val; onChange(next); };

  return (
    <div className="space-y-6">
      {value.length === 0 && <p className="text-sm text-slate-400 italic">No menu categories yet.</p>}
      {value.map((cat, cIdx) => (
        <div key={cat.id} className="rounded-xl border border-slate-200 bg-white/50 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <input value={cat.name} onChange={(e) => updateCategory(cIdx, e.target.value)} className="font-bold text-lg text-slate-900 bg-transparent border-b-2 border-transparent focus:border-orange-500 focus:outline-none px-1" />
            <button type="button" onClick={() => removeCategory(cIdx)} className="text-red-500 text-sm font-medium hover:underline ml-auto">Delete Category</button>
          </div>
          <div className="space-y-3">
            {cat.items.map((item, iIdx) => (
              <div key={item.id} className="grid grid-cols-12 gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100 items-start">
                <div className="col-span-12 sm:col-span-5"><input placeholder="Item Name" value={item.name} onChange={(e) => updateItem(cIdx, iIdx, 'name', e.target.value)} className="w-full text-sm font-semibold p-1 focus:outline-none focus:border-b focus:border-orange-500" /></div>
                <div className="col-span-12 sm:col-span-3"><input placeholder="Price" value={item.price} onChange={(e) => updateItem(cIdx, iIdx, 'price', e.target.value)} className="w-full text-sm text-orange-600 font-bold p-1 focus:outline-none focus:border-b focus:border-orange-500" /></div>
                <div className="col-span-12 sm:col-span-11"><input placeholder="Item description or ingredients..." value={item.description} onChange={(e) => updateItem(cIdx, iIdx, 'description', e.target.value)} className="w-full text-xs text-slate-500 p-1 focus:outline-none focus:border-b focus:border-orange-500" /></div>
                <div className="col-span-12 sm:col-span-1 flex items-center justify-end"><button type="button" onClick={() => removeItem(cIdx, iIdx)} className="text-slate-400 hover:text-red-500 text-xl font-bold px-2">&times;</button></div>
              </div>
            ))}
            <button type="button" onClick={() => addItem(cIdx)} className="text-sm rounded-lg bg-orange-50 px-3 py-1.5 text-orange-600 font-semibold hover:bg-orange-100 transition inline-block mt-2">+ Add Item</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addCategory} className="w-full rounded-xl border-2 border-dashed border-slate-300 py-3.5 text-sm font-semibold text-slate-600 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition">+ Add Menu Category</button>
    </div>
  );
}

function ThemeGallery({ current, onSelect }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">Visual Theme Gallery</label>
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-slate-300">
        {PRESETS.map((p) => {
          const isSelected = current.primaryColor === p.primaryColor && current.themeMode === p.themeMode && current.fontStyle === p.fontStyle;
          const bg = p.themeMode === "dark" ? "#0f172a" : p.themeMode === "dim" ? "#27272a" : "#ffffff";
          const surface = p.themeMode === "dark" ? "#1e293b" : p.themeMode === "dim" ? "#3f3f46" : "#f9fafb";
          const text = p.themeMode === "dark" || p.themeMode === "dim" ? "#ffffff" : "#111827";
          return (
            <button 
              type="button" 
              key={p.name} 
              onClick={() => onSelect(p)} 
              className={`snap-start shrink-0 w-36 rounded-2xl border-2 transition-all overflow-hidden text-left shadow-sm ${isSelected ? "border-orange-500 shadow-md transform scale-[1.02]" : "border-slate-200 hover:border-slate-400"}`}
            >
              <div 
                className="h-20 w-full p-3 flex flex-col justify-between" 
                style={{ backgroundColor: bg, fontFamily: p.fontStyle === 'serif' ? 'serif' : p.fontStyle === 'mono' ? 'monospace' : p.fontStyle === 'playful' ? 'Comic Sans MS, cursive' : 'sans-serif' }}
              >
                <div style={{ color: text, fontSize: '10px', fontWeight: 'bold' }}>{p.name.slice(0, 10)}</div>
                <div className="flex gap-1 mt-auto items-end">
                  <div className="h-4 w-12 rounded-sm" style={{ backgroundColor: p.primaryColor }}></div>
                  <div className="h-4 w-6 rounded-sm" style={{ backgroundColor: p.accentColor }}></div>
                </div>
              </div>
              <div className="bg-white px-3 py-2 text-[10px] font-semibold text-slate-600 uppercase tracking-wider flex justify-between">
                <span>{p.themeMode}</span>
                <span>{p.fontStyle}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Dashboard({ token, user, restaurant, onUpdate, onLogout }) {
  const [draft, setDraft] = useState(normalizeRestaurant(restaurant));
  const [status, setStatus] = useState("");
  const [deployments, setDeployments] = useState([]);
  const [pub, setPub] = useState(null);
  const [previewHtml, setPreviewHtml] = useState(null);
  const [showPreview, setShowPreview] = useState(true);
  const debounceRef = useRef(null);

  const applyPreset = (p) => setDraft({ ...draft, templateKey: p.templateKey, primaryColor: p.primaryColor, accentColor: p.accentColor, borderRadiusStyle: p.borderRadiusStyle, navStyle: p.navStyle, fontStyle: p.fontStyle, themeMode: p.themeMode, heroStyle: p.heroStyle });

  useEffect(() => { request(`/api/restaurants/${restaurant.id}/deployments`, { token }).then((d) => setDeployments(d.deployments)).catch(() => setDeployments([])); }, [restaurant.id, token]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      request("/api/preview", { method: "POST", token, body: draft })
        .then((res) => setPreviewHtml(res.html))
        .catch(console.error);
    }, 400); 
    return () => clearTimeout(debounceRef.current);
  }, [draft, token]);

  const save = async () => {
    setStatus("Saving...");
    const data = await request(`/api/restaurants/${restaurant.id}`, { method: "PUT", token, body: draft });
    onUpdate(normalizeRestaurant(data.restaurant));
    setStatus("Saved");
    setTimeout(() => setStatus(""), 1200);
  };
  const publish = async () => {
    setStatus("Publishing...");
    await save();
    const out = await request(`/api/restaurants/${restaurant.id}/publish`, { method: "POST", token });
    setPub(out.deployment);
    const d = await request(`/api/restaurants/${restaurant.id}/deployments`, { token });
    setDeployments(d.deployments);
    setStatus("Published Successfully");
    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* LEFT PANE: Editor Controls */}
      <div className={`shrink-0 border-r border-slate-200 bg-white flex flex-col h-full z-10 shadow-xl transition-all duration-300 ${showPreview ? "w-full lg:w-[500px] xl:w-[600px]" : "w-full"}`}>
        
        <header className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-bold text-slate-900 truncate w-48">{draft.name || "Draft"}</h1>
            <div className="flex gap-3 text-xs font-medium text-slate-500">
              <span>Live Editor</span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-600 font-bold tracking-wide">{restaurant.views || 0} Total Views</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowPreview(!showPreview)} className={`rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-300 ${showPreview ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`} title="Toggle Live Preview Pane">
              {showPreview ? "Hide Preview \u2192" : "\u2190 Show Live Preview"}
            </button>
            <div className="h-4 w-px bg-slate-300 mx-1"></div>
            <button onClick={save} className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 transition-all hover:bg-slate-100 hover:ring-slate-300">Save</button>
            <button onClick={publish} className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-bold text-white shadow-md transition-all hover:bg-orange-500">Publish</button>
            <button className="text-slate-400 hover:text-slate-800 transition mx-2" onClick={onLogout} title="Sign Out">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/><path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/></svg>
            </button>
          </div>
        </header>
        
        {status && <div className="bg-orange-100 text-orange-700 text-xs font-bold text-center py-1 shrink-0 animate-pulse">{status}</div>}
        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-slate-200 bg-white flex flex-col items-center">
          <div className={`space-y-12 w-full ${showPreview ? "" : "max-w-4xl"}`}>
            
            {/* Design Generation Settings */}
            <section>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Generative Design Engine</h2>
              <ThemeGallery current={draft} onSelect={applyPreset} />
              
              <div className="space-y-4 rounded-2xl bg-slate-50 p-5 border border-slate-100 mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <label className="block text-sm font-medium text-slate-700">Typography Font
                    <select value={draft.fontStyle} onChange={(e) => setDraft({ ...draft, fontStyle: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 active:ring-0">
                      <option value="sans">Modern Sans</option>
                      <option value="serif">Elegant Serif</option>
                      <option value="mono">Tech Monospace</option>
                      <option value="playful">Playful Rounded</option>
                    </select>
                  </label>
                  <label className="block text-sm font-medium text-slate-700">Theme Mode
                    <select value={draft.themeMode} onChange={(e) => setDraft({ ...draft, themeMode: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 active:ring-0">
                      <option value="light">Crisp Light Mode</option>
                      <option value="dim">Moody Dim Mode</option>
                      <option value="dark">Deep Dark Mode</option>
                    </select>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block text-sm font-medium text-slate-700">Card & Button Shape
                    <select value={draft.borderRadiusStyle} onChange={(e) => setDraft({ ...draft, borderRadiusStyle: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 active:ring-0">
                      <option value="sharp">Sharp (0px)</option>
                      <option value="rounded">Rounded</option>
                      <option value="pill">Pill / Soft</option>
                    </select>
                  </label>
                  <label className="block text-sm font-medium text-slate-700">Menu Navigation
                    <select value={draft.navStyle} onChange={(e) => setDraft({ ...draft, navStyle: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 active:ring-0">
                      <option value="split">Logo Left, Links Right</option>
                      <option value="center">Fully Centered</option>
                    </select>
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <label className="block text-sm font-medium text-slate-700">Hero Section Layout
                    <select value={draft.heroStyle} onChange={(e) => setDraft({ ...draft, heroStyle: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 active:ring-0">
                      <option value="overlay">Full Width Background Overlay</option>
                      <option value="split">Split Screen / Side-by-Side</option>
                    </select>
                  </label>
                </div>
                <div className="flex gap-4">
                  <label className="flex-1 block text-sm font-medium text-slate-700">Primary Color
                    <div className="mt-1 flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white pl-2 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20">
                      <input type="color" value={draft.primaryColor} onChange={(e) => setDraft({ ...draft, primaryColor: e.target.value })} className="h-8 w-8 cursor-pointer rounded-full border-0 bg-transparent p-0" />
                      <span className="px-3 text-xs text-slate-500 font-mono uppercase">{draft.primaryColor}</span>
                    </div>
                  </label>
                  <label className="flex-1 block text-sm font-medium text-slate-700">Accent Color
                    <div className="mt-1 flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white pl-2 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20">
                      <input type="color" value={draft.accentColor} onChange={(e) => setDraft({ ...draft, accentColor: e.target.value })} className="h-8 w-8 cursor-pointer rounded-full border-0 bg-transparent p-0" />
                      <span className="px-3 text-xs text-slate-500 font-mono uppercase">{draft.accentColor}</span>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Layout Engine */}
            <section>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Modular Layout Engine</h2>
              <p className="text-xs text-slate-500 mb-3">Re-order how sections appear on your homepage.</p>
              <LayoutEditor order={draft.sectionOrder} onChange={(v) => setDraft({ ...draft, sectionOrder: v })} />
            </section>

            {/* Core General Detail */}
            <section>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Restaurant Identity</h2>
              <div className="space-y-4">
                <Field label="Restaurant Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
                <Field label="Cuisine Type" value={draft.cuisine} onChange={(v) => setDraft({ ...draft, cuisine: v })} />
                
                <div className="space-y-1 relative group mt-4">
                  <Area label="Our Story (About Section)" value={draft.story} rows={3} onChange={(v) => setDraft({ ...draft, story: v })} />
                  <label className="flex items-center gap-1.5 absolute top-0 right-0 text-[10px] uppercase font-bold text-slate-500">
                    <input type="checkbox" checked={!!draft.showStory} onChange={(e) => setDraft({ ...draft, showStory: e.target.checked })} /> Show
                  </label>
                </div>
                <Field label="Hero Title" value={draft.heroTitle} onChange={(v) => setDraft({ ...draft, heroTitle: v })} />
                <Field label="Hero Subtitle" value={draft.heroSubtitle} onChange={(v) => setDraft({ ...draft, heroSubtitle: v })} />
              </div>
            </section>

            {/* SEO Tuning */}
            <section>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Search Engine Optimization (SEO)</h2>
              <div className="space-y-4">
                <Field label="Google Meta Title" value={draft.seoTitle} onChange={(v) => setDraft({ ...draft, seoTitle: v })} />
                <Area label="Meta Description (Summary for Facebook/Google)" value={draft.seoDescription} rows={2} onChange={(v) => setDraft({ ...draft, seoDescription: v })} />
              </div>
            </section>

            {/* Menu Builder  */}
            <section>
               <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Virtual Menu</h2>
               <MenuBuilder value={draft.menuCategories} onChange={(v) => setDraft({ ...draft, menuCategories: v })} />
            </section>

            {/* Photo Gallery */}
            <section>
               <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Visual Gallery</h2>
               <GalleryManager value={draft.gallery} onChange={(v) => setDraft({ ...draft, gallery: v })} />
            </section>

            {/* Timings */}
            <section>
               <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Timings & Location</h2>
               <div className="grid gap-4 mb-4">
                 <Field label="Street Address" value={draft.address} onChange={(v) => setDraft({ ...draft, address: v })} />
                 <div className="grid grid-cols-2 gap-4">
                    <Field label="City" value={draft.city} onChange={(v) => setDraft({ ...draft, city: v })} />
                    <Field label="State / ZIP" value={draft.state} onChange={(v) => setDraft({ ...draft, state: v })} />
                 </div>
               </div>
               <HoursBuilder value={draft.hours} onChange={(v) => setDraft({ ...draft, hours: v })} />
               
               <LocationsBuilder value={draft.extraLocations} onChange={(v) => setDraft({ ...draft, extraLocations: v })} />
            </section>

             {/* Deployments & Privacy */}
             <section className="border-t border-slate-200 pt-8">
               <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Published Sites</h2>
               <DeploymentsList deployments={deployments} />

               <div className="mt-8">
                 <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Privacy Controls</h2>
                 <label className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                  <input type="checkbox" checked={!!draft.isOffline} onChange={(e) => setDraft({ ...draft, isOffline: e.target.checked })} className="w-4 h-4 text-red-600 rounded" />
                  <span className="text-sm font-semibold text-red-900">Take Website Offline Temporarily</span>
                </label>
               </div>
            </section>

           <div className="pb-20"></div>
          </div>
        </div>
      </div>

      {/* RIGHT PANE: Live Target Device Simulator */}
      {showPreview && (
        <div className="flex-1 bg-slate-200 relative shadow-inner overflow-hidden flex flex-col transition-all duration-300">
          <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 border-b border-slate-900 flex justify-between items-center shadow-md shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-amber-400"></div><div className="w-3 h-3 rounded-full bg-emerald-400"></div></div>
              <span className="ml-3 font-mono tracking-wide">{draft.customDomain || `${draft.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'preview'}.plateform.com`}</span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-md">Live Preview Active</span>
          </div>
          <div className="flex-1 w-full bg-slate-900/50 backdrop-blur flex justify-center items-center overflow-hidden h-full">
            {previewHtml ? (
                <iframe 
                  srcDoc={previewHtml} 
                  className="w-full h-full border-none shadow-2xl transition-all duration-500 ease-in-out bg-white" 
                  title="Live Website Preview" 
                />
            ) : (
              <div className="text-slate-400 animate-pulse font-mono text-sm">Compiling Generation Preview...</div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("plateform_token") || "");
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(!!token);
  const [error, setError] = useState("");
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (!token) return;
    Promise.all([request("/api/me", { token }), request("/api/restaurants", { token })])
      .then(([me, rs]) => { setUser(me.user); setRestaurant(normalizeRestaurant(rs.restaurants[0] || null)); setError(""); })
      .catch((err) => { setError(err.message); localStorage.removeItem("plateform_token"); setToken(""); })
      .finally(() => setLoading(false));
  }, [token]);

  const onAuth = (data) => { localStorage.setItem("plateform_token", data.token); setLoading(true); setToken(data.token); setUser(data.user); setShowAuth(false); };
  const onLogout = async () => { try { await request("/api/auth/logout", { method: "POST", token }); } catch { setError((prev) => prev); } setToken(""); setUser(null); setRestaurant(null); localStorage.removeItem("plateform_token"); setShowAuth(false); };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-200 font-sans">
      {loading && (
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500"></div>
        </div>
      )}
      {!loading && !token && !showAuth && <Landing onGetStarted={() => setShowAuth(true)} />}
      {!loading && !token && showAuth && <Auth onAuth={onAuth} />}
      {!loading && token && user && !restaurant && <Onboarding token={token} onCreated={setRestaurant} />}
      {!loading && token && user && restaurant && <Dashboard key={restaurant.id} token={token} user={user} restaurant={restaurant} onUpdate={setRestaurant} onLogout={onLogout} />}
      {!loading && error && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-red-200 bg-red-50/90 px-6 py-3 text-sm font-medium text-red-600 shadow-xl backdrop-blur-md z-50">
          {error}
        </div>
      )}
    </div>
  );
}
