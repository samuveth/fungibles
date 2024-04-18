<script setup lang="ts">
const route = useRoute()

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'FAQs', path: '/faq' }
]

const drawer1 = ref<HTMLInputElement | null>(null)
</script>

<template>
  <header class="h-[66px]">
    <nav class="fixed w-full z-10">
      <div class="navbar bg-base-100 px-4 shadow-sm">
        <div class="navbar-start">
          <RouterLink to="/">
            <button class="text-xl">fungibles</button>
          </RouterLink>
        </div>

        <div class="navbar-center"></div>
        <div class="navbar-end">
          <ButtonConnect />

          <div class="drawer drawer-end w-fit ml-2">
            <input ref="drawer1" id="drawer1" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
              <label for="drawer1" class="drawer-button btn">
                <i-hi-bars-3-bottom-left-16-solid class="text-base" />
              </label>
            </div>
            <div class="drawer-side">
              <label for="drawer1" aria-label="close sidebar" class="drawer-overlay"></label>
              <ul class="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
                <li v-for="item in navItems" :key="item.name">
                  <RouterLink
                    :to="item.path"
                    :class="{ 'font-semibold': route.path === item.path }"
                    @click="() => drawer1?.click()"
                    >{{ item.name }}</RouterLink
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
