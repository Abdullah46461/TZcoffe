// Плагин для загрузки темы из localStorage до рендеринга
export default ({ app }) => {
  // Загружаем тему из localStorage перед инициализацией приложения
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    app.vuetify.framework.theme.dark = savedTheme === 'dark'
  }
}
