<template>
	<div>
		<light-slider
			v-model="value"
			:name="value.name"
			:label="value.name"
			:disabled="disabled"
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
		value: {
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
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			input: false
		}
	},
	watch: {
		value (to) {
			if (this.input) this.sendBrightness()
		}
	},
	created () {
		// set initial brightness from light value
		this.socket.on('lightChanged', this.lightChanged)

		this.sendBrightness = _.debounce(function () {
			var data = this.value
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

			if (!this.input && light.id === this.value.id) {
				this.value.value = light.value
			}
		}
	}
}
</script>
