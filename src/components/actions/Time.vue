<template>
	<div>
		<hr>
		<!-- v-for values -->
		<div
			v-for="(timing, ti) in timings"
			:key="timing.id"
			class="container"
		>
			<label>{{ getLight(timing.id).room.name }}/{{ getLight(timing.id).light.name }}</label>
			<hr>
			<div
				v-for="(v, vi) in timing.values"
				:key="vi"
				class="row mb-2"
			>
				<div class="col">
					<div class="row">
						<!-- remove button -->
						<div class="col">
							<b-button-close
								class="p-2 float-right"
								@click="removeTime(timings[ti], vi)"
							/>
						</div>
					</div>

					<div class="row">
						<div class="col-sm-3">
							<b-form-input
								:id="`time-${timing.id}-${vi}`"
								v-model="timings[ti].values[vi].time"
								type="time"
							/>
						</div>
						<div class="col-sm-9">
							<light-slider
								v-model="timings[ti].values[vi]"
							/>
						</div>
					</div>
				</div>
			</div>

			<hr>
			<div class="row text-right">
				<div class="col">
					<b-button
						variant="primary"
						@click="addTime(timings[ti])"
					>
						Add Time
					</b-button>
				</div>
			</div>
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
	data () {
		return {
			timings: []
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
	watch: {
		timings (timings) {
			Vue.set(this.value, 'timings', timings)
		}
	},
	methods: {
		getLight (id) {
			return this.lights.find(l => l.light.id === id)
		},
		addLight (light) {
			this.timings.push({
				id: light.id,
				values: []
			})
		},
		removeLight (light) {
			this.timings.splice(this.timings.indexOf(light), 1)
		},
		addTime (timing) {
			var time = new Date()

			// add 1h to previous time if present
			if (timing.values.length > 0) {
				const next = 60 * 60 * 1000 // 1hr in ms

				var last = this.timeToDate(
					timing.values[timing.values.length - 1].time
				)

				time = new Date()
				time.setTime(last.getTime() + next)
			}

			time.setSeconds(0)

			timing.values.push({
				time: this.dateToTime(time),
				value: 128
			})
		},
		removeTime (timing, index) {
			timing.values.splice(index, 1)
		},
		// TODO: implement
		sortTimes (timing) {
			timing.values.sort((a, b) => {
				var da = this.timeToDate(a.time).getTime()
				var db = this.timeToDate(b.time).getTime()
				var comp = da - db
				return comp
			})
		},
		timeToDate (time) {
			return new Date('1970/01/01 ' + time)
		},
		dateToTime (date) {
			return date.toTimeString().split(' ')[0]
		}
	}
}
</script>
