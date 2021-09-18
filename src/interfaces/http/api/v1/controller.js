const constructController = () => {
  const index = (req, res, _next) => {
    res.json({ message: 'from api v1 index' });
  };

  return {
    index,
  };
};

export default constructController;
