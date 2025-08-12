module.exports = {
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
