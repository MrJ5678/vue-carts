export const logger = store => {
  store.subscribe((mutation, state) => {
    console.log(mutation)
  })
}
