export default function angleTimeFrequencyResolution(data: string) {
  return data.replace(/-([-]?[0-9])[d]([0-9])/, '$1.$2');
}
