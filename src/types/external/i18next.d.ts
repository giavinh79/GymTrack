import { DEFAULT_NS } from 'src/locales/i18n';

import commonTranslations from '../../../public/locales/en-US/common.json';
import domainTranslations from '../../../public/locales/en-US/domain.json';
import landingTranslations from '../../../public/locales/en-US/landing.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NS;
    resources: {
      common: typeof commonTranslations;
      domain: typeof domainTranslations;
      landing: typeof landingTranslations;
    };
  }
}
