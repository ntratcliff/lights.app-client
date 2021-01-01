<template>
	<div>
		<label
			v-if="label"
			:for="id"
		>
			{{ label }}
		</label>
		<b-form-input
			:id="id"
			v-model="value.value"
			type="range"
			min="0"
			max="255"
		/>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Object,
			required: true
		},
		label: {
			type: String,
			default: null
		}
	},
	computed: {
		id () {
			return `slider-${this.value.id}`
		}
	}
}
</script>
