const DATA = {
  title: 'Залишіть заявку',
  descr:
    'Після оформлення заявки наші менеджери зателефонують вам протягом дня.',
  fields: [
    {
      name: 'Name',
      type: 'text',
      label: 'Ваше імʼя',
      placeholder: 'Наприклад “Тетяна”',
      isRequired: true,
    },
    {
      name: 'Phone',
      type: 'tel',
      label: 'Номер телефону',
      placeholder: '+38 (000) 000-00-00',
      mask: '+38 (999) 999-99-99',
      isRequired: true,
    },
    {
      name: 'Message',
      type: 'textarea',
      label: 'Що вас цікавить?',
      placeholder: 'Введіть текст',
    },
  ],
  btn: 'Відправити',
  finalTitle: 'Заявка відправлена!',
  finalDescr: 'Наші менеджери зателефонують протягом дня.',
}

export default DATA
