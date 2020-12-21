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
import axios from 'axios'
import _ from 'lodash'

const apiURL = 'http://192.168.1.120:8081'

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
		debounceRate: {
			type: Number,
			default: 50
		},
		updateRate: {
			type: Number,
			default: 1000
		}
	},
	data () {
		return {
			brightness: 0,
			sending: false,
			input: false
		}
	},
	watch: {
		brightness (newValue) {
			console.log(`${this.lightId}: ${newValue}`)
			this.sendBrightness()
		}
	},
	created () {
		this.sendBrightness = _.debounce(function () {
			this.sending = true

			var value = this.brightness
			var id = this.lightId
			console.log(`(${id}) Sending ${value}...`)
			axios.put(
				`${apiURL}/lights/${id}`,
				{ value: value }
			).then(resp => {
				console.log(`(${id}) From server: ${resp.data.value}`)
			}).finally(() => { this.sending = false })
		}, this.debounceRate)
	},
	mounted () {
		this.updateBrightness()
		setInterval(() => this.updateBrightness(), this.updateRate)
	},
	methods: {
		updateBrightness () {
			if (this.sending) return // don't do anything if currently sending data
			if (this.input) return // don't do anything if currently inputting data

			axios
				.get(`${apiURL}/lights/${this.lightId}`)
				.then(resp => {
					console.log(`(${this.lightId}) From server: ${resp.data.value}`)
					this.brightness = resp.data.value
				})
		},
		onInput () {
			this.input = true
			setTimeout(() => { this.input = false }, 500)
		}
	}
}
</script>
