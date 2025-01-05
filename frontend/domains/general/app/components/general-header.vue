<script setup>

const config = useAppConfig();
const user = useUser();


/* logout */

async function logoutUser() {

  await authenticationLogoutUser(useToken(), useUser());

  navigateTo({
    name: 'general.home',
  });

}

</script>


<template>
  <header class="border-b">

    <content-container class="flex items-center py-1 gap-1 h-[64px]">

      <nuxt-link class="text-lg" :to="{ name: 'general.home' }">
        {{ config.brand.title }}
      </nuxt-link>

      <div class="grow" />

      <template v-if="user">
        <u-btn
          icon="i-mdi-account"
          class="ghost">
          <u-dropdown>
            <u-card class="flex flex-col p-0">
              <p class="text-xs text-center p-2">
                {{ user.email }}
              </p>
              <!-- <nuxt-link v-if="user.permissions?.some(it => it.startsWith('admin'))" :to="{ name: 'admin.dashboard' }"> -->
                <u-btn
                  icon="i-mdi-view-dashboard"
                  label="Admin dashboard"
                  class="ghost text-xs !justify-start rounded-none"
                />
              <!-- </nuxt-link> -->
              <u-btn
                icon="i-mdi-logout"
                label="Logout"
                class="ghost danger text-xs !justify-start rounded-none"
                :click-handler="logoutUser"
              />
            </u-card>
          </u-dropdown>
        </u-btn>
      </template>
      <template v-else>
        <nuxt-link :to="{ name: 'authentication' }">
          <u-btn
            label="Login"
            class="soft text-sm"
          />
        </nuxt-link>
      </template>

    </content-container>

    <slot name="inside-bottom" />

  </header>
</template>