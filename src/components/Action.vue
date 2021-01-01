<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<h4>{{ value.type }} Action</h4>
			</div>
			<div class="col">
				<!-- delete button -->
				<b-button-close
					class="p-2 float-right"
					@click="$emit('delete')"
				/>
			</div>
		</div>

		<!-- template based on action type -->
		<component
			:is="getTypeComponent()"
			v-model="value"
			:rooms="rooms"
		/>
	</div>
</template>

<script>
import Actions from 'components/actions/Actions'

export default {
	props: {
		value: {
			type: Object,
			required: true
		},
		rooms: {
			type: Array,
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
