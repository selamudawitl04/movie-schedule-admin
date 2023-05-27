<script setup>
  const selamu = useCookie('name')
  function add() {
    selamu.value = Math.random() + 'Dawit'
    // list cookie not update with this change
  }
  function save() {
    console.log(selamu.value)
  }
  </script>
<template>
    <div>
      <h1>List</h1>
      <pre>{{ selamu }}</pre>
      <button @click="add">Add</button>
      <button @click="save">Save</button>
    </div>
  </template>
  