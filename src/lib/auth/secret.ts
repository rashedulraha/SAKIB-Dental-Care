const DEFAULT_JWT_SECRET =
  "sdc_sakib_dental_care_super_secret_jwt_key_2026_secured_neon";

export function getJwtSecret(): Uint8Array {
  const envSecret = process.env.JWT_SECRET?.trim();
  const secret =
    envSecret && new TextEncoder().encode(envSecret).byteLength >= 32
      ? envSecret
      : DEFAULT_JWT_SECRET;

  return new TextEncoder().encode(secret);
}
