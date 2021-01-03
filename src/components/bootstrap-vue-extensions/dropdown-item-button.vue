<template>
	<li
		role="presentation"
		v-on="$listeners"
	>
		<button
			v-bind="$attrs"
			role="menuitem"
			class="dropdown-item"
		>
			<slot />
		</button>
	</li>
</template>

<script>
/** Lazy copy of b-dropdown-item-button that supports passing a type attr */
export default {
}
</script>
