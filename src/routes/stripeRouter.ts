import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';
;

const router = express.Router();

console.log(process.env.STRIPE_SECRET_KEY_TS);
if (!process.env.STRIPE_SECRET_KEY_TS) {
    throw new Error('Stripe secret key is not defined in environment variables');
}


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TS, {

    typescript: true,
});
router.post(
    "/create-payment-intent",
    async (req: express.Request, res: express.Response): Promise<void> => {
        // Create a PaymentIntent with the order amount and currency.
        const { cart, user, isPaid } = req.body;
        console.log(req.body);
        let totalQuantity = 0;
        let priceWithOutVAT = 0;
        let totalPrice = 0;
        cart.map((item: any) => (totalQuantity += item.ordqty));
        cart.map((item: any) => (priceWithOutVAT += item.ordqty * item.price));
        const gstPrice = (2 / 100) * priceWithOutVAT;

        totalPrice = gstPrice + priceWithOutVAT;
        const params: Stripe.PaymentIntentCreateParams = {
            amount: totalPrice * 100,
            currency: 'AUD',
            automatic_payment_methods: {
                enabled: true,
            }
        };


        try {
            const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
                params
            );


            // Send publishable key and PaymentIntent client_secret to client.
            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (e: any) {
            res.status(400).send({
                error: {
                    message: e.message,
                }
            });
        }
    }
);

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard:
// https://dashboard.stripe.com/test/webhooks


// router.post(
//     "/webhook",

//     async (req: Request, res: Response): Promise<void> => {
//         const sig = req.headers["stripe-signature"] as string;
//         const payload = req.body;

//         let event;

//         try {
//             event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
//         } catch (err) {
//             console.log(`⚠️  Webhook signature verification failed.`);
//             res.sendStatus(400);
//             return;
//         }

//         const data = event.data;
//         const eventType = event.type;

//         if (eventType === "payment_intent.succeeded") {
//             const pi = data.object as Stripe.PaymentIntent;
//             console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
//             console.log("💰 Payment captured!");
//         } else if (eventType === "payment_intent.payment_failed") {
//             const pi = data.object as Stripe.PaymentIntent;
//             console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
//             console.log("❌ Payment failed.");
//         }
//         res.sendStatus(200);
//     }
// );

export default router;