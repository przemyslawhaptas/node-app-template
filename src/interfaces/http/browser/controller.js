const constructController = () => {
  const index = (req, res, _next) => {
    res.json({ message: 'from index api' });
  };

  return {
    index,
  };
};

export default constructController;
