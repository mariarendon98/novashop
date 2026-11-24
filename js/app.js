/**
 * js/app.js
 * Controlador principal de NovaShop - Integración Ciclo 1 (M1, M2, M3, M4)
 * Elevated Labs - Subgrupo 4
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Iniciando NovaShop integrado: M1 (Cuentas), M2 (Búsqueda), M3 (Filtros), M4 (Catálogo)");

  const ns = window.NovaShop || {};

  // --- Elementos del DOM ---
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const minPriceInput = document.getElementById("minPriceInput");
  const maxPriceInput = document.getElementById("maxPriceInput");
  const inStockCheckbox = document.getElementById("inStockCheckbox");
  const sortSelect = document.getElementById("sortSelect");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
  const activeFiltersBadge = document.getElementById("activeFiltersBadge");

  // Elementos de Cuentas / Sesión (M1)
  const authBtn = document.getElementById("authBtn");
  const userGreeting = document.getElementById("userGreeting");
  const userNameSpan = document.getElementById("userNameSpan");
  const logoutBtn = document.getElementById("logoutBtn");
  const authModal = document.getElementById("authModal");
  const closeAuthModalBtn = document.getElementById("closeAuthModalBtn");

  // Tabs de Login y Registro (M1)
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const formLogin = document.getElementById("formLogin");
  const formRegister = document.getElementById("formRegister");
  const authAlert = document.getElementById("authAlert");

  // --- 1. GESTIÓN DE SESIÓN (M1) ---
  function actualizarEstadoSesion() {
    if (!ns.sesionActual) return;
    const sesion = ns.sesionActual();
    if (sesion) {
      if (authBtn) authBtn.classList.add("hidden");
      if (userGreeting) {
        userGreeting.classList.remove("hidden");
        userGreeting.classList.add("flex");
      }
      if (userNameSpan) userNameSpan.textContent = sesion.nombre;
    } else {
      if (authBtn) authBtn.classList.remove("hidden");
      if (userGreeting) {
        userGreeting.classList.add("hidden");
        userGreeting.classList.remove("flex");
      }
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (ns.cerrarSesion) ns.cerrarSesion();
      actualizarEstadoSesion();
    });
  }

  if (authBtn && authModal) {
    authBtn.addEventListener("click", () => {
      authModal.classList.remove("hidden");
      authModal.classList.add("flex");
      limpiarAlertas();
    });
  }

  if (closeAuthModalBtn && authModal) {
    closeAuthModalBtn.addEventListener("click", () => {
      authModal.classList.add("hidden");
      authModal.classList.remove("flex");
    });
  }

  if (tabLogin && tabRegister) {
    tabLogin.addEventListener("click", () => {
      tabLogin.classList.add("border-blue-600", "text-blue-600");
      tabLogin.classList.remove("border-transparent", "text-slate-500");
      tabRegister.classList.remove("border-blue-600", "text-blue-600");
      tabRegister.classList.add("border-transparent", "text-slate-500");
      formLogin.classList.remove("hidden");
      formRegister.classList.add("hidden");
      limpiarAlertas();
    });

    tabRegister.addEventListener("click", () => {
      tabRegister.classList.add("border-blue-600", "text-blue-600");
      tabRegister.classList.remove("border-transparent", "text-slate-500");
      tabLogin.classList.remove("border-blue-600", "text-blue-600");
      tabLogin.classList.add("border-transparent", "text-slate-500");
      formRegister.classList.remove("hidden");
      formLogin.classList.add("hidden");
      limpiarAlertas();
    });
  }

  function mostrarAlerta(msg, esError) {
    if (!authAlert) return;
    authAlert.textContent = msg;
    authAlert.className = "text-xs p-2.5 rounded-lg mb-3 font-medium " + 
      (esError ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200");
    authAlert.classList.remove("hidden");
  }

  function limpiarAlertas() {
    if (authAlert) authAlert.classList.add("hidden");
  }

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const correo = document.getElementById("loginEmail").value;
      const clave = document.getElementById("loginPassword").value;
      if (ns.iniciarSesion) {
        const res = ns.iniciarSesion(correo, clave);
        if (res.ok) {
          mostrarAlerta(res.mensaje, false);
          setTimeout(() => {
            authModal.classList.add("hidden");
            authModal.classList.remove("flex");
            actualizarEstadoSesion();
          }, 600);
        } else {
          mostrarAlerta(res.mensaje, true);
        }
      }
    });
  }

  if (formRegister) {
    formRegister.addEventListener("submit", (e) => {
      e.preventDefault();
      const datos = {
        nombre: document.getElementById("regNombre").value,
        correo: document.getElementById("regEmail").value,
        clave: document.getElementById("regPassword").value,
        confirmacion: document.getElementById("regConfirm").value
      };
      if (ns.registrarUsuario) {
        const res = ns.registrarUsuario(datos);
        if (res.ok) {
          mostrarAlerta("¡Cuenta creada con éxito! Ya puedes iniciar sesión.", false);
          formRegister.reset();
          setTimeout(() => tabLogin.click(), 900);
        } else {
          mostrarAlerta(res.errores.join(" "), true);
        }
      }
    });
  }

  // --- 2. MOTOR DE BÚSQUEDA Y FILTRADO COMBINADO (M2, M3 y M4) ---
  function aplicarFiltrosYOrden() {
    let articulos = (typeof productosData !== "undefined" ? productosData.slice() : []);

    // A. Búsqueda por texto (M2)
    const texto = searchInput ? searchInput.value : "";
    if (ns.buscarPorTexto && texto.trim() !== "") {
      articulos = ns.buscarPorTexto(articulos, texto);
    }

    // B. Filtros avanzados (M3)
    const cat = categoryFilter ? categoryFilter.value : "ALL";
    const minP = minPriceInput && minPriceInput.value ? Number(minPriceInput.value) : null;
    const maxP = maxPriceInput && maxPriceInput.value ? Number(maxPriceInput.value) : null;
    const soloDisp = inStockCheckbox ? inStockCheckbox.checked : false;

    const criterios = {
      categoria: (cat !== "ALL" ? cat : ""),
      precioMin: minP,
      precioMax: maxP,
      soloDisponibles: soloDisp
    };

    if (ns.filtrarAvanzado) {
      articulos = ns.filtrarAvanzado(articulos, criterios);
    }

    // Contador de criterios activos (M3)
    let totalCriterios = 0;
    if (ns.contarCriterios) {
      totalCriterios = ns.contarCriterios(criterios) + (texto.trim() !== "" ? 1 : 0);
    }
    if (activeFiltersBadge) {
      if (totalCriterios > 0) {
        activeFiltersBadge.textContent = totalCriterios + " activo(s)";
        activeFiltersBadge.classList.remove("hidden");
      } else {
        activeFiltersBadge.classList.add("hidden");
      }
    }

    // C. Ordenamiento (M3)
    const orden = sortSelect ? sortSelect.value : "";
    if (ns.ordenarArticulos && orden) {
      articulos = ns.ordenarArticulos(articulos, orden);
    }

    // D. Renderizado del catálogo (M4)
    if (typeof renderizarCuadricula === "function") {
      renderizarCuadricula(articulos);
    }
  }

  // Escuchadores de eventos para Búsqueda (M2)
  if (searchInput) {
    if (ns.retrasar) {
      searchInput.addEventListener("input", ns.retrasar(aplicarFiltrosYOrden, 250));
    } else {
      searchInput.addEventListener("input", aplicarFiltrosYOrden);
    }
  }

  if (categoryFilter) categoryFilter.addEventListener("change", aplicarFiltrosYOrden);
  if (minPriceInput) minPriceInput.addEventListener("input", aplicarFiltrosYOrden);
  if (maxPriceInput) maxPriceInput.addEventListener("input", aplicarFiltrosYOrden);
  if (inStockCheckbox) inStockCheckbox.addEventListener("change", aplicarFiltrosYOrden);
  if (sortSelect) sortSelect.addEventListener("change", aplicarFiltrosYOrden);

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categoryFilter) categoryFilter.value = "ALL";
      if (minPriceInput) minPriceInput.value = "";
      if (maxPriceInput) maxPriceInput.value = "";
      if (inStockCheckbox) inStockCheckbox.checked = false;
      if (sortSelect) sortSelect.value = "";
      aplicarFiltrosYOrden();
    });
  }

  // --- 3. MODAL DE DETALLE DE CATÁLOGO (M4) ---
  const btnCerrar = document.getElementById("closeModalBtn");
  const btnCerrarFooter = document.getElementById("closeModalFooterBtn");
  const modalFondo = document.getElementById("detailModal");

  if (btnCerrar) btnCerrar.onclick = ocultarModalDetalle;
  if (btnCerrarFooter) btnCerrarFooter.onclick = ocultarModalDetalle;
  if (modalFondo) {
    modalFondo.onclick = (e) => {
      if (e.target.id === "detailModal") ocultarModalDetalle();
    };
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (typeof ocultarModalDetalle === "function") ocultarModalDetalle();
      if (authModal) {
        authModal.classList.add("hidden");
        authModal.classList.remove("flex");
      }
    }
  });

  // --- INICIALIZACIÓN ---
  actualizarEstadoSesion();
  aplicarFiltrosYOrden();
});
