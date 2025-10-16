<template>
  <v-card class="user-item" :elevation="2">
    <v-card-text class="user-item__content">
      <div class="user-item__header">
        <div class="user-item__main-info">
          <h3 class="user-item__name">{{ user.name }}</h3>
          <p class="user-item__phone caption-text">{{ user.phone }}</p>
        </div>
        <div class="user-item__balance">
          <span class="user-item__balance-amount">{{ user.balance }} ₽</span>
          <span class="caption-text">Баланс</span>
        </div>
      </div>

      <div class="user-item__details">
        <div class="user-item__detail-row">
          <v-chip
            small
            :color="$vuetify.theme.dark ? 'surface' : 'secondary'"
            class="user-item__city"
            @click="$emit('city-click', user.city)"
          >
            <v-icon left small>mdi-map-marker</v-icon>
            {{ user.city.title }}
          </v-chip>
        </div>

        <div class="user-item__stats">
          <div class="user-item__stat">
            <v-icon small color="success">mdi-cash-plus</v-icon>
            <span class="user-item__stat-label caption-text">Накоплено:</span>
            <span class="user-item__stat-value">{{ user.saveTotal }} ₽</span>
          </div>
          <div class="user-item__stat">
            <v-icon small color="error">mdi-cash-minus</v-icon>
            <span class="user-item__stat-label caption-text">Потрачено:</span>
            <span class="user-item__stat-value">{{ user.spendTotal }} ₽</span>
          </div>
        </div>

        <div class="user-item__footer">
          <span class="caption-text">
            <v-icon x-small>mdi-clock-outline</v-icon>
            Последний визит: {{ formatDate(user.lastVisit) }}
          </span>
          <v-btn
            small
            color="accent"
            elevation="0"
            @click="$emit('view-details', user)"
            class="user-item__details-btn"
          >
            <v-icon left small>mdi-account-details</v-icon>
            Детали
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    user: {
      type: Object,
      required: true,
      validator: (user) => {
        return (
          user.name &&
          user.phone &&
          user.city &&
          typeof user.balance === 'number' &&
          typeof user.saveTotal === 'number' &&
          typeof user.spendTotal === 'number' &&
          user.lastVisit
        )
      }
    }
  },
  methods: {
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

.user-item {
  height: 100%;
  transition: transform $transition-base, box-shadow $transition-base;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  }

  &__content {
    padding: $spacing-md;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: $spacing-md;
    gap: $spacing-sm;
  }

  &__main-info {
    flex: 1;
  }

  &__name {
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: $spacing-xs;
  }

  &__phone {
    margin: 0;
  }

  &__balance {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: $color-accent;
    padding: $spacing-sm $spacing-md;
    border-radius: 8px;
    
    &-amount {
      font-size: 18px;
      font-weight: 700;
      color: $color-text;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__detail-row {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__city {
    cursor: pointer;
    transition: opacity $transition-base;
    
    &:hover {
      opacity: 0.8;
    }
  }

  &__stats {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    padding: $spacing-sm;
    background-color: rgba($color-secondary, 0.5);
    border-radius: 8px;
  }

  &__stat {
    display: flex;
    align-items: center;
    gap: $spacing-sm;

    &-label {
      flex: 1;
    }

    &-value {
      font-weight: 700;
      font-size: $font-size-body;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-sm;
    padding-top: $spacing-sm;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__details-btn {
    text-transform: none;
    font-weight: 700;
  }

  // Mobile адаптация
  @media (max-width: $breakpoint-mobile) {
    &__header {
      flex-direction: column;
    }

    &__balance {
      align-self: stretch;
      align-items: center;
    }

    &__footer {
      flex-direction: column;
      align-items: stretch;
      
      .caption-text {
        text-align: center;
        margin-bottom: $spacing-sm;
      }
    }

    &__details-btn {
      width: 100%;
    }
  }
}

// Dark theme
.theme--dark {
  .user-item {
    &__stats {
      background-color: rgba($color-dark-surface, 0.5);
    }

    &__footer {
      border-top-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
