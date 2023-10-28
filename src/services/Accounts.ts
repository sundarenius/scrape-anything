/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import type { IPayload, IFilter } from '../types/globals';
import { Methods, HttpStatusCodes } from '../types/globals';
import Likes from '../models/Accounts';
import MongoTransactions from '../mongodb/MongoTransactions';
import {
  verifyJwtToken,
  decodeJwtToken,
} from '../utils/auth';
import type { AccountsRepository } from '../repositories/AccountsRepository';

type IPayloadData = Partial<Likes>

class LikesService extends MongoTransactions implements AccountsRepository {
  collection = Likes.collection;

  payload: { getData: (requireAllFields?: boolean) => IPayloadData } & IPayloadData;

  constructor(payload: IPayloadData) {
    super();
    this.payload = new Likes(payload as any);
    this.getOne = this.getOne.bind(this);
    this.create = this.create.bind(this);
  }

  async getOne(): Promise<Likes | null> {
    const { timestamp } = this.payload.getData();
    // const data = await this.findOne({
    //   query: { likeId },
    // });

    return {} as any;
  }

  // create happens after an Accounts was made
  async create(): Promise<any> {
    const newData = this.payload.getData(true);
    await this.createOne({
      newData: {
        ...newData,
        timestamp: new Date().getTime(),
      },
    } as any);

    return {
      msg: 'Succesfully created new IG account',
    };
  }
}

const likes = async ({
  method,
  payload,
  auth,
}: IPayload<IPayloadData>) => {
  const service = new LikesService(payload as IPayloadData);

  const tokenData: any = decodeJwtToken(auth);
  const getBodyRes = async (callback: any) => {
    const res = await callback(tokenData);
    return {
      body: res,
      statusCode: 200,
    };
  };

  switch (method) {
    case Methods.GET:
      return getBodyRes(service.getOne);
    case Methods.POST:
      return getBodyRes(service.create);

    default:
      throw new Error('Method not implemented.');
  }
};

export default likes;
