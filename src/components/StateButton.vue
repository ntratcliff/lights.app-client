<template>
	<b-dropdown
		split
		:text="fullName"
		v-bind="$attrs"
		@click="$emit('apply', state)"
	>
		<b-dropdown-item @click="$emit('apply', state)">
			Apply
		</b-dropdown-item>
		<b-dropdown-item @click="$emit('edit', state)">
			Edit
		</b-dropdown-item>
		<b-dropdown-item
			variant="primary"
			:disabled="state.default"
			@click="$emit('make-default', state)"
		>
			Set as Default
		</b-dropdown-item>
		<b-dropdown-item
			variant="danger"
			@click="$emit('delete', state)"
		>
			Delete
		</b-dropdown-item>
	</b-dropdown>
</template>

<script>
export default {
	props: {
		state: {
			type: Object,
			required: true
		}
	},
	computed: {
		fullName () {
			return this.state.name.concat(this.state.default ? ' (Default)' : '')
		}
	}
}
</script>
