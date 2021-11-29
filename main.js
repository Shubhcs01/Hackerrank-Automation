const puppeteer = require("puppeteer");
const codeObj = require("./code");

const url = "https://www.hackerrank.com/auth/login";
const email = "lenaxof588@luxiu2.com";
const password = "automate";

console.log("before");

(async function (){
  try {
    //launch
    let browserContext = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    })

    let newTab = browserContext.newPage();
    await (await newTab).goto(url)
    await (await newTab).type(`input[type="text"]`, email, {delay:50})
    await (await newTab).type(`input[type="password"]`, password,  {delay:50})
    await (await newTab).click(`button[data-analytics="LoginPassword"]`)
    await waitAndClick(`a[data-attr1="algorithms"]`, newTab)
    await waitAndClick(`input[value="warmup"]`, newTab)
    await (await newTab).waitForTimeout(5000)
    let questionsArr = await (await newTab).$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    ); //$$->shorthand for document.querySelectorAll()
    // console.log(questionsArr.length);
    questionSolver((await newTab), questionsArr[0], codeObj.answers[0]);
    
  } catch (err) {
    console.log(err);
  }
})();

console.log("after");

async function waitAndClick(selector, cpage) {
  await (await cpage).waitForSelector(selector, { visibility: true });
  return (await cpage).click(selector);
}

async function questionSolver(page, question, answer){
  try{
    await question.click();
    await waitAndClick(".hr-monaco-base-editor.showUnused",page);
    await waitAndClick(`input[type="checkbox"]`, page);
    await (await page).waitForSelector(".text-area.custominput", page);
    await (await page).type(".text-area.custominput", answer, { delay: 10 });
    await (await page).keyboard.down("Control");
    await (await page).keyboard.press("A", { delay: 100 });
    await (await page).keyboard.press("X", { delay: 100 });
    await (await page).keyboard.up("Control");
    await (await page).click(`input[id="select-language-input"]`);
    await (await page).type( `input[id="select-language-input"]`, "java 8");
    await (await page).keyboard.press("Enter");
    await waitAndClick( ".hr-monaco-base-editor.showUnused",page);
    await (await page).keyboard.down("Control");
    await (await page).keyboard.press("A", { delay: 100 });  
    await (await page).keyboard.press("V", { delay: 100 });
    await (await page).keyboard.up("Control");
    return (await page).click(".hr-monaco-submit");

  } catch(err){
    console.log(err);
  }
}
