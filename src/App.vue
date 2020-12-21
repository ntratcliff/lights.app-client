<template>
	<div>
		<navbar />
		<div class="container">
			<hello-component name="World" />
		</div>
	</div>
</template>

<script>
import HelloComponent from './components/HelloComponent.vue'
import Navbar from './components/Navbar.vue'

export default {
	components: {
		HelloComponent,
		Navbar
	}
}
</script>
