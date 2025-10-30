const LS_KEY = 'approved-dollars'

export const checkApproval = (stringAmount: string) =>
  stringAmount <= (localStorage.getItem(LS_KEY) || '0')

export const saveApproval = (stringAmount: string) =>
  localStorage.setItem(LS_KEY, stringAmount)

export const clearApproval = () => localStorage.removeItem(LS_KEY)
