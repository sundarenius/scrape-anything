import { eventTypes } from './scrape-anything';

const messageAllFollowersPerAccount = ({ mail, pwd, urls }: any) => {
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
        goto: urls[0],
      },
      {
        type: eventTypes.CLICK,
        textTarget: ' Followers',
      },
      {
        type: eventTypes.EVALUATE,
        evaluateCallback: evaluates.followFromFollowersList,
      },
    ],
  };
}

const getConfig = async () => {
  const configMailOne = messageAllFollowersPerAccount({
    mail: 'porile6705@mkurg.com',
    pwd: 'hejsan',
    urls: [
      'https://www.instagram.com/jw_singles_meet/'
      // 'https://www.instagram.com/jw_singles/followers/',
      // 'https://www.instagram.com/jw_singles_int/followers/',
    ]
  });
  return configMailOne;
}

const evaluates = {
  followFromFollowersList: async () => {
    // Can also copy paste into a console while open a followers list
    let newFollowed = 0;
    const getUsers = () => Array.from(document.querySelectorAll("body > div > div > div > div > div > div > div > div > div > div > div > div._aano > div:nth-child(1) > div > div"));
    let usersLenght = 0;
    const loopUsers = async () => {
      const users = getUsers();
      usersLenght = users.length;
      for (let i = 0; i < users.length; i++) {
        usersLenght = i;
        const user: any = users[i];
        if (user.innerText.includes('Follow') && !user.innerText.includes('Following')) {
          user.querySelector('button').click();
          await new Promise((resolve) => { setTimeout(() => { resolve(''); }, 1500);})
          newFollowed += 1;
        }
      }
    }
    const loadMore = async () => {
      const contentDiv = document.querySelector("body > div > div > div > div > div > div > div > div > div > div > div > div._aano") as HTMLElement;
      contentDiv.scrollTop = contentDiv.scrollHeight;

      const users = getUsers();
      if (users.length > (usersLenght - 5) && newFollowed < 40) {
        await loopUsers();
        loadMore();
      }
    }

    await loadMore();
  },
  getProfileUrlsFromFollowerList: async () => {
    let urls: string[] = [];
    const getUsersArr: any = () => Array.from(document.querySelectorAll("body > div > div > div > div > div > div > div > div > div > div > div > div._aano > div:nth-child(1) > div a"));
    const getUsersUrls = () => {
      const userUrls = getUsersArr().map((v: any) => v.href);
      urls = userUrls as string[];
      return userUrls;
    }
    const loadMore = async () => {
      const contentDiv = document.querySelector("body > div > div > div > div > div > div > div > div > div > div > div > div._aano") as HTMLElement;
      contentDiv.scrollTop = contentDiv.scrollHeight;
    }
    const fillUrls = async () => {
      getUsersUrls();
      loadMore();
      await new Promise((resolve) => { setTimeout(() => { resolve(''); }, 3500)});
      if (getUsersArr().length > urls.length) {
        await fillUrls();
      }
    }
    await fillUrls();
    const uniqueStrings = new Set(urls);
    return Array.from(uniqueStrings);
  }
}

const eachEvaluateResEvents = {
  sendMessageToUrlList: (url: string) => ([])
}

export default getConfig as any;