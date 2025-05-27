import InputMask from 'react-input-mask'

const NAME = {
  name: 'fields[name_1]',
  label: 'Ваше імʼя',
  placeholder: 'Наприклад, “Тетяна”',
  required: true,
}

const PHONE = {
  name: 'fields[1695994_1][1075258]',
  as: InputMask,
  type: 'tel',
  label: 'Номер телефону',
  placeholder: '+38 (000) 000-00-00',
  mask: '+38 (999) 999-99-99',
  pattern: '^\\+\\d{2} \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$',
  required: true,
}

const EXPERT = {
  name: 'fields[2099567_1]',
  label: 'Лікар',
  placeholder: 'Прізвище та імʼя',
}

const COMMENT = {
  name: 'fields[note_2]',
  as: 'textarea',
  label: 'Що вас цікавить?',
  placeholder: 'Введіть текст',
}

const DATA = {
  fields: {
    info: [NAME, PHONE, COMMENT],
    order: [NAME, PHONE, EXPERT],
    promo: [NAME, PHONE],
  },
  btn: 'Відправити',
}

const FEEDBACK = {
  finalTitle: 'Заявка відправлена!',
  finalDescr: 'Наші менеджери зателефонують протягом дня.',
}

export { DATA, FEEDBACK }
