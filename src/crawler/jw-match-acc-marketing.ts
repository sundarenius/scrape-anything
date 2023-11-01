import { eventTypes } from './scrape-anything';
import { generateRandomFullMaleName, generateRandomFullFemaleName } from './names';
import { getDomains, getEmail } from './get-emails';
import { appendToFile } from './crawl-utils';

const jwMatchAccMarketing = ({
  mail,
  pwd,
  gender: g,
  name,
  getEmailCallback,
  getMailCode,
}: any) => {
  return {
    browserStayOpen: true,
    url: 'https://www.jwmatch.com/s/',
    events: [
      {
        type: eventTypes.CLICK,
        textTarget: 'Get Started!',
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'gender',
        value: g === gender.male ? '2' : '1',
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'mGender',
        value: g === gender.male ? '1' : '2',
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'birthDateDay',
        value: '01'
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'birthDateMonth',
        value: '6'
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'birthDateYear',
        value: ['1996', '1998', '1991'][Math.floor(Math.random() * 3)],
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'country',
        value: 'us'
      },
      {
        type: eventTypes.INPUT,
        textTarget: 'E.g. DayDreamer, AgentX, etc.',
        value: `${name.split(' ')[0]}_${Math.floor(Math.random() * 10000)}`
      },
      {
        type: eventTypes.INPUT,
        selector: 'input[original-title]',
        value: 'hejsan',
      },
      {
        type: eventTypes.INPUT,
        textTarget: 'email',
        value: mail,
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'agree',
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'Create profile',
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'provinceID',
        value: '42'
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'cityID',
        value: '1847'
      },
      {
        type: eventTypes.INPUT,
        textTarget: 'firstName',
        value: name.split(' ')[0],
      },
      {
        type: eventTypes.INPUT,
        textTarget: 'surname',
        value: name.split(' ')[1],
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'Save & Continue',
      },
      {
        type: eventTypes.CALLBACK,
        ifTextTarget: 'Please confirm your email address',
        callback: async () => {
          await getEmailCallback();
        }
      },
      {
        type: eventTypes.INPUT,
        ifTextTarget: 'Please confirm your email address',
        textTarget: 'c',
        getValue: getMailCode
      },
      {
        type: eventTypes.CLICK,
        ifTextTarget: 'Please confirm your email address',
        textTarget: 'Go',
      },
      {
        type: eventTypes.CLICK,
        ifTextTarget: 'Continue',
        textTarget: 'Continue',
      },
      {
        type: eventTypes.CLICK,
        selector: 'a[id="profile_meNav"]',
      },
      {
        waitBefore: 5000,
        type: eventTypes.SELECT,
        textTarget: 'height',
        value: '175'
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'looks',
        value: '2'
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'eyes',
        value: '4'
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'relationship',
        value: '1'
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'haveKids',
        value: '1'
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'income',
        value: '7'
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'starSign',
        value: '1'
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'homeLanguage',
        value: 'en'
      },
      {
        type: eventTypes.SELECT,
        textTarget: 'ethnicity',
        value: '9'
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'Save & Continue',
      },
      {
        waitBefore: 5000,
        type: eventTypes.CLICK,
        textTarget: 'Very Attractive',
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'Attractive',
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'Single',
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'Divorced (Free to Remarry)',
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'Save & Continue',
      },
      {
        waitBefore: 5000,
        type: eventTypes.INPUT,
        textTarget: 'headline',
        value: 'Great cook wants to add a bit of spice to your life.'
      },
      {
        type: eventTypes.INPUT,
        selector: 'textarea[id=narrative]',
        value: matchText[Math.floor(Math.random() * matchText.length)],
      },
      {
        type: eventTypes.INPUT,
        selector: 'textarea[id=mNarrative]',
        value: matchText[Math.floor(Math.random() * matchText.length)],
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'Save & Continue',
      },
      {
        type: eventTypes.CLICK,
        selector: 'a[href="/s/profile/?ic=1"]',
      },
      {
        type: eventTypes.CLICK,
        selector: 'Preview My Profile',
      },
    ],
  };
}

const matchText = [
  'Visit jwdate org for free and improved JW singles only dating - Meet brothers and sisters looking for partner worldwide - This is a new site where single JW people can meet and mingle affordable without high costs - It is free and with powerful matching features. Join now!',
  'Join JWDate org, the premier destination for JW singles! Meet brothers and sisters worldwide, meaningful connections for free! Our platform offers powerful matching tools and genuine profiles, ensuring an affordable and enriching dating experience. Join us today',
  'Join Jwdate org. A new site to meet single brothers and sisters globally, free. With robust matching tools, discover your perfect match today. Embrace love without the financial burden – register for free at JWDate.org'
];

const gender = {
  male: 'male',
  female: 'female',
}
const getConfig = async (g: string) => {
  const name = g === gender.male ? generateRandomFullMaleName() : generateRandomFullFemaleName();
  const domains = await getDomains();
  const domain = domains[Math.floor(Math.random() * domains.length - 1)];
  // const domain = '@mocvn.com';
  // const domain = '@steveix.com';
  if (!domain) throw new Error('No domain');
  
  const mail = `${name.replace(' ', '.')}${domain}`.toLowerCase();
  const pwd = 'hejsan';
  console.log('mail:');
  console.log(mail);

  appendToFile(`***********************
Jwmatch.com account
mail:
${mail}
pwd: ${pwd}
Time: ${new Date()}
***********************`);

  let mailConfirmationCode: string = '';
  const getEmailCallback = async () => {
    await new Promise((resolve) => { setTimeout(() => { resolve(''); }, 5000); });
    try {
      const res: any = await getEmail(mail);
      if (res.data) {
        const find = res.data.find((r: any) => r.mail_subject.includes('One more step - please confirm your email'));
        const code = extractConfirmationCode(find.mail_text) as string;
        mailConfirmationCode = code;
        console.log('code:');
        console.log(code);
      } else {
        await getEmailCallback();
      }
    } catch (err) {
      console.log(err);
      console.log('error from getEmailCallback, trying again ...')
    }
    return null;
  };
  const getMailCode = () => {
    return mailConfirmationCode;
  }

  const configMailOne = jwMatchAccMarketing({
    mail,
    pwd,
    gender: g,
    name,
    getEmailCallback,
    getMailCode,
  });

  return configMailOne;
}

function extractConfirmationCode(text: string) {
  const regex = /\*\*\*(.*?)\*\*\*/;
  const match = regex.exec(text);
  if (match && match.length >= 2) {
    return match[1].trim();
  } else {
    return null;
  }
}

export default [
  () => getConfig(gender.male),
  () => getConfig(gender.female),
] as any;