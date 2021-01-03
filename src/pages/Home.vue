<template>
	<div>
		<h1><logo /></h1>
		<p>Current profile: <b>{{ state ? state.name : '[none]' }}</b></p>
		<p>Profiles in stack: <b>{{ stateStack.length }}</b></p>
		<b-row>
			<b-col>
				<b-button
					block
					:disabled="!state || stateStack.length === 1"
					@click="leaveCurrentState()"
				>
					Leave current profile
				</b-button>
			</b-col>
		</b-row>
		<h2>Lights</h2>
		<div class="container">
			<div
				v-for="room in rooms"
				:key="room.name"
				class="container"
			>
				<h3>{{ room.name }}</h3>
				<div
					v-for="(light, index) in room.lights"
					:key="light.id"
					class="row"
				>
					<div class="col">
						<light-control
							v-model="room.lights[index]"
							:socket="socket"
							disabled
						/>
					</div>
				</div>
			</div>
		</div>
		<h2>Profiles</h2>
		<div
			v-for="s in states"
			:key="s.name"
			class="row my-1"
		>
			<div class="col">
				<state-button
					:state="s"
					block
					right
					@apply="loadState"
					@edit="editState"
					@delete="deleteState"
					@make-default="setDefaultState"
				/>
			</div>
		</div>
		<hr>
		<div
			class="row my-1"
		>
			<div class="col">
				<b-button
					variant="primary"
					block
					to="/profile"
				>
					New Profile
				</b-button>
			</div>
		</div>
	</div>
</template>

<script>
import Logo from 'components/Logo'
import StateButton from 'components/StateButton'
import LightControl from 'components/LightControl'
import socket from 'src/socket'

socket.on('connect', () => { console.log('Socket connected!') })

export default {
	components: {
		Logo,
		StateButton,
		LightControl
	},
	data () {
		return {
			rooms: [],
			state: {},
			stateStack: [],
			states: [],
			defaultState: {},
			socket: socket
		}
	},
	watch: {
		stateStack (to) {
			this.state = to.length > 0 ? to[to.length - 1] : null
		}
	},
	created () {
		socket.emit('getRooms', null, (rooms) => {
			this.rooms = rooms
		})

		// socket.emit('getState', null, (err, state) => {
		// 	if (err) this.errToast(err)

		// 	console.log('Get state response:')
		// 	console.log(state)
		// 	this.state = state
		// })

		socket.emit('getStateStack', null, stack => {
			this.stateStack = stack
		})

		socket.on('stateChanged', (stack) => {
			this.stateStack = stack
		})

		this.updateStates()
	},
	methods: {
		updateStates () {
			socket.emit('getStates', null, (states) => {
				console.log('Get states response:')
				states.forEach(console.log)
				this.states = states
			})
		},
		loadState (state) {
			socket.emit('setState', { state: state }, err => {
				if (err) this.errToast(err)
			})
		},
		editState (state) {
			this.$router.push(`/profile/${state.name}`)
		},
		deleteState (state) {
			this.$bvModal.msgBoxConfirm(
				`Are you sure you want to delete profile "${state.name}"?`, {
					title: 'Are you sure?',
					size: 'sm',
					okVariant: 'danger',
					centered: true
				}
			).then(confirm => {
				if (confirm) {
					socket.emit('deleteState', state, (err) => {
						if (err) this.errToast(err)
						else {
							this.successToast(
								`Successfully deleted profile ${state.name}!`
							)
							this.updateStates()
						}
					})
				}
			}).catch(this.errToast)
		},
		setDefaultState (state) {
			this.$bvModal.msgBoxConfirm(
				`Are you sure you want to replace the default profile with "${state.name}"?`, {
					title: 'Are you sure?',
					size: 'sm',
					okVariant: 'primary',
					centered: true
				}
			).then(confirm => {
				if (confirm) {
					socket.emit('setDefault', state, err => {
						if (err) this.errToast(err)
						else this.successToast('Default profile updated!')
					})
				}
			})
		},
		leaveCurrentState () {
			socket.emit('leaveCurrentState')
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
		},
		successToast (msg) {
			this.$bvToast.toast(msg, {
				variant: 'success',
				solid: true
			})
		}
	}
}
</script>
