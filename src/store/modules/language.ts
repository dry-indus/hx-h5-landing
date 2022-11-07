import { defineStore } from 'pinia';
// import { i18n } from '/@/i18n/index';
// const locale = i18n.global.locale.value;
interface LocalType {
  Locale: string;
}
export const useLanguageStore = defineStore({
  id: 'language',
  state: (): LocalType => ({
    Locale: '',
  }),
  actions: {
    setLangGlobal(locale?: string) {
      if (locale) {
        this.Locale = locale;
      }
      // i18n.global.locale.value = locale || localStorage.getItem('lang') || '';
    },
  },
});
