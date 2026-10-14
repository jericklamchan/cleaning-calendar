import fs from 'fs/promises';
import path from 'path';

export async function getJsonData<T>(fileName: string, fallbackDefault: T): Promise<T> {
  const filePath = path.join(process.cwd(), 'data', fileName);
  const dir = path.dirname(filePath);

  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallbackDefault, null, 2), 'utf-8');
    return fallbackDefault;
  }

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    if (!fileContent.trim()) return fallbackDefault;
    return JSON.parse(fileContent) as T;
  } catch (error) {
    console.error(`Failed to read ${fileName}:`, error);
    return fallbackDefault;
  }
}

export async function saveJsonData<T>(fileName: string, data: T): Promise<void> {
  const filePath = path.join(process.cwd(), 'data', fileName);
  const dir = path.dirname(filePath);

  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Failed to write ${fileName}:`, error);
    throw new Error(`Could not save data to ${fileName}`);
  }
}