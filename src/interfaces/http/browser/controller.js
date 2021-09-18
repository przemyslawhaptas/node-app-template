const constructController = () => {
  const index = (req, res, _next) => {
    res.json({ message: 'from browser index' });
  };

  return {
    index,
  };
};

export default constructController;
