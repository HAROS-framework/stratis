<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

// js -- logic ------------------------------------------------------------
<script setup lang="ts">
import { ref } from 'vue'
const name = ref<string>('ROS2 Workspace')

import fileTree, { getPackageName, getProjectName } from './testData';
console.log(fileTree);

const projectName = getProjectName(fileTree);
const packageNames = getPackageName(fileTree);

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
      <div class="a">Project Name: {{ projectName }}</div>

      <div class="b">
        <p>The available packages are:</p>
        <ul>
          <li v-for="(packageName, index) in packageNames" :key="index">
            {{ packageName }}
          </li>
        </ul>
      </div>

      <div>
        <p>Click the project to show the file system.</p>
        <button type="button" class="collapsible">Click me!</button>
        <div class="content">
          <p>This is a test.</p>
        </div>
      </div>


    </main>
  </div>
</template>

// css -- design ------------------------------------------------------------
<style scoped>

h1 {
  font-weight: bold;
  font-size: 30pt;
  color: #2b5c8e;
}

div.a {
  font-weight: bold;
  font-size: 24px;
  color: #27496c;
}

.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: #555;
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}

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
