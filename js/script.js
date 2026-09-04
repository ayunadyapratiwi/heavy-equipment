const WHATSAPP_NUMBER = "6281294529897";

const units = [
  {name:"Komatsu PC200", category:"EXCAVATOR", specs:"20 Ton • Hydraulic Excavator", image:"https://images.unsplash.com/photo-1579492450119-80542d516179?auto=format&fit=crop&w=900&q=80"},
  {name:"Komatsu WA200", category:"WHEEL LOADER", specs:"Wheel Loader • Ready Unit", image:"https://images.unsplash.com/photo-1621928919052-7f9c6c3d1f49?auto=format&fit=crop&w=900&q=80"},
  {name:"Komatsu D65", category:"BULLDOZER", specs:"Heavy Duty • Dozer", image:"https://images.unsplash.com/photo-1580901368919-7738ef7c172d?auto=format&fit=crop&w=900&q=80"},
  {name:"Sakai Roller", category:"VIBRATORY ROLLER", specs:"10 Ton • Compaction", image:"https://images.unsplash.com/photo-1590644365607-1c5a3c7f1d7a?auto=format&fit=crop&w=900&q=80"}
];

const parts = [
  {name:"Hydraulic Pump", part:"HP-200", category:"Hydraulic Parts"},
  {name:"Engine Oil Filter", part:"OF-6D", category:"Filter"},
  {name:"Track Shoe", part:"UC-600", category:"Undercarriage"},
  {name:"Air Filter", part:"AF-220", category:"Filter"},
  {name:"Starter Motor", part:"EL-120", category:"Electrical"},
  {name:"Engine Gasket Set", part:"EG-400", category:"Engine Parts"}
];

const waUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

function unitMessage(unit){ return `Halo, saya mau sewa unit ${unit}. Mohon info harga, ketersediaan unit, dan ketentuan sewanya. Terima kasih.`; }
function partMessage(part, number){ return `Halo, saya ingin menanyakan sparepart ${part} dengan Part Number ${number}. Mohon info harga dan ketersediaannya.`; }

function renderUnits(){
  const grid = document.querySelector("#unit-grid");
  grid.innerHTML = units.map(u => `
    <article class="product-card">
      <img src="${u.image}" alt="${u.name}" loading="lazy">
      <div class="product-body">
        <small>${u.category}</small>
        <h3>${u.name}</h3>
        <p>${u.specs}</p>
        <a class="btn btn-red" href="${waUrl(unitMessage(u.name))}" target="_blank" rel="noopener">SEWA UNIT →</a>
      </div>
    </article>
  `).join("");
}

function renderParts(){
  const query = document.querySelector("#part-search").value.toLowerCase();
  const filter = document.querySelector("#part-filter").value;
  const filtered = parts.filter(p => {
    const matchesQuery = `${p.name} ${p.part} ${p.category}`.toLowerCase().includes(query);
    const matchesFilter = filter === "all" || p.category === filter;
    return matchesQuery && matchesFilter;
  });
  document.querySelector("#parts-grid").innerHTML = filtered.length ? filtered.map(p => `
    <article class="part-card">
      <div class="part-icon">⚙</div>
      <div>
        <small>${p.category.toUpperCase()}</small>
        <h3>${p.name}</h3>
        <p>Part Number: <strong>${p.part}</strong></p>
        <a class="btn btn-red" href="${waUrl(partMessage(p.name,p.part))}" target="_blank" rel="noopener">TANYAKAN VIA WA</a>
      </div>
    </article>
  `).join("") : `<p style="color:#777">Sparepart tidak ditemukan.</p>`;
}

document.querySelector("#part-search").addEventListener("input", renderParts);
document.querySelector("#part-filter").addEventListener("change", renderParts);

document.querySelectorAll("[data-wa]").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    window.open(waUrl(el.dataset.wa), "_blank", "noopener");
  });
});

document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".navbar nav").classList.toggle("open");
});

document.querySelectorAll(".navbar nav a").forEach(a => {
  a.addEventListener("click", () => document.querySelector(".navbar nav").classList.remove("open"));
});

renderUnits();
renderParts();
