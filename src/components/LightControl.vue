<template>
	<div>
		<h3>{{ name }}</h3>
		<label for="brightness">Brightness</label>
		<b-form-input
			id="brightness"
			v-model="brightness"
			type="range"
			min="0"
			max="255"
			@input="onInput"
		/>
	</div>
</template>

<script>
import _ from 'lodash'

export default {
	props: {
		name: {
			type: String,
			required: true
		},
		lightId: {
			type: Number,
			required: true
		},
		socket: {
			type: Object,
			required: true
		},
		debounceRate: {
			type: Number,
			default: 5
		},
		updateRate: {
			type: Number,
			default: 1000
		}
	},
	data () {
		return {
			brightness: 0,
			input: false
		}
	},
	watch: {
		brightness (newValue) {
			if (this.input) this.sendBrightness()
		}
	},
	created () {
		this.socket.on('lightChanged', this.lightChanged)
		this.socket.emit('getLight', { id: this.lightId }, (light) => {
			this.brightness = light.value
		})

		this.sendBrightness = _.debounce(function () {
			var data = {
				id: this.lightId,
				value: this.brightness
			}
			console.log(`(${data.id}) Sending ${data.value}...`)
			this.socket.emit('setValue', data)
		}, this.debounceRate)
	},
	methods: {
		onInput () {
			this.input = true
			setTimeout(() => { this.input = false }, 100)
		},
		lightChanged (light) {
			console.log(light)
			console.log(`light ${light.id} changed!`)

			if (!this.input && light.id === this.lightId) {
				this.brightness = light.value
			}
		}
	}
}
</script>
