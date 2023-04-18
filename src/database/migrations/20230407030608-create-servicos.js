"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("servicos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ////
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ////
      oficial_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      sgtdia_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      cbgd_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      moto_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      parmcav_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      ////
      frente1_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
         onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      frente2_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      frente3_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      tras1_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      tras2_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      tras3_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      ////
      aloj1_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      aloj2_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      aloj3_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      ////
      garagem1_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      garagem2_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      garagem3_id: {
        type: Sequelize.INTEGER,
        references: { model: "militars", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      ////
      created_at: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("servico");
  },
};
