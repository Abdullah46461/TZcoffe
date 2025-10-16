<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card elevation="0">
          <v-card-text class="text-center py-16">
            <v-icon size="64" color="accent">mdi-coffee</v-icon>
            <h1 class="text-h1 mt-4 mb-2">Добро пожаловать в Добрый кофе</h1>
            <p class="text-body-1 mb-4">Система управления пользователями</p>
            <v-btn color="accent" elevation="2" large to="/users">
              <v-icon left>mdi-account-group</v-icon>
              Перейти к пользователям
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'Главная'
    }
  }
}
</script>
