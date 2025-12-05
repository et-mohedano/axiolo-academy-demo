// Program + article switching logic

document.addEventListener("DOMContentLoaded", function () {
  const programTabs = document.querySelectorAll("[data-program-tab]");
  const programPanels = document.querySelectorAll(".program-panel");

  function setProgram(programKey) {
    // Activate tab
    programTabs.forEach((tab) => {
      if (tab.getAttribute("data-program-tab") === programKey) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    // Show correct program panel
    programPanels.forEach((panel) => {
      if (panel.id === "program-" + programKey) {
        panel.classList.remove("d-none");

        // Reset article state inside this panel:
        const navItems = panel.querySelectorAll(".article-nav-item");
        const articles = panel.querySelectorAll(".article-detail");

        // Hide all article cards
        articles.forEach((a) => a.classList.add("d-none"));
        // Remove active from all nav items
        navItems.forEach((n) => n.classList.remove("active"));

        // Activate first article in this program
        if (navItems.length > 0) {
          const firstNav = navItems[0];
          const firstTargetId = firstNav.getAttribute("data-article-target");
          const firstArticle = panel.querySelector("#" + firstTargetId);

          firstNav.classList.add("active");
          if (firstArticle) {
            firstArticle.classList.remove("d-none");
          }
        }
      } else {
        panel.classList.add("d-none");
      }
    });
  }

  // Attach click handlers to program tabs
  programTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const programKey = tab.getAttribute("data-program-tab");
      setProgram(programKey);
    });
  });

  // Attach click handlers to article nav items (scoped per program)
  const allArticleNavItems = document.querySelectorAll(".article-nav-item");

  allArticleNavItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const navItem = event.currentTarget;
      const targetId = navItem.getAttribute("data-article-target");
      const panel = navItem.closest(".program-panel");

      if (!panel || !targetId) return;

      const navItems = panel.querySelectorAll(".article-nav-item");
      const articles = panel.querySelectorAll(".article-detail");

      navItems.forEach((n) => n.classList.remove("active"));
      navItem.classList.add("active");

      articles.forEach((a) => a.classList.add("d-none"));
      const article = panel.querySelector("#" + targetId);
      if (article) {
        article.classList.remove("d-none");

        // On mobile, scroll the article into view
        if (window.innerWidth < 992) {
          article.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Initial state: Program 1 (seo)
  setProgram("seo");
});
