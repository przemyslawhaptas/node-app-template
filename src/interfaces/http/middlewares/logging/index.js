import fs from 'fs';
import morgan from 'morgan';

const constructLogger = ({ config }) => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const stream = fs.createWriteStream(
    `log/${config.nodeEnv}.log`,
    { flags: 'a' },
  );

  return {
    console: morgan('dev'),
    file: morgan('combined', { stream }),
  };
};

export default constructLogger;
