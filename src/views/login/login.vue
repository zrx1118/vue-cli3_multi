<template>
<div class="login">
  {{msg}}
  <router-view></router-view>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  private msg = 'login';
}
</script>

<style>

</style>
