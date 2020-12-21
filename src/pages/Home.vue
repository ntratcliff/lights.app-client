<template>
	<div>
		<h1><logo /></h1>
		<div>
			<h2>Living Room</h2>
			<light-control
				name="North"
				:light-id="0"
			/>
			<light-control
				name="West"
				:light-id="1"
			/>
		</div>
	</div>
</template>

<script>
import Logo from 'components/Logo'
import LightControl from 'components/LightControl.vue'

export default {
	components: {
		Logo,
		LightControl
	}
}
</script>
