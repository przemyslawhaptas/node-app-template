import bodyParser from 'body-parser';
import helmet from 'helmet';

const useShared = (app) => {
  app.use(helmet());
  app.use(bodyParser.json());
};

export default useShared;
