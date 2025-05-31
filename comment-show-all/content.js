console.log("Auto Comment Sorter: script loaded");

let processedDropdowns = new WeakSet();

function clickDropdownsInView() {
  const dropdownButtons = [...document.querySelectorAll('div[role="button"]')];

  dropdownButtons.forEach(btn => {
    if (
      btn.innerText.includes("Most relevant") &&
      !processedDropdowns.has(btn)
    ) {
      console.log("Auto Comment Sorter: Clicking 'Most Relevant'");
      btn.click();
      processedDropdowns.add(btn);

      setTimeout(() => {
        const options = [...document.querySelectorAll('span')];
        for (const option of options) {
          if (option.innerText.includes("All comments")) {
            console.log("Auto Comment Sorter: Clicking 'All comments'");
            option.click();
            break;
          }
        }
      }, 500);
    }
  });
}

// Run once on load
clickDropdownsInView();

// Keep watching for dynamic modals or new comment sections
const observer = new MutationObserver(() => {
  clickDropdownsInView();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
