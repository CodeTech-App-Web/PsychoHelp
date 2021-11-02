<template>
  <div>
    <stripe-checkout
        ref="checkoutRef"
        mode="payment"
        :pk="publishableKey"
        :line-items="lineItems"
        :success-url="successURL"
        :cancel-url="cancelURL"
        @loading="v => loading = v"
    />
    <button @click="submit">Pay now!</button>
  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
  name: "payment",
  components: {
    StripeCheckout,
  },
  data () {
    this.publishableKey = 'pk_test_51Jr9EdFDbJHLEOuuKrrVxAmdDsc1uJPXL2WGeofMmTGcaX8VNFrZFAzZgZiGjJ7g0iyYiVuM6bXcscbCqYTfW06A00dBxdQn3F';
    return {
      loading: false,
      lineItems: [
        {
          price: 'price_1Jr9VMFDbJHLEOuuuz8xBHfH', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: 'http://localhost:8080/',
      cancelURL: 'http://localhost:8080/',
    };
  },
  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>