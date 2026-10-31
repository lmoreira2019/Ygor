// Substitua pelo número com código de país e DDD (apenas números)[cite: 1]
const WHATSAPP_NUMBER = "5531992599215";

const PLANS = [
  {
    id: "p1",
    nome: "Essencial",
    num: "Pacote 01",
    dur: "Até 15 segundos",
    preco: 100,
    modo: "Produção simplificada",
    badge: null,
    itens: [
      "Até 2 cenas geradas por IA",
      "Edição básica e cortes",
      "Textos e legendas chamativas",
      "Trilha sonora inclusa"
    ],
    adv: "Ideal para divulgar produtos individuais, ofertas relâmpago e novidades."
  },
  {
    id: "p2",
    nome: "Destaque",
    num: "Pacote 02",
    dur: "De 15 a 45 segundos",
    preco: 150,
    modo: "Melhor equilíbrio",
    badge: "★ Mais Escolhido",
    itens: [
      "Até 3 cenas geradas por IA",
      "Roteiro publicitário estruturado",
      "Narração profissional por IA",
      "Transições dinâmicas e efeitos",
      "Identidade visual do cliente",
      "Trilha sonora inclusa"
    ],
    adv: "Mais retenção e storytelling completo para marcas que querem se destacar."
  },
  {
    id: "p3",
    nome: "Completo",
    num: "Pacote 03",
    dur: "De 30 a 45 segundos",
    preco: 200,
    modo: "Produção criativa",
    badge: null,
    itens: [
      "Até 5 cenas geradas por IA",
      "Roteiro publicitário sob medida",
      "Personagens e ambientes imersivos",
      "Edição completa com efeitos sonoros",
      "Narração e identidade visual",
      "Trilha sonora inclusa"
    ],
    adv: "Maior imersão visual e conexão emocional com o cliente."
  },
  {
    id: "p4",
    nome: "Premium",
    num: "Pacote 04",
    dur: "45 seg até 2 minutos",
    preco: 250,
    modo: "Produção avançada",
    badge: "Novo",
    itens: [
      "Até 8 cenas geradas por IA",
      "Roteiro completo cinematográfico",
      "Cenários complexos por IA",
      "Edição avançada e pós-produção",
      "Narração personalizada",
      "Versões extras adaptadas para Stories"
    ],
    adv: "Impacto total para lançamentos, institucionais ou campanhas robustas."
  }
];

let selectedPlan = null;
const plansContainer = document.getElementById("plans");
const selBanner = document.getElementById("sel");
const errorEl = document.getElementById("err");
const form = document.getElementById("orderForm");

function formatCurrency(val) {
  return "R$ " + val.toFixed(2).replace(".", ",");
}

function renderPlans() {
  plansContainer.innerHTML = PLANS.map(p => `
    <button type="button" class="plan ${p.id}" data-id="${p.id}" aria-pressed="false">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <span class="pill">${p.num}</span>
      <h3>${p.nome}</h3>
      <p class="dur">${p.dur}</p>
      <div class="price"><small>R$</small> ${p.preco}<small>,00</small></div>
      <div class="mode">${p.modo}</div>
      <ul>
        ${p.itens.map(item => `<li>${item}</li>`).join("")}
      </ul>
      <div class="adv">
        <b>Vantagem</b>
        ${p.adv}
      </div>
      <div class="choose-btn">Selecionar Pacote</div>
    </button>
  `).join("");

  document.querySelectorAll(".plan").forEach(button => {
    button.addEventListener("click", () => selectPlan(button.dataset.id, true));
  });
}

function selectPlan(id, smoothScroll = false) {
  selectedPlan = PLANS.find(p => p.id === id);
  if (!selectedPlan) return;

  document.querySelectorAll(".plan").forEach(btn => {
    btn.setAttribute("aria-pressed", btn.dataset.id === id ? "true" : "false");
  });

  selBanner.classList.add("active");
  selBanner.innerHTML = `
    <span class="banner-icon">🎯</span>
    <div class="banner-text">
      <strong>Pacote selecionado: ${selectedPlan.nome} (${selectedPlan.dur})</strong>
      <p>Investimento: <b>${formatCurrency(selectedPlan.preco)}</b></p>
    </div>
  `;

  errorEl.textContent = "";

  if (smoothScroll) {
    const target = document.getElementById("orcamento");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const nicho = document.getElementById("nicho").value.trim();
  const obs = document.getElementById("obs").value.trim();

  if (!selectedPlan) {
    errorEl.textContent = "Por favor, selecione um pacote acima antes de continuar.";
    const firstPlan = document.querySelector(".plan");
    if (firstPlan) firstPlan.focus();
    return;
  }

  if (!nome) {
    errorEl.textContent = "Por favor, digite seu nome ou empresa.";
    document.getElementById("nome").focus();
    return;
  }

  errorEl.textContent = "";

  let msg = `*SOLICITAÇÃO DE ORÇAMENTO - VÍDEO IA*\n`;
  msg += `--------------------------------------\n\n`;
  msg += `> *PACOTE:* ${selectedPlan.nome} (${selectedPlan.num})\n`;
  msg += `> *DURAÇÃO:* ${selectedPlan.dur}\n`;
  msg += `> *VALOR:* ${formatCurrency(selectedPlan.preco)}\n\n`;
  msg += `*DADOS DO CLIENTE*\n`;
  msg += `• *Nome/Empresa:* ${nome}\n`;
  if (nicho) msg += `• *Segmento:* ${nicho}\n`;
  if (obs) msg += `• *Detalhes:* ${obs}\n\n`;
  msg += `--------------------------------------`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");
});

document.addEventListener("DOMContentLoaded", renderPlans);