const setRoutes = (router, controller) => {
  const {
    index,
  } = controller;

  router.get('/', index);
};

export default setRoutes;
