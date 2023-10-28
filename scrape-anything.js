import puppeteer from 'puppeteer';

const initBrowser = async (url) => {
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

const getSelectorByText = async (page, targetText, eventType, value) => {
  const result = await page.evaluate(({ targetText, eventType, value }) => {
    const start = (targetText) => {
      const getCssSelector = (el) => {
        let path = [], parent;
        while (parent = el.parentNode) {
          path.unshift(`${el.tagName}:nth-child(${[].indexOf.call(parent.children, el)+1})`);
          el = parent;
        }
        return `${path.join(' > ')}`.toLowerCase();
      };
      
      const elements = document.getElementsByTagName('*');
      for (let i = 0; i < elements.length; i++) {
          const element = elements[i];

          const getIsElMatch = (el, _targetText) => {
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
              const selectParent = optionParents[k];
              const options = selectParent.querySelectorAll('option');
              for (let j = 0; j < options.length; j++) {
                const option = options[j];
                const elMatch = getIsElMatch(option, value);
                if (elMatch) {
                  selectParent.style.color = 'red';
                  return getCssSelector(selectParent);
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

const input = async (page, selector, text) => {
  await page.type(selector, text, {delay: 50});
};

const select = async (page, selector, text) => {
  await page.select(selector, text);
};

const click = async (page, selector) => {
  await page.click(selector);
};

const scrape = async (config) => {
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

    if (eventType === 'click') {
      const selector = await getSelectorByText(page, textTarget, eventType);
      await click(page, selector);
      await delay(1500); // wait extra when click
    } else if (eventType === 'input') {
      const selector = await getSelectorByText(page, textTarget, eventType);
      await input(page, selector, value);
    } else if (eventType === 'select') {
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
  // define events here.  
}

const instagramSignUp = {
  url: 'https://www.instagram.com/accounts/emailsignup/',
  events: [
    {
      type: 'click',
      textTarget: 'Allow all cookies',
    },
    {
      type: 'input',
      textTarget: 'Mobile number or email address',
      value: 'janne.jan12329_hej@mail.com'
    },
    {
      type: 'input',
      textTarget: 'Full Name',
      value: 'Janne Jansson'
    },
    {
      type: 'input',
      textTarget: 'Username',
      value: 'Janne.Jansson.0999_jannie'
    },
    {
      type: 'input',
      textTarget: 'Password',
      value: 'hejsan'
    },
    {
      type: 'click',
      textTarget: 'Next',
    },
    {
      type: 'select',
      value: 'August'
    },
    {
      type: 'select',
      value: '1'
    },
    {
      type: 'select',
      value: '2000'
    },
    {
      type: 'click',
      textTarget: 'Next',
    },
  ],
}

const tempMail = {
  url: 'https://temp-mail.org/en/',
  events: [],
}

const sas = {
  url: 'https://www.sas.se/',
  events: [],
}

const delay = (time) => {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

scrape(sas);
