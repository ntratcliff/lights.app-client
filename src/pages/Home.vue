<template>
	<div>
		<h1><logo /></h1>
		<p>Current profile: <b>{{ state.name }}</b></p>
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
			states: [],
			socket: socket
		}
	},
	created () {
		socket.emit('getRooms', null, (rooms) => {
			this.rooms = rooms
		})

		socket.emit('getState', null, (err, state) => {
			if (err) this.errToast(err)

			console.log('Get state response:')
			console.log(state)
			this.state = state
		})

		socket.on('stateChanged', (state) => {
			this.state = state
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
			socket.emit('setState', { state: state })
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
							this.$bvToast.toast(
								`Successfully deleted profile ${state.name}!`, {
									variant: 'success',
									solid: true
								}
							)
							this.updateStates()
						}
					})
				}
			}).catch(this.errToast)
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
