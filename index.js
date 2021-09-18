import config from 'config';
import constructApp from 'src/app';

const app = constructApp(config);

app.start();
