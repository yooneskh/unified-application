<script setup>

const config = useAppConfig();
const user = useUser();


/* logout */

async function logoutUser() {
  await authenticationLogoutUser(useToken(), useUser());
  navigateTo({ name: 'general.home' });
}

</script>


<template>
  <header>

    <content-container class="flex items-center py-3 gap-1">

      <nuxt-link class="text-lg" :to="{ name: 'general.home' }">
        {{ config.brand.title }}
      </nuxt-link>

      <div class="grow" />

      <template v-if="user">
        <u-dropdown-menu
          :items="[
            {
              type: 'label',
              label: user.email,
            },
            {
              class: !user.permissions?.some(it => it.startsWith('admin')) ? 'hidden' : undefined,
              icon: 'i-mdi-view-dashboard',
              label: 'Admin dashboard',
              to: { name: 'admin.dashboard' },
            },
            {
              icon: 'i-mdi-logout',
              color: 'error',
              label: 'Logout',
              onSelect: logoutUser,
            },
          ]">
          <u-button
            variant="ghost"
            icon="i-mdi-account-outline"
            color="neutral"
          />
        </u-dropdown-menu>
      </template>
      <template v-else>
        <u-button
          variant="soft"
          label="Login"
          size="sm"
          :to="{ name: 'authentication' }"
        />
      </template>

    </content-container>

    <slot name="inside-bottom" />

  </header>
</template>