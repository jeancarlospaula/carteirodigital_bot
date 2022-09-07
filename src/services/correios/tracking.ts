import { rastreio } from 'rastreio-correios'
import { RastreioResult } from 'rastreio-correios/dist/interfaces/rastreio'

const tracking = async (
  codes: string | string[]
): Promise<RastreioResult[]> => {
  const data = await rastreio(codes)
  return data
}

export { tracking }
