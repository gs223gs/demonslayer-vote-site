import { cookies } from 'next/headers';
import { COOKIE_NAMES, COOKIE_MAX_AGE } from './constants';
import { Language } from './i18n/translations';

export async function getLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const lang = cookieStore.get(COOKIE_NAMES.LANGUAGE)?.value;
  return (lang === 'en' ? 'en' : 'ja') as Language;
}

export async function setLanguage(lang: Language) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAMES.LANGUAGE, lang, {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function getVotedCharacter(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAMES.VOTED_CHARACTER)?.value || null;
}

export async function setVotedCharacter(characterName: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAMES.VOTED_CHARACTER, characterName, {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}