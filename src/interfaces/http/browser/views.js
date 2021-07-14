import { createEngine } from 'express-react-views';

const RELATIVE_VIEW_DIRS = [
  './some_domain/views',
];
const ABSOLUTE_PATH_PREFIX = 'src/interfaces/http/browser';

const buildViewDirs = (relativeViewDirs) =>
  relativeViewDirs.map((relative) => ABSOLUTE_PATH_PREFIX + relative.replace('.', ''));

const setViews = (app) => {
  app.set('views', buildViewDirs(RELATIVE_VIEW_DIRS));
  app.set('view engine', 'jsx');
  app.engine('jsx', createEngine());
};

export default setViews;
