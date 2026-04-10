import React from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Globe,
  Image as ImageIcon,
  LayoutTemplate,
  MapPin,
  MenuSquare,
  MonitorSmartphone,
  Paintbrush2,
  Rocket,
  Sparkles,
  Store,
} from "lucide-react";

const features = [
  {
    icon: LayoutTemplate,
    title: "Restaurant-ready templates",
    description:
      "Start with layouts built for cafes, bakeries, food trucks, and full-service dining rooms.",
  },
  {
    icon: Paintbrush2,
    title: "Simple visual editor",
    description:
      "Update your brand colors, fonts, photos, and layout without touching code.",
  },
  {
    icon: MenuSquare,
    title: "Menu management",
    description:
      "Add seasonal menus, featured dishes, prices, and specials in a few clicks.",
  },
  {
    icon: ImageIcon,
    title: "Photo galleries",
    description:
      "Show off signature plates, interiors, and events with polished image sections.",
  },
  {
    icon: MapPin,
    title: "Hours and location blocks",
    description:
      "Keep hours, address, contact links, and reservation details easy to find.",
  },
  {
    icon: Rocket,
    title: "One-click publishing",
    description:
      "Launch instantly with hosting, deployment, and updates handled in one place.",
  },
  {
    icon: Globe,
    title: "Custom domains included",
    description:
      "Connect your own domain and look established from day one.",
  },
  {
    icon: MonitorSmartphone,
    title: "SEO and mobile optimized",
    description:
      "Help guests find you on Google and get a smooth experience on any device.",
  },
];

const templates = [
  {
    name: "Fine Dining",
    accent: "from-stone-900 via-amber-950 to-stone-800",
    tone: "Elegant, cinematic, reservation-first",
    copy: "Perfect for chef-led concepts, tasting menus, and upscale hospitality brands.",
  },
  {
    name: "Neighborhood Cafe",
    accent: "from-amber-100 via-orange-50 to-rose-100",
    tone: "Warm, welcoming, community-driven",
    copy: "Ideal for coffee shops, brunch spots, and all-day casual spaces.",
  },
  {
    name: "Food Truck",
    accent: "from-red-500 via-orange-500 to-yellow-400",
    tone: "Bold, fast, mobile-first",
    copy: "Built for menus that change often, pop-up schedules, and social traffic.",
  },
  {
    name: "Bakery",
    accent: "from-rose-100 via-orange-50 to-yellow-100",
    tone: "Soft, artisanal, product-focused",
    copy: "Great for pastry shops, custom cake businesses, and seasonal pre-orders.",
  },
  {
    name: "Modern Casual",
    accent: "from-teal-900 via-emerald-800 to-stone-900",
    tone: "Clean, stylish, conversion-focused",
    copy: "A sharp fit for growing brands that want a polished online presence quickly.",
  },
];

const testimonials = [
  {
    quote:
      "We replaced an outdated site in one afternoon. Our new menu is easier to update, and guests finally stop calling to ask for our hours.",
    name: "Marisol Vega",
    role: "Owner, Sol y Mesa",
  },
  {
    quote:
      "The templates actually look like they were made for restaurants. We launched before a busy holiday weekend without hiring a designer or developer.",
    name: "Daniel Cho",
    role: "Co-owner, Juniper Bakery",
  },
  {
    quote:
      "Our food truck schedule changes constantly, and this makes updates simple. It looks professional and takes almost no time to manage.",
    name: "Tasha Reed",
    role: "Founder, Ember Street Kitchen",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$29",
    description: "For new restaurants that need a polished online presence fast.",
    features: [
      "1 website",
      "Restaurant template library",
      "Drag-and-drop editor",
      "Menu, hours, and location sections",
      "Hosting included",
    ],
    cta: "Start Free Trial",
    featured: false,
  },
  {
    name: "Growth",
    price: "$79",
    description: "For busy restaurants that want more flexibility and stronger branding.",
    features: [
      "Everything in Starter",
      "Custom domain connection",
      "Advanced gallery sections",
      "SEO tools and analytics",
      "Priority support",
    ],
    cta: "Book a Demo",
    featured: true,
  },
  {
    name: "Premium",
    price: "$149",
    description: "For multi-location brands and hospitality groups ready to scale.",
    features: [
      "Everything in Growth",
      "Up to 5 locations",
      "Multi-site management",
      "Brand presets",
      "Launch support",
    ],
    cta: "Talk to Sales",
    featured: false,
  },
];

