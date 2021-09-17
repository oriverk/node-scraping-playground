export async function sleep(delay: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
