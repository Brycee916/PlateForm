/* global Buffer, process */
import { createServer } from "node:http";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderRestaurantSite } from "./siteRenderer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const publishedDir = path.join(rootDir, "published");
const dbFile = path.join(dataDir, "db.json");
const PORT = process.env.PORT || 8787;
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

const rateLimitWindowMs = 60000; // 1 min fixed window
const rateLimitMax = 200; // 200 requests per IP per minute
const ipRequests = new Map();
setInterval(() => ipRequests.clear(), rateLimitWindowMs);

const defaultDb = {
  users: [],
  sessions: [],
  restaurants: [],
  deployments: [],
};

async function ensureStorage() {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.mkdir(publishedDir, { recursive: true });
  try {
    await fs.access(dbFile);
  } catch {
    await fs.writeFile(dbFile, JSON.stringify(defaultDb, null, 2), "utf8");
  }
}

async function readDb() {
  const content = await fs.readFile(dbFile, "utf8");
  return JSON.parse(content);
}

let writeQueue = Promise.resolve();
function writeDb(next) {
  writeQueue = writeQueue.then(() => fs.writeFile(dbFile, JSON.stringify(next, null, 2), "utf8"));
  return writeQueue;
}

function json(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  });
  res.end(JSON.stringify(payload));
}

