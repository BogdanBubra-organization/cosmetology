import InputMask from 'react-input-mask'

const DATA = {
  title: 'Запитайте нас',
  descr: 'Після відправки наші менеджери зателефонують вам протягом дня.',
  fields: [
    {
      name: 'Name',
      label: 'Ваше імʼя',
      placeholder: 'Наприклад, “Тетяна”',
      required: true,
    },
    {
      name: 'Phone',
      as: InputMask,
      type: 'tel',
      label: 'Номер телефону',
      placeholder: '+38 (000) 000-00-00',
      mask: '+38 (999) 999-99-99',
      pattern: '^\\+\\d{2} \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$',
      required: true,
    },
    {
      name: 'Message',
      as: 'textarea',
      label: 'Що вас цікавить?',
      placeholder: 'Введіть текст',
    },
  ],
  btn: 'Відправити',
}

const FEEDBACK = {
  finalTitle: 'Заявка відправлена!',
  finalDescr: 'Наші менеджери зателефонують протягом дня.',
}

export { DATA, FEEDBACK }