const faqs = [
  {
    question: "Do I need any technical experience?",
    answer:
      "No. The platform is designed for restaurant owners and managers, not developers. You can pick a template, update your content, and publish with guided tools.",
  },
  {
    question: "Can I use my own domain name?",
    answer:
      "Yes. You can connect an existing domain or set one up during launch, depending on your plan.",
  },
  {
    question: "Can I update my menu whenever I want?",
    answer:
      "Yes. You can change dishes, prices, specials, and seasonal menus anytime without rebuilding the site.",
  },
  {
    question: "Is hosting included?",
    answer:
      "Yes. Hosting, deployment, and site delivery are included so you do not have to manage separate providers.",
  },
];

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-4 inline-flex items-center rounded-full border border-orange-200 bg-white/80 px-4 py-1 text-sm font-medium text-orange-700 shadow-sm">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl text-stone-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-stone-600">{description}</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8f2ea] text-stone-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.20),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(180,83,9,0.22),_transparent_30%),linear-gradient(180deg,#fffaf4_0%,#f8f2ea_45%,#f7efe5_100%)]" />

      <header className="sticky top-0 z-50 border-b border-white/50 bg-[#fffaf4]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 text-white shadow-lg shadow-orange-200/40">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <p className="font-serif text-xl tracking-tight">Plateform</p>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">Websites for restaurants</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-stone-600 md:flex">
            <a href="#features" className="transition hover:text-stone-900">Features</a>
            <a href="#templates" className="transition hover:text-stone-900">Templates</a>
            <a href="#pricing" className="transition hover:text-stone-900">Pricing</a>
            <a href="#faq" className="transition hover:text-stone-900">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-white sm:inline-flex">
              Sign In
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-orange-300/30 transition hover:-translate-y-0.5 hover:bg-stone-800">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="px-6 pb-20 pt-16 lg:px-8 lg:pt-24">
          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-4 py-2 text-sm text-orange-800 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Built for restaurant owners, not developers
              </div>

              <h1 className="mt-8 max-w-3xl font-serif text-5xl leading-tight tracking-tight text-stone-950 sm:text-6xl">
                Launch a restaurant website that looks polished in minutes, not weeks.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
                Choose a restaurant template, customize your menu, photos, hours, and branding,
                then publish instantly with hosting and deployment handled for you.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-orange-300/40 transition hover:-translate-y-1 hover:bg-orange-500">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-7 py-4 text-base font-semibold text-stone-800 shadow-sm transition hover:-translate-y-1 hover:border-stone-400">
                  Book a Demo
                </button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-stone-600">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  Hosting included
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  Mobile optimized
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  No code required
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 top-8 h-32 w-32 rounded-full bg-orange-300/30 blur-3xl" />
              <div className="absolute -right-8 bottom-8 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 p-5 shadow-[0_30px_90px_-20px_rgba(120,53,15,0.35)] backdrop-blur">
                <div className="rounded-[26px] bg-stone-950 p-4 text-white">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Dashboard</p>
                      <h3 className="mt-2 font-serif text-2xl">Luna Trattoria</h3>
                    </div>
                    <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300">
                      Live
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="space-y-4">
                      <div className="rounded-2xl bg-white/6 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Brand</p>
                        <div className="mt-4 flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-orange-500" />
                          <div className="h-10 w-10 rounded-full bg-amber-200" />
                          <div className="h-10 w-10 rounded-full bg-stone-700" />
                        </div>
                        <p className="mt-4 text-sm text-stone-300">Warm palette applied to every page.</p>
                      </div>

                      <div className="rounded-2xl bg-white/6 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Menu Editor</p>
                        <div className="mt-4 space-y-3">
                          <div className="rounded-xl bg-white/8 p-3">
                            <div className="flex items-center justify-between text-sm">
                              <span>Burrata Toast</span>
                              <span className="text-orange-300">$14</span>
                            </div>
                          </div>
                          <div className="rounded-xl bg-white/8 p-3">
                            <div className="flex items-center justify-between text-sm">
                              <span>Rigatoni Alla Vodka</span>
                              <span className="text-orange-300">$22</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] bg-[#f8f2ea] p-4 text-stone-900">
                      <div className="overflow-hidden rounded-[22px] border border-stone-200 bg-white shadow-sm">
                        <div className="h-44 bg-[linear-gradient(135deg,rgba(120,53,15,0.88),rgba(251,146,60,0.65)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
                        <div className="p-5">
                          <p className="text-xs uppercase tracking-[0.28em] text-orange-700">Preview</p>
                          <h4 className="mt-2 font-serif text-3xl">Luna Trattoria</h4>
                          <p className="mt-2 text-sm leading-6 text-stone-600">
                            Handmade pasta, seasonal plates, and a dining room made for long evenings.
                          </p>
                          <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="rounded-2xl bg-stone-50 p-3">
                              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Hours</p>
                              <p className="mt-2 text-sm font-medium">Tue-Sun, 5pm-10pm</p>
                            </div>
                            <div className="rounded-2xl bg-stone-50 p-3">
                              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Reserve</p>
                              <p className="mt-2 text-sm font-medium">OpenTable linked</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {[
                    ["18 min", "Average launch time"],
                    ["4.9/5", "Owner satisfaction"],
                    ["24/7", "Hosting uptime monitoring"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                      <p className="text-2xl font-semibold text-stone-950">{value}</p>
                      <p className="mt-1 text-sm text-stone-600">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Everything you need to launch"
              title="A website builder shaped around how restaurants actually operate"
              description="From menu updates to domain setup, every part of the experience is designed to save time and make your business look its best."
            />

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={feature.title}
                    className="group rounded-[28px] border border-white/80 bg-white/80 p-6 shadow-[0_20px_50px_-30px_rgba(28,25,23,0.35)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(154,52,18,0.45)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700 transition group-hover:bg-orange-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-stone-900">{feature.title}</h3>
                    <p className="mt-3 leading-7 text-stone-600">{feature.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="templates" className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Template Showcase"
              title="Start with a style that already fits your concept"
              description="Choose a foundation that matches your atmosphere, then make it your own with photos, copy, menus, and brand details."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-5">
              {templates.map((template) => (
                <article
                  key={template.name}
                  className="overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_20px_50px_-35px_rgba(41,37,36,0.45)] transition hover:-translate-y-1"
                >
                  <div className={`h-48 bg-gradient-to-br ${template.accent} p-5 text-white`}>
                    <div className="flex h-full flex-col justify-between rounded-[22px] border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.28em] text-white/80">{template.tone}</p>
                      <h3 className="font-serif text-3xl">{template.name}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="leading-7 text-stone-600">{template.copy}</p>
                    <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition hover:text-orange-800">
                      Preview template
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[36px] bg-stone-900 px-8 py-12 text-white shadow-[0_30px_80px_-30px_rgba(28,25,23,0.65)] lg:px-12 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-orange-300">How it works</p>
                <h2 className="mt-4 font-serif text-4xl">Go from blank page to live website in three simple steps</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-stone-300">
                  The process is designed to feel straightforward even if you have never built a site before.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {[
                  {
                    number: "01",
                    title: "Choose a template",
                    copy: "Pick a design built for your restaurant style, from bakery to fine dining.",
                  },
                  {
                    number: "02",
                    title: "Customize your content",
                    copy: "Add your menu, photos, hours, story, and links with a guided editor.",
                  },
                  {
                    number: "03",
                    title: "Publish instantly",
                    copy: "Launch with hosting, deployment, and performance handled automatically.",
                  },
                ].map((step) => (
                  <div key={step.number} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <p className="text-sm font-semibold tracking-[0.28em] text-orange-300">{step.number}</p>
                    <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-4 leading-7 text-stone-300">{step.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-orange-700">Why owners choose Plateform</p>
              <h2 className="mt-4 font-serif text-4xl text-stone-950">
                Spend less time managing your website and more time running your restaurant
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-600">
                Your website should help guests trust your brand, view your menu, and find key information fast. It should not become another complicated tool to manage.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ["Save time", "Make updates in minutes instead of waiting on a freelancer or agency."],
                ["Look more professional", "Use polished layouts that match the quality of your dining experience."],
                ["Attract more customers", "Turn online visitors into reservations, walk-ins, and direct calls."],
                ["No developer needed", "Your team can manage everything with a clear visual editor."],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-stone-900">{title}</h3>
                  <p className="mt-3 leading-7 text-stone-600">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Testimonials"
              title="Trusted by owners who need a better website without extra complexity"
              description="These examples reflect the kinds of teams this product is built to support: busy, quality-focused, and short on time."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {testimonials.map((item) => (
                <figure key={item.name} className="rounded-[28px] border border-white/80 bg-white/90 p-7 shadow-sm">
                  <blockquote className="text-lg leading-8 text-stone-700">“{item.quote}”</blockquote>
                  <figcaption className="mt-6">
                    <p className="font-semibold text-stone-900">{item.name}</p>
                    <p className="text-sm text-stone-500">{item.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Pricing"
              title="Flexible plans for single locations and growing hospitality brands"
              description="Start simple, upgrade when you need more control, and keep hosting plus deployment under one roof."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {pricing.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-[30px] border p-8 shadow-sm ${
                    plan.featured
                      ? "border-orange-300 bg-stone-900 text-white shadow-[0_30px_80px_-30px_rgba(154,52,18,0.55)]"
                      : "border-stone-200 bg-white text-stone-900"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold">{plan.name}</h3>
                      <p className={`mt-3 leading-7 ${plan.featured ? "text-stone-300" : "text-stone-600"}`}>
                        {plan.description}
                      </p>
                    </div>
                    {plan.featured && (
                      <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="mt-8 flex items-end gap-2">
                    <span className="font-serif text-5xl">{plan.price}</span>
                    <span className={plan.featured ? "pb-2 text-stone-300" : "pb-2 text-stone-500"}>/month</span>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className={`mt-0.5 h-5 w-5 ${plan.featured ? "text-orange-300" : "text-emerald-600"}`} />
                        <span className={plan.featured ? "text-stone-200" : "text-stone-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`mt-10 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-semibold transition hover:-translate-y-0.5 ${
                      plan.featured
                        ? "bg-orange-500 text-white hover:bg-orange-400"
                        : "bg-stone-900 text-white hover:bg-stone-800"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionTitle
              eyebrow="FAQ"
              title="Clear answers for common questions before you launch"
              description="Restaurant teams usually want simplicity, speed, and confidence. These are the questions we hear most often."
            />

            <div className="mt-12 space-y-4">
              {faqs.map((item) => (
                <details key={item.question} className="group rounded-[24px] border border-stone-200 bg-white p-6 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-stone-900">
                    {item.question}
                    <ChevronDown className="h-5 w-5 shrink-0 text-stone-500 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 leading-7 text-stone-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 pt-8 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#7c2d12_0%,#c2410c_45%,#1c1917_100%)] px-8 py-12 text-white shadow-[0_30px_90px_-30px_rgba(124,45,18,0.65)] lg:px-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-orange-200">Ready to launch</p>
                <h2 className="mt-4 max-w-2xl font-serif text-4xl">
                  Build a restaurant website that feels professional from day one
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-orange-50/90">
                  Choose a template, customize your brand, and go live with hosting, deployment, and updates handled in one place.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <button className="rounded-full bg-white px-7 py-4 text-sm font-semibold text-stone-900 transition hover:-translate-y-0.5 hover:bg-orange-50">
                  Start Free Trial
                </button>
                <button className="rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15">
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-[#fffaf4] px-6 py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 text-white">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <p className="font-serif text-xl tracking-tight">Plateform</p>
                <p className="text-sm text-stone-500">Websites for restaurants that want to move fast.</p>
              </div>
            </div>
            <p className="mt-5 max-w-md leading-7 text-stone-600">
              Create a polished restaurant website, keep it updated without technical stress, and publish instantly with hosting included.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              ["Product", ["Features", "Templates", "Pricing"]],
              ["Company", ["About", "Customers", "Careers"]],
              ["Support", ["Help Center", "Contact", "Status"]],
              ["Social", ["Instagram", "LinkedIn", "X"]],
            ].map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">{title}</h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="/" className="text-stone-700 transition hover:text-orange-700">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
