const constructController = () => {
  const index = (req, res) => {
    res.render('HelloWorld', { name: 'John' });
  };

  return {
    index,
  };
};

export default constructController;
