// Smooth scroll active link + scrollspy-like behavior
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Progress line on navbar
  const progressLine = document.querySelector(".progress-line");
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(100, (scrollTop / docHeight) * 100);
    if (progressLine) progressLine.style.width = progress + "%";
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  // IntersectionObserver to reveal elements (AOS-like)
  const revealables = document.querySelectorAll(".reveal, .reveal-up");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealables.forEach((el) => io.observe(el));

  // Back-to-top visibility
  const backTop = document.querySelector(".back-to-top");
  const toggleBackTop = () => {
    if (!backTop) return;
    if (window.scrollY > 500) backTop.classList.add("show");
    else backTop.classList.remove("show");
  };
  toggleBackTop();
  window.addEventListener("scroll", toggleBackTop, { passive: true });

  // Portfolio filtering (Isotope-like, very light)
  const grid = document.querySelector(".portfolio-grid");
  const filters = document.querySelector("[data-filter-group]");
  if (grid && filters) {
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      filters.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const sel = btn.getAttribute("data-filter");
      grid.querySelectorAll(".grid-item").forEach((item) => {
        const show = sel === "*" || item.classList.contains(sel.slice(1));
        item.style.opacity = show ? "1" : "0";
        item.style.transform = show ? "none" : "scale(.98)";
        item.style.pointerEvents = show ? "auto" : "none";
      });
    });
  }

  // Lightbox using Bootstrap Modal
  const modalHtml = `
  <div class="modal fade" id="lightboxModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content bg-dark">
        <div class="modal-body p-0">
          <img class="img-fluid w-100" alt="Preview">
        </div>
        <button type="button" class="btn-close btn-close-white position-absolute end-0 top-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", modalHtml);
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = lightboxModal.querySelector("img");
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lightbox]");
    if (!btn) return;
    const src = btn.getAttribute("data-lightbox");
    lightboxImg.src = src;
    const modal = new bootstrap.Modal(lightboxModal);
    modal.show();
  });

  // Bootstrap form validation
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Format nomor telepon otomatis (spasi setiap 4 digit)
  const teleponInput = document.getElementById("telepon");
  teleponInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // hanya angka
    let formatted = value.match(/.{1,4}/g)?.join(" ") || "";
    e.target.value = formatted;
  });

  // Preview + tombol hapus
  function previewImage(input, previewId) {
    const preview = document.getElementById(previewId);
    preview.innerHTML = "";
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const wrapper = document.createElement("div");
        wrapper.className = "position-relative d-inline-block me-2";

        const img = document.createElement("img");
        img.src = e.target.result;
        img.className = "img-thumbnail mt-2";
        img.style.maxWidth = "200px";

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.innerHTML = "&times;";
        removeBtn.className = "btn btn-sm btn-danger position-absolute top-0 start-100 translate-middle";
        removeBtn.style.borderRadius = "50%";

        removeBtn.addEventListener("click", function () {
          input.value = ""; // reset file input
          preview.innerHTML = ""; // hapus preview
        });

        wrapper.appendChild(img);
        wrapper.appendChild(removeBtn);
        preview.appendChild(wrapper);
      };
      reader.readAsDataURL(file);
    }
  }

  // Listener untuk KTP & KTM
  document.getElementById("uploadKTP").addEventListener("change", function () {
    previewImage(this, "previewKTP");
  });
  document.getElementById("uploadKTM").addEventListener("change", function () {
    previewImage(this, "previewKTM");
  });
});
