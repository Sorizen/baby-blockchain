<template>
  <button
      class="ui-button"
      :class="`ui-button--${buttonSize}`"
      v-bind="$attrs"
      @click="emit('click', props.text)"
  >
    {{ text }}
  </button>
</template>

<script lang="js" setup>

import {computed} from "vue";

const BUTTON_SIZES = {
  small: 'small',
  medium: 'medium',
  big: 'big'
}

const props = defineProps(['text', 'size'])
const emit = defineEmits(['click'])

const buttonSize = computed(() => {
  switch (props.size) {
    case BUTTON_SIZES.small:
        return BUTTON_SIZES.small
    case BUTTON_SIZES.medium:
      return BUTTON_SIZES.medium
    case BUTTON_SIZES.big:
      return BUTTON_SIZES.big
    default:
      return BUTTON_SIZES.small
  }
})
</script>

<style lang="scss" scoped>
.ui-button {
  background: var(--primary-main);
  color: var(--text-primary-invert-main);
  border-radius: toRem(10);

  &--small {
    font-size: toRem(14);
    padding: toRem(10);
  }

  &--medium {
    font-size: toRem(16);
    padding: toRem(20);
  }

  &--big {
    font-size: toRem(18);
    padding: toRem(25);
  }
}
</style>
