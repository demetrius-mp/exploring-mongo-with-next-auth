import { Entity } from "@/lib/models/entity";

export type UserType = "admin" | "user";

export interface OnboardingSteps {
  tenantCreated: boolean;
  profileUpdated: boolean;
}

export interface User extends Entity {
  type: UserType;
  email: string;
  tenantId: string | null;
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  image: string | null;
  onboardedAt: Date | null;
  onboardingSteps: OnboardingSteps;
  emailVerifiedAt: Date | null;
  lastActiveAt: Date | null;
}
