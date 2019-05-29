<template>
<div class="index">
  {{msg}}
  <router-view></router-view>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Index extends Vue {
  private msg = 'index';
}
</script>

<style>

</style>
