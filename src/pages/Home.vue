<template>
	<div>
		<h1><logo /></h1>
		<p>Current profile: {{ state.name }}</p>
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
import socket from 'src/socket'

socket.on('connect', () => { console.log('Socket connected!') })

export default {
	components: {
		Logo,
		StateButton
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

		socket.emit('getStates', null, (states) => {
			console.log('Get states response:')
			states.forEach(console.log)
			this.states = states
		})

		socket.on('stateChanged', (state) => {
			this.state = state
		})
	},
	methods: {
		loadState (state) {
			socket.emit('setState', { state: state })
		},
		editState (state) {
			this.$router.push(`/profile/${state.name}`)
		},
		deleteState (state) {
			console.log(`TODO: implement delete (${state.name})`)
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
