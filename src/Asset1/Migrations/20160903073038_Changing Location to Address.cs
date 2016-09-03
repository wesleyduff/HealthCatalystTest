using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Asset1.Migrations
{
    public partial class ChangingLocationtoAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Person_Location_LocationId",
                table: "Person");

            migrationBuilder.DropIndex(
                name: "IX_Person_LocationId",
                table: "Person");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "Person");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Person",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Person_AddressId",
                table: "Person",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Person_Location_AddressId",
                table: "Person",
                column: "AddressId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Person_Location_AddressId",
                table: "Person");

            migrationBuilder.DropIndex(
                name: "IX_Person_AddressId",
                table: "Person");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Person");

            migrationBuilder.AddColumn<int>(
                name: "LocationId",
                table: "Person",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Person_LocationId",
                table: "Person",
                column: "LocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Person_Location_LocationId",
                table: "Person",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
