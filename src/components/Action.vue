<template>
	<div>
		<!-- delete button -->
		<b-button-close
			@click="$emit('delete')"
		/>

		<!-- type select -->
		<label
			for="action-type"
		>
			Type
		</label>
		<b-form-select
			id="action-type"
			v-model="value.type"
			:options="Object.keys(typeComponents)"
		/>

		<!-- template based on action type -->
		<component :is="getTypeComponent()" />
	</div>
</template>

<script>
import Actions from 'components/actions/Actions'

export default {
	props: {
		value: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			typeComponents: Actions
		}
	},
	methods: {
		getTypeComponent () {
			return this.typeComponents[this.value.type]
		}
	}
}
</script>
