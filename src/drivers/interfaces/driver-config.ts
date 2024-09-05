import { AuthAdapterConfig } from "@/drivers/interfaces/auth/auth-adapter-config";

export type DriverConfig = {
  authAdapterConfig: AuthAdapterConfig;
};

export function defineDriverConfig(driverConfig: DriverConfig): DriverConfig {
  return driverConfig;
}
