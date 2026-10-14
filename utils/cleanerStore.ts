import { Cleaner } from '@/types/cleaner';
import { getJsonData, saveJsonData } from '@/utils/jsonStore';

export const getCleaners = () => getJsonData<Cleaner[]>('cleaners.json', []);
export const saveCleaners = (cleaners: Cleaner[]) => saveJsonData('cleaners.json', cleaners);