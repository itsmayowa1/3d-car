'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function RSVPForm() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('RSVP submitted with email:', email)
    setIsSubmitted(true)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>join mailing list</CardTitle>
        <CardDescription>get notified about upcoming events and releases</CardDescription>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        ) : (
          <p className="text-green-600">thank you for you joining our mailing list!</p>
        )}
      </CardContent>
      <CardFooter>
        {!isSubmitted && (
          <Button type="submit" onClick={handleSubmit}>submit</Button>
        )}
      </CardFooter>
    </Card>
  )
}

