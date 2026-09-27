(function () {
  "use strict";
 
  var products = window.PRODUCTS || [];
  var grid = document.getElementById("product-grid");
  var overlay = document.getElementById("overlay");
  var panelContent = document.getElementById("panel-content");
  var closeBtn = document.getElementById("close-btn");
  var yearEl = document.getElementById("year");
  var cartToggle = document.getElementById("cart-toggle");
  var cartCountEl = document.getElementById("cart-count");
 
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------------------------------------------------------------------
  // Warenkorb (gespeichert im Browser des Kunden, kein Server nötig)
  // ---------------------------------------------------------------------
  var CART_STORAGE_KEY = "madanCart";
  var cart = {};

  try {
    cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "{}");
  } catch (e) {
    cart = {};
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      /* localStorage nicht verfügbar — Warenkorb bleibt nur für diese Sitzung erhalten */
    }
  }

  function findProduct(id) {
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        return products[i];
      }
    }
    return null;
  }

  function updateCartBadge() {
    if (!cartCountEl) return;
    var count = 0;
    Object.keys(cart).forEach(function (id) {
      count += cart[id];
    });
    if (count > 0) {
      cartCountEl.textContent = count;
      cartCountEl.hidden = false;
    } else {
      cartCountEl.hidden = true;
    }
  }

  updateCartBadge();
 
  function renderGrid() {
    grid.innerHTML = "";
 
    if (!products.length) {
      var empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML =
        "<strong>Noch keine Produkte</strong>Neue Produkte werden in products.js eingetragen.";
      grid.appendChild(empty);
      return;
    }
 
    products.forEach(function (product) {
      var card = document.createElement("button");
      card.className = "product-card";
      card.type = "button";
      card.setAttribute("aria-haspopup", "dialog");
 
      var top = document.createElement("div");
      top.className = "card-top";
 
      var h2 = document.createElement("h2");
      h2.textContent = product.name;
 
      var arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";
 
      top.appendChild(h2);
      top.appendChild(arrow);
 
      var tagline = document.createElement("p");
      tagline.className = "tagline";
      tagline.textContent = product.tagline || "";
 
      card.appendChild(top);
      card.appendChild(tagline);
 
      card.addEventListener("click", function () {
        openPanel(product);
      });
 
      grid.appendChild(card);
    });
  }
 
  var lastFocused = null;
 
  function openPanel(product) {
    lastFocused = document.activeElement;
 
    var html = "";
    html += '<p class="panel-eyebrow">MADAN</p>';
    html += "<h2 id=\"panel-title\">" + escapeHtml(product.name) + "</h2>";
 
    if (product.price) {
      html += '<p class="price">' + escapeHtml(product.price) + "</p>";
    }
 
    if (product.image) {
      html +=
        '<img class="product-image" src="' +
        escapeHtml(product.image) +
        '" alt="" />';
    }
 
    html +=
      '<div class="description">' +
      escapeHtml(product.description || "") +
      "</div>";

    html += '<div class="panel-cta">';
    html +=
      '<button type="button" class="btn-add-cart" data-cart-action="add-to-cart" data-id="' +
      escapeHtml(product.id) +
      '">In den Warenkorb</button>';
    html += "</div>";

    panelContent.innerHTML = html;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
 
  function closePanel() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) {
      lastFocused.focus();
    }
  }

  function openCart() {
    lastFocused = document.activeElement;

    var ids = Object.keys(cart).filter(function (id) {
      return cart[id] > 0 && findProduct(id);
    });

    var html = "";
    html += '<p class="panel-eyebrow">MADAN</p>';
    html += '<h2 id="panel-title">Warenkorb</h2>';

    if (!ids.length) {
      html += '<p class="cart-empty">Dein Warenkorb ist noch leer.</p>';
    } else {
      html += '<div class="cart-list">';
      ids.forEach(function (id) {
        var p = findProduct(id);
        var qty = cart[id];
        html += '<div class="cart-item">';
        html += '<div class="cart-item-info">';
        html += '<span class="cart-item-name">' + escapeHtml(p.name) + "</span>";
        if (p.price) {
          html += '<span class="cart-item-price">' + escapeHtml(p.price) + "</span>";
        }
        html += "</div>";
        html += '<div class="cart-item-controls">';
        html += '<div class="qty-stepper">';
        html +=
          '<button type="button" data-cart-action="dec" data-id="' +
          id +
          '" aria-label="Menge verringern">\u2212</button>';
        html += '<span class="cart-qty">' + qty + "</span>";
        html +=
          '<button type="button" data-cart-action="inc" data-id="' +
          id +
          '" aria-label="Menge erhöhen">+</button>';
        html += "</div>";
        html +=
          '<button type="button" class="cart-remove" data-cart-action="remove" data-id="' +
          id +
          '" aria-label="Artikel entfernen">\u00d7</button>';
        html += "</div>";
        html += "</div>";
      });
      html += "</div>";

      html += '<div class="cart-checkout">';
      html +=
        '<p class="cart-checkout-note">Der Kauf läuft über unseren Etsy-Shop. Öffne die Artikel dort einzeln zum Bezahlen:</p>';
      ids.forEach(function (id) {
        var p = findProduct(id);
        if (p.etsyUrl) {
          html +=
            '<a class="cart-etsy-link" href="' +
            escapeHtml(p.etsyUrl) +
            '" target="_blank" rel="noopener">' +
            escapeHtml(p.name) +
            " bei Etsy kaufen ↗</a>";
        } else {
          html +=
            '<span class="cart-etsy-link cart-etsy-link--disabled">' +
            escapeHtml(p.name) +
            " — Etsy-Link folgt</span>";
        }
      });
      html += "</div>";
    }

    panelContent.innerHTML = html;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
 
  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
 
  panelContent.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-cart-action]");
    if (!btn) return;

    var action = btn.getAttribute("data-cart-action");
    var id = btn.getAttribute("data-id");

    if (action === "add-to-cart") {
      cart[id] = (cart[id] || 0) + 1;
      saveCart();
      updateCartBadge();
      var original = btn.textContent;
      btn.textContent = "Hinzugefügt ✓";
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
      }, 1200);
      return;
    }

    if (action === "inc") {
      cart[id] = (cart[id] || 0) + 1;
      saveCart();
      updateCartBadge();
      openCart();
      return;
    }

    if (action === "dec") {
      cart[id] = (cart[id] || 0) - 1;
      if (cart[id] <= 0) delete cart[id];
      saveCart();
      updateCartBadge();
      openCart();
      return;
    }

    if (action === "remove") {
      delete cart[id];
      saveCart();
      updateCartBadge();
      openCart();
      return;
    }
  });

  if (cartToggle) {
    cartToggle.addEventListener("click", openCart);
  }

  closeBtn.addEventListener("click", closePanel);
 
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closePanel();
    }
  });
 
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) {
      closePanel();
    }
  });
 
  renderGrid();
})();
