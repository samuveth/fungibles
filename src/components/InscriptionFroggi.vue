<script setup lang="ts">
import { type Inscription } from '@/helpers/types'

const tokenStore = useTokenStore()

const props = defineProps<{
  inscription: Inscription
  animated?: boolean
}>()

// Background URLs
const dynamicCardLowSeed =
  'https://raw.githubusercontent.com/Falazen1/Inscription_Viewer/main/Dynamic_egg_bgr.png'
const dynamicCardHighSeed =
  'https://raw.githubusercontent.com/Falazen1/Inscription_Viewer/main/dynamic_card_frog_bgr.png'

// Function to get background URL
const getCardBgUrl = computed(() => {
  const title = tokenStore.tokenInfo?.key || ''
  const seed = Number(props.inscription.seed.seed)
  const isDynamic = title.includes('Dynamic')

  if (isDynamic) {
    return seed >= 3000 ? dynamicCardHighSeed : dynamicCardLowSeed
  } else {
    return seed >= 3000
      ? 'https://raw.githubusercontent.com/Falazen1/Inscription_Viewer/main/card_blank_frog.png'
      : 'https://raw.githubusercontent.com/Falazen1/Inscription_Viewer/main/nobgblank_card.png'
  }
})

// Placeholder Descriptions (Ensure all necessary descriptions are populated)
const hatDescriptions: Record<number, string> = {
  0: '',
  1: 'wearing a cozy beanie to keep warm in the jungle',
  2: 'sporting a fedora with a mysterious edge',
  3: 'with a daring mohawk, ready for any challenge',
  4: 'shielded from the sun by a baseball cap',
  5: 'an adorned leader of the pond’s expedition',
  6: 'cool under a straw hat and quick as the wind',
  7: 'with a brain throbbing with ancient knowledge',
  8: 'pulsing with blue brainy wisdom',
  9: 'gleaming with the glow of mastery over the pond',
  10: 'donned with a dusty hat over many adventures',
  11: 'clad in a light brown hat, calm and sturdy',
  12: 'A tanned hide hat blends into the wilderness',
  13: 'fierce under a rawhide cowboy hat',
  14: 'noble under a white cowboy hat',
  15: 'well-traveled with a cream hat',
  16: 'marked by a crown that radiates authority',
  17: 'bearing a crown that glows with royalty',
  18: 'under a crown which sparkles with leadership',
  19: 'protected by a shining knight’s helmet',
  20: 'guarded by a knight’s helmet once thought lost',
  21: 'strong under a knight’s helmet from ancient tombs',
  22: 'glorious with a knight’s helmet on a grand journey',
  23: 'dangerous and imposing with spikes lining its head',
  24: 'ready to sail the high seas with a pirate hat',
  25: 'navigating uncharted waters with a pirate hat',
  26: 'a master of the seas and a pirate at heart',
  27: 'marked by golden leaves that symbolize jungle royalty',
  28: 'carrying a wizard’s hat that hints at deep knowledge',
  29: 'wearing a wizard’s hat that adds a touch of mystery',
  30: 'blending into the jungle with a simple wizard’s hat',
  31: 'alluding to magical powers in a decorated wizard’s hat',
  32: 'a wizard’s hat that shines with the light of wisdom',
  33: 'youthful and speckled with warts',
  34: 'virtuous mushrooms that dances like a crown',
  35: 'poisonous mushrooms cling to its head',
  36: 'glowing mysterious mushrooms adorn its head'
}

const eyewearDescriptions: Record<number, string> = {
  0: '',
  1: 'eyes framed by glasses that add wisdom to its gaze',
  2: 'cyborg goggles to processing the jungle’s data',
  3: 'cyborg goggles to scan for hidden jungle secrets',
  4: 'cyborg goggles which pulse with power',
  5: 'glasses sparkling with hidden wealth',
  6: 'red glasses, adding a cunning look',
  7: 'styled glasses that bring gleam to its eyes',
  8: 'glasses enhancing quick reflexes',
  9: 'glasses that blend into the shadows',
  10: 'sunglasses shielding its eyes from the jungle sun',
  11: 'wearing red sunglasses, adding a fiery flair',
  12: 'gold sunglasses glinting with confidence',
  13: 'concealing its true intentions behind black sunglasses',
  14: 'adding mystery with purple sunglasses',
  15: 'a red scouter analyzing its surroundings with precision',
  16: 'a green scouter scanning the jungle for treasure',
  17: 'a blue scouter locking onto ancient relics',
  18: 'broken reading glasses, showing signs of a long journey',
  19: 'simple reading glasses for the wise and well-traveled',
  20: '3D glasses making the jungle even more vivid',
  21: 'marked by a golden monocle, a scholar of the wilds',
  22: 'shades that add flair in the dense jungle air'
}

