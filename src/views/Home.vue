<template>
 <!-- Creating chart with the help of Chartkick library  -->
	<h3>Electricity prices in Norway as of {{ formattedDate }}, NOK per kWh</h3>
	<area-chart :data="chartData"></area-chart>
</template>

<script>
export default {
	data() {
		return {
			chartData: {}
		}
	},
	computed: {
		date() {
			return new Date();
		},
		formattedDate() {
			return this.date.toLocaleDateString('en-GB');
		}
	},
	created() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			// Fetch data with electricity prices from API
            const url = 'https://playground-norway-power.ffail.win/?zone=NO2&date=2022-01-31&key=2yywtyet';
            const res = await fetch(url);
            const result = await res.json();
            console.log(result);		
			
			// Convert the received object into array
			const arrayOfPrices = Object.entries(result);
			console.log(arrayOfPrices);

			const arrayOfNeededPrices = arrayOfPrices.map(item => {
			const container = {};

			// Convert the received array back to object with necessary data
			container[item[0]] = item[1].NOK_per_kWh;
			return {
				[item[0]]: `${(item[1].NOK_per_kWh).toFixed(2)}`
			}
		})
		console.log('tot data', arrayOfNeededPrices);
		
		const newObject = Object.assign({}, ...arrayOfNeededPrices);
		this.chartData = newObject;

		console.log(newObject);
		}		
	}
}
</script>

<style>
	h3 {
		margin: 1em auto 1em auto;
		text-align: center;
	}
</style>

