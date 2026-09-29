import type { OttoMode } from '@/components/otto/eyes'

export const STEPS: { label: string; title: string; mode: OttoMode; status: string }[] = [
  { label: 'Início', title: 'Você abre a conversa.', mode: 'typing', status: 'Pronto para ajudar' },
  { label: 'Pedido', title: 'Você conta o que precisa.', mode: 'pop', status: 'Lendo seu pedido' },
  { label: 'Entende', title: 'Otto entende.', mode: 'idle', status: 'Pedido entendido' },
  { label: 'Trabalha', title: 'Otto trabalha.', mode: 'thinking', status: 'Trabalhando' },
  { label: 'Entrega', title: 'Otto entrega.', mode: 'happy', status: 'Entrega pronta' },
  { label: 'Aprovação', title: 'Você aprova. Otto agenda.', mode: 'pop', status: 'Agendado' },
  { label: 'Resultado', title: 'Otto conta como foi.', mode: 'idle', status: 'Acompanhando' },
]

export const REQUEST = 'Otto, preciso criar uma promoção para o café amanhã.'
