<script setup lang="ts">
import { TELEGRAM_URL } from '@/helpers/constants'
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <header>
      <nav class="flex justify-between items-center px-4 py-2 border-b">
        <RouterLink to="/">
          <button class="text-xl">fungibles</button>
        </RouterLink>
        <ButtonConnect />
      </nav>
    </header>

    <RouterView class="flex-grow w-full" />

    <footer v-if="!$route.params.address" class="footer px-4 py-10 bg-base-200">
      <aside class="gap-0">
        <div class="flex items-center gap-1">Support the Community</div>
        <span class="break-all"> base:0xA7e80a06d0cB623A8E9B18f8675D0730Bba70089 </span>
      </aside>
      <nav>
        <h6 class="footer-title">Navigation</h6>
        <RouterLink to="/" class="link link-hover">Discover</RouterLink>
        <RouterLink to="/about" class="link link-hover">About</RouterLink>
        <RouterLink to="/faq" class="link link-hover">FAQs</RouterLink>
      </nav>
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
  </div>

  <TheToasts />
</template>
