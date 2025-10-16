// Генератор случайных данных
const cities = [
  { id: '60f197849998570020506123', title: 'Оренбург' },
  { id: '60f197849998570020506124', title: 'Москва' },
  { id: '60f197849998570020506125', title: 'Санкт-Петербург' },
  { id: '60f197849998570020506126', title: 'Новосибирск' },
  { id: '60f197849998570020506127', title: 'Екатеринбург' },
  { id: '60f197849998570020506128', title: 'Казань' },
  { id: '60f197849998570020506129', title: 'Нижний Новгород' },
  { id: '60f19784999857002050612a', title: 'Челябинск' },
  { id: '60f19784999857002050612b', title: 'Самара' },
  { id: '60f19784999857002050612c', title: 'Омск' },
  { id: '60f19784999857002050612d', title: 'Ростов-на-Дону' },
  { id: '60f19784999857002050612e', title: 'Уфа' },
  { id: '60f19784999857002050612f', title: 'Красноярск' },
  { id: '60f197849998570020506130', title: 'Воронеж' },
  { id: '60f197849998570020506131', title: 'Пермь' }
]

const names = [
  'Галина', 'Александр', 'Елена', 'Дмитрий', 'Наталья',
  'Сергей', 'Ольга', 'Андрей', 'Татьяна', 'Алексей',
  'Ирина', 'Владимир', 'Марина', 'Евгений', 'Светлана',
  'Николай', 'Анна', 'Михаил', 'Людмила', 'Виктор',
  'Юлия', 'Игорь', 'Екатерина', 'Павел', 'Мария',
  'Иван', 'Надежда', 'Роман', 'Вера', 'Петр'
]

// Генерация случайного ID
function generateId() {
  return Math.random().toString(16).substr(2, 24).padEnd(24, '0')
}

// Генерация случайного номера телефона
function generatePhone() {
  const firstDigit = Math.floor(Math.random() * 9) + 1
  const lastDigits = Math.floor(Math.random() * 9000) + 1000
  return `+79*****${firstDigit}${lastDigits.toString().substr(0, 3)}`
}

// Генерация случайной даты
function generateDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime()
}

// Генерация пользователя
function generateUser() {
  const now = Date.now()
  const yearAgo = now - 365 * 24 * 60 * 60 * 1000
  const createdAt = generateDate(new Date(yearAgo), new Date(now - 30 * 24 * 60 * 60 * 1000))
  
  const balance = Math.floor(Math.random() * 5000)
  const saveTotal = Math.floor(Math.random() * 10000)
  const spendTotal = Math.floor(Math.random() * 10000)
  const saveCount = Math.floor(Math.random() * 200)
  const spendCount = Math.floor(Math.random() * 100)
  const cashbackPercent = [5, 10, 15, 20][Math.floor(Math.random() * 4)]
  
  return {
    id: generateId(),
    name: names[Math.floor(Math.random() * names.length)],
    phone: generatePhone(),
    city: cities[Math.floor(Math.random() * cities.length)],
    balance,
    cashbackPercent,
    saveTotal,
    saveCount,
    spendTotal,
    spendCount,
    isBlocked: Math.random() < 0.05, // 5% заблокированных
    role: 'customer',
    createdAt,
    updatedAt: generateDate(new Date(createdAt), new Date(now)),
    lastVisit: generateDate(new Date(now - 7 * 24 * 60 * 60 * 1000), new Date(now)),
    lastSave: generateDate(new Date(now - 30 * 24 * 60 * 60 * 1000), new Date(now)),
    lastSpend: generateDate(new Date(now - 30 * 24 * 60 * 60 * 1000), new Date(now))
  }
}

// API фабрика
class UsersAPI {
  constructor() {
    this.users = []
    this.isInitialized = false
  }

  // Генерация всех пользователей
  async generateUsers(totalCount = 8000) {
    if (this.isInitialized) {
      return
    }

    this.users = []

    for (let i = 0; i < totalCount; i++) {
      this.users.push(generateUser())
    }

    this.isInitialized = true
  }

  // Имитация загрузки пользователей с задержкой
  async list({ offset = 0, limit = 500 }) {
    // Имитация сетевого оверхеда 500мс
    await new Promise(resolve => setTimeout(resolve, 500))

    // Если пользователи еще не сгенерированы, генерируем их
    if (!this.isInitialized) {
      await this.generateUsers()
    }

    const result = this.users.slice(offset, offset + limit)

    return {
      data: result,
      total: this.users.length,
      offset,
      limit
    }
  }

  // Получение всех уникальных городов
  getCities() {
    return cities
  }
}

// Nuxt плагин
export default (context, inject) => {
  const usersAPI = new UsersAPI()

  const api = {
    users: usersAPI
  }

  // Инжектим API в контекст
  inject('api', api)
  context.$api = api
}
