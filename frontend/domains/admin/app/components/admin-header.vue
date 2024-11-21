<script setup>

/* admin header links */

const { data: links } = await useUFetch('/admin/header/links');

</script>


<template>
  <general-header>
    <template #inside-bottom>
      <content-container>
        <u-navigation-menu
          :items="
            links.map(it => ({
              ...it,
              icon: 'i-mdi-package',
              children: it.children?.map(i => ({
                ...i,
                icon: 'i-mdi-text-box',
                description: `Manage all ${i.to?.params?.resourceIdentifier}`
              })),
            }))
          "
        />
      </content-container>
    </template>
  </general-header>
</template>