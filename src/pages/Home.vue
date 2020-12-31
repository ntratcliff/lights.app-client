<template>
	<div>
		<h1><logo /></h1>
		<div
			v-for="room in rooms"
			:key="room.name"
		>
			<h2>{{ room.name }} </h2>
			<div
				v-for="light in room.lights"
				:key="light.id"
			>
				<light-control
					:light="light"
					:socket="socket"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Logo from 'components/Logo'
import LightControl from 'components/LightControl.vue'
import socket from 'src/socket'

socket.on('connect', () => { console.log('Socket connected!') })

export default {
	components: {
		Logo,
		LightControl
	},
	data () {
		return {
			rooms: [],
			socket: socket
		}
	},
	created () {
		socket.emit('getRooms', {}, (rooms) => {
			console.log('rooms:')
			rooms.forEach(room => console.log(room))
			this.rooms = rooms
		})
	}
}
</script>
