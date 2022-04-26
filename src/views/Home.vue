<template>
 <!-- Creating chart with the help of Chartkick library  -->
	<div v-if="error">{{ error }}</div>
	<h3 v-if="!error">Electricity prices in Norway as of {{ formattedDate }}, NOK per kWh</h3>
	<area-chart :data="chartData"></area-chart>
</template>

<script>
export default {
	data() {
		return {
			chartData: {},
			error: ''
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
            const response = await fetch(url);
			try {
				await this.handleResponse(response);
			} catch (error) {
				this.error = error.message;
			}
		},

		async handleResponse(response) {
			if (response.status >= 200 && response.status < 300)  {
				const result = await response.json();		
			
				// Convert the received object into array
				const arrayOfPrices = Object.entries(result);

				// Convert the received array back to object with necessary data
				const arrayOfNeededPrices = arrayOfPrices.map(item => {
					const container = {};
					container[item[0]] = item[1].NOK_per_kWh;
					return {
						[item[0]]: `${(item[1].NOK_per_kWh).toFixed(2)}`
					}
				})
		
				//Convert array of objects into one object that can be used in the chart
				const newObject = Object.assign({}, ...arrayOfNeededPrices);
				this.chartData = newObject;
				return true;
			} else {
				if (res.status === 404) {
					throw new Error('Url not found');
				}
				if (res.status === 401) {
					throw new Error('Unauthorized');
				}
				if (res.status > 500) {
					throw new Error('Server error');
				}
				throw new Error('Something went wrong');
			}            
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

