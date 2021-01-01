<template>
	<div class="row">
		<label
			v-if="label"
			:for="id"
			class="col-md"
		>
			{{ label }}
		</label>
		<div class="col-10 col-lg-11 pl-0 pr-1">
			<b-form-input
				:id="`slider-${value.id}`"
				v-model="value.value"
				type="range"
				min="0"
				max="255"
			/>
		</div>
		<div class="col-2 col-lg-1 pl-1 pr-0">
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
