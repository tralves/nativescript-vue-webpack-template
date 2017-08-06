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
<!--
<style type="text/css" scoped>
	label{
		color: red;
	}
</style>
-->

<style lang="scss" scoped>
	$red : red;

	label{
		color: $red;
	}
</style>