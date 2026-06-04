export function generateSecurityToken(
  id: string,
  name: string,
  route: string,
  slot: string,
  date: string,
  guests: number
): string {
  const secret = "HC_SALT_SECRET_KEY_2026";
  const raw = `${id}:${name}:${route}:${slot}:${date}:${guests}:${secret}`;
  // Robust synchronous custom hash algorithm to generate 16-hex characters
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    h1 = Math.imul(h1 ^ char, 2654435761);
    h2 = Math.imul(h2 ^ char, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
  const part1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const part2 = (h2 >>> 0).toString(16).padStart(8, '0');
  return (part1 + part2).toUpperCase();
}
