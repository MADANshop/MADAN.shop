(function () {
  "use strict";
 
  var products = window.PRODUCTS || [];
  var grid = document.getElementById("product-grid");
  var overlay = document.getElementById("overlay");
  var panelContent = document.getElementById("panel-content");
  var closeBtn = document.getElementById("close-btn");
  var yearEl = document.getElementById("year");
 
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
 
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
 
  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
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
