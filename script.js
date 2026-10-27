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
  var homeView = document.getElementById("home-view");
  var categoryView = document.getElementById("category-view");
  var categoryGrid = document.getElementById("category-grid");
  var categoryTitle = document.getElementById("category-title");
  var backBtn = document.getElementById("back-btn");

  var CATEGORIES = [
    { id: "kabelmanagement", name: "Kabelmanagement" },
    { id: "merch", name: "Merch" },
    { id: "sonstiges", name: "Sonstiges" },
  ];

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Warenkorb: wird im Browser des Kunden gespeichert
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
      // Wenn localStorage nicht verfügbar ist, bleibt der Warenkorb
      // nur für diese Sitzung erhalten.
    }
  }

  function getImages(product) {
    if (Array.isArray(product.images) && product.images.length) {
      return product.images.filter(Boolean);
    }
    if (product.image) {
      return [product.image];
    }
    return [];
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

  function renderCategories() {
    if (!categoryGrid) return;

    categoryGrid.innerHTML = "";

    CATEGORIES.forEach(function (category) {
      var card = document.createElement("button");
      card.className = "category-card";
      card.type = "button";

      var h2 = document.createElement("h2");
      h2.textContent = category.name;

      var arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "\u2197\uFE0E";

      card.appendChild(h2);
      card.appendChild(arrow);

      card.addEventListener("click", function () {
        openCategory(category);
      });

      categoryGrid.appendChild(card);
    });
  }

  function openCategory(category) {
    if (categoryTitle) {
      categoryTitle.textContent = category.name;
    }

    renderGrid(category.id);

    if (homeView) homeView.hidden = true;
    if (categoryView) categoryView.hidden = false;

    window.scrollTo(0, 0);
  }

  function goHome() {
    if (categoryView) categoryView.hidden = true;
    if (homeView) homeView.hidden = false;

    window.scrollTo(0, 0);
  }

  if (backBtn) {
    backBtn.addEventListener("click", goHome);
  }

  function renderGrid(categoryId) {
    if (!grid) return;

    grid.innerHTML = "";

    var list = categoryId
      ? products.filter(function (product) {
          return product.category === categoryId;
        })
      : products;

    if (!list.length) {
      var empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML =
        "<strong>Noch keine Produkte</strong>" +
        "Neue Produkte werden in products.js eingetragen.";
      grid.appendChild(empty);
      return;
    }

    list.forEach(function (product) {
      var card = document.createElement("button");
      card.className = "product-card";
      card.type = "button";
      card.setAttribute("aria-haspopup", "dialog");

      var cardImages = getImages(product);
      if (cardImages.length) {
        var image = document.createElement("img");
        image.className = "product-card-image";
        image.src = cardImages[0];
        image.alt = product.name;
        image.loading = "lazy";
        card.appendChild(image);
      }

      var info = document.createElement("div");
      info.className = "card-info";

      var h2 = document.createElement("h2");
      h2.className = "card-title";
      h2.textContent = product.name;
      info.appendChild(h2);

      var price = document.createElement("p");
      price.className = "card-price";
      price.textContent = product.price || "";
      info.appendChild(price);

      var cta = document.createElement("span");
      cta.className = "card-cta";
      cta.textContent = "Shop now";
      info.appendChild(cta);

      card.appendChild(info);

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

    var images = getImages(product);

    if (images.length === 1) {
      html +=
        '<img class="product-image" src="' +
        escapeHtml(images[0]) +
        '" alt="' +
        escapeHtml(product.name) +
        '" />';
    } else if (images.length > 1) {
      html += '<div class="product-gallery" data-gallery data-index="0">';
      html += '<div class="product-gallery-viewport">';
      images.forEach(function (src, i) {
        html +=
          '<img class="product-image product-gallery-img' +
          (i === 0 ? " is-active" : "") +
          '" src="' +
          escapeHtml(src) +
          '" alt="' +
          escapeHtml(product.name) +
          " (" +
          (i + 1) +
          "/" +
          images.length +
          ')" />';
      });
      html += "</div>";
      html +=
        '<button type="button" class="gallery-nav gallery-prev" data-cart-action="gallery-prev" aria-label="Vorheriges Bild">\u2190</button>';
      html +=
        '<button type="button" class="gallery-nav gallery-next" data-cart-action="gallery-next" aria-label="Nächstes Bild">\u2192</button>';
      html += '<div class="gallery-dots">';
      images.forEach(function (_, i) {
        html +=
          '<span class="gallery-dot' + (i === 0 ? " is-active" : "") + '"></span>';
      });
      html += "</div>";
      html += "</div>";
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
        var product = findProduct(id);
        var quantity = cart[id];

        html += '<div class="cart-item">';
        html += '<div class="cart-item-info">';
        html +=
          '<span class="cart-item-name">' +
          escapeHtml(product.name) +
          "</span>";

        if (product.price) {
          html +=
            '<span class="cart-item-price">' +
            escapeHtml(product.price) +
            "</span>";
        }

        html += "</div>";
        html += '<div class="cart-item-controls">';
        html += '<div class="qty-stepper">';
        html +=
          '<button type="button" data-cart-action="dec" data-id="' +
          escapeHtml(id) +
          '" aria-label="Menge verringern">\u2212</button>';
        html += '<span class="cart-qty">' + quantity + "</span>";
        html +=
          '<button type="button" data-cart-action="inc" data-id="' +
          escapeHtml(id) +
          '" aria-label="Menge erhöhen">+</button>';
        html += "</div>";
        html +=
          '<button type="button" class="cart-remove" data-cart-action="remove" data-id="' +
          escapeHtml(id) +
          '" aria-label="Artikel entfernen">\u00d7</button>';
        html += "</div>";
        html += "</div>";
      });

      html += "</div>";
      html += '<div class="cart-checkout">';
      html +=
        '<p class="cart-checkout-note">' +
        "Der Kauf läuft über unseren Etsy-Shop. " +
        "Öffne die Artikel dort einzeln zum Bezahlen:" +
        "</p>";

      ids.forEach(function (id) {
        var product = findProduct(id);

        if (product.etsyUrl) {
          html +=
            '<a class="cart-etsy-link" href="' +
            escapeHtml(product.etsyUrl) +
            '" target="_blank" rel="noopener">' +
            escapeHtml(product.name) +
            " bei Etsy kaufen \u2197\uFE0E</a>";
        } else {
          html +=
            '<span class="cart-etsy-link cart-etsy-link--disabled">' +
            escapeHtml(product.name) +
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

  function escapeHtml(value) {
    var div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  panelContent.addEventListener("click", function (event) {
    var button = event.target.closest("[data-cart-action]");
    if (!button) return;

    var action = button.getAttribute("data-cart-action");
    var id = button.getAttribute("data-id");

    if (action === "gallery-prev" || action === "gallery-next") {
      var galleryEl = btn.closest("[data-gallery]");
      if (!galleryEl) return;
      var imgs = galleryEl.querySelectorAll(".product-gallery-img");
      var dots = galleryEl.querySelectorAll(".gallery-dot");
      var current = parseInt(galleryEl.getAttribute("data-index"), 10) || 0;
      var next =
        action === "gallery-next"
          ? (current + 1) % imgs.length
          : (current - 1 + imgs.length) % imgs.length;

      imgs[current].classList.remove("is-active");
      imgs[next].classList.add("is-active");
      if (dots[current]) dots[current].classList.remove("is-active");
      if (dots[next]) dots[next].classList.add("is-active");
      galleryEl.setAttribute("data-index", next);
      return;
    }

    if (action === "add-to-cart") {
      cart[id] = (cart[id] || 0) + 1;
      saveCart();
      updateCartBadge();

      var originalText = button.textContent;
      button.textContent = "Hinzugefügt ✓";
      button.disabled = true;

      setTimeout(function () {
        button.textContent = originalText;
        button.disabled = false;
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

      if (cart[id] <= 0) {
        delete cart[id];
      }

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
    }
  });

  if (cartToggle) {
    cartToggle.addEventListener("click", openCart);
  }

  closeBtn.addEventListener("click", closePanel);

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closePanel();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !overlay.hidden) {
      closePanel();
    }
  });

  renderCategories();
})();
