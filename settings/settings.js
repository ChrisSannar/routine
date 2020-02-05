
// Takes the local storage and loads the pages to text for editing
function pagesToText(data) {
  let result = '';
  for (let i = 0; i < data.length - 1; i ++) {
    result += `${ data[i] }\n`;
  }
  result += data[data.length - 1];
  return result;
}

// Gets the data and loads it into the textbox
async function setPagesData() {
  document.querySelector('#pages').value = pagesToText((await browser.storage.local.get()).pages) || '';
}
setPagesData();

// Saves the pages/routine into local storage
function saveRoutine() {
  let pagesText = document.querySelector('#pages').value;

  if (pagesText) {
    browser.storage.local.set({ pages: pagesText.split('\n') });
  }
}
document.querySelector('#saveButton').addEventListener('click', saveRoutine);

// Shows the help menu
let toggle = false;
function helpRoutine() {
  if (toggle) {
    document.querySelector('#help').style.display = `none`;
  } else {
    document.querySelector('#help').style.display = `block`;
  }
  toggle = !toggle;
}
document.querySelector('#helpButton').addEventListener('click', helpRoutine);