<template>
    <section class="card-due-edit">
    	<div class="block">
			<span class="demonstration"></span>
			<el-date-picker
				v-model="value"
				type="datetime"
				placeholder="Select date and time"
                @blur="saveDueDate"
                @change="saveDueDate"
                default-time="12:00:00"

			>
			</el-date-picker>
		</div>
    <!-- <input type="datetime-local" /> -->
    
    </section>
</template>

<script>

export default {
    props:[],
    data(){
        return{
            value: "",
        }
    },
    computed: {

    },
    methods: {
        saveDueDate() {
            const timestamp = Date.parse(this.value);
            this.$emit('saveDueDate', timestamp);
        }
    },
    created(){
        document.querySelector('input').focus();

    },
    mounted(){

    },
    watch: {

    },
    components: {
    }

}
</script>

<style>

</style>