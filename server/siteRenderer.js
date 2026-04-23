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

  let buttonCss = "";
  if (restaurant.buttonStyle === "outline") {
    buttonCss = `.btn-primary { background: transparent; color: var(--primary); border: 2px solid var(--primary); box-shadow: none; } .btn-primary:hover { background: color-mix(in srgb, var(--primary) 10%, transparent); box-shadow: none; }`;
  } else if (restaurant.buttonStyle === "ghost") {
    buttonCss = `.btn-primary { background: transparent; color: var(--primary); box-shadow: none; } .btn-primary:hover { background: color-mix(in srgb, var(--primary) 10%, transparent); box-shadow: none; }`;
  } else if (restaurant.buttonStyle === "soft") {
    buttonCss = `.btn-primary { background: color-mix(in srgb, var(--primary) 20%, transparent); color: var(--primary); box-shadow: none; } .btn-primary:hover { background: color-mix(in srgb, var(--primary) 30%, transparent); box-shadow: none; }`;
  } else {
    buttonCss = `.btn-primary { background: var(--primary); color: white; box-shadow: 0 8px 25px color-mix(in srgb, var(--primary) 40%, transparent); } .btn-primary:hover { box-shadow: 0 12px 30px color-mix(in srgb, var(--primary) 60%, transparent); }`;
  }

  let shadowCss = "";
  if (restaurant.cardShadow === "none") shadowCss = `box-shadow: none;`;
  else if (restaurant.cardShadow === "heavy") shadowCss = `box-shadow: 0 25px 50px -12px var(--shadow), 0 10px 15px -3px var(--shadow);`;
  else if (restaurant.cardShadow === "neon") shadowCss = `box-shadow: 0 0 25px color-mix(in srgb, var(--primary) 40%, transparent); border-color: color-mix(in srgb, var(--primary) 30%, transparent);`;
  else shadowCss = `box-shadow: 0 20px 40px -10px var(--shadow), 0 1px 3px var(--shadow);`;

  let animCss = "";
  if (restaurant.animationStyle === "static") animCss = `* { transition: none !important; } .card:hover, .btn:hover { transform: none !important; }`;
  else if (restaurant.animationStyle === "bouncy") animCss = `.card, .btn, .menu-item { transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important; }`;

  let patternCss = "";
  if (restaurant.backgroundPattern === "dots") patternCss = `background-image: radial-gradient(var(--border) 1.5px, transparent 1.5px); background-size: 24px 24px;`;
  else if (restaurant.backgroundPattern === "grid") patternCss = `background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 40px 40px;`;


  const serviceLinks = [
    restaurant.reservationUrl ? `<a class="btn btn-primary" href="${safe(restaurant.reservationUrl)}" target="_blank" rel="noreferrer" onclick="window.__track?.('click', 'reserve')">Reserve</a>` : "",
    restaurant.orderUrl ? `<a class="btn btn-secondary" href="${safe(restaurant.orderUrl)}" target="_blank" rel="noreferrer" onclick="window.__track?.('click', 'order')">Order Online</a>` : "",
    restaurant.deliveryUrl ? `<a class="btn btn-secondary" href="${safe(restaurant.deliveryUrl)}" target="_blank" rel="noreferrer" onclick="window.__track?.('click', 'delivery')">Delivery</a>` : "",
  ].filter(Boolean).join("");

  const headerServiceLinks = [
    restaurant.reservationUrl ? `<a class="nav-btn nav-btn-primary" href="${safe(restaurant.reservationUrl)}" target="_blank" rel="noreferrer" onclick="window.__track?.('click', 'reserve')">Reserve</a>` : "",
    restaurant.orderUrl ? `<a class="nav-btn nav-btn-secondary" href="${safe(restaurant.orderUrl)}" target="_blank" rel="noreferrer" onclick="window.__track?.('click', 'order')">Order</a>` : "",
  ].filter(Boolean).join("");

  let headerLinksHtml = "";
  if (restaurant.navbar?.links && restaurant.navbar.links.length > 0) {
    headerLinksHtml = restaurant.navbar.links.map(link => `<a href="${safe(link.url)}" style="color:var(--text); font-weight:600; text-decoration:none; margin-right:1rem; font-size:0.95rem;">${safe(link.label)}</a>`).join("");
  }
  
  if (restaurant.navbar?.ctaButton?.enabled) {
    headerLinksHtml += `<a href="${safe(restaurant.navbar.ctaButton.link)}" class="nav-btn nav-btn-primary" target="_blank" rel="noreferrer">${safe(restaurant.navbar.ctaButton.text)}</a>`;
  } else if (!headerLinksHtml && !headerServiceLinks) {
    headerLinksHtml = `<a href="#menu" class="nav-btn nav-btn-primary">Menu</a>`;
  } else {
    headerLinksHtml += headerServiceLinks;
  }

  const rawNavPos = restaurant.navbar?.position || 'sticky';
  const navPos = rawNavPos === 'static' && restaurant.navbar?.style === 'transparent' ? 'absolute' : rawNavPos === 'static' ? 'relative' : rawNavPos;
  let navStyleCss = '';
  if (restaurant.navbar?.style === 'transparent') {
    navStyleCss = `background: transparent; border: none; backdrop-filter: none; -webkit-backdrop-filter: none;`;
  } else {
    navStyleCss = `background: color-mix(in srgb, var(--surface) 85%, transparent); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--border);`;
  }

  const fullAddress = [restaurant.address, restaurant.city, restaurant.state, restaurant.zip].filter(Boolean).join(", ");
  const mapIframeUrl = fullAddress ? `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=14&ie=UTF8&iwloc=&output=embed` : "";

  const menuSections = (restaurant.menuCategories || [])
    .map((category) => {
      const items = (category.items || [])
        .map(
          (item) => {
            if (restaurant.menuFormat === "visual") {
              return `
                <article class="card p-0" style="padding: 0; display: flex; flex-direction: column; height: 100%;">
                  ${item.photoUrl ? `<div style="height: 200px; width: 100%; border-bottom: 1px solid var(--border); background: url('${safe(item.photoUrl)}') center/cover;"></div>` : `<div style="height: 120px; width: 100%; border-bottom: 1px solid var(--border); background: color-mix(in srgb, var(--primary) 10%, var(--surface)); display:flex; align-items:center; justify-content:center;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--primary); opacity:0.5;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></div>`}
                  <div style="padding: 1.5rem; flex-grow: 1;">
                    <div style="display:flex; justify-content:space-between; align-items:start; gap: 1rem; margin-bottom: 0.5rem;">
                      <h4 style="font-size: 1.25rem; font-family:${headingFont}">${safe(item.name)}</h4>
                      <span style="font-weight: 700; color: var(--primary); font-size: 1.1rem; flex-shrink: 0;">${safe(item.price)}</span>
                    </div>
                    ${item.badge ? `<span class="pill" style="padding: 0.2rem 0.6rem; font-size: 0.7rem; margin-bottom: 0.5rem; border: none; box-shadow: none; background: color-mix(in srgb, var(--primary) 15%, transparent); color: var(--primary);">${safe(item.badge)}</span>` : ""}
                    <p style="font-size: 0.95rem; margin-top: 0.5rem;">${safe(item.description)}</p>
                  </div>
                </article>
              `;
            } else if (restaurant.menuFormat === "fine") {
              return `
                <article class="menu-item-fine" style="display:flex; align-items:baseline; margin-bottom: 1rem; width:100%;">
                  <h4 style="margin: 0; font-family:${headingFont}; font-size: 1.15rem;">${safe(item.name)} ${item.badge ? `<span style="font-size: 0.75rem; vertical-align: super; color: var(--primary); font-style: italic; font-weight: normal; margin-left: 0.25rem;">${safe(item.badge)}</span>` : ""}</h4>
                  <div style="flex-grow: 1; border-bottom: 2px dotted color-mix(in srgb, var(--text) 20%, transparent); margin: 0 1rem;"></div>
                  <span style="font-weight: 600; font-size: 1.15rem;">${safe(item.price)}</span>
                </article>
              `;
            } else {
              return `
                <article class="menu-item group" style="margin-bottom: 2rem;">
                  <div class="menu-head" style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom: 0.5rem;">
                    <h4 style="font-size: 1.2rem; font-family:${headingFont}">${safe(item.name)} ${item.badge ? `<span class="menu-badge" style="background:var(--primary); color:white; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; margin-left: 0.5rem;">${safe(item.badge)}</span>` : ""}</h4>
                    <span class="price" style="font-weight: 700; color: var(--primary); font-size: 1.1rem;">${safe(item.price)}</span>
                  </div>
                  <p style="margin: 0; font-size: 0.95rem;">${safe(item.description)}</p>
                </article>
              `;
            }
          }
        ).join("");

      const gridCss = restaurant.menuFormat === "visual" ? `display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));` : `display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));`;
      
      return `<section class="menu-category" id="menu-${safe(category.id)}" style="margin-bottom: 4rem;">
                <h3 class="category-heading" style="text-align: center; margin-bottom: 2.5rem; font-size: 2.5rem; font-family:${headingFont}">${safe(category.name)}</h3>
                <div style="${gridCss}">${items || "<p style='text-align:center;'>No items yet.</p>"}</div>
              </section>`;
    }).join("");

  const galleryImages = restaurant.gallery || [];
  
  let galleryHtml = "";
  if (restaurant.galleryFormat === "carousel") {
    // Horizontal Flex Slider
    galleryHtml = `
      <div style="display:flex; overflow-x:auto; gap:1.5rem; scroll-snap-type: x mandatory; padding-bottom:1.5rem; padding-top:1rem; scrollbar-width:thin;">
        ${galleryImages.map((url, idx) => `<img src="${safe(url)}" alt="${safe(restaurant.name)} photo ${idx + 1}" loading="lazy" onclick="openFullGallery()" style="height:320px; width:min(80vw, 400px); border-radius:calc(var(--radius-card)*0.5); scroll-snap-align: center; flex-shrink:0; object-fit:cover; cursor:pointer;" />`).join("")}
      </div>
    `;
  } else {
    // Standard Grid
    galleryHtml = `
      <div class="gallery-grid" id="main-gallery-grid">
        ${galleryImages.slice(0, 8).map((url, idx) => `<img class="gallery-img" src="${safe(url)}" alt="${safe(restaurant.name)} photo ${idx + 1}" loading="lazy" onclick="openFullGallery()" />`).join("")}
      </div>
    `;
  }
  
  const allGalleryHtml = galleryImages
    .map((url, idx) => `<img class="full-gallery-img" src="${safe(url)}" alt="${safe(restaurant.name)} photo ${idx + 1}" loading="lazy" />`)
    .join("");

  const hasMoreGallery = restaurant.galleryFormat !== "carousel" && galleryImages.length > 8;

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
  let heroJs = "";
  if (heroIsSplit) {
    let imgBlock = `<div style="width:100%;height:100%;min-height:40vh;background:var(--primary);opacity:0.2;"></div>`;
    if (hasGallery) imgBlock = `<img id="hero-img-el" src="${safe(restaurant.gallery[0])}" class="hero-split-img" alt="Hero" style="transition: opacity 0.5s ease-in-out;" />`;
    
    heroHtml = `
      <header class="hero-split">
        <div class="hero-split-content">
          <span class="pill" style="color:var(--text); border-color:var(--muted);">${safe(restaurant.cuisine || "Restaurant")}</span>
          <h1 style="color:var(--text); text-shadow:none;">${safe(restaurant.heroTitle || restaurant.name)}</h1>
          <p style="color:var(--muted); text-shadow:none;">${safe(restaurant.heroSubtitle || "")}</p>
          <div class="cta-row">${serviceLinks || `<a class="btn btn-primary" href="#menu">Explore Menu</a>`}</div>
        </div>
        ${imgBlock}
      </header>
    `;
    
    if (hasGallery && restaurant.heroBackground === "carousel" && galleryImages.length > 1) {
      heroJs = `
        <script>
          const heroImages = ${JSON.stringify(galleryImages)};
          let heroImgIdx = 0;
          setInterval(() => {
            heroImgIdx = (heroImgIdx + 1) % heroImages.length;
            const el = document.getElementById('hero-img-el');
            if(el){
               el.style.opacity = 0.5;
               setTimeout(() => { el.src = heroImages[heroImgIdx]; el.style.opacity = 1; }, 500);
            }
          }, 4000);
        </script>
      `;
    }
  } else {
    const defaultImageCss = hasGallery
      ? `background-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.85)), url('${safe(restaurant.gallery[0])}'); background-size: cover; background-position: center; background-attachment: fixed; transition: background-image 1s ease-in-out;`
      : `background: linear-gradient(145deg, color-mix(in srgb, var(--primary) 20%, #111827), color-mix(in srgb, var(--accent) 15%, #111827));`;
      
    heroHtml = `
      <header id="hero-bg" class="hero" style="${defaultImageCss}">
        <div class="container hero-content">
          <span class="pill">${safe(restaurant.cuisine || "Restaurant")}</span>
          <h1>${safe(restaurant.heroTitle || restaurant.name)}</h1>
          <p style="max-width: 650px;">${safe(restaurant.heroSubtitle || "")}</p>
          <div class="cta-row">${serviceLinks || `<a class="btn btn-primary" href="#menu">Explore Menu</a>`}</div>
        </div>
      </header>
    `;
    
    if (hasGallery && restaurant.heroBackground === "carousel" && galleryImages.length > 1) {
      heroJs = `
        <script>
          const heroImages = ${JSON.stringify(galleryImages)};
          let heroImgIdx = 0;
          setInterval(() => {
            heroImgIdx = (heroImgIdx + 1) % heroImages.length;
            const el = document.getElementById('hero-bg');
            if(el) el.style.backgroundImage = 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.85)), url(' + heroImages[heroImgIdx] + ')';
          }, 4000);
        </script>
      `;
    }
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
        }, ...(Array.isArray(restaurant.extraLocations) ? restaurant.extraLocations : []) ].map((loc, idx) => {
          const lPhone = loc.phoneHtml !== undefined ? loc.phoneHtml : (loc.phone ? `<p style="margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--primary);"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> <a href="tel:${safe(loc.phone)}" style="color:var(--text); text-decoration:none; font-weight:600;">${safe(loc.phone)}</a></p>` : "");
          const lEmail = loc.emailHtml !== undefined ? loc.emailHtml : (loc.contactEmail ? `<p style="margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--primary);"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <a href="mailto:${safe(loc.contactEmail)}" style="color:var(--text); text-decoration:none; font-weight:600;">${safe(loc.contactEmail)}</a></p>` : "");
          return `
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
            ${lPhone + lEmail}
            ${!lPhone && !lEmail ? `<p>Contact information is currently unavailable online.</p>` : ""}
          </article>
        </div>
        `}).join("")}
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
        ${galleryHtml}
        ${hasMoreGallery ? `<div class="view-all-gallery"><button class="btn btn-secondary" onclick="openFullGallery()">View All ${galleryImages.length} Photos</button></div>` : ""}

      </section>
    ` : "",
    specials: restaurant.specials && restaurant.specials.length > 0 ? `
      <section id="specials">
        <h2>Specials & Events</h2>
        <div class="grid-two pt-0">
          ${restaurant.specials.map(s => `
            <article class="card special-card" style="padding: 0; display: flex; flex-direction: column;">
              ${s.image ? `<img src="${safe(s.image)}" alt="${safe(s.title)}" style="width: 100%; height: 200px; object-fit: cover;" />` : ''}
              <div style="padding: 2.5rem; flex-grow: 1;">
                ${s.badge ? `<span class="pill" style="color:var(--primary); border-color:var(--primary); background:color-mix(in srgb, var(--primary) 10%, transparent); margin-bottom: 1rem; box-shadow: none;">${safe(s.badge)}</span>` : ''}
                <h3 style="margin-bottom: 0.5rem;">${safe(s.title)}</h3>
                <p style="margin-bottom: 0;">${safe(s.description)}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    ` : "",
    testimonials: restaurant.testimonials && restaurant.testimonials.length > 0 ? `
      <section id="testimonials">
        <h2>Customer Reviews</h2>
        <div class="grid-two pt-0">
          ${restaurant.testimonials.map(t => `
            <article class="card testimonial-card" style="display: flex; flex-direction: column; justify-content: center; text-align: center; padding: 3rem 2rem;">
              <div style="color: var(--primary); font-size: 3rem; line-height: 1; margin-bottom: 1rem; opacity: 0.5;">"</div>
              <p style="font-size: 1.15rem; font-style: italic; color: var(--text); margin-bottom: 1.5rem; flex-grow: 1;">${safe(t.quote)}</p>
              <h4 style="color: var(--muted); text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.1em;">&mdash; ${safe(t.author)}</h4>
            </article>
          `).join("")}
        </div>
      </section>
    ` : ""
  };

  const activeOrder = (() => {
    const baseOrder = ["story", "location", "specials", "menu", "testimonials", "gallery"];
    let order = Array.isArray(restaurant.sectionOrder) && restaurant.sectionOrder.length > 0 ? restaurant.sectionOrder : baseOrder;
    const missing = baseOrder.filter(sec => !order.includes(sec));
    return [...order, ...missing];
  })();

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
        ${patternCss}
        color: var(--text); 
        -webkit-font-smoothing: antialiased;
      }
      .container { width: min(1120px, 92vw); margin: 0 auto; }
      
      /* Header */
      .site-header {
        position: ${navPos}; top: 0; z-index: 50; width: 100%;
      }
      .navbar { 
        ${navStyleCss}
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
      .announce { background: var(--accent); color: white; padding: 0.6rem 0; font-size: 0.9rem; text-align: center; font-weight: 600; display: none; }

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
      ${buttonCss}
      .btn-secondary { background: var(--surface-alt); color: var(--text); box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid color-mix(in srgb, var(--text) 10%, transparent); }
      
      /* Layout Grids */
      .grid-two { display: grid; gap: 3rem; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: start; }
      .card { 
        border-radius: var(--radius-card); background: var(--surface); padding: 2.5rem;
        ${shadowCss}
        border: 1px solid var(--border); position: relative; overflow: hidden;
      }
      .card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: linear-gradient(90deg, var(--primary), var(--accent)); }
      .contact-link { color: var(--primary); text-decoration: none; font-weight: 600; display: inline-block; transition: color 0.2s; }
      
      ${animCss}
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
      .menu-head h4 { display: flex; align-items: center; gap: 0.75rem; font-size: 1.15rem; font-weight: 700; margin: 0; white-space: nowrap; color: var(--text); }
      .menu-badge { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; background: color-mix(in srgb, var(--primary) 15%, transparent); color: var(--primary); padding: 0.25rem 0.6rem; border-radius: var(--radius-btn); font-weight: 800; border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent); box-shadow: 0 2px 4px color-mix(in srgb, var(--primary) 10%, transparent); }
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
      
      /* Utilities */
      .promo-banner { background: var(--primary); color: white; padding: 0.75rem; text-align: center; font-weight: 700; font-size: 0.95rem; display: block; text-decoration: none; position: relative; z-index: 100; }
      .promo-banner:hover { background: color-mix(in srgb, var(--primary) 80%, black); }
      .floating-cta { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; background: var(--primary); color: white; border-radius: var(--radius-btn); padding: 1rem 2rem; font-weight: 800; text-decoration: none; box-shadow: 0 10px 25px rgba(0,0,0,0.25); display: flex; align-items: center; gap: 0.5rem; animation: bounce 2s infinite; }
      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    </style>
    <script>
      window.__track = function(action, label) {
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rstId: '${safe(restaurant.id)}', action: action, label: label })
        }).catch(e => console.error(e));
      };

      document.addEventListener('DOMContentLoaded', () => {
        document.addEventListener('click', function(e) {
          const a = e.target.closest('a');
          if (a && a.getAttribute('href') && a.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = a.getAttribute('href').substring(1);
            if (!targetId) {
              window.scrollTo({top: 0, behavior: 'smooth'});
              return;
            }
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({behavior: 'smooth'});
            }
          }
        });
      });
    </script>
  </head>
  <body>
    <header class="site-header">
      ${restaurant.promoBanner?.enabled ? `<${restaurant.promoBanner?.link ? `a href="${safe(restaurant.promoBanner.link)}" target="_blank" rel="noreferrer"` : "div"} class="promo-banner" onclick="window.__track?.('click', 'promo_banner')">${safe(restaurant.promoBanner.text)}</${restaurant.promoBanner?.link ? "a" : "div"}>` : ""}
      
      ${restaurant.navbar?.showNavbar !== false ? `
      <nav class="navbar">
        <div class="container">
          <a href="#" class="navbar-brand" onclick="window.scrollTo(0,0); return false;">
            ${restaurant.logoUrl ? `<img src="${safe(restaurant.logoUrl)}" alt="${safe(restaurant.name)} Logo" style="max-height: 48px; display: block;" />` : safe(restaurant.navbar?.logoText || restaurant.name)}
          </a>
          <div class="nav-links">
            ${headerLinksHtml}
          </div>
        </div>
      </nav>
      ` : ""}
    </header>

    ${heroHtml}

    <main class="container">
      ${renderedSections}
    </main>

    <footer>
      <div class="container flex-footer">
        <strong>${restaurant.logoUrl ? `<img src="${safe(restaurant.logoUrl)}" alt="${safe(restaurant.name)} Logo" style="max-height: 48px; display: block; margin-bottom: 1rem;" />` : safe(restaurant.name)}</strong>
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
    
    ${restaurant.floatingCTA?.enabled ? `<a href="${safe(restaurant.floatingCTA.link)}" target="_blank" rel="noreferrer" class="floating-cta" onclick="window.__track?.('click', 'floating_cta')"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> ${safe(restaurant.floatingCTA.text)}</a>` : ""}
    ${heroJs}
  </body>
</html>`;
}
