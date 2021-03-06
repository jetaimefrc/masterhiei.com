import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import ja from 'vee-validate/dist/locale/ja';

Vue.use(VeeValidate, { inject: false });

// Using custom rules
Validator.extend('username', {
  validate: (value: string): boolean =>
    /^[a-zA-Z0-9０-９_\-. \u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]{3,12}$/.test(
      value
    ),
});

Validator.extend('password', {
  validate: (value: string): boolean =>
    /^(?=.*?[a-z])(?=.*?\d)[a-z\d_]{8,100}$/i.test(value),
});

// Costomize error messages
const messages = {
  zh_CN: {
    attributes: {
      username: '用户名',
    },
    custom: {
      email: {
        required: (): string => '请输入有效的邮箱地址',
        email: (): string => '请输入有效的邮箱地址',
      },
      username: {
        required: (): string => '请输入有效的用户名',
        username: (): string => '请输入有效的用户名',
      },
      password: {
        required: (): string => '请输入有效的用户密码',
        password: (): string => '请输入有效的用户密码',
      },
    },
  },
  ja: {
    attributes: {
      username: 'ユーザ名',
    },
    custom: {
      email: {
        required: (): string => 'メールアドレスを入力してください',
        email: (): string => 'メール アドレスは無効のようです',
      },
      username: {
        required: (): string => 'ユーザ名を入力してください',
        username: (): string => '有効なユーザ名を入力してください',
      },
      password: {
        required: (): string => 'パスワードを入力してください',
        password: (): string => '有効なパスワードを入力してください',
      },
    },
  },
};
Validator.localize('zh-CN', messages.zh_CN);
Validator.localize('ja-JP', messages.ja);

// Loading default languages for Vee
Validator.localize('zh-CN', zh_CN);
Validator.localize('ja-JP', ja);

export default ({ app }): void => {
  // Localizing the app when user refresh or access a i18n link
  Validator.localize(app.i18n.locale);

  // Reset Vee localizetion before setting a new locale
  app.i18n.beforeLanguageSwitch = (_, newLocale): void => {
    Validator.localize(newLocale);
  };
};
