function parseFecha(fecha?: string | Date | null) {
  if (!fecha) return null

  const date = fecha instanceof Date ? fecha : new Date(fecha)

  if (isNaN(date.getTime())) return null

  return date
}

export function formatFecha(fecha?: string | Date | null) {
  const date = parseFecha(fecha)

  if (!date) return '-'

  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

export function formatHora(fecha?: string | Date | null) {
  const date = parseFecha(fecha)

  if (!date) return '-'

  return `${new Intl.DateTimeFormat('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)} hrs`
}

export function formatFechaCorta(fecha?: string | Date | null) {
  const date = parseFecha(fecha)

  if (!date) return '-'

  const parts = new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).formatToParts(date)

  const day = parts.find(part => part.type === 'day')?.value
  const month = parts.find(part => part.type === 'month')?.value
  const year = parts.find(part => part.type === 'year')?.value

  if (!day || !month || !year) return '-'

  const mesCapitalizado = month.charAt(0).toUpperCase() + month.slice(1)

  return `${day} ${mesCapitalizado} ${year}`
}