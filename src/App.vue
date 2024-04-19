<script setup lang="ts">
import { TELEGRAM_URL } from '@/helpers/constants'
</script>

<template>
  <TheTopnav />

  <main class="min-h-[calc(100vh-64px)]">
    <RouterView />
  </main>

  <footer v-if="!$route.params.address" class="footer px-4 py-10 bg-base-200">
    <aside class="gap-0">
      <div class="flex items-center gap-1">Support the Community</div>
      <span class="break-all"> base:0xA7e80a06d0cB623A8E9B18f8675D0730Bba70089 </span>
    </aside>
    <nav>
      <h6 class="footer-title">Links</h6>
      <div class="grid grid-flow-col items-center gap-4">
        <a href="https://github.com/samuveth/fungibles" target="_blank">
          <i-icon-github class="text-[25px]" />
        </a>
        <a href="https://twitter.com/samsamlantan" target="_blank">
          <i-icon-x class="text-[22px]" />
        </a>
        <a :href="TELEGRAM_URL" target="_blank">
          <i-icon-telegram class="text-[25px]" />
        </a>
      </div>
    </nav>
  </footer>

  <TheToasts />
</template>
