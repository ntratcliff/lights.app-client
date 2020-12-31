<template>
	<div>
		<h1><logo /></h1>
		<p>Current state: {{ state.name }}</p>
	</div>
</template>

<script>
import Logo from 'components/Logo'
import socket from 'src/socket'

socket.on('connect', () => { console.log('Socket connected!') })

export default {
	components: {
		Logo
	},
	data () {
		return {
			rooms: [],
			state: {},
			socket: socket
		}
	},
	created () {
		socket.emit('getRooms', null, (rooms) => {
			this.rooms = rooms
		})

		socket.emit('getState', null, (state) => {
			console.log('Get state response:')
			console.log(state)
			this.state = state
		})
	}
}
</script>