const clothesDescriptions: Record<number, string> = {
  0: '',
  1: 'adorned with a bowtie, adding charm and flair',
  2: 'cloaked in a cape, ever on the move',
  3: 'wearing a spiked collar, giving it a feral look',
  4: 'wrapped in a hoodie, keeping the forest breeze at bay',
  5: 'dressed in a suit, venturing with style through the wilds',
  6: 'comfortable in a turtleneck, feeling at home in the pond',
  7: 'with a scarf to keep warm as it explores the forest',
  8: 'clad in a leather jacket, ready for anything in its way',
  9: 'camouflaged by a bandana, hidden within the dense foliage',
  10: 'stealthy with a stripe bandana, blending into the shadows',
  11: 'tactical with a plaid bandana, prepared jungle strategies',
  12: 'adaptable with a white plaid bandana',
  13: 'Moving quietly through the trees under a blue bandana',
  14: 'protected by knight armor, delving into ancient ruins',
  15: 'charging into battle with gleaming knight armor',
  16: 'glowing in knight armor, defending the forest realm',
  17: 'shielded by knight armor, fending off jungle dangers',
  18: 'strong with an unbreakable chain',
  19: 'subtle but tough with a chain around its neck',
  20: 'adorned with a chain, a seeker of adventure',
  21: 'cyborg armor that melds tech and survival',
  22: 'enhancing jungle endurance with cyborg armor',
  23: 'radiating power with red cyborg armor',
  24: 'strong and wealthy, showing a golden A.K. necklace',
  25: 'exploring the unknown in a astronaut suit',
  26: 'adventuring across the stars in a shining astronaut suit',
  27: 'mysterious in a astronaut suit, traveling beyond the stars'
}

const backgroundDescriptions: Record<string, string> = {
  '0': 'Joyful, excited about the world around.',
  '1': 'Peaceful and content by the water, enjoying the quiet.',
  '2': 'Adventurous, always seeking new places to explore.',
  '3': 'Secretive, happiest when blending into the jungle.',
  '4': 'Prefers basking in the warmth of sunny spots.',
  '5': 'Calm and relaxed, often found near serene ponds.',
  '6': 'Active at night, thriving when the sun goes down.',
  '7': 'Most at home in nature, connected to the wild.',
  '8': 'Always ready for the next big adventure.',
  '9': 'Solitary, often found in quiet reflection.',
  '10': 'Curious and intrigued by everything around.',
  '11': 'Resilient, facing challenges with determination.',
  '12': 'Playful, chasing after leaves and breezes.',
  '13': 'Steady and calm, reliable in any situation.',
  '14': 'Bold and unafraid to take risks.',
  '15': 'Quietly observant, watching the world go by.',
  '16': 'Nocturnal, thriving in the quiet of the night.',
  '17': 'Sociable, enjoying warmth and close company.',
  '18': 'Gentle, offering comfort and calm to others.',
  '19': 'Cautious, always aware of the surroundings.',
  '20': 'Soft-hearted, creating a peaceful atmosphere.',
  '21': 'Full of energy, always on the move.',
  '22': 'Patient and unhurried, moving at its own pace.',
  '23': 'A dreamer, gazing at the sky and imagining adventures.',
  '24': 'Cheerful, finding joy in the simple things.',
  '25': 'Curious, always discovering little treasures.',
  '26': 'Harmonious, content in nature’s embrace.',
  '27': 'Brave and ready to face any challenge.',
  '28': 'Joyful, excited about the world around.'
}

// Interface for Stats
interface Stats {
  hp: number | string
  atk: number | string
  def: number | string
  level: number | string
  flavorText: string
}

