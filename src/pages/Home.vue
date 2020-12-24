<template>
	<div>
		<h1><logo /></h1>
		<div>
			<h2>Living Room</h2>
			<light-control
				name="North"
				:light-id="0"
				:socket="socket"
			/>
			<light-control
				name="West"
				:light-id="1"
				:socket="socket"
			/>
		</div>
	</div>
</template>

<script>
import Logo from 'components/Logo'
import LightControl from 'components/LightControl.vue'
import io from 'socket.io-client'

const serverAddress = 'http://192.168.1.120:8081'
var socket = io(serverAddress, {
	transports: ['websocket'] // websocket only to get around cors issues (this is fine)
})
socket.on('connect', () => { console.log('Socket connected!') })

export default {
	components: {
		Logo,
		LightControl
	},
	data () {
		return {
			socket: socket
		}
	}
}
</script>
