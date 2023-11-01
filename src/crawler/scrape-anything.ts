import puppeteer from 'puppeteer';
import getConfig from './message-all-ig-followers';

const initBrowser = async (url: any) => {
  const puppeteerOptions = {
    devtools: true, // false for headless
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ],
    slowMo: 10,
    defaultViewport: null,
    executablePath: '/opt/homebrew/bin/chromium',
  }
  const browser = await puppeteer.launch(puppeteerOptions);
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');

  await page.goto(url);
  return {
    browser,
    page
  };
};

const getSelectorByText = async (page: any, targetText: any, eventType: any, value: any) => {
  const result = await page.evaluate(({ targetText, eventType, value }: any) => {
    const start = (targetText: any) => {
      const getCssSelector = (el: any) => {
        let path: any = [];
        let parent: any = null;
        while (parent = el.parentNode) {
          path.unshift(`${el.tagName}:nth-child(${[].indexOf.call(parent.children, el as never)+1})`);
          el = parent;
        }
        return `${path.join(' > ')}`.toLowerCase();
      };
      
      const elements = document.getElementsByTagName('*');
      for (let i = 0; i < elements.length; i++) {
          const element: any = elements[i];

          const getIsElMatch = (el: any, _targetText: any) => {
            // const elValue = el.value;
            const elPlaceholder = el.placeholder;
            const elAriaLabel = el.getAttribute('aria-label');
            const labelAttr = el.getAttribute('label');
            const label = el.label;
            const elContent = el.textContent;
            const innerHTML = el.innerHTML;
            const innerText = el.innerHTML;
            const title = el.title;
            const result = elContent === _targetText
            || elPlaceholder === _targetText
            || elAriaLabel === _targetText
            || labelAttr === _targetText
            || label === _targetText
            || innerHTML === _targetText
            || innerText === _targetText
            || title === _targetText;
            return result;
          }

          // If isInputField it should only match input fields
          if (eventType === 'input' && element.tagName !== 'INPUT') {
            continue;
          }
          if (eventType === 'select' && element.tagName !== 'SELECT') {
            continue;
          }

          if (eventType === 'select' && element.tagName === 'SELECT') {
            const optionParents = document.querySelectorAll('select');
            for (let k = 0; k < optionParents.length; k++) {
              const selectParent: any = optionParents[k];
              const options = selectParent.querySelectorAll('option');
              for (let j = 0; j < options.length; j++) {
                const option = options[j];
                const elMatch = getIsElMatch(option, value);
                if (elMatch) {
                  selectParent.style.color = 'red';
                  return getCssSelector(selectParent as any);
                }
              }
            }
          }

        const isElMatch = getIsElMatch(element, targetText);
  
        if (isElMatch) {
            element.style.color = 'red'; // just to see something
            return getCssSelector(element);
        }
      }
    }
    return start(targetText);
  }, {
    targetText,
    eventType,
    value
  })

  console.log('result:');
  console.log(result);
  return result;
}

const input = async (page: any, selector: any, text: any) => {
  await page.type(selector, text, {delay: 50});
};

const select = async (page: any, selector: any, text: any) => {
  await page.select(selector, text);
};

const click = async (page: any, selector: any) => {
  await page.click(selector);
};

const identifyAndSolveCaptcha = async (page: any) => {
  return null;
}

const scrape = async (config: any) => {
  console.log('config.url:');
  console.log(config.url);
  const { browser, page } = await initBrowser(config.url);
  await page.waitForSelector('body');

  const res = await loopConfigEvents(config.events, page);
  if (res?.newEvents) {
    // await loopConfigEvents(res?.newEvents, page);
  }
  
  // Close the browser
  if (!config.browserStayOpen) {
    await browser.close();
  }
}

const loopConfigEvents = async (events: any, page: any) => {
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const eventType = event.type;
    const value = event.value;
    const textTarget = event.textTarget;
    await delay(1500);

    // Check for captchas and clouflare verifications and solve first if they exist
    // I have no solution at moment for cloudflare, but for captchas we can use 2captchas
    // Let's make it simple and focus on sites with no anti bot verifications.
    await identifyAndSolveCaptcha(page);

    console.log(`eventType: ${eventType}`);
    if (eventType === eventTypes.CLICK) {
      const selector = await getSelectorByText(page, textTarget, eventType, null);
      if (selector) {
        await click(page, selector);
        await delay(2000); // wait extra when click
      }
    } else if (eventType === eventTypes.INPUT) {
      const selector = await getSelectorByText(page, textTarget, eventType, null);
      if (selector) {
        await input(page, selector, value);
      }
    } else if (eventType === eventTypes.SELECT) {
      const selector = await getSelectorByText(page, null, eventType, value);
      if (selector) {
        await select(page, selector, value);
      }
    } else if (eventType === eventTypes.NAVIGATION) {
      await page.goto(event.goto);
      await page.waitForSelector('body');
    } else if (eventType === eventTypes.EVALUATE) {
      await delay(1500);
      const res = await page.evaluate(event.evaluateCallback);
      console.log(res);
      if (event.eachEvaluateResEvents) {
        const newEvents = res.map((r: any) => ([ ...event.eachEvaluateResEvents(r) ])).flat();
        console.log(newEvents);
        return { newEvents };
      }
    }
    

    if (event.waitForNavigationAfterEvent) {
      await page.waitForNavigation();
    }
  }
}

export const eventTypes = {
  CLICK: 'click',
  INPUT: 'input',
  SELECT: 'select',
  NAVIGATION: 'navigation',
  EVALUATE: 'evaluate'
}

const delay = (time: number) => {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

const start = async () => {
  const config = await getConfig();
  scrape(config);
}

start();
