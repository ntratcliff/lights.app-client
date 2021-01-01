<template>
	<div class="row">
		<label
			v-if="label"
			:for="id"
			class="col-md"
		>
			{{ label }}
		</label>
		<div class="col-9 col-lg-10 pr-1">
			<b-form-input
				:id="`slider-${value.id}`"
				v-model="value.value"
				type="range"
				min="0"
				max="255"
			/>
		</div>
		<div class="col-3 col-lg-2 pl-1">
			<b-form-input
				:id="`number-${value.id}`"
				v-model="value.value"
				type="number"
				min="0"
				max="255"
				@input.native="onNumberInput($event)"
			/>
		</div>
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
	methods: {
		onNumberInput (e) {
			var min = e.target.min
			var max = e.target.max
			e.target.value = Math.max(min, Math.min(max, e.target.value))
		}
	}
}
</script>
