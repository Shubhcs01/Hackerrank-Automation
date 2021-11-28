const puppeteer = require("puppeteer");
const codeObj = require("./code");

const url = "https://www.hackerrank.com/auth/login";
const email = "lenaxof588@luxiu2.com";
const password = "automate";
let page;
console.log("before");
//launch
const browserPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});

browserPromise
  .then(function (browserContext) {
    page = browserContext.newPage();
    return page;
  })
  .then(function (newTab) {
    page = newTab;
    let gotoPromise = page.goto(url);
    return gotoPromise;
  })
  .then(function () {
    let emailType = page.type(`input[type="text"]`, email);
    return emailType;
  })
  .then(function () {
    let passwordType = page.type(`input[type="password"]`, password);
    return passwordType;
  })
  .then(function () {
    let signInClick = page.click(`button[data-analytics="LoginPassword"]`);
    return signInClick;
  })
  .then(function () {
    let topicPromise = waitAndClick(`a[data-attr1="algorithms"]`, page);
    return topicPromise;
  })
  .then(function () {
    let checkBox = waitAndClick(`input[value="warmup"]`, page);
    return checkBox;
  })
  .then(function () {
    let waitFor5sec = page.waitForTimeout(5000);
    return waitFor5sec;
  })
  .then(function () {
    let allChallengesPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    ); //$$->shorthand for document.querySelectorAll()
    return allChallengesPromise;
  })
  .then(function (questionsArr) {
    // console.log(questionsArr.length);
    let questionSolved = questionSolver(
      page,
      questionsArr[0],
      codeObj.answers[0],
    );
    return questionSolved;
  })
  .catch(function (err) {
    console.log(err);
  });

console.log("after");

function waitAndClick(selector, cpage) {
  // wait for selector to load
  return new Promise(function (resolve, reject) {
    let elementWaitPromise = cpage.waitForSelector(selector, {
      visibility: true,
    });
    elementWaitPromise
      .then(function () {
        let mouseClick = cpage.click(selector);
        return mouseClick;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}

function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let eachQuestionPromise = question.click();
    eachQuestionPromise
      .then(function () {
        let editorInFocus = waitAndClick(
          ".hr-monaco-base-editor.showUnused",
          page
        );
        return editorInFocus;
      })
      .then(function () {
        let checkbox = waitAndClick(`input[type="checkbox"]`, page);
        return checkbox;
      })
      .then(function () {
        return page.waitForSelector(".text-area.custominput", page);
      })
      .then(function () {
        return page.type(".text-area.custominput", answer, {delay:10});
      })
      .then(function () {
        let ctrlHold = page.keyboard.down("Control");
        return ctrlHold;
      })
      .then(function () {
        let AIsPressed = page.keyboard.press("A", { delay: 100 });
        return AIsPressed;
      })
      .then(function () {
        let XIsPressed = page.keyboard.press("X", { delay: 100 });
        return XIsPressed;
      })
      .then(function () {
        let ctrlRelease = page.keyboard.up("Control");
        return ctrlRelease;
      })
      .then(function () {
        let langSelectPromise = page.click(`input[id="select-language-input"]`);
       return langSelectPromise;
      }).then(function () {
        let langInputPromise = page.type(`input[id="select-language-input"]`, "java 8");
        return langInputPromise;
      }).then(function () {
        let enterPress = page.keyboard.press("Enter");
        return enterPress;
      })
      .then(function () {
        let editorInFocus = waitAndClick(
          ".hr-monaco-base-editor.showUnused",
          page
        );
        return editorInFocus;
      }).then(function () {
        let ctrlHold = page.keyboard.down("Control");
        return ctrlHold;
      }).then(function () {
        let AIsPressed = page.keyboard.press("A",{delay:100});
        return AIsPressed;
      }).then(function () {
        let VIsPressed = page.keyboard.press("V",{delay:100});
        return VIsPressed;
      }).then(function () {
        let ctrlRelease = page.keyboard.up("Control");
        return ctrlRelease;
      }).then(function () {
        let submitClick = page.click(".hr-monaco-submit");
       return submitClick;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        console.log(err);
        reject();
      });
  });
}
