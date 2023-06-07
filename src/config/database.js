const config = {
    dialect: "mysql",
    host: "10.46.212.7",
    port: 3307,
    username: "root",
    password: "ti_cimnc44",
    database: "escala",
    define: {
      timestamp: true, // cria duas colunas: createdAt e updatedAt
      underscored: true,
      underscoredAll: true,
    },
  };

  export default config;