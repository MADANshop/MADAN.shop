(function () {
  "use strict";

  var products = window.PRODUCTS || [];
  var params = new URLSearchParams(window.location.search);
  var productId = params.get("id");

  var product = products.find(function (item) {
    return item.id === productId;
  });

  var content = document.getElementById("product-content");
  var notFound = document.getElementById("product-not-found");

  if (!product) {
    content.hidden = true;
    notFound.hidden = false;
    return;
  }

  var categoryNames = {
    kabelmanagement: "Kabelmanagement",
    merch: "Merch",
    sonstiges: "Sonstiges",
  };

  document.title = product.name + " — MADAN";
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-category").textContent =
    categoryNames[product.category] || "MADAN";
  document.getElementById("product-description").textContent =
    product.description || "";

  var priceElement = document.getElementById("product-price");

  if (product.price) {
    priceElement.textContent = product.price;
    priceElement.hidden = false;
  }

  var gallery = document.getElementById("product-gallery");
  var galleryStage = document.getElementById("gallery-stage");
  var imageElement = document.getElementById("product-image");
  var previousButton = document.getElementById("gallery-prev");
  var nextButton = document.getElementById("gallery-next");
  var counter = document.getElementById("gallery-counter");
  var dotsContainer = document.getElementById("gallery-dots");

  var images = Array.isArray(product.images)
    ? product.images.filter(function (src) {
        return typeof src === "string" && src.trim() !== "";
      })
    : [];

  if (!images.length && product.image) {
    images = [product.image];
  }

  var currentImage = 0;
  var dots = [];

  function showImage(index) {
    if (!images.length) return;

    currentImage = (index + images.length) % images.length;

    imageElement.src = images[currentImage];
    imageElement.alt =
      product.name + " – Produktfoto " + (currentImage + 1);

    counter.textContent = (currentImage + 1) + " / " + images.length;

    previousButton.hidden = images.length < 2;
    nextButton.hidden = images.length < 2;
    dotsContainer.hidden = images.length < 2;

    dots.forEach(function (dot, dotIndex) {
      var isCurrent = dotIndex === currentImage;
      dot.classList.toggle("is-active", isCurrent);
      dot.setAttribute("aria-current", isCurrent ? "true" : "false");
    });
  }

  if (images.length) {
    gallery.hidden = false;

    images.forEach(function (_, index) {
      var dot = document.createElement("button");
      dot.className = "product-gallery-dot";
      dot.type = "button";
      dot.setAttribute(
        "aria-label",
        "Produktbild " + (index + 1) + " anzeigen"
      );

      dot.addEventListener("click", function () {
        showImage(index);
      });

      dots.push(dot);
      dotsContainer.appendChild(dot);
    });

    showImage(0);
  }

  previousButton.addEventListener("click", function () {
    showImage(currentImage - 1);
  });

  nextButton.addEventListener("click", function () {
    showImage(currentImage + 1);
  });

  galleryStage.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showImage(currentImage - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showImage(currentImage + 1);
    }
  });

  var touchStartX = null;

  galleryStage.addEventListener(
    "touchstart",
    function (event) {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  galleryStage.addEventListener(
    "touchend",
    function (event) {
      if (touchStartX === null || images.length < 2) return;

      var distance = event.changedTouches[0].clientX - touchStartX;
      touchStartX = null;

      if (distance > 40) {
        showImage(currentImage + 1);
      } else if (distance < -40) {
        showImage(currentImage - 1);
      }
    },
    { passive: true }
  );

  imageElement.addEventListener(
    "error",
    function () {
      gallery.hidden = true;
    },
    { once: true }
  );

  var cart = {};

  try {
    cart = JSON.parse(localStorage.getItem("madanCart") || "{}");
  } catch (error) {
    cart = {};
  }

  var cartCountElement = document.getElementById("cart-count");

  function updateCartBadge() {
    var count = 0;

    Object.keys(cart).forEach(function (id) {
      count += Number(cart[id]) || 0;
    });

    if (count > 0) {
      cartCountElement.textContent = count;
      cartCountElement.hidden = false;
    } else {
      cartCountElement.hidden = true;
    }
  }

  updateCartBadge();

  var addToCartButton = document.getElementById("product-add-to-cart");

  addToCartButton.addEventListener("click", function () {
    cart[product.id] = (Number(cart[product.id]) || 0) + 1;

    try {
      localStorage.setItem("madanCart", JSON.stringify(cart));
    } catch (error) {
      // Der Warenkorb bleibt erhalten, solange diese Seite geöffnet ist.
    }

    updateCartBadge();

    var originalText = addToCartButton.textContent;
    addToCartButton.textContent = "Hinzugefügt ✓";
    addToCartButton.disabled = true;

    window.setTimeout(function () {
      addToCartButton.textContent = originalText;
      addToCartButton.disabled = false;
    }, 1200);
  });

  var etsyLink = document.getElementById("product-etsy-link");

  if (product.etsyUrl) {
    try {
      var parsedUrl = new URL(product.etsyUrl);
      var isEtsy =
        parsedUrl.protocol === "https:" &&
        (parsedUrl.hostname === "etsy.com" ||
          parsedUrl.hostname.endsWith(".etsy.com"));

      if (isEtsy) {
        etsyLink.href = parsedUrl.href;
        etsyLink.hidden = false;
      }
    } catch (error) {
      etsyLink.hidden = true;
    }
  }

  var yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();
