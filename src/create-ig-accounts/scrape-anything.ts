import puppeteer from 'puppeteer';
import { generateRandomFullName } from './names';

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

          if (eventType === 'select') {
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

  for (let i = 0; i < config.events.length; i++) {
    const event = config.events[i];
    const eventType = event.type;
    const value = event.value;
    const textTarget = event.textTarget;
    await delay(1500);

    // Check for captchas and clouflare verifications and solve first if they exist
    // I have no solution at moment for cloudflare, but for captchas we can use 2captchas
    // Let's make it simple and focus on sites with no anti bot verifications.
    await identifyAndSolveCaptcha(page);

    if (eventType === eventTypes.CLICK) {
      const selector = await getSelectorByText(page, textTarget, eventType, null);
      await click(page, selector);
      await delay(1500); // wait extra when click
    } else if (eventType === eventTypes.INPUT) {
      const selector = await getSelectorByText(page, textTarget, eventType, null);
      await input(page, selector, value);
    } else if (eventType === eventTypes.SELECT) {
      console.log('eventType');
      console.log(eventType);
      console.log(value);
      const selector = await getSelectorByText(page, null, eventType, value);
      await select(page, selector, value);
    }
  }
  
  // Close the browser
  await browser.close();
}

const eventTypes = {
  CLICK: 'click',
  INPUT: 'input',
  SELECT: 'select',
}

const generateFullName = () => {
  return 'Janne Jansson';
};

const generateUserName = () => {
  return 'Janne.Jansson.0999_jannie';
};

const getMail = async (name: string) => {
  // get domain mail from temp API
  return `${name.split(' ').join('.')}@mail.com`;
};

const instagramSignUp = async ({ mail, name }: any) => {
  return {
    url: 'https://www.instagram.com/accounts/emailsignup/',
    events: [
      {
        type: eventTypes.CLICK,
        textTarget: 'Allow all cookies',
      },
      {
        type: eventTypes.INPUT,
        textTarget: 'Mobile number or email address',
        value: mail,
      },
      {
        type: eventTypes.INPUT,
        textTarget: 'Full Name',
        value: name,
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'Refresh Suggestion',
      },
      {
        type: eventTypes.INPUT,
        textTarget: 'Password',
        value: 'hejsan'
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'Next',
      },
      {
        type: eventTypes.SELECT,
        value: 'August'
      },
      {
        type: eventTypes.SELECT,
        value: '1'
      },
      {
        type: eventTypes.SELECT,
        value: '2000'
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'Next',
      },
    ],
  };
}

const tempMail = {
  url: 'https://temp-mail.org/en/',
  events: [],
}

const delay = (time: number) => {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

const start = async () => {
  const name = generateRandomFullName();
  const mail = await getMail(name);
  const config = await instagramSignUp({
    name,
    mail
  });
  scrape(config);
}

start();
