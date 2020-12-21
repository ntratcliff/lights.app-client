<template>
	<b-navbar
		toggleable="lg"
		type="dark"
		variant="info"
	>
		<b-navbar-brand href="#"><logo /></b-navbar-brand>
		<b-navbar-toggle target="nav-collapse" />

		<b-collapse
			id="nav-collapse"
			is-nav
		>
			<b-navbar-nav>
				<b-nav-item to="/">Home</b-nav-item>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
import Logo from 'components/Logo'

export default {
	components: {
		Logo
	}
}
</script>
