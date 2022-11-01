<script lang="ts" setup>
import { ref, watchEffect, type PropType } from "vue";
import * as highlight from "highlight.js";

const props = defineProps({
  code: String as PropType<string>,
  lang: {
    type: String as PropType<string>,
    default: "css",
  },
});

const codeHtml = ref("");
const setCode = () => {
  codeHtml.value = highlight.default
    .highlight(props.code as string, {
      language: props.lang,
    })
    .value.trim();
};

watchEffect(() => {
  setCode();
});
</script>

<template>
  <pre><code v-html="codeHtml"></code></pre>
</template>
<style lang="less" scoped>
pre {
  white-space: pre;
  font-size: 13px;
  line-height: 20px;
  max-width: 100%;
  overflow: auto;
}
</style>
