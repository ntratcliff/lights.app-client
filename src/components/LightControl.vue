<template>
	<div>
		<h3>{{ light.name }}</h3>
		<light-slider
			v-model="brightness"
			:name="light.name"
			label="Brightness"
		/>
	</div>
</template>

<script>
import _ from 'lodash'
import LightSlider from 'components/LightSlider'

export default {
	components: {
		LightSlider
	},
	props: {
		light: {
			type: Object,
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
		// set initial brightness from light value
		this.brightness = this.light.value

		this.socket.on('lightChanged', this.lightChanged)

		this.sendBrightness = _.debounce(function () {
			var data = {
				id: this.light.id,
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
			console.log(`light ${light.id} changed!`)

			if (!this.input && light.id === this.light.id) {
				this.brightness = light.value
			}
		}
	}
}
</script>
