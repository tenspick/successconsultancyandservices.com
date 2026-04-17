(() => {
  const host = document.getElementById("siteHeader");
  if (!host) return;

  const path = window.location.pathname;
  const page = path.endsWith("/") || path === "" ? "/" : path.split("/").pop().replace(".html", "").toLowerCase();

  const navItems = [
    { href: "index.html", label: "Home", active: page === "/" || page === "index" },
    {
      href: "services.html",
      label: "Services",
      active: page === "services" || page.startsWith("services-"),
      children: [
        { href: "services.html", label: "All Services", active: page === "services" },
        { href: "services-training.html", label: "Training Programs", active: page === "services-training" },
        { href: "services-placement.html", label: "Placement Assistance", active: page === "services-placement" },
        { href: "services-guidance.html", label: "Career Guidance", active: page === "services-guidance" }
      ]
    },
    {
      href: "courses.html",
      label: "Courses",
      active: page === "courses" || page.startsWith("course-"),
      children: [
        { href: "courses.html", label: "All Courses", active: page === "courses" },
        { href: "course-programming.html", label: "Programming", active: page === "course-programming" },
        { href: "course-web.html", label: "Web Development", active: page === "course-web" },
        { href: "course-fullstack.html", label: "Full Stack", active: page === "course-fullstack" },
        { href: "course-data.html", label: "Data Science & AI", active: page === "course-data" },
        { href: "course-cloud.html", label: "Cloud Computing", active: page === "course-cloud" },
        { href: "course-security.html", label: "Cyber Security", active: page === "course-security" },
        { href: "course-testing.html", label: "Software Testing", active: page === "course-testing" }
      ]
    },
    { href: "about.html", label: "About", active: page === "about" },
    { href: "contact.html", label: "Contact", active: page === "contact" }
  ];

  // Desktop Item Renderer
  const renderDesktopItem = (item) => {
    const linkClass = item.active
      ? "bg-blue-700 text-white shadow-md"
      : "text-slate-700 hover:bg-blue-50 hover:text-blue-700";

    if (!item.children) {
      return `<li><a class="inline-flex rounded-full px-4 py-2 text-sm font-bold transition-all ${linkClass}" href="${item.href}">${item.label}</a></li>`;
    }

    const children = item.children
      .map(child => `
        <a class="block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${child.active ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-blue-50"}" href="${child.href}">
          ${child.label}
        </a>`).join("");

    return `
      <li class="group relative">
        <a class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all ${linkClass}" href="${item.href}">
          <span>${item.label}</span>
          <i class="fa-solid fa-angle-down text-[10px] transition-transform group-hover:rotate-180"></i>
        </a>
        <div class="invisible absolute left-0 top-full z-[110] pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <div class="min-w-[220px] rounded-2xl border border-blue-100 bg-white p-2 shadow-2xl">
            ${children}
          </div>
        </div>
      </li>`;
  };

  // ✅ UPDATED MOBILE DROPDOWN
  const renderMobileItem = (item, index) => {
    const isActive = item.active;
    const baseClass = isActive ? "bg-blue-700 text-white" : "bg-white text-slate-900 border-slate-200";

    if (!item.children) {
      return `
        <li>
          <a href="${item.href}" class="mobile-link block w-full rounded-2xl border p-4 text-base font-bold shadow-sm transition-active active:scale-[0.98] ${baseClass}">
            ${item.label}
          </a>
        </li>`;
    }

    const children = item.children
      .map(child => `
        <a href="${child.href}" class="mobile-link block rounded-xl px-4 py-3 text-sm font-bold transition-colors ${child.active ? "bg-blue-100 text-blue-800" : "text-slate-600 active:bg-blue-50"}">
          ${child.label}
        </a>`).join("");

    return `
      <li class="space-y-3">

        <button data-dropdown="dropdown-${index}" 
          class="dropdown-btn flex justify-between items-center w-full rounded-2xl border p-4 text-base font-bold shadow-sm ${baseClass}">
          <span>${item.label}</span>
          <i class="fa-solid fa-angle-down text-sm transition-transform"></i>
        </button>

        <div id="dropdown-${index}" class="hidden ml-4 flex flex-col border-l-2 border-blue-200 pl-4 space-y-1">
          ${children}
        </div>

      </li>`;
  };

  host.innerHTML = `
    <header class="fixed top-0 left-0 right-0 z-[100] border-b border-blue-100 bg-white/90 shadow-sm backdrop-blur-md">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="index.html" class="flex items-center gap-3">
          <img src="logo.jpg" alt="Logo" class="h-10 w-10 rounded-lg object-cover ring-2 ring-blue-50" />
          <div class="block">
            <p class="text-sm font-black leading-none text-blue-700 sm:text-base">Success Consultancy & Services</p>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Training & Placement</p>
          </div>
        </a>

        <ul class="hidden items-center gap-1 md:flex">
          ${navItems.map(renderDesktopItem).join("")}
        </ul>

        <button id="menuBtn" class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors hover:bg-blue-100 md:hidden">
          <i class="fa-solid fa-bars-staggered text-xl"></i>
        </button>
      </nav>
    </header>

    <div id="navOverlay" class="fixed inset-0 z-[150] invisible md:hidden">
      <div id="menuBackdrop" class="absolute inset-0 bg-slate-900/60 opacity-0 transition-opacity duration-300 backdrop-blur-sm"></div>
      
      <aside id="sideDrawer" class="absolute inset-y-0 right-0 w-full max-w-[320px] translate-x-full bg-slate-50 shadow-2xl transition-transform duration-300 ease-out">
        <div class="flex h-full flex-col">
          <div class="flex items-center justify-between border-b bg-white px-6 py-4">
            <div class="flex items-center gap-2">
              <img src="logo.jpg" class="h-8 w-8 rounded-md object-cover" />
              <span class="text-sm font-black uppercase tracking-widest text-blue-700">Success Consultancy & Services</span>
            </div>
            <button id="closeBtn" class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
          
          <div class="flex-1 overflow-y-auto p-6">
            <ul class="space-y-6">
              ${navItems.map((item, i) => renderMobileItem(item, i)).join("")}
            </ul>
          </div>

          <div class="border-t bg-white p-6">
             <a href="tel:9866634443" class="flex items-center justify-center gap-3 w-full rounded-2xl bg-blue-700 py-4 font-bold text-white">
                <i class="fa-solid fa-phone-volume"></i>
                <span>Call 9866634443</span>
             </a>
          </div>
        </div>
      </aside>
    </div>

    <div class="h-[65px] md:h-[73px]"></div>
  `;

  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const navOverlay = document.getElementById("navOverlay");
  const backdrop = document.getElementById("menuBackdrop");
  const drawer = document.getElementById("sideDrawer");

  const openMenu = () => {
    navOverlay.classList.remove("invisible");
    requestAnimationFrame(() => {
      backdrop.classList.add("opacity-100");
      drawer.classList.remove("translate-x-full");
    });
  };

  const closeMenu = () => {
    backdrop.classList.remove("opacity-100");
    drawer.classList.add("translate-x-full");
    setTimeout(() => navOverlay.classList.add("invisible"), 300);
  };

  menuBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);

  // DROPDOWN LOGIC
  document.querySelectorAll(".dropdown-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.dropdown);
      const icon = btn.querySelector("i");

      target.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    });
  });

})();
