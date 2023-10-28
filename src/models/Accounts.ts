import { Collections } from '../mongodb/mongo-config';
import { HttpStatusCodes } from '../types/globals';

export interface AccountsEntity {
  mail: string,
  username: string,
  pwd: string,
  timestamp: number,
}

class Accounts implements AccountsEntity {
  public static collection = Collections.ACCOUNTS;

  mail: string;

  username: string;

  pwd: string;

  timestamp: number;

  constructor(likesData: AccountsEntity) {
    this.mail = likesData.mail;
    this.username = likesData.username;
    this.pwd = likesData.pwd;
    this.timestamp = likesData.timestamp;
  }

  getData(allRequired = false): Partial<AccountsEntity> {
    const data: any = {
      mail: this.mail,
      username: this.username,
      pwd: this.pwd,
      litimestampkeId: this.timestamp,
    };

    // Remove properties with undefined values
    Object.keys(data).forEach((key) => {
      if (allRequired && data[key] === undefined) {
        throw new Error(`This method requires all fields ${HttpStatusCodes.BAD_REQUEST}`);
      }
      return data[key] === undefined && delete data[key];
    });

    return data as Partial<AccountsEntity>;
  }
}

export default Accounts;
