<template>
	<div>
		<b-form
			@submit.prevent="submit"
		>
			<h2>Profile</h2>
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
			<div class="row">
				<div class="col-sm-5">
					<b-button
						block
						@click="$router.back()"
					>
						Cancel
					</b-button>
				</div>
				<div class="col-sm-7">
					<b-dropdown
						text="Apply"
						variant="primary"
						split-button-type="submit"
						split
						block
						right
					>
						<be-dropdown-item-button
							type="submit"
							name="save"
						>
							Save
						</be-dropdown-item-button>
						<be-dropdown-item-button
							type="submit"
							name="saveoverwrite"
						>
							Save (Overwrite)
						</be-dropdown-item-button>
					</b-dropdown>
				</div>
			</div>
			<!-- debug profile json view -->
			{{ profile }}
		</b-form>
	</div>
</template>

<script>
import Action from 'components/Action'
import Actions from 'components/actions/Actions'
import ExtDropdownItemButton from 'components/bootstrap-vue-extensions/dropdown-item-button'
import socket from 'src/socket'

export default {
	components: {
		Action,
		'be-dropdown-item-button': ExtDropdownItemButton
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
				},
				replace: true
			}
		}
	},
	created () {
		socket.emit('getRooms', null, (rooms) => {
			this.rooms = rooms
		})
		this.name = this.$route.params.name

		if (this.name) {
			// load profile by name
			socket.emit('getState', { name: this.name }, (err, state) => {
				if (err) this.errToast(err)
				else {
					this.name = state.name
					this.actions = state.actions
				}
			})
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
		},
		submit (event) {
			if (this.validate(event)) this.apply(event)
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
		apply (event) {
			var profile = this.profile

			var save = event.submitter.name && event.submitter.name.startsWith('save')
			var overwrite = event.submitter.name && event.submitter.name.endsWith('overwrite')

			if (save) {
				profile['save'] = save
			}

			if (overwrite) {
				profile['overwrite'] = overwrite
			}

			socket.emit('setState', this.profile, (err) => {
				if (err) {
					this.errToast(err)
				} else if (save) {
					this.$router.back()
				}
			})
		},
		errToast (err) {
			this.$bvToast.toast(
				JSON.stringify(err, null, 2),
				{
					title: 'Error from server',
					variant: 'danger',
					solid: true
				}
			)
		}
	}
}
</script>
