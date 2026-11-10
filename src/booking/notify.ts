import { bookingNotifications } from '../content'
import type { BookingData } from './context'
import { ownerEmailFields } from './message'

/**
 * Emails each confirmed booking to the business owner via Web3Forms
 * (https://web3forms.com), so no booking is lost even if the client never
 * presses "send" in WhatsApp. Configure the key in src/content.ts.
 */
const ENDPOINT = 'https://api.web3forms.com/submit'
const TIMEOUT_MS = 15_000
const RETRY_DELAY_MS = 1_500

const envKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ?? ''
export const notificationKey = (envKey || bookingNotifications.web3formsAccessKey).trim()
export const notificationsEnabled = notificationKey.length > 0

if (!notificationsEnabled && import.meta.env.PROD) {
  console.warn(
    '[Rachy Designs] Booking email alerts are OFF. Add a Web3Forms access key in src/content.ts so every booking is emailed to the owner.',
  )
}

export type NotifyResult = { ok: true } | { ok: false; retryable: boolean; error: string }

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no 0/O or 1/I to avoid mix-ups

/** Short, easy-to-read booking code, e.g. RD-7K3QF. */
export function bookingReference() {
  let code = ''
  for (let i = 0; i < 5; i++) code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  return `RD-${code}`
}

async function postOnce(fields: Record<string, string>): Promise<NotifyResult> {
  const body = new FormData()
  for (const [key, value] of Object.entries(fields)) body.append(key, value)

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      body,
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      keepalive: true, // finish sending even if the visitor closes the tab
    })
    const json = (await res.json().catch(() => null)) as
      | { success?: boolean; message?: string; body?: { message?: string } }
      | null
    if (res.ok && json?.success) return { ok: true }
    return {
      ok: false,
      retryable: res.status >= 500 || res.status === 429,
      error: json?.body?.message ?? json?.message ?? `HTTP ${res.status}`,
    }
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === 'AbortError'
    return { ok: false, retryable: true, error: aborted ? 'Request timed out' : err instanceof Error ? err.message : 'Network error' }
  } finally {
    window.clearTimeout(timer)
  }
}

/** Sends the booking to the owner's inbox, retrying once on network/server errors. */
export async function notifyOwner(data: BookingData, reference: string): Promise<NotifyResult> {
  if (!notificationsEnabled) return { ok: false, retryable: false, error: 'not-configured' }

  const fields = { access_key: notificationKey, ...ownerEmailFields(data, reference) }
  let result = await postOnce(fields)
  if (!result.ok && result.retryable) {
    await new Promise((resolve) => window.setTimeout(resolve, RETRY_DELAY_MS))
    result = await postOnce(fields)
  }
  if (!result.ok) console.error(`[Rachy Designs] Booking ${reference} could not be emailed:`, result.error)
  return result
}