// Function to capitalize the first letter
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Function to generate flavor text
function generateFlavorText(
  hat: number,
  eyewear: number,
  clothes: number,
  bgPalette: string,
  traitCount: number
): string {
  // Check if the Froggi has no traits (0, 0, 0) and apply background description
  if (
    (hat === 0 || hat === null) &&
    (eyewear === 0 || eyewear === null) &&
    (clothes === 0 || clothes === null)
  ) {
    return 'Bare bodied and relying on its wits alone. ' + (backgroundDescriptions[bgPalette] || '')
  }

  // Get descriptions for hat, eyewear, and clothes
  const hatText = hatDescriptions[hat] || ''
  const eyewearText = eyewearDescriptions[eyewear] || ''
  const clothesText = clothesDescriptions[clothes] || ''

  // Filter out empty descriptions
  const parts = [hatText, eyewearText, clothesText].filter((part) => part !== '')

  // If there's only one trait, append the background description
  if (parts.length === 1) {
    let backgroundText = backgroundDescriptions[bgPalette] || ''
    if (backgroundText.endsWith('.')) {
      backgroundText = backgroundText.slice(0, -1)
    }
    parts.push(backgroundText)
  }

  // Join all parts, apply capitalization to the final result, and return
  return capitalizeFirstLetter(parts.length > 0 ? parts.join(', ') + '.' : '')
}

// Function to calculate stats based on traits and level
function calculateStats(
  hat: number,
  eyewear: number,
  clothes: number,
  level: number
): { hp: number; atk: number; def: number } {
  let hp = 10 * level
  let atk = 5 * level
  let defStat = 0

  // Apply bonuses for HATS
  if (hat === 3) {
    // Mohawk
    atk += 5
  }
  if (hat === 5) {
    // Captain Hat
    atk += 5
    defStat += 1
  }
  if (hat === 6) {
    // Straw Hat
    atk += 10
  }
  if (hat >= 10 && hat <= 15) {
    // Cowboy Hats
    atk += 5
  }
  if (hat >= 16 && hat <= 18) {
    // Crowns
    hp += 10
  }
  if (hat >= 19 && hat <= 22) {
    // Knight Helmets
    defStat += 1
  }
  if (hat === 23) {
    // Spikes
    atk += 5
  }
  if (hat >= 24 && hat <= 26) {
    // Pirate Hats
    atk += 5
  }
  if (hat >= 28 && hat <= 32) {
    // Wizard Hats
    hp -= 5
  }
  if (hat === 34 || hat === 35 || hat === 36) {
    // Special mushroom hats
    hp -= 5
  }

  // Apply bonuses for EYEWEAR
  if (eyewear >= 15 && eyewear <= 17) {
    // Scanners
    atk += 10
    hp -= 5
  }
  if (eyewear === 2 || eyewear === 3 || eyewear === 4) {
    // Cyborg goggles
    atk += 5
    hp -= 5
  }
  if (eyewear === 5) {
    // Hidden wealth glasses
    hp -= 5
  }
  if (eyewear >= 18) {
    // Broken or reading glasses
    atk += 5
    hp -= 5
  }

  // Apply bonuses for CLOTHES
  if (clothes === 3) {
    // Collar
    atk += 10
  } else if (clothes === 8) {
    // Leather Jacket
    atk += 5
    defStat += 1
  } else if (clothes >= 14 && clothes <= 17) {
    // Knight Armor
    defStat += 2
    atk -= 5
  } else if (clothes >= 21 && clothes <= 23) {
    // Cyborg Armor
    atk += 5
    defStat += 1
    hp -= 10
  } else if (clothes === 24) {
    // AK Necklace
    atk += 10
  } else if (clothes >= 25 && clothes <= 27) {
    // Spacesuit
    atk += 5
    defStat += 1
    hp += 10
  }
  // Bandanas and Scarf give +5 atk
  else if (clothes === 7 || (clothes >= 9 && clothes <= 13)) {
    // Bandanas and Scarf
    atk += 5
  }

  // Default bonuses for non-zero traits
  if (hat !== 0) {
    hp += 10
  }
  if (eyewear !== 0) {
    hp += 10
  }
  if (clothes !== 0) {
    hp += 10
  }

  // Cap defense for non-knights
  if (defStat >= 3 && (hat < 19 || hat > 22)) {
    defStat = 2 // Non-knights max defense is 2
  }

  return { hp, atk, def: defStat }
}