function notFound(res) {
  json(res, 404, { error: "Not found" });
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      if (body.length > 1_000_000) {
        reject(new Error("Request too large"));
      }
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

function verifyPassword(password, hash, salt) {
  const compare = scryptSync(password, salt, 64);
  const original = Buffer.from(hash, "hex");
  if (original.length !== compare.length) return false;
  return timingSafeEqual(original, compare);
}

function slugify(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlug(base, used) {
  let slug = slugify(base) || "restaurant";
  let index = 1;
  while (used.has(slug)) {
    slug = `${slugify(base)}-${index}`;
    index += 1;
  }
  return slug;
}

function makeId(prefix) {
  return `${prefix}_${randomBytes(8).toString("hex")}`;
}

function sanitizeRestaurantInput(payload = {}) {
  const menuCategories = Array.isArray(payload.menuCategories)
    ? payload.menuCategories.map((category) => ({
        id: category.id || makeId("cat"),
        name: String(category.name || "").trim(),
        items: Array.isArray(category.items)
          ? category.items.map((item) => ({
              id: item.id || makeId("item"),
              name: String(item.name || "").trim(),
              description: String(item.description || "").trim(),
              price: String(item.price || "").trim(),
              badge: String(item.badge || "").trim(),
            }))
          : [],
      }))
    : [];

  const gallery = Array.isArray(payload.gallery)
    ? payload.gallery.map((url) => String(url || "").trim()).filter(Boolean).slice(0, 20)
    : [];

  const specials = Array.isArray(payload.specials)
    ? payload.specials.map((s) => ({
        id: s.id || makeId("spc"),
        title: String(s.title || "").trim(),
        description: String(s.description || "").trim(),
        badge: String(s.badge || "").trim(),
        image: String(s.image || "").trim(),
      }))
    : [];

  const testimonials = Array.isArray(payload.testimonials)
    ? payload.testimonials.map((t) => ({
        id: t.id || makeId("tst"),
        quote: String(t.quote || "").trim(),
        author: String(t.author || "").trim(),
      }))
    : [];

  return {
    name: String(payload.name || "").trim(),
    logoUrl: String(payload.logoUrl || "").trim(),
    cuisine: String(payload.cuisine || "").trim(),
    phone: String(payload.phone || "").trim(),
    contactEmail: String(payload.contactEmail || "").trim(),
    address: String(payload.address || "").trim(),
    city: String(payload.city || "").trim(),
    state: String(payload.state || "").trim(),
    zip: String(payload.zip || "").trim(),
    hours: typeof payload.hours === "object" && payload.hours !== null ? {
      Monday: String(payload.hours.Monday || "").trim(),
      Tuesday: String(payload.hours.Tuesday || "").trim(),
      Wednesday: String(payload.hours.Wednesday || "").trim(),
      Thursday: String(payload.hours.Thursday || "").trim(),
      Friday: String(payload.hours.Friday || "").trim(),
      Saturday: String(payload.hours.Saturday || "").trim(),
      Sunday: String(payload.hours.Sunday || "").trim(),
    } : { Monday: "", Tuesday: "", Wednesday: "", Thursday: "", Friday: "", Saturday: "", Sunday: "" },
    reservationUrl: String(payload.reservationUrl || "").trim(),
    orderUrl: String(payload.orderUrl || "").trim(),
    deliveryUrl: String(payload.deliveryUrl || "").trim(),
    story: String(payload.story || "").trim(),
    templateKey: String(payload.templateKey || "modern").trim(),
    layoutDensity: String(payload.layoutDensity || "balanced").trim(),
    heroTitle: String(payload.heroTitle || "").trim(),
    heroSubtitle: String(payload.heroSubtitle || "").trim(),
    primaryColor: String(payload.primaryColor || "#ea580c").trim(),
    accentColor: String(payload.accentColor || "#0f766e").trim(),
    borderRadiusStyle: String(payload.borderRadiusStyle || "rounded").trim(),
    navStyle: String(payload.navStyle || "split").trim(),
    fontStyle: String(payload.fontStyle || "sans").trim(),
    themeMode: String(payload.themeMode || "light").trim(),
    heroStyle: String(payload.heroStyle || "overlay").trim(),
    buttonStyle: String(payload.buttonStyle || "solid").trim(),
    backgroundPattern: String(payload.backgroundPattern || "solid").trim(),
    cardShadow: String(payload.cardShadow || "soft").trim(),
    animationStyle: String(payload.animationStyle || "smooth").trim(),
    heroBackground: String(payload.heroBackground || "static").trim(),
    menuFormat: String(payload.menuFormat || "classic").trim(),
    galleryFormat: String(payload.galleryFormat || "grid").trim(),
    promoBanner: typeof payload.promoBanner === 'object' && payload.promoBanner !== null ? {
      enabled: Boolean(payload.promoBanner.enabled),
      text: String(payload.promoBanner.text || "").trim(),
      link: String(payload.promoBanner.link || "").trim()
    } : { enabled: false, text: "", link: "" },
    floatingCTA: typeof payload.floatingCTA === 'object' && payload.floatingCTA !== null ? {
      enabled: Boolean(payload.floatingCTA.enabled),
      text: String(payload.floatingCTA.text || "").trim(),
      link: String(payload.floatingCTA.link || "").trim()
    } : { enabled: false, text: "", link: "" },
    seoTitle: String(payload.seoTitle || "").trim(),
    seoDescription: String(payload.seoDescription || "").trim(),
    customDomain: String(payload.customDomain || "").trim(),
    instagramUrl: String(payload.instagramUrl || "").trim(),
    facebookUrl: String(payload.facebookUrl || "").trim(),
    tiktokUrl: String(payload.tiktokUrl || "").trim(),
    showPhone: payload.showPhone !== undefined ? Boolean(payload.showPhone) : true,
    showEmail: payload.showEmail !== undefined ? Boolean(payload.showEmail) : true,
    showStory: payload.showStory !== undefined ? Boolean(payload.showStory) : true,
    isOffline: Boolean(payload.isOffline),
    sectionOrder: (() => {
      const baseOrder = ["story", "location", "specials", "menu", "testimonials", "gallery"];
      let order = Array.isArray(payload.sectionOrder) && payload.sectionOrder.length > 0 ? payload.sectionOrder.map(String) : baseOrder;
      const missing = baseOrder.filter(sec => !order.includes(sec));
      return [...order, ...missing];
    })(),
    extraLocations: Array.isArray(payload.extraLocations) ? payload.extraLocations.map(l => ({
      name: String(l.name || "").trim(),
      address: String(l.address || "").trim(),
      city: String(l.city || "").trim(),
      state: String(l.state || "").trim(),
      phone: String(l.phone || "").trim(),
      contactEmail: String(l.contactEmail || "").trim(),
      hours: typeof l.hours === "object" && l.hours !== null ? {
        Monday: String(l.hours.Monday || "").trim(),
        Tuesday: String(l.hours.Tuesday || "").trim(),
        Wednesday: String(l.hours.Wednesday || "").trim(),
        Thursday: String(l.hours.Thursday || "").trim(),
        Friday: String(l.hours.Friday || "").trim(),
        Saturday: String(l.hours.Saturday || "").trim(),
        Sunday: String(l.hours.Sunday || "").trim(),
      } : { Monday: "", Tuesday: "", Wednesday: "", Thursday: "", Friday: "", Saturday: "", Sunday: "" }
    })) : [],
    menuCategories,
    gallery,
    specials,
    testimonials,
  };
}

function getUserFromAuth(req, db) {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  const session = db.sessions.find((s) => s.token === token);
  if (!session) return null;
  const user = db.users.find((u) => u.id === session.userId);
  if (!user) return null;
  return user;
}

async function handle(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
  const count = (ipRequests.get(ip) || 0) + 1;
  ipRequests.set(ip, count);
  if (count > rateLimitMax) {
    return json(res, 429, { error: "Too many requests. Please try again later." });
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    });
    res.end();
    return;
  }

  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const pathname = url.pathname;
  const db = await readDb();

  if (req.method === "GET" && pathname === "/api/health") {
    return json(res, 200, { ok: true, now: new Date().toISOString() });
  }

  if (req.method === "POST" && pathname === "/api/auth/register") {
    try {
      const body = await parseBody(req);
      const name = String(body.name || "").trim();
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      if (!name || !email || password.length < 8) {
        return json(res, 400, { error: "Name, email, and 8+ char password required." });
      }
      if (db.users.some((u) => u.email === email)) {
        return json(res, 409, { error: "Email already registered." });
      }

      const { hash, salt } = hashPassword(password);
      const user = {
        id: makeId("usr"),
        name,
        email,
        passwordHash: hash,
        passwordSalt: salt,
        createdAt: new Date().toISOString(),
      };
      db.users.push(user);
      const token = randomBytes(32).toString("hex");
      db.sessions.push({ token, userId: user.id, createdAt: new Date().toISOString() });
      await writeDb(db);

      return json(res, 201, {
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      return json(res, 400, { error: error.message });
    }
  }

  if (req.method === "POST" && pathname === "/api/auth/login") {
    try {
      const body = await parseBody(req);
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      const user = db.users.find((u) => u.email === email);
      if (!user || !verifyPassword(password, user.passwordHash, user.passwordSalt)) {
        return json(res, 401, { error: "Invalid credentials." });
      }
      const token = randomBytes(32).toString("hex");
      db.sessions.push({ token, userId: user.id, createdAt: new Date().toISOString() });
      await writeDb(db);
      return json(res, 200, {
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      return json(res, 400, { error: error.message });
    }
  }

  if (req.method === "POST" && pathname === "/api/auth/logout") {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) return json(res, 204, {});
    const token = auth.slice(7);
    db.sessions = db.sessions.filter((s) => s.token !== token);
    await writeDb(db);
    return json(res, 204, {});
  }

  const user = getUserFromAuth(req, db);

  if (pathname.startsWith("/api/") && !user && pathname !== "/api/public") {
    const publicPaths = ["/api/public"];
    const isPublic = publicPaths.some((p) => pathname.startsWith(p));
    if (!isPublic) {
      return json(res, 401, { error: "Unauthorized" });
    }
  }

  if (req.method === "GET" && pathname === "/api/me") {
    return json(res, 200, { user: { id: user.id, name: user.name, email: user.email } });
  }

  if (req.method === "GET" && pathname === "/api/restaurants") {
    const items = db.restaurants.filter((r) => r.ownerUserId === user.id);
    return json(res, 200, { restaurants: items });
  }

  if (req.method === "POST" && pathname === "/api/restaurants") {
    try {
      const body = await parseBody(req);
      const data = sanitizeRestaurantInput(body);
      if (!data.name) {
        return json(res, 400, { error: "Restaurant name is required." });
      }
      const used = new Set(db.restaurants.map((r) => r.slug));
      const slug = uniqueSlug(data.name, used);
      const record = {
        id: makeId("rst"),
        ownerUserId: user.id,
        slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: null,
        ...data,
      };
      db.restaurants.push(record);
      await writeDb(db);
      return json(res, 201, { restaurant: record });
    } catch (error) {
      return json(res, 400, { error: error.message });
    }
  }

  if (req.method === "PUT" && pathname.startsWith("/api/restaurants/")) {
    try {
      const id = pathname.split("/")[3];
      const restaurant = db.restaurants.find((r) => r.id === id && r.ownerUserId === user.id);
      if (!restaurant) return json(res, 404, { error: "Restaurant not found." });
      const body = await parseBody(req);
      const data = sanitizeRestaurantInput(body);
      Object.assign(restaurant, data, { updatedAt: new Date().toISOString() });
      await writeDb(db);
      return json(res, 200, { restaurant });
    } catch (error) {
      return json(res, 400, { error: error.message });
    }
  }

  if (req.method === "GET" && pathname.startsWith("/api/restaurants/") && pathname.endsWith("/deployments")) {
    const [, , , restaurantId] = pathname.split("/");
    const restaurant = db.restaurants.find((r) => r.id === restaurantId && r.ownerUserId === user.id);
    if (!restaurant) return json(res, 404, { error: "Restaurant not found." });
    const deployments = db.deployments
      .filter((d) => d.restaurantId === restaurant.id)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return json(res, 200, { deployments });
  }

  if (req.method === "POST" && pathname.startsWith("/api/restaurants/") && pathname.endsWith("/publish")) {
    const [, , , restaurantId] = pathname.split("/");
    const restaurant = db.restaurants.find((r) => r.id === restaurantId && r.ownerUserId === user.id);
    if (!restaurant) return json(res, 404, { error: "Restaurant not found." });

    const sitePath = path.join(publishedDir, restaurant.slug);
    await fs.mkdir(sitePath, { recursive: true });
    const html = renderRestaurantSite(restaurant);
    await fs.writeFile(path.join(sitePath, "index.html"), html, "utf8");

    const deployment = {
      id: makeId("dep"),
      restaurantId: restaurant.id,
      slug: restaurant.slug,
      status: "ready",
      localPath: sitePath,
      previewUrl: `http://localhost:${PORT}/sites/${restaurant.slug}`,
      createdAt: new Date().toISOString(),
    };

    restaurant.publishedAt = deployment.createdAt;
    restaurant.updatedAt = deployment.createdAt;
    db.deployments.push(deployment);
    await writeDb(db);
    return json(res, 200, { deployment, restaurant });
  }

  if (req.method === "POST" && pathname === "/api/preview") {
    try {
      const body = await parseBody(req);
      const data = sanitizeRestaurantInput(body);
      const html = renderRestaurantSite({ ...data, id: body.id, name: data.name || "Preview Simulator" });
      return json(res, 200, { html });
    } catch (error) {
      return json(res, 400, { error: error.message });
    }
  }

  if (req.method === "POST" && pathname === "/api/telemetry") {
    try {
      const body = await parseBody(req);
      const { rstId, action, label } = body;
      if (!rstId || !action || !label) return json(res, 400, { error: "Missing telemetry params" });
      
      const restaurant = db.restaurants.find(r => r.id === rstId);
      if (restaurant) {
        if (!restaurant.analytics) restaurant.analytics = {};
        if (!restaurant.analytics[action]) restaurant.analytics[action] = {};
        restaurant.analytics[action][label] = (restaurant.analytics[action][label] || 0) + 1;
        writeDb(db).catch(error => console.error("Failed to update telemetry:", error));
      }
      return json(res, 200, { success: true });
    } catch {
      return json(res, 400, { error: "Invalid telemetry" });
    }
  }

  if (req.method === "GET" && pathname.startsWith("/api/public/")) {
    const slug = pathname.split("/")[3];
    const restaurant = db.restaurants.find((r) => r.slug === slug);
    if (!restaurant) return json(res, 404, { error: "Restaurant not found." });
    return json(res, 200, { restaurant });
  }

  if (req.method === "GET" && pathname.startsWith("/sites/")) {
    const slug = pathname.split("/")[2];
    const restaurant = db.restaurants.find((r) => r.slug === slug);
    
    if (restaurant) {
      restaurant.views = (restaurant.views || 0) + 1;
      writeDb(db).catch(error => console.error("Failed to update hit counter:", error));
    }

    if (restaurant && restaurant.isOffline) {
      res.writeHead(503, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8"><title>Site Offline</title>
            <style>
              body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #fafaf9; color: #1c1917; }
              div { text-align: center; max-width: 500px; padding: 2rem; background: white; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
              h1 { margin-top: 0; color: #ea580c; }
            </style>
          </head>
          <body>
            <div>
              <h1>Temporarily Offline</h1>
              <p>The website for <strong>${restaurant.name}</strong> is currently undergoing maintenance or has been temporarily taken down.</p>
              <p>Please check back later.</p>
            </div>
          </body>
        </html>
      `);
      return;
    }

    const filePath = path.join(publishedDir, slug, "index.html");
    try {
      const html = await fs.readFile(filePath, "utf8");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
      return;
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("No published site for this slug yet.");
      return;
    }
  }

  return notFound(res);
}

await ensureStorage();

const server = createServer((req, res) => {
  handle(req, res).catch((error) => {
    // Keep failure response generic so request details do not leak.
    json(res, 500, { error: "Unexpected server error", detail: error.message });
  });
});

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
