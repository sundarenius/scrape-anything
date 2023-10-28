/* eslint-disable import/no-extraneous-dependencies */
import type { IPayload } from '../types/globals';
import { HttpStatusCodes, Methods } from '../types/globals';
import accounts from '../services/Accounts';
import multer from 'multer';

export const formatErrorRes = (body: IPayload<unknown>['payload'], statusCode: HttpStatusCodes) => ({
  body,
  statusCode,
});

const catchWrapper = async (handler: any, payload: IPayload<unknown>) => {
  try {
    return await handler(payload);
  } catch (err: any) {
    // status can be set as "throw new Error(`some message ${statusCode}`)" (last index in message)
    const splitted = err.message.split(' ');
    const statusCodeFromMsg = Number(splitted[splitted.length - 1]);

    const errorMsg = !Number.isNaN(statusCodeFromMsg)
      ? splitted.filter((val: string) => Number.isNaN(Number(val))).join(' ')
      : err.message;
    const body = {
      errorMsg,
      err,
    };

    const failedStatus = statusCodeFromMsg || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    console.log(errorMsg);
    console.log(err.stack);
    return formatErrorRes(body, failedStatus);
  }
};

// Multer middleware to handle file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB (adjust as needed)
  },
});

// Custom routes. Grapgql route is defined from main.ts
export const routes = [
  {
    path: '/accounts',
    handler: (payload: IPayload<unknown>) => catchWrapper(accounts, payload),
    Methods: [Methods.GET, Methods.POST],
  },
];
