module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      jasmine: {
        random: false, // désactiver l'exécution aléatoire des tests
      },
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "../coverage"),
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true,
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,

    // Ajouter la section files pour spécifier les fichiers de test
    files: [
      // Spécifiez les chemins vers vos fichiers de test ici
      "src/tests/**/*.spec.ts",
    ],
  });
};
