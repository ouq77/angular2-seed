import {join} from 'path';
import {APP_DEST, BUNDLES_DEST, CSS_DEST, LIB_DEST} from '../config';

export = function revisionProd(gulp, plugins) {
  return function () {

    return gulp.src([
        join(BUNDLES_DEST, '**/*.js'),
        join(CSS_DEST, '**/*.css'),
        join(LIB_DEST, '**/*.js')
      ], {base: APP_DEST})
      .pipe(plugins.if('*.css', plugins.cssnano()))
      .pipe(gulp.dest(APP_DEST))
      .pipe(plugins.rev())
      .pipe(plugins.revDeleteOriginal())
      .pipe(gulp.dest(APP_DEST))
      .pipe(plugins.rev.manifest())
      .pipe(gulp.dest(APP_DEST));
  };
};
