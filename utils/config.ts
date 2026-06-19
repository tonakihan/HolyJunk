import path from "path";
import fs from "fs";

/**
 * @param key is the name of the environment variable to retrieve.
 * @returns string value of the environment variable with the given key.
 * @throws an error if the key is not found in the environment variables.
 * @example
 * ```ts
 * const dbUrl = getRequiredEnv('DB_URL');
 * ```
 * @category Utils
 */
function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 *
 * @param filePath is the path to the secret file.
 * @returns string value of the secret file.
 * @throws an error if the file is not found or cannot be read.
 * @example
 * ```ts
 * const dbSecret = await readSecretFile('./secrets/db.secret');
 * ```
 * @category Utils
 */
async function readSecretFile(filePath: string): Promise<string> {
  try {
    const fullPath = path.resolve(filePath);
    const content = await fs.promises.readFile(fullPath, "utf-8");
    return content.trim();
  } catch (error) {
    throw new Error(`Failed to read secret file at ${filePath}: ${error}`);
  }
}

export { getRequiredEnv, readSecretFile };
