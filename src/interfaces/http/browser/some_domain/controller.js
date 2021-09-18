const constructController = () => {
  const index = (req, res) => {
    res.render('HelloWorld', { name: 'Przemek' });
  };

  return {
    index,
  };
};

export default constructController;
