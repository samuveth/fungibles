<script setup lang="ts">
const tokenStore = useTokenStore()
</script>

<template>
  <main class="px-4 pb-[73px] max-w-6xl mx-auto">
    <div v-if="tokenStore.tokenAddress && tokenStore.tokenInfo">
      <HomeBreadcrumbs class="pb-2" />
      <HomeToken />
    </div>
    <div v-else class="mt-6">
      <h2 class="text-xl font-semibold">Discover</h2>
      <div class="grid grid-cols-3 mt-2">
        <RouterLink
          to="/0x7d9ce55d54ff3feddb611fc63ff63ec01f26d15f"
          class="border rounded hover:scale-[102%] transition-all duration-300 overflow-hidden"
        >
          <div
            class="h-[105px] bg-cover bg-center bg-[url('https://fungifungi.art/images/fungi/background-1.png')]"
          >
            <div class="w-full h-full bg-black bg-opacity-50 flex items-center gap-2 p-4">
              <img
                src="https://fungifungi.art/images/fungi/token-logo.png"
                class="w-[24px] h-[24px] rounded-full"
              />
              <h3 class="text-xl text-white">
                <span class="font-semibold"> Fungi </span>
                <span> / FUNGI </span>
              </h3>
            </div>
          </div>
          <div class="px-4 py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus hic mollitia
            consequatur, architecto modi amet iusto optio minima aspernatur reiciendis ab dolores
            odio. Impedit facere tempora hic numquam recusandae molestiae!
          </div>
        </RouterLink>
      </div>
    </div>
  </main>
</template>
