import { Language, getTranslation, Translations } from './translations';
import { airQualityDb } from '../db';

class LocalizationService {
  private defaultLanguage: Language = 'uzb';

  public async getUserLanguage(chatId: number): Promise<Language> {
    try {
      const userLang = await airQualityDb.getUserLanguage(chatId);
      return (userLang as Language) || this.defaultLanguage;
    } catch (error) {
      console.error('Error getting user language:', error);
      return this.defaultLanguage;
    }
  }

  public async setUserLanguage(chatId: number, language: Language): Promise<boolean> {
    try {
      return airQualityDb.setUserLanguage(chatId, language);
    } catch (error) {
      console.error('Error setting user language:', error);
      return false;
    }
  }

  public async getTranslations(chatId: number): Promise<Translations> {
    const userLanguage = await this.getUserLanguage(chatId);
    return getTranslation(userLanguage);
  }

  public async translate(chatId: number, key: keyof Translations): Promise<string> {
    const translations = await this.getTranslations(chatId);
    return translations[key] as string;
  }

  public async translateNested(chatId: number, key: string): Promise<string> {
    const translations = await this.getTranslations(chatId);
    const keys = key.split('.');
    let result: any = translations;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof result === 'string' ? result : key;
  }

  public isValidLanguage(lang: string): lang is Language {
    return ['uzb', 'rus', 'eng'].includes(lang as Language);
  }

  public getLanguageFlag(lang: Language): string {
    const flags = {
      uzb: '🇺🇿',
      rus: '🇷🇺',
      eng: '🇺🇸'
    };
    return flags[lang];
  }

  public getLanguageName(lang: Language): string {
    const names = {
      uzb: "O'zbek",
      rus: "Русский",
      eng: "English"
    };
    return names[lang];
  }
}

export const localizationService = new LocalizationService();
export default LocalizationService;

