import { defineAuthAdapterConfig } from "@/drivers/interfaces/auth/auth-adapter-config";
import client from "@/drivers/mongo/storage/client";
import {
  MongoDBAdapter as BaseMongoDBAdapter,
  format,
  defaultCollections,
} from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";

import type { AdapterUser as BaseAdapterUser } from "@auth/core/adapters";
import { User } from "@/lib/models/user";

type AdapterUser = Omit<BaseAdapterUser, "emailVerified" | "name"> &
  Pick<User, "emailVerifiedAt" | "onboardedAt" | "onboardingSteps">;

const MongoDBAdapter: typeof BaseMongoDBAdapter = (client, options) => {
  // #region copy pasted from "@auth/mongodb-adapter"
  const { collections } = options || {};
  const { from, to } = format;

  const getDb = async () => {
    const _client: MongoClient = await (typeof client === "function"
      ? client()
      : client);
    const _db = _client.db(options?.databaseName);
    const c = { ...defaultCollections, ...collections };
    return {
      U: _db.collection<AdapterUser>(c.Users),
      [Symbol.asyncDispose]: async () => {
        await options?.onClose?.(_client);
      },
    };
  };
  // #endregion

  const adapter = BaseMongoDBAdapter(client, options);

  // override createUser to add custom fields
  adapter.createUser = async (data) => {
    const { id, email, emailVerified } = data;

    const user = to<AdapterUser>({
      id,
      email,
      emailVerifiedAt: emailVerified as Date,
      onboardedAt: null,
      onboardingSteps: {
        tenantCreated: false,
        profileUpdated: false,
      },
    });

    await using db = await getDb();
    await db.U.insertOne(user);
    return from<BaseAdapterUser>(user);
  };

  return adapter;
};

const authAdapterConfig = defineAuthAdapterConfig({
  adapter: MongoDBAdapter(client),
});

export default authAdapterConfig;
