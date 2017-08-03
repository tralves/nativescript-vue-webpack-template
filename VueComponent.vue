<template>
  <label>A {{val}} component.</label>
</template>

<script>
export default {
    data: () => {
        return {
            val: 'Vue.js'
        }
    }
}
</script>

<style type="text/css">
	label{
		color: red;
	}
</style>