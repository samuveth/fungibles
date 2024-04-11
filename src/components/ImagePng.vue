<script setup lang="ts">
import { Canvg, presets } from 'canvg'

const props = defineProps<{
  svgString: string
}>()

const preset = presets.offscreen()

const targetImg = ref<HTMLImageElement | null>(null)

async function convertSvgToPngWithCanvg(svgString: string) {
  const canvas = new OffscreenCanvas(800, 800)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    console.error('Failed to get canvas context')
    return
  }

  const v = Canvg.fromString(ctx, svgString, preset)
  await v.render()

  const blob = await canvas.convertToBlob()
  const pngUrl = URL.createObjectURL(blob)

  if (targetImg.value) {
    targetImg.value.src = pngUrl
  }
}

onMounted(() => {
  convertSvgToPngWithCanvg(props.svgString)
})
</script>

<template>
  <div>
    <img ref="targetImg" alt="erc20i-image" />
  </div>
</template>
