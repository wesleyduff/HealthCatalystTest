using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Asset1.Migrations
{
    public partial class UpdateMigrationse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Person");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Person",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Person");

            migrationBuilder.AddColumn<int>(
                name: "Title",
                table: "Person",
                nullable: false,
                defaultValue: 0);
        }
    }
}
