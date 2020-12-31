<template>
	<div>
		<h2>New Profile</h2>
		<!-- name input -->
		<label for="name">Name</label>
		<b-form-input
			type="text"
		/>
		<div>
			<h3>Actions</h3>
			<hr>
			<div
				v-for="(action, i) in actions"
				:key="action.key"
			>
				<action
					v-model="actions[i]"
					@delete="removeAction(i)"
				/>
			</div>
			<!-- v-for::actions -->
			<!-- add action dropdown button -->
			<hr>
			<div class="text-right">
				<b-dropdown
					id="add-action"
					text="Add"
					variant="primary"
					right
					class="m-2"
				>
					<b-dropdown-item
						v-for="type in actionTypes"
						:key="type"
						@click="addAction(type)"
					>
						{{ type }}
					</b-dropdown-item>
				</b-dropdown>
			</div>
		</div>
		<!-- cancel button // apply button -->
		<div class="text-right">
			<b-button class="m-2 col-sm-4">Cancel</b-button>
			<b-button class="m-2 col-sm-6" variant="primary">Apply</b-button>
		</div>
	</div>
</template>

<script>
import Action from 'components/Action'
import Actions from 'components/actions/Actions'

export default {
	components: {
		Action
	},
	data () {
		return {
			actions: [
				{ type: 'Simple' }
			],
			actionTypes: Object.keys(Actions)
		}
	},
	methods: {
		addAction (type) {
			this.actions.push({
				type: type
			})
		},
		removeAction (i) {
			this.actions.splice(i, 1)
		}
	}
}
</script>
