'use server'

import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  message: z.string().min(1, 'Message is required'),
})

export async function sendDiscordMessage(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please check your entries.',
    }
  }

  const { name, email, message } = validatedFields.data
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    console.error('DISCORD_WEBHOOK_URL is not defined')
    return {
      success: false,
      message: 'Server configuration error. Please try again later.',
    }
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [
          {
            title: 'New Contact Form Submission',
            color: 0x58b9ff, // Light blue color
            fields: [
              {
                name: 'Name',
                value: name,
                inline: true,
              },
              {
                name: 'Email',
                value: email || 'Not provided',
                inline: true,
              },
              {
                name: 'Message',
                value: message,
              },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.statusText}`)
    }

    return {
      success: true,
      message: 'Message sent successfully!',
    }
  } catch (error) {
    console.error('Failed to send message to Discord:', error)
    return {
      success: false,
      message: 'Failed to send message. Please try again.',
    }
  }
}
