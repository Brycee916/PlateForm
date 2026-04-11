export function renderRestaurantSite(restaurant) {
  const safe = (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const density = restaurant.layoutDensity === "compact" ? "2rem" : restaurant.layoutDensity === "spacious" ? "4.5rem" : "3.5rem";
  const radiusBtn = restaurant.borderRadiusStyle === "sharp" ? "0px" : restaurant.borderRadiusStyle === "pill" ? "999px" : "12px";
  const radiusCard = restaurant.borderRadiusStyle === "sharp" ? "0px" : restaurant.borderRadiusStyle === "pill" ? "2rem" : "1rem";
  
  const title = restaurant.seoTitle || restaurant.name;
  const description = restaurant.seoDescription || restaurant.heroSubtitle || restaurant.story || "";
  
  const fontLink = restaurant.fontStyle === "serif"
    ? `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:wght@400;500&display=swap" rel="stylesheet">`
    : restaurant.fontStyle === "mono"
    ? `<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">`
    : restaurant.fontStyle === "playful"
    ? `<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&family=Fredoka+One&display=swap" rel="stylesheet">`
    : `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet">`;

  const template = restaurant.fontStyle === "serif" ? "'Lora', serif"
    : restaurant.fontStyle === "mono" ? "'Fira Code', monospace"
    : restaurant.fontStyle === "playful" ? "'Nunito', sans-serif"
    : "'Inter', sans-serif";
      
  const headingFont = restaurant.fontStyle === "serif" ? "'Playfair Display', serif"
    : restaurant.fontStyle === "mono" ? "'Space Mono', monospace"
    : restaurant.fontStyle === "playful" ? "'Fredoka One', cursive"
    : "'Outfit', sans-serif";

  const modeCss = restaurant.themeMode === "dark" 
    ? `--bg: #0f172a; --surface: #1e293b; --surface-alt: #334155; --text: #f8fafc; --muted: #94a3b8; --shadow: rgba(0,0,0,0.5); --border: rgba(255,255,255,0.05);`
    : restaurant.themeMode === "dim"
    ? `--bg: #27272a; --surface: #3f3f46; --surface-alt: #52525b; --text: #f4f4f5; --muted: #a1a1aa; --shadow: rgba(0,0,0,0.4); --border: rgba(255,255,255,0.06);`
    : `--bg: #ffffff; --surface: #f9fafb; --surface-alt: #f3f4f6; --text: #1f2937; --muted: #6b7280; --shadow: rgba(0,0,0,0.06); --border: rgba(0,0,0,0.06);`;

  const serviceLinks = [
    restaurant.reservationUrl ? `<a class="btn btn-primary" href="${safe(restaurant.reservationUrl)}" target="_blank" rel="noreferrer">Reserve</a>` : "",
    restaurant.orderUrl ? `<a class="btn btn-secondary" href="${safe(restaurant.orderUrl)}" target="_blank" rel="noreferrer">Order Online</a>` : "",
    restaurant.deliveryUrl ? `<a class="btn btn-secondary" href="${safe(restaurant.deliveryUrl)}" target="_blank" rel="noreferrer">Delivery</a>` : "",
  ].filter(Boolean).join("");

  const headerServiceLinks = [
    restaurant.reservationUrl ? `<a class="nav-btn nav-btn-primary" href="${safe(restaurant.reservationUrl)}" target="_blank" rel="noreferrer">Reserve</a>` : "",
    restaurant.orderUrl ? `<a class="nav-btn nav-btn-secondary" href="${safe(restaurant.orderUrl)}" target="_blank" rel="noreferrer">Order</a>` : "",
  ].filter(Boolean).join("");

  const fullAddress = [restaurant.address, restaurant.city, restaurant.state, restaurant.zip].filter(Boolean).join(", ");
  const mapIframeUrl = fullAddress ? `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=14&ie=UTF8&iwloc=&output=embed` : "";

  const menuSections = (restaurant.menuCategories || [])
    .map((category) => {
      const items = (category.items || [])
        .map(
          (item) => `
            <article class="menu-item group">
              <div class="menu-head">
                <h4>${safe(item.name)}</h4>
                <div class="menu-dots"></div>
                <span class="price">${safe(item.price)}</span>
              </div>
              <p>${safe(item.description)}</p>
            </article>
          `
        ).join("");
      return `<section class="menu-category" id="menu-${safe(category.id)}"><h3 class="category-heading">${safe(category.name)}</h3><div class="menu-grid">${items || "<p>No items yet.</p>"}</div></section>`;
    }).join("");

  const galleryImages = restaurant.gallery || [];
  const galleryHtml = galleryImages
    .slice(0, 8)
    .map((url, idx) => `<img class="gallery-img" src="${safe(url)}" alt="${safe(restaurant.name)} photo ${idx + 1}" loading="lazy" onclick="openFullGallery()" />`)
    .join("");
  
  const allGalleryHtml = galleryImages
    .map((url, idx) => `<img class="full-gallery-img" src="${safe(url)}" alt="${safe(restaurant.name)} photo ${idx + 1}" loading="lazy" />`)
    .join("");

  const hasMoreGallery = galleryImages.length > 8;

  const social = [
    restaurant.instagramUrl ? `<a href="${safe(restaurant.instagramUrl)}" target="_blank" rel="noreferrer">Instagram</a>` : "",
    restaurant.facebookUrl ? `<a href="${safe(restaurant.facebookUrl)}" target="_blank" rel="noreferrer">Facebook</a>` : "",
    restaurant.tiktokUrl ? `<a href="${safe(restaurant.tiktokUrl)}" target="_blank" rel="noreferrer">TikTok</a>` : "",
  ].filter(Boolean).join(" ");

  const phoneHtml = restaurant.showPhone !== false && restaurant.phone 
    ? `<p style="margin-top: 1rem;"><a href="tel:${safe(restaurant.phone)}" class="contact-link">${safe(restaurant.phone)}</a></p>`
    : "";
  const emailHtml = restaurant.showEmail !== false && restaurant.contactEmail
    ? `<p class="mt-xs"><a href="mailto:${safe(restaurant.contactEmail)}" class="contact-link">${safe(restaurant.contactEmail)}</a></p>`
    : "";

  const hasGallery = restaurant.gallery && restaurant.gallery.length > 0;
  
  const heroIsSplit = restaurant.heroStyle === "split";

  let heroHtml = "";
  if (heroIsSplit) {
    heroHtml = `
      <header class="hero-split">
        <div class="hero-split-content">
          <span class="pill" style="color:var(--text); border-color:var(--muted);">${safe(restaurant.cuisine || "Restaurant")}</span>
          <h1 style="color:var(--text); text-shadow:none;">${safe(restaurant.heroTitle || restaurant.name)}</h1>
          <p style="color:var(--muted); text-shadow:none;">${safe(restaurant.heroSubtitle || "")}</p>
          <div class="cta-row">${serviceLinks || `<a class="btn btn-primary" href="#menu">Explore Menu</a>`}</div>
        </div>
        ${hasGallery 
          ? `<img src="${safe(restaurant.gallery[0])}" class="hero-split-img" alt="Hero" />`
          : `<div style="width:100%;height:100%;min-height:40vh;background:var(--primary);opacity:0.2;"></div>`
        }
      </header>
    `;
  } else {
    const heroImageCss = hasGallery
      ? `background-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.85)), url('${safe(restaurant.gallery[0])}'); background-size: cover; background-position: center; background-attachment: fixed;`
      : `background: linear-gradient(145deg, color-mix(in srgb, var(--primary) 20%, #111827), color-mix(in srgb, var(--accent) 15%, #111827));`;
    heroHtml = `
      <header class="hero" style="${heroImageCss}">
        <div class="container hero-content">
          <span class="pill">${safe(restaurant.cuisine || "Restaurant")}</span>
          <h1>${safe(restaurant.heroTitle || restaurant.name)}</h1>
          <p style="max-width: 650px;">${safe(restaurant.heroSubtitle || "")}</p>
          <div class="cta-row">${serviceLinks || `<a class="btn btn-primary" href="#menu">Explore Menu</a>`}</div>
        </div>
      </header>
    `;
  }

  const sectionHtml = {
    story: restaurant.showStory !== false ? `
      <section style="padding-top: calc(var(--gap) * 2);" id="story">
        <h2>Our Story</h2>
        <p style="max-width: 800px; font-size: 1.2rem; line-height: 1.9;">${safe(restaurant.story || "Welcome to our restaurant.")}</p>
      </section>
    ` : "",
    location: `
      <section id="location">
        ${[ {
          name: "Main Location",
          address: restaurant.address,
          city: restaurant.city,
          state: restaurant.state,
          hours: restaurant.hours,
          phoneHtml: phoneHtml,
          emailHtml: emailHtml,
          mapUrl: mapIframeUrl
        }, ...(Array.isArray(restaurant.extraLocations) ? restaurant.extraLocations : []) ].map((loc, idx) => `
        <div class="grid-two pt-0" style="margin-bottom: ${idx === 0 ? '0' : '4rem'};">
          <article class="card">
            <h3>${safe(loc.name || "Location")}</h3>
            <p>${safe(loc.address || "")}</p>
            <p>${safe(`${loc.city || ""} ${loc.state || ""}`.trim())}</p>
            ${loc.mapUrl || idx === 0 && mapIframeUrl ? `<div style="margin-top:2rem; border-radius:calc(var(--radius-card)*0.5); overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.1);"><iframe src="${loc.mapUrl || mapIframeUrl}" width="100%" height="300" style="border:0; display:block;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>` : ""}
          </article>
          
          <article class="card">
            <h3>Hours</h3>
            ${loc.hours && typeof loc.hours === 'object' && Object.values(loc.hours).some(v => v) ? 
              `<ul style="list-style:none; padding:0; margin:0;" class="mt-xs text-sm">
                ${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                  .filter(day => loc.hours[day])
                  .map(day => `<li style="display:flex; justify-content:space-between; margin-bottom:0.5rem; border-bottom:1px dashed color-mix(in srgb, var(--text) 10%, transparent); padding-bottom:0.25rem;"><strong>${day}</strong> <span>${safe(loc.hours[day])}</span></li>`)
                  .join("")}
              </ul>` : 
              `<p class="text-sm">Check our online ordering page or call us for current hours.</p>`
            }
            <h3 style="margin-top: 2rem;">Contact</h3>
            ${idx === 0 ? phoneHtml + emailHtml : ""}
            ${!phoneHtml && !emailHtml && idx === 0 ? `<p>Contact information is currently unavailable online.</p>` : ""}
          </article>
        </div>
        `).join("")}
      </section>
    `,
    menu: `
      <section id="menu">
        <h2>Menu</h2>
        ${menuSections || "<p>No menu yet.</p>"}
      </section>
    `,
    gallery: galleryImages.length > 0 ? `
      <section id="gallery">
        <h2>Gallery</h2>
        <div class="gallery-grid" id="main-gallery-grid">${galleryHtml}</div>
        ${hasMoreGallery ? `<div class="view-all-gallery"><button class="btn btn-secondary" onclick="openFullGallery()">View All ${galleryImages.length} Photos</button></div>` : ""}
      </section>
    ` : ""
  };

  const activeOrder = Array.isArray(restaurant.sectionOrder) && restaurant.sectionOrder.length > 0 
    ? restaurant.sectionOrder 
    : ["story", "location", "menu", "gallery"];

  const renderedSections = activeOrder.map(key => sectionHtml[key] || "").join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safe(restaurant.seoTitle || title)}</title>
    <meta name="description" content="${safe(restaurant.seoDescription || description)}" />
    <meta property="og:title" content="${safe(restaurant.seoTitle || title)}" />
    <meta property="og:description" content="${safe(restaurant.seoDescription || description)}" />
    ${galleryImages.length > 0 ? `<meta property="og:image" content="${safe(galleryImages[0])}" />` : ""}
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    ${fontLink}
    <style>
      :root { 
        ${modeCss}
        --primary: ${safe(restaurant.primaryColor || "#ea580c")}; 
        --accent: ${safe(restaurant.accentColor || "#0f766e")}; 
        --gap: ${density}; 
        --radius-btn: ${radiusBtn};
        --radius-card: ${radiusCard};
      }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { 
        margin: 0; 
        font-family: ${template}; 
        background-color: var(--bg); 
        color: var(--text); 
        -webkit-font-smoothing: antialiased;
      }
      .container { width: min(1120px, 92vw); margin: 0 auto; }
      
      /* Navbar */
      .navbar { 
        position: sticky; top: 0; z-index: 50; 
        background: color-mix(in srgb, var(--surface) 85%, transparent);
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--border);
        transition: all 0.3s ease;
      }
      .navbar .container { 
        display: flex; 
        ${restaurant.navStyle === "center" ? "flex-direction: column; justify-content: center; gap: 1rem;" : "justify-content: space-between;"}
        align-items: center; 
        padding: ${restaurant.navStyle === "center" ? "1.5rem 0" : "1rem 0"}; 
        min-height: 72px; 
      }
      .navbar-brand { font-family: ${headingFont}; font-weight: 800; font-size: 1.5rem; color: var(--text); text-decoration: none; letter-spacing: -0.02em; }
      .nav-links { display: flex; gap: 0.75rem; align-items: center; }
      .nav-btn { text-decoration: none; padding: 0.5rem 1.25rem; border-radius: var(--radius-btn); font-weight: 600; font-size: 0.9rem; transition: transform 0.2s, box-shadow 0.2s; }
      .nav-btn:hover { transform: translateY(-1px); }
      .nav-btn-primary { background: var(--primary); color: white; box-shadow: 0 4px 12px color-mix(in srgb, var(--primary) 30%, transparent); }
      .nav-btn-secondary { background: var(--surface-alt); color: var(--text); border: 1px solid var(--border); }
      
      /* Announcement */
      .announce { background: var(--accent); color: white; padding: 0.6rem 0; font-size: 0.9rem; text-align: center; font-weight: 600; }

      /* Hero Overlay */
      .hero { 
        padding: calc(var(--gap) * 1.5) 0 calc(var(--gap) * 2.5); 
        color: white;
        clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
        margin-bottom: calc(var(--gap) * -1);
        z-index: 10; position: relative; overflow: hidden;
      }
      .hero-content { position: relative; z-index: 2; max-width: 800px; ${restaurant.navStyle === "center" ? "margin: 0 auto; text-align: center;" : ""} }
      .pill { 
        display: inline-block; border-radius: var(--radius-btn); border: 1px solid rgba(255,255,255,0.2); 
        background: rgba(0,0,0,0.2); backdrop-filter: blur(4px); padding: 0.4rem 1.25rem; 
        font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.5rem; 
      }
      h1, h2, h3, h4 { margin: 0; font-family: ${headingFont}; } 
      .hero h1 { font-size: clamp(3rem, 8vw, 5.5rem); line-height: 1.05; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 1rem; color: white; text-shadow: 0 4px 20px rgba(0,0,0,0.3); } 
      .hero p { font-size: clamp(1.1rem, 3vw, 1.35rem); line-height: 1.6; color: rgba(255,255,255,0.9); text-shadow: 0 2px 10px rgba(0,0,0,0.3); }

      /* Hero Split */
      .hero-split { display: grid; grid-template-columns: 1fr 1fr; align-items: center; min-height: 400px; max-height: 55vh; padding: 0; background: var(--surface); overflow: hidden; }
      .hero-split-content { padding: 4rem; z-index: 10; }
      .hero-split-content h1 { font-size: clamp(3rem, 8vw, 4.5rem); line-height: 1.05; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 1rem; }
      .hero-split-content p { font-size: clamp(1.1rem, 3vw, 1.25rem); line-height: 1.6; margin-bottom: 2rem; }
      .hero-split-img { width: 100%; height: 100%; object-fit: cover; }
      @media (max-width: 900px) { .hero-split { grid-template-columns: 1fr; min-height: auto; } .hero-split-img { height: 40vh; order: -1; } .hero-split-content { padding: 2rem; text-align: center; } .hero-split-content .cta-row { justify-content: center; } }

      /* Sections & Typography */
      section { padding: var(--gap) 0; position: relative; z-index: 20; }
      h2 { font-size: clamp(2.25rem, 5vw, 3rem); margin-bottom: 2.5rem; font-weight: 700; letter-spacing: -0.02em; color: var(--text); }
      h3 { font-size: 1.75rem; margin-bottom: 1.5rem; color: var(--text); }
      p { line-height: 1.8; color: var(--muted); font-size: 1.05rem; }
      .mt-xs { margin-top: 0.5rem; }

      /* Buttons */
      .cta-row { margin-top: 2.5rem; display: flex; gap: 1.25rem; flex-wrap: wrap; ${restaurant.navStyle === "center" && !heroIsSplit ? "justify-content: center;" : ""} }
      .btn { 
        text-decoration: none; border-radius: var(--radius-btn); padding: 1rem 2rem; font-weight: 700; font-size: 1.05rem;
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s; display: inline-flex; align-items: center; 
      }
      .btn:hover { transform: translateY(-4px) scale(1.02); }
      .btn-primary { background: var(--primary); color: white; box-shadow: 0 8px 25px color-mix(in srgb, var(--primary) 40%, transparent); } 
      .btn-primary:hover { box-shadow: 0 12px 30px color-mix(in srgb, var(--primary) 60%, transparent); }
      .btn-secondary { background: var(--surface-alt); color: var(--text); box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid color-mix(in srgb, var(--text) 10%, transparent); }
      
      /* Layout Grids */
      .grid-two { display: grid; gap: 3rem; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: start; }
      .card { 
        border-radius: var(--radius-card); background: var(--surface); padding: 2.5rem;
        box-shadow: 0 20px 40px -10px var(--shadow), 0 1px 3px var(--shadow);
        border: 1px solid var(--border); position: relative; overflow: hidden;
      }
      .card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: linear-gradient(90deg, var(--primary), var(--accent)); }
      .contact-link { color: var(--primary); text-decoration: none; font-weight: 600; display: inline-block; transition: color 0.2s; }
      .contact-link:hover { color: var(--accent); }
      
      /* Menu layout */
      .menu-category { margin-bottom: 4rem; }
      .category-heading { display: inline-block; border-bottom: 4px solid var(--primary); padding-bottom: 0.5rem; margin-bottom: 2rem; }
      .menu-grid { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); }
      .menu-item { 
        background: var(--surface); border: 1px solid var(--border); border-radius: calc(var(--radius-card) * 0.7); padding: 1.75rem; 
        box-shadow: 0 4px 15px var(--shadow); transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      .menu-item:hover { 
        transform: translateY(-5px); box-shadow: 0 15px 30px var(--shadow); border-color: var(--primary); 
      }
      .menu-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; margin-bottom: 0.75rem; } 
      .menu-head h4 { font-size: 1.15rem; font-weight: 700; margin: 0; white-space: nowrap; color: var(--text); }
      .menu-dots { flex-grow: 1; border-bottom: 2px dotted var(--border); margin-bottom: 0.35rem; opacity: 0.6; }
      .price { color: var(--accent); font-weight: 800; font-size: 1.2rem; white-space: nowrap; }
      .menu-item p { margin: 0; font-size: 0.95rem; color: var(--muted); }

      /* Gallery */
      .gallery-grid { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); } 
      .gallery-img { 
        width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: calc(var(--radius-card) * 0.7); 
        box-shadow: 0 10px 20px rgba(0,0,0,0.08); transition: transform 0.4s ease, box-shadow 0.4s ease; cursor: pointer;
      }
      .gallery-img:hover { transform: scale(1.03) translateY(-5px); box-shadow: 0 20px 30px rgba(0,0,0,0.15); z-index: 2; position: relative;}
      .view-all-gallery { text-align: center; margin-top: 2rem; }

      /* Full Screen Gallery Modal */
      .full-gallery-modal {
        display: none; position: fixed; z-index: 9999; top: 0; left: 0; width: 100%; height: 100%; 
        background: var(--bg); overflow-y: auto; padding: 2rem;
      }
      .full-gallery-modal.active { display: block; animation: fadeUp 0.3s ease-out forwards; }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .full-gallery-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
      .full-gallery-header h2 { margin: 0; }
      .close-gallery-btn {
        background: var(--surface-alt); border: none; color: var(--text); padding: 0.75rem 1.5rem; 
        font-weight: bold; border-radius: var(--radius-btn); cursor: pointer;
      }
      .close-gallery-btn:hover { background: var(--primary); color: white; }
      .full-gallery-grid { columns: 3 300px; gap: 1rem; }
      .full-gallery-img { width: 100%; margin-bottom: 1rem; border-radius: var(--radius-card); object-fit: cover; break-inside: avoid; }

      /* Footer */
      footer { 
        background: color-mix(in srgb, var(--surface) 50%, #000); color: white; padding: 5rem 0 3rem; margin-top: 5rem;
        clip-path: polygon(0 5%, 100% 0, 100% 100%, 0 100%);
      } 
      footer p, footer a { color: #9ca3af; font-size: 0.95rem; text-decoration: none; transition: color 0.2s; }
      footer strong { font-family: ${headingFont}; font-size: 1.5rem; display: block; margin-bottom: 1rem; color: white; }
      footer a:hover { color: white; }
      .footer-social { margin-top: 2rem; display: flex; gap: 1.5rem; }
    </style>
  </head>
  <body>
    ${restaurant.announcementEnabled && restaurant.announcementText ? `<div class="announce">${safe(restaurant.announcementText)}</div>` : ""}
    
    <nav class="navbar">
      <div class="container">
        <a href="#" class="navbar-brand">${safe(restaurant.name)}</a>
        <div class="nav-links">
          ${headerServiceLinks || `<a href="#menu" class="nav-btn nav-btn-primary">Menu</a>`}
        </div>
      </div>
    </nav>

    ${heroHtml}

    <main class="container">
      ${renderedSections}
    </main>

    <footer>
      <div class="container flex-footer">
        <strong>${safe(restaurant.name)}</strong>
        <p>Published with Plateform Builder ${restaurant.customDomain ? `&bull; ${safe(restaurant.customDomain)}` : ""}</p>
        ${social ? `<div class="footer-social">${social}</div>` : ""}
      </div>
    </footer>

    ${galleryImages.length > 0 ? `
    <!-- Full Screen Gallery CSS Modal -->
    <div class="full-gallery-modal" id="fullGalleryModal">
      <div class="container">
        <div class="full-gallery-header">
          <h2>Photo Explorer</h2>
          <button class="close-gallery-btn" onclick="closeFullGallery()">Close Gallery</button>
        </div>
        <div class="full-gallery-grid">
          ${allGalleryHtml}
        </div>
      </div>
    </div>
    
    <script>
      const galleryModal = document.getElementById('fullGalleryModal');

      function openFullGallery() {
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      function closeFullGallery() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
      }

      // Close on Escape key
      document.addEventListener('keydown', function(e) {
        if (!galleryModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeFullGallery();
      });
    </script>
    ` : ""}
  </body>
</html>`;
}
