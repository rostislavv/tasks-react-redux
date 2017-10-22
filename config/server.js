module.exports = {
  port: 5000,
  session: {
      fileStoreOptions: {
        path: './sessions',
        ttl: 3600 * 24,
        secret: '92lF9D4Nfd0UTH4Qi647h229Z44nn142',
        reapAsync: true,
      },
      secret: 'zZ5VrhB3452lbv4Vd1K6d5r2qS8x37HV',
      name: 'cid',
      cookie: {
        secure: false,
        path: '/',
        httpOnly: true,
        maxAge: 3600 * 1000 * 24,
      },
      saveUninitialized: true,
      resave: true,
    }
}
