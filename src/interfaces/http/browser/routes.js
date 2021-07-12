const routes = (router, controller) => {
  const {
    index,
  } = controller;

  router.get('/', index);
};

export default routes;
