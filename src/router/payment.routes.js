import Payment from "@/features/payment/pages/payment.vue";


export default [

	{
		path: '/payment',
		name: 'Payment',
		component: Payment,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	}
]