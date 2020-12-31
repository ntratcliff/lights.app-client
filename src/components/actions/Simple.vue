<template>
	<div>
		<h4>Lights</h4>
		<!-- v-for values -->
		<hr>
		<div
			v-for="(light, index) in values"
			:key="light.id"
		>
			<!-- remove button -->
			<b-button-close
				@click="removeLight(light)"
			/>

			<!-- brightness control (slider/number) -->
			<light-slider
				v-model="values[index]"
				:label="light.name"
			/>
		</div>
		<hr>

		<!-- add light dropdown button -->
		<div class="text-right">
			<b-dropdown
				id="add-value"
				text="Add"
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
	data () {
		return {
			values: []
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
	methods: {
		addLight (light) {
			this.values.push(light)
		},
		removeLight (light) {
			this.values.splice(this.values.indexOf(light), 1)
		}
	},
	watch: {
		values (values) {
			Vue.set(this.value, 'values', values)
		}
	}
}
</script>