// Function to get set bonus
function getSetBonus(
  hat: number,
  eyewear: number,
  clothes: number,
  bgPalette: string,
  bodyPalette: string,
  eyesPalette: string
): { description: string; bonus: { atk: number; def: number; hp: number } } | null {
  const sets: Record<string, Record<string, any>> = {
    knightSet: {
      black: {
        hat: 21,
        clothes: 14,
        description: 'Clad in gleaming black armor, a formidable protector of the untamed jungle.',
        bonus: { atk: 10, def: 2, hp: 25 },
        requiredTraits: 2
      },
      emerald: {
        hat: 20,
        clothes: 15,
        description:
          'Charging fearlessly into battle, wrapped in emerald armor that catches the light.',
        bonus: { atk: 5, def: 3, hp: 25 },
        requiredTraits: 2
      },
      silver: {
        hat: 19,
        clothes: 17,
        description:
          'Stalwart and unyielding, standing strong in the ancient silver knight’s armor.',
        bonus: { atk: 5, def: 3, hp: 25 },
        requiredTraits: 2
      },
      gold: {
        hat: 22,
        clothes: 16,
        description: 'Radiant in golden armor, a proud guardian of the forest’s mysteries.',
        bonus: { atk: 10, def: 2, hp: 25 },
        requiredTraits: 2
      }
    },
    cyborgSet: {
      blue: {
        eyewear: 2,
        clothes: 21,
        description: 'A marvel of technology, seamlessly blending with the jungle’s challenges.',
        bonus: { atk: 15, def: 1, hp: 10 },
        requiredTraits: 2
      },
      green: {
        eyewear: 3,
        clothes: 22,
        description:
          'Designed for endurance, this blend of technology and nature stands resilient.',
        bonus: { atk: 15, def: 1, hp: 10 },
        requiredTraits: 2
      },
      red: {
        eyewear: 4,
        clothes: 23,
        description: 'Power surges within, an unstoppable force with a keen eye on the future.',
        bonus: { atk: 30, def: 2, hp: 0 },
        requiredTraits: 2
      }
    }
    // ... (add other sets similarly)
  }

  // Check for matching sets, considering required traits
  for (const set in sets) {
    const colors = sets[set]
    for (const color in colors) {
      const setDetails = colors[color]

      // For sets with 3 required traits, check that all three (hat, eyewear, and clothes) match
      if (
        setDetails.requiredTraits === 3 &&
        setDetails.hat === hat &&
        setDetails.eyewear === eyewear &&
        setDetails.clothes === clothes
      ) {
        return setDetails // Return the matching set's bonus and description
      }

      // For sets with 2 required traits, check that exactly two traits (hat and clothes, or eyewear and clothes) match
      if (
        setDetails.requiredTraits === 2 &&
        ((setDetails.hat === hat && setDetails.clothes === clothes) ||
          (setDetails.eyewear === eyewear && setDetails.clothes === clothes))
      ) {
        return setDetails // Return the matching set's bonus and description
      }

      // Special case for magma set based on palette matching
      if (
        set === 'magmaSet' &&
        setDetails.paletteMatch &&
        setDetails.paletteMatch.bgPalette === bgPalette &&
        setDetails.paletteMatch.bodyPalette === bodyPalette &&
        setDetails.paletteMatch.eyesPalette === eyesPalette
      ) {
        return setDetails // Return matching set's bonus and description for magma set
      }
    }
  }

  return null // No set bonus if not all required traits match
}

// Egg-specific description
function getEggDescription(seed: number): string {
  if (seed < 3000) {
    return 'This Froggi Egg hasn’t hatched yet. Grow or combine it to over 3000 tokens for it to mature and use it in-game.'
  }
  return ''
}

// Function to format traits
function formatTraits(seed: number, meta: any): string {
  const traits = []
  if (meta.hat !== '0') traits.push(`Hat: ${hatDescriptions[Number(meta.hat)]}`)
  if (meta.eyewear !== '0') traits.push(`Eyewear: ${eyewearDescriptions[Number(meta.eyewear)]}`)
  if (meta.clothes !== '0') traits.push(`Clothes: ${clothesDescriptions[Number(meta.clothes)]}`)
  return traits.join(', ')
}

