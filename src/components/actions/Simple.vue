<template>
	<div>
		<!-- v-for values -->
		<hr>
		<div
			v-for="(light, index) in value.values"
			:key="light.id"
		>
			<!-- remove button -->
			<b-button-close
				@click="removeLight(light)"
			/>

			<!-- brightness control (slider/number) -->
			<light-slider
				v-model="value.values[index]"
				:label="`${getLight(light.id).room.name}/${getLight(light.id).light.name}`"
			/>
		</div>
		<hr>

		<!-- add light dropdown button -->
		<div class="text-right">
			<b-dropdown
				id="add-value"
				text="Add Light"
				variant="primary"
				right
				class="m-2"
			>
				<b-dropdown-item
					v-for="item in lights"
					:key="item.light.id"
					@click="addLight(item.light)"
				>
					{{ item.room.name }}/{{ item.light.name }}
				</b-dropdown-item>
			</b-dropdown>
		</div>
	</div>
</template>

<script>
import LightSlider from 'components/LightSlider.vue'
import Vue from 'vue'
export default {
	components: { LightSlider },
	props: {
		value: {
			type: Object,
			required: true
		},
		rooms: {
			type: Array,
			required: true
		}
	},
	computed: {
		lights () {
			return this.rooms.map((r) => {
				return r.lights.map(l => {
					return {
						room: r,
						light: l
					}
				})
			}).flat()
		}
	},
	created () {
		if (!this.value.values) Vue.set(this.value, 'values', [])
	},
	methods: {
		getLight (id) {
			return this.lights.find(l => l.light.id === id)
		},
		addLight (light) {
			this.value.values.push(light)
		},
		removeLight (light) {
			this.value.values.splice(this.values.indexOf(light), 1)
		}
	}
}
</script>
