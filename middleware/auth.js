export default function({ store, error }) {
  if (!store.state.authUser) {
    error({
      message: "Вы не авторизованы",
      statusCode: 403
    });
  }
}
