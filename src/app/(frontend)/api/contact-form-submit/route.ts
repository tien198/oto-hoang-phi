import { log } from 'console'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log(body)
    return new Response(JSON.stringify({ message: 'Contact submitted successfully' }), {
      status: 200,
    })
  } catch (error) {
    console.error('Error submitting contact:', error)
    return new Response(JSON.stringify({ message: 'Error submitting contact' }), {
      status: 500,
    })
  }
}
