import * as fs from 'fs';
import {join} from 'path';
import {APP_DEST, BOOTSTRAP_FILE, BOOTSTRAP_INJECTED, REV_MANIFEST} from '../config';

export = function revisionProd(gulp, plugins) {
  return function() {
    let manifest = gulp.src(join(APP_DEST, REV_MANIFEST));
    let bootstrapRev = getBootstrapRev();

    return gulp.src(join(APP_DEST, 'index.html'))
      .pipe(plugins.revReplace({manifest: manifest}))
      .pipe(gulp.dest(APP_DEST))
      .pipe(plugins.replace(BOOTSTRAP_INJECTED, bootstrapRev))
      .pipe(gulp.dest(APP_DEST));
  };
};

function getBootstrapRev() {
  let manifest = JSON.parse(fs.readFileSync(join(APP_DEST, REV_MANIFEST)).toString());
  return manifest[BOOTSTRAP_FILE].split('.').shift();
}
