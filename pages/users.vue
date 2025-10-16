<template>
  <div class="users-page">
    <!-- Заголовок -->
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h1">Пользователи</h1>
        <p class="caption-text mt-2">
          Всего пользователей: {{ totalUsers }}
        </p>
      </v-col>
    </v-row>

    <!-- Поиск и фильтры -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          label="Поиск по имени или телефону"
          prepend-inner-icon="mdi-magnify"
          outlined
          dense
          hide-details
          clearable
          :color="$vuetify.theme.dark ? 'accent' : 'primary'"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="selectedCities"
          :items="cities"
          item-text="title"
          item-value="id"
          label="Фильтр по городам"
          prepend-inner-icon="mdi-filter"
          outlined
          dense
          multiple
          hide-details
          clearable
          :color="$vuetify.theme.dark ? 'accent' : 'primary'"
        >
          <template #selection="{ item, index }">
            <v-chip v-if="index < 2" small>
              <span>{{ item.title }}</span>
            </v-chip>
            <span
              v-if="index === 2"
              class="grey--text caption"
            >
              (+{{ selectedCities.length - 2 }} ещё)
            </span>
          </template>
        </v-select>
      </v-col>
    </v-row>

    <!-- Skeleton loader во время загрузки -->
    <v-row v-if="$fetchState.pending">
      <v-col
        v-for="i in 12"
        :key="`skeleton-${i}`"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-skeleton-loader
          type="card"
          :elevation="2"
        />
      </v-col>
    </v-row>

    <!-- Список пользователей -->
    <v-row v-else-if="paginatedUsers.length > 0">
      <v-col
        v-for="user in paginatedUsers"
        :key="user.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <user-item
          :user="user"
          @city-click="handleCityClick"
          @view-details="handleViewDetails"
        />
      </v-col>
    </v-row>

    <!-- Пустое состояние -->
    <v-row v-else>
      <v-col cols="12">
        <v-card elevation="0" class="text-center py-12">
          <v-icon size="64" color="grey lighten-1">mdi-account-search</v-icon>
          <h3 class="mt-4">Пользователи не найдены</h3>
          <p class="caption-text mt-2">Попробуйте изменить параметры поиска</p>
          <v-btn
            color="accent"
            class="mt-4"
            @click="resetFilters"
          >
            Сбросить фильтры
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Пагинация -->
    <v-row v-if="!$fetchState.pending && filteredUsers.length > 0" class="mt-4">
      <v-col cols="12" class="d-flex justify-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          color="accent"
          circle
        />
      </v-col>
    </v-row>

    <!-- Информация о текущей странице -->
    <v-row v-if="!$fetchState.pending && filteredUsers.length > 0">
      <v-col cols="12" class="text-center">
        <p class="caption-text">
          Показано {{ startIndex + 1 }}-{{ endIndex }} из {{ filteredUsers.length }} пользователей
        </p>
      </v-col>
    </v-row>

    <!-- Диалог с деталями пользователя -->
    <v-dialog
      v-model="detailsDialog"
      max-width="600"
    >
      <v-card v-if="selectedUser">
        <v-card-title class="headline">
          <v-icon left color="accent">mdi-account-details</v-icon>
          Детальная информация
        </v-card-title>
        <v-divider />
        <v-card-text class="pt-4">
          <v-simple-table>
            <template #default>
              <tbody>
                <tr>
                  <td class="font-weight-bold">ID:</td>
                  <td>{{ selectedUser.id }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Имя:</td>
                  <td>{{ selectedUser.name }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Телефон:</td>
                  <td>{{ selectedUser.phone }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Город:</td>
                  <td>{{ selectedUser.city.title }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Баланс:</td>
                  <td>{{ selectedUser.balance }} ₽</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Кэшбэк:</td>
                  <td>{{ selectedUser.cashbackPercent }}%</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Накоплено:</td>
                  <td>{{ selectedUser.saveTotal }} ₽ ({{ selectedUser.saveCount }} раз)</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Потрачено:</td>
                  <td>{{ selectedUser.spendTotal }} ₽ ({{ selectedUser.spendCount }} раз)</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Роль:</td>
                  <td>{{ selectedUser.role }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Заблокирован:</td>
                  <td>
                    <v-chip
                      small
                      :color="selectedUser.isBlocked ? 'error' : 'success'"
                      text-color="white"
                    >
                      {{ selectedUser.isBlocked ? 'Да' : 'Нет' }}
                    </v-chip>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Дата регистрации:</td>
                  <td>{{ formatDate(selectedUser.createdAt) }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Последнее обновление:</td>
                  <td>{{ formatDate(selectedUser.updatedAt) }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Последний визит:</td>
                  <td>{{ formatDate(selectedUser.lastVisit) }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Последнее накопление:</td>
                  <td>{{ formatDate(selectedUser.lastSave) }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Последняя трата:</td>
                  <td>{{ formatDate(selectedUser.lastSpend) }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="accent"
            text
            @click="detailsDialog = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'UsersPage',
  data() {
    return {
      users: [],
      cities: [],
      searchQuery: '',
      selectedCities: [],
      currentPage: 1,
      usersPerPage: 50,
      detailsDialog: false,
      selectedUser: null,
      totalUsers: 0
    }
  },
  fetchOnServer: false, // Выполнять только на клиенте
  async fetch() {
    try {
      // Получаем список городов
      this.cities = this.$api.users.getCities()
      
      // Загрузка пользователей порциями
      const totalUsers = 8000
      const firstBatch = 100
      const batchSize = 500
      
      // Первый запрос - 100 пользователей
      let response = await this.$api.users.list({ offset: 0, limit: firstBatch })
      this.users = response.data
      
      // Остальные запросы по 500 пользователей
      let offset = firstBatch
      while (offset < totalUsers) {
        response = await this.$api.users.list({ offset, limit: batchSize })
        this.users.push(...response.data)
        offset += batchSize
      }
      
      this.totalUsers = this.users.length
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error)
    }
  },
  head() {
    return {
      title: 'Пользователи'
    }
  },
  computed: {
    filteredUsers() {
      let result = this.users

      // Фильтр по поисковому запросу
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase().trim()
        result = result.filter(user => {
          const nameMatch = user.name.toLowerCase().includes(query)
          const phoneMatch = user.phone.toLowerCase().includes(query)
          return nameMatch || phoneMatch
        })
      }

      // Фильтр по городам
      if (this.selectedCities.length > 0) {
        result = result.filter(user => {
          return this.selectedCities.includes(user.city.id)
        })
      }

      return result
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.usersPerPage)
    },
    startIndex() {
      return (this.currentPage - 1) * this.usersPerPage
    },
    endIndex() {
      return Math.min(this.startIndex + this.usersPerPage, this.filteredUsers.length)
    },
    paginatedUsers() {
      return this.filteredUsers.slice(this.startIndex, this.endIndex)
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1
    },
    selectedCities() {
      this.currentPage = 1
    }
  },
  methods: {
    handleCityClick(city) {
      // Добавляем город в фильтр
      if (!this.selectedCities.includes(city.id)) {
        this.selectedCities.push(city.id)
      }
    },
    handleViewDetails(user) {
      this.selectedUser = user
      this.detailsDialog = true
    },
    resetFilters() {
      this.searchQuery = ''
      this.selectedCities = []
      this.currentPage = 1
    },
    formatDate(timestamp) {
      const date = new Date(timestamp)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${day}.${month}.${year} ${hours}:${minutes}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.users-page {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;

  // Стили для скелетона
  ::v-deep .v-skeleton-loader {
    height: 280px;
  }

  // Стили для пагинации
  ::v-deep .v-pagination {
    .v-pagination__item {
      font-family: $font-family;
      
      &--active {
        background-color: $color-accent !important;
        color: $color-text !important;
      }
    }
  }

  // Адаптивность для мобильных
  @media (max-width: $breakpoint-mobile) {
    ::v-deep .v-pagination {
      .v-pagination__navigation,
      .v-pagination__item {
        width: 32px;
        height: 32px;
        min-width: 32px;
      }
    }
  }
}
</style>
