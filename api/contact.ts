import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { name, email, message } = req.body

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Missing required fields",
        success: false,
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
        success: false,
      })
    }

    // Here you would typically:
    // 1. Send email using a service like SendGrid, Nodemailer, etc.
    // 2. Save to database
    // 3. Send notification

    // For now, we'll simulate processing
    console.log("Contact form submission:", {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return res.status(200).json({
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return res.status(500).json({
      error: "Internal server error",
      success: false,
    })
  }
}
