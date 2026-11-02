export function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;

  if (!secret || new TextEncoder().encode(secret).byteLength < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters.");
  }

  return new TextEncoder().encode(secret);
}
