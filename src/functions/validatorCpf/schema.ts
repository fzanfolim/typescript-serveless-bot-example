export default {
  type: "object",
  properties: {
    chatId: { type: 'string' },
    query: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
  },
  required: ['chatId','query']
} as const;


