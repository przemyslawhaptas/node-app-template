const constructController = () => {
  const index = (req, res, _next) => {
    res.json({ message: 'from someDomain index api' });
  };

  return {
    index,
  };
};

export default constructController;
