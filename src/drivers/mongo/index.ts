import authAdapterConfig from "@/drivers/mongo/auth/mongo-auth-adapter";
import { defineDriverConfig } from "@/drivers/interfaces/driver-config";

export const driver = defineDriverConfig({
  authAdapterConfig: authAdapterConfig,
});