// Computed Properties for Stats and Flavor Text
const computedStats = computed<Stats>(() => {
  const meta = props.inscription.meta
  const seed = Number(props.inscription.seed.seed)
  let hp: number | string = '?'
  let atk: number | string = '?'
  let def: number | string = '?'
  let level: number | string = '?'
  let flavorText: string = ''

  if (seed >= 3000) {
    const hat = parseInt(meta.hat)
    const eyewear = parseInt(meta.eyewear)
    const clothes = parseInt(meta.clothes)
    const levelNum = parseInt(meta.level)
    const bgPalette = meta.bgPalette
    const bodyPalette = meta.bodyPalette
    const eyesPalette = meta.eyesPalette

    const setBonus = getSetBonus(hat, eyewear, clothes, bgPalette, bodyPalette, eyesPalette)

    if (setBonus) {
      flavorText = setBonus.description
      atk = 5 * levelNum + setBonus.bonus.atk
      def = 1 + setBonus.bonus.def
      hp = 10 * levelNum + setBonus.bonus.hp
    } else {
      flavorText = generateFlavorText(
        hat,
        eyewear,
        clothes,
        bgPalette,
        [hat, eyewear, clothes].filter((trait) => trait !== 0).length
      )
      const calculatedStats = calculateStats(hat, eyewear, clothes, levelNum)
      atk = calculatedStats.atk
      def = calculatedStats.def
      hp = calculatedStats.hp
    }

    // Apply golden class bonus if applicable (3/3 animations)
    if (goldenClass.value) {
      if (typeof atk === 'number') atk += 5
      if (typeof def === 'number') def += 1
      if (typeof hp === 'number') hp += 10
    }

    level = levelNum
  } else {
    flavorText = getEggDescription(seed)
    atk = '?'
    def = '?'
    hp = '?'
    level = '?'
  }

  return { hp, atk, def, level, flavorText }
})

const stats = computed(() => computedStats.value)

// Compute classes for golden, blue-based, etc.
const basedClass = computed(() => {
  const meta = props.inscription.meta
  const isBased =
    meta.bgPalette === '0' &&
    meta.bodyPalette === '53' &&
    meta.eyesPalette === '5' &&
    meta.eyewear === '6' &&
    meta.clothes === '13' &&
    meta.hat === '0' &&
    meta.colorCycle === '1' &&
    meta.animateBg === 'false'

  const isNewBased =
    meta.bgPalette === '9' &&
    meta.bodyPalette === '23' &&
    meta.eyesPalette === '5' &&
    meta.eyewear === '9' &&
    meta.clothes === '19' &&
    meta.hat === '0' &&
    meta.animateBg === 'false' &&
    meta.animateBody === 'true'

  const isNewBased2 =
    meta.bgPalette === '3' &&
    meta.bodyPalette === '35' &&
    meta.eyesPalette === '6' &&
    meta.eyewear === '0' &&
    meta.clothes === '0' &&
    meta.hat === '17' &&
    meta.animateBg === 'false' &&
    meta.animateBody === 'false'

  return isBased || isNewBased || isNewBased2 ? 'blue-based' : ''
})

const goldenClass = computed(() => {
  return animationCount.value === 3 && Number(props.inscription.seed.seed) >= 3000 ? 'golden' : ''
})

const rareClass = computed(() => {
  const meta = props.inscription.meta
  return meta.animateBg === 'false' &&
    meta.animateBody === 'true' &&
    meta.eyewear === '50' &&
    meta.hat === '0' &&
    meta.colorCycle === '1'
    ? 'rare-holo'
    : ''
})

const rareClass2 = computed(() => {
  const meta = props.inscription.meta
  return meta.animateBg === 'false' &&
    meta.animateBody === 'true' &&
    (meta.hat === '160' || meta.hat === '170' || meta.hat === '180') &&
    meta.colorCycle === '1' &&
    (meta.eyewear === '0' || meta.eyewear === '8')
    ? 'rare-holo2'
    : ''
})

const magmaClass = computed(() => {
  const meta = props.inscription.meta
  return meta.bgPalette === '7' &&
    meta.bodyPalette === '11' &&
    meta.eyesPalette === '1' &&
    meta.hat === '30' &&
    meta.clothes === '20' &&
    meta.animateBg === 'true'
    ? 'magma'
    : ''
})

// Compute animation count
const animationCount = computed(() => {
  const meta = props.inscription.meta
  return (
    (meta.animateBg === 'true' ? 1 : 0) +
    (meta.animateBody === 'true' ? 1 : 0) +
    (meta.eggAnimation > 0 ? 1 : 0) +
    (meta.colorCycle > 0 ? 1 : 0)
  )
})

// Combine all classes
const cardClasses = computed(() => {
  return `${basedClass.value} ${goldenClass.value} ${rareClass.value} ${rareClass2.value} ${magmaClass.value}`
})
</script>

