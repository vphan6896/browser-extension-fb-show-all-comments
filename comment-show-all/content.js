console.log("Auto Comment Sorter: script loaded");

let hasClicked = false;

function tryClickCommentsDropdown(observer) {
  if (hasClicked) return;

  const dropdownButtons = [...document.querySelectorAll('div[role="button"]')];

  for (const btn of dropdownButtons) {
    if (btn.innerText.includes("Most relevant")) {
      console.log("Auto Comment Sorter: Found 'Most Relevant', clicking...");
      btn.click();
      hasClicked = true;

      setTimeout(() => {
        const options = [...document.querySelectorAll('span')];
        for (const option of options) {
          if (option.innerText.includes("All comments")) {
            console.log("Auto Comment Sorter: Found 'All comments', clicking...");
            option.click();
            break;
          }
        }
      }, 1000);

      if (observer) observer.disconnect();
      break;
    }
  }
}

// Try immediately in case it's already loaded
tryClickCommentsDropdown();

// Set up MutationObserver in case it's loaded later
const observer = new MutationObserver(() => tryClickCommentsDropdown(observer));
observer.observe(document.body, { childList: true, subtree: true });
