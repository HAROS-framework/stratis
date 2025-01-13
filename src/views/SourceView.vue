<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

// js -- logic ------------------------------------------------------------
<script setup lang="ts">
import { ref } from 'vue'
const name = ref<string>('ROS2 Workspace')

import fileTree, { getDirectoryNames, getProjectName } from './testData';
console.log(fileTree);

const projectName = getProjectName(fileTree);
const directoryNames = getDirectoryNames(fileTree);

</script>

// html -- content ------------------------------------------------------------
<template>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <ul>
        <li>Home</li>
        <li>Issues</li>
        <li>Contact</li>
        <li>Settings</li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <h1>{{ name }}</h1>
      <p>Project Name: {{ projectName }}</p>
      <p>Directory names are: {{ directoryNames }}</p>

    </main>
  </div>
</template>

// css -- design ------------------------------------------------------------
<style scoped>

.app-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.sidebar li:hover {
  background-color: #34495e;
}

.sidebar li.active {
  background-color: #1abc9c;
  color: #fff;
}

button {
  color-scheme: dark;
  margin-top: 10px;
  padding: 10px;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
