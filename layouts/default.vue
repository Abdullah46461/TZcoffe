<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="!isMobile"
      :mini-variant="miniVariant && !isMobile"
      :dark="true"
      color="#000000"
      class="sidebar"
      width="260"
      mini-variant-width="64"
    >
      <!-- Шапка с профилем -->
      <div class="sidebar-header">
        <v-list-item 
          class="px-2" 
          @click="miniVariant ? toggleMiniVariant() : null" 
          :class="{ 'cursor-pointer': miniVariant }"
        >
          <v-list-item-avatar>
            <v-icon large color="white">mdi-account-circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content v-if="!miniVariant">
            <v-list-item-title class="sidebar-user-name">
              Михаил Макеев
            </v-list-item-title>
          </v-list-item-content>
          <v-btn
            v-if="!isMobile && !miniVariant"
            icon
            small
            @click.stop="toggleMiniVariant"
            color="white"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
      </div>

      <v-divider dark></v-divider>

      <!-- Меню -->
      <v-list nav dense class="pt-0 sidebar-menu">
        <v-list-item
          link
          class="sidebar-item"
        >
          <v-list-item-icon>
            <v-icon color="white">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Торговые точки</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          class="sidebar-item"
        >
          <v-list-item-icon>
            <v-icon color="white">mdi-coffee-maker</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Кофемашины</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          class="sidebar-item"
        >
          <v-list-item-icon>
            <v-icon color="white">mdi-handshake</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Партнеры</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          class="sidebar-item"
        >
          <v-list-item-icon>
            <v-icon color="white">mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Сотрудники</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          class="sidebar-item"
        >
          <v-list-item-icon>
            <v-icon color="white">mdi-coffee</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Напитки</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          class="sidebar-item"
        >
          <v-list-item-icon>
            <v-icon color="white">mdi-card-account-details</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Абонементы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          class="sidebar-item"
        >
          <v-list-item-icon>
            <v-icon color="white">mdi-account-check</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Активные абонементы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/users"
          class="sidebar-item sidebar-item--active"
        >
          <v-list-item-icon>
            <v-icon color="white">mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Пользователи</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- Переключатель темы внизу -->
      <template #append>
        <div class="pa-2">
          <v-btn
            icon
            @click="toggleTheme"
            :title="$vuetify.theme.dark ? 'Светлая тема' : 'Тёмная тема'"
            color="white"
          >
            <v-icon>{{ themeIcon }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="main-container">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: true,
      miniVariant: false
    }
  },
  computed: {
    themeIcon() {
      return this.$vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'
    },
    isMobile() {
      return this.$vuetify.breakpoint.mobile
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light')
    },
    toggleMiniVariant() {
      this.miniVariant = !this.miniVariant
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.sidebar {
  border-right: none !important;
  
  ::v-deep .v-navigation-drawer__content {
    display: flex;
    flex-direction: column;
  }
}

.sidebar-header {
  padding: $spacing-md 0;
  
  .v-list-item {
    min-height: 64px;
    
    &.cursor-pointer {
      cursor: pointer;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }
    }
  }
  
  // Для mini-variant - центрируем иконку
  .v-navigation-drawer--mini-variant & {
    .v-list-item {
      justify-content: center;
      padding: 0 !important;
    }
  }
}

.sidebar-user-name {
  color: white;
  font-size: 16px;
  font-weight: 600;
  white-space: normal;
  line-height: 1.3;
}

.sidebar-menu {
  ::v-deep .v-list-item {
    padding: 0 16px;
  }
}

.sidebar-item {
  min-height: 48px;
  border-radius: 0;
  margin: 0;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
  
  &--active {
    background-color: rgba(128, 128, 128, 0.3) !important;
  }
  
  ::v-deep .v-list-item__icon {
    margin-right: 12px;
  }
  
  ::v-deep .v-list-item__title {
    color: white;
    font-size: 14px;
    font-weight: 400;
  }
}

.main-container {
  padding: $spacing-lg;
  max-width: 100%;
  
  @media (max-width: $breakpoint-mobile) {
    padding: $spacing-md;
  }
}
</style>
