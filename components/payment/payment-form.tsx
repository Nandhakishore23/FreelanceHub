"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

interface PaymentFormProps {
  contractId: string
  jobTitle: string
  freelancerName: string
}

export default function PaymentForm({ contractId, jobTitle, freelancerName }: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [amount, setAmount] = useState<number>(0)
  const [description, setDescription] = useState<string>("")
  const [paymentType, setPaymentType] = useState<"milestone" | "hourly" | "bonus">("milestone")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractId,
          amount,
          description,
          type: paymentType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment")
      }

      setClientSecret(data.clientSecret)
    } catch (error) {
      console.error("Error creating payment:", error)
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to create payment",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm amount={amount} />
      </Elements>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Payment</CardTitle>
        <CardDescription>
          Pay {freelancerName} for their work on "{jobTitle}"
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              min="1"
              step="0.01"
              required
              value={amount || ""}
              onChange={(e) => setAmount(Number.parseFloat(e.target.value))}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentType">Payment Type</Label>
            <select
              id="paymentType"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value as any)}
              disabled={isLoading}
            >
              <option value="milestone">Milestone Payment</option>
              <option value="hourly">Hourly Payment</option>
              <option value="bonus">Bonus Payment</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              placeholder="Describe what this payment is for..."
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading || amount <= 0}>
            {isLoading ? "Processing..." : "Continue to Payment"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payments/success`,
        },
        redirect: "if_required",
      })

      if (error) {
        setErrorMessage(error.message || "Payment failed")
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast({
          title: "Payment Successful",
          description: `Your payment of $${amount.toFixed(2)} has been processed successfully.`,
        })
        router.push("/payments/success")
      }
    } catch (error) {
      console.error("Payment error:", error)
      setErrorMessage("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>Enter your card details to pay ${amount.toFixed(2)}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <PaymentElement />
          {errorMessage && <p className="text-sm text-destructive mt-2">{errorMessage}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => window.history.back()}>
            Back
          </Button>
          <Button type="submit" disabled={!stripe || isLoading}>
            {isLoading ? "Processing..." : "Pay Now"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

