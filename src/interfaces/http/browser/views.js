import { createEngine } from 'express-react-views';
import path from 'path';

const RELATIVE_VIEW_DIRS = [
  '/some_domain/views',
];

const buildViewDirs = (relativeViewDirs) =>
  relativeViewDirs.map((relative) => path.join(__dirname, relative));

const setViews = (app) => {
  app.set('views', buildViewDirs(RELATIVE_VIEW_DIRS));
  app.set('view engine', 'jsx');
  app.engine('jsx', createEngine());
};

export default setViews;
