import { generateRandomFullName } from './names';
import { eventTypes } from './scrape-anything';

const messageAllFollowersPerAccount = ({ mail, pwd }: any) => {
  return {
    browserStayOpen: true,
    url: 'https://www.instagram.com/accounts/login/',
    events: [
      {
        type: eventTypes.CLICK,
        textTarget: 'Allow all cookies',
      },
      {
        type: eventTypes.INPUT,
        textTarget: 'Phone number, username or email address',
        value: mail,
      },
      {
        type: eventTypes.INPUT,
        textTarget: 'Password',
        value: pwd,
      },
      {
        type: eventTypes.CLICK,
        textTarget: 'Log in',
      },
      {
        type: eventTypes.NAVIGATION,
        goto: 'https://www.instagram.com/jw_singles_int/followers/',
      },
      {
        type: eventTypes.EVALUATE,
        evaluateCallback: () => {
          const users: any = document.querySelectorAll("body > div > div > div > div > div > div > div > div > div > div > div > div._aano > div:nth-child(1) > div a");
          console.log(users);
          return { hej: 'okej' }
        },
      },
    ],
  };
}

const getConfig = async () => {
  const config = messageAllFollowersPerAccount({
    mail: 'dejerop427@monutri.com',
    pwd: 'hejsan'
  });
  return config;
}

export default getConfig;