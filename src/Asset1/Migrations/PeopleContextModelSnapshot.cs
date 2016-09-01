using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Asset1.Domain.Entities;

namespace Asset1.Migrations
{
    [DbContext(typeof(PeopleContext))]
    partial class PeopleContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Asset1.Domain.Entities.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<string>("PostalCode");

                    b.Property<int>("State");

                    b.Property<string>("Street");

                    b.HasKey("Id");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("Asset1.Domain.Entities.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<int>("Gender");

                    b.Property<string>("LastName");

                    b.Property<int?>("LocationId");

                    b.Property<string>("Phone");

                    b.Property<int?>("PictureId");

                    b.Property<int>("Title");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.HasIndex("PictureId");

                    b.ToTable("Person");
                });

            modelBuilder.Entity("Asset1.Domain.Entities.Picture", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Large");

                    b.Property<string>("Medium");

                    b.Property<string>("Small");

                    b.HasKey("Id");

                    b.ToTable("Picture");
                });

            modelBuilder.Entity("Asset1.Domain.Entities.Person", b =>
                {
                    b.HasOne("Asset1.Domain.Entities.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId");

                    b.HasOne("Asset1.Domain.Entities.Picture", "Picture")
                        .WithMany()
                        .HasForeignKey("PictureId");
                });
        }
    }
}