<template>
  <div class="inscription" :class="cardClasses">
    <!-- Card Background -->
    <div class="card-bg" :style="{ backgroundImage: `url(${getCardBgUrl})` }"></div>

    <!-- Seed Information -->
    <p class="seed">Seed: {{ props.inscription.seed.seed }}</p>

    <!-- SVG Container -->
    <div
      class="svg-container"
      v-html="props.animated ? props.inscription.animatedSvg : props.inscription.svg"
    ></div>

    <!-- Level Display -->
    <div class="level" v-if="stats.level !== '?'">Level {{ stats.level }} Froggi</div>

    <!-- Flavor Text -->
    <div class="flavor-stats">
      <p class="flavor-text">{{ stats.flavorText }}</p>
    </div>

    <!-- Stats at the Bottom -->
    <div class="stats">
      <span>ATK: {{ stats.atk }}</span>
      <span>DEF: {{ stats.def }}</span>
      <span>HP: {{ stats.hp }}</span>
    </div>
  </div>
</template>

<style scoped>
.inscription {
  display: inline-block;
  width: 228px;
  height: 330px;
  vertical-align: top;
  position: relative;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  user-select: none;
  transform-style: preserve-3d;
  perspective: 1000px;
  transform-origin: center center;
}

.card__shine {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: radial-gradient(
    circle at var(--posx) var(--posy),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0) 50%
  );
  opacity: 0.2;
  z-index: 4 !important;
  transition:
    background 0.1s ease,
    opacity 0.3s ease;
}

.blue-based .card__shine,
.golden .card__shine,
.rare-holo .card__shine,
.rare-holo2 .card__shine,
.magma .card__shine {
  z-index: 2 !important;
}

.card__grain {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCI+CjxmaWx0ZXIgaWQ9Im4iPgo8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjciIG51bU9jdGF2ZXM9IjEwIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT4KPC9maWx0ZXI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjAuMyI+PC9yZWN0Pgo8L3N2Zz4=');
  opacity: 0.2;
  z-index: 5 !important;
  transition: opacity 0.3s ease;
}

.inscription .svg-container {
  position: absolute;
  top: 13px;
  left: 23px;
  width: 190px;
  height: 190px;
  overflow: hidden;
  z-index: 0;
}

.inscription svg {
  width: 94%;
  height: 94%;
  object-fit: cover;
}

.inscription .card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  z-index: 2;
  backface-visibility: hidden;
  border-radius: 5px;
}

.inscription .card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 97%;
  background: url('https://raw.githubusercontent.com/Falazen1/Inscription_Viewer/main/cardback_1.png');
  background-size: cover;
  transform: rotateY(180deg);
  backface-visibility: hidden !important;
  border-radius: 5px;
  z-index: 3 !important;
}

.inscription .seed {
  font-family: 'Gill Sans', sans-serif;
  font-size: 9px;
  color: white;
  text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: -1px;
  right: 15px;
  z-index: -3;
}

.inscription .level {
  font-family: 'Gill Sans', sans-serif;
  color: #333;
  position: absolute;
  top: 204px;
  left: 64px;
  z-index: 2;
  font-size: 14px;
  font-weight: bold;
  backface-visibility: hidden;
}

.flavor-stats {
  font-family: 'VT323' !important;
  position: absolute;
  top: 234px;
  width: 195px;
  left: 18px;
  height: calc(330px - 235px - 10px);
  color: #333;
  text-align: left;
  z-index: 6;
  font-weight: bold;
  font-size: 12px;
  backface-visibility: hidden;
  overflow: hidden;
}

.flavor-stats .flavor-text {
  font-family: 'Gill Sans', sans-serif;
  margin: 5px;
  font-size: 12px;
  line-height: 105%;
  font-weight: bold;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.stats {
  position: absolute;
  bottom: 20px; /* Stick to the bottom of the card */
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-evenly; /* Distribute items evenly */
  align-items: center;
  margin: -2px; /* Force overlap and remove extra space */
  padding: 0;
  line-height: 1; /* Completely collapse spacing */
  gap: -2px; /* Force spans to touch each other */
  background: none; /* Ensure no background interference */
  overflow: hidden;
  z-index: 6;
  font-weight: bold;
  font-size: 14px; /* Match parent font size */
}

.stats span {
  flex: 0 0 auto; /* Prevent unnecessary stretching */
  margin: -2px; /* Remove all space and collapse */
  padding: 0;
  text-align: center;
  line-height: 1; /* Collapse vertical space further */
  font-size: 14px; /* Match parent font size */
  border: none; /* Ensure no visual artifacts */
  overflow: hidden;
  z-index: 6;
}
</style>
