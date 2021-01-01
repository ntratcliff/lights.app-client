<template>
	<div>
		<b-form
			@submit.prevent="submit"
		>
			<h2>New Profile</h2>
			<hr>
			<!-- name input -->
			<div class="row">
				<div class="col-3">
					<label for="name">Name</label>
				</div>
				<div class="col">
					<b-form-input
						v-model="name"
						type="text"
						required
					/>
				</div>
			</div>
			<div>
				<hr>
				<div
					v-for="(action, i) in actions"
					:key="action.key"
				>
					<action
						v-model="actions[i]"
						:rooms="rooms"
						@delete="removeAction(i)"
					/>
				</div>
				<!-- v-for::actions -->
				<!-- add action dropdown button -->
				<hr>
				<div class="text-right">
					<b-dropdown
						id="add-action"
						text="Add Action"
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
				<b-button
					class="m-2 col-sm-4"
				>
					Cancel
				</b-button>
				<b-button
					type="submit"
					class="m-2 col-sm-6"
					variant="primary"
				>
					Apply
				</b-button>
			</div>
			{{ profile }}
		</b-form>
	</div>
</template>

<script>
import Action from 'components/Action'
import Actions from 'components/actions/Actions'
import socket from 'src/socket'

export default {
	components: {
		Action
	},
	data () {
		return {
			name,
			actions: [],
			rooms: [],
			actionTypes: Object.keys(Actions)
		}
	},
	computed: {
		profile () {
			return {
				state: {
					name: this.name,
					actions: this.actions
				}
			}
		}
	},
	created () {
		socket.emit('getRooms', null, (rooms) => {
			this.rooms = rooms
		})
	},
	methods: {
		addAction (type) {
			this.actions.push({
				type: type
			})
		},
		removeAction (i) {
			this.actions.splice(i, 1)
		},
		submit (event) {
			if (this.validate(event)) this.apply()
			else return false
		},
		validate (event) {
			const toastSettings = {
				title: 'oop!',
				autoHideDelay: 5000,
				variant: 'warning',
				solid: true
			}

			var profile = this.profile

			if (!profile.state.actions || profile.state.actions.length === 0) {
				this.$bvToast.toast('Please add at least one action', toastSettings)
				return false
			}

			return true
		},
		apply () {
			socket.emit('setState', this.profile)
		}
	}
}
</script>
