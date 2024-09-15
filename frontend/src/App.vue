<template>
    <router-view />
</template>
<script setup>
import 'animate.css';
navigator?.wakeLock?.request("screen");
</script>

<style scoped></style>
