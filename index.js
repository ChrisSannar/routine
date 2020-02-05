let routineList = [];
let currentIndex = -1;

// Gets the routine list from storage
async function getRoutine() {
  routineList = (await browser.storage.local.get()).pages;
}
getRoutine();

// Navigates the page to a link
function goToRoutine(page) {
  if (page) {
    browser.tabs.update({url: page});
  }
}

// Sets all the key commands for navigation
browser.commands.onCommand.addListener(function (command) {
  if (command === `next_page`) {
    currentIndex = (currentIndex + 1) % routineList.length;
    goToRoutine(routineList[currentIndex]);
  }
  else if (command === `prev_page`) {
    if (currentIndex - 1 < 0) {
      currentIndex = routineList.length - 1;
    } else {
      currentIndex--;
    }
    goToRoutine(routineList[currentIndex]);
  }
  else if (command == `reset`) {
    currentIndex = 0;
    goToRoutine(routineList[currentIndex]);
  }
});