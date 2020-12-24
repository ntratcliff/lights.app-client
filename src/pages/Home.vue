<template>
	<div>
		<h1><logo /></h1>
		<h2>Living Room</h2>
		<div
			v-for="light in lights"
			:key="light.id"
		>
			<light-control
				:light="light"
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
			lights: [],
			socket: socket
		}
	},
	created () {
		socket.on('lights', (data) => {
			console.log('lights:')
			data.forEach(l => console.log(l))
			this.lights = data
		})
	}
}
</script>
