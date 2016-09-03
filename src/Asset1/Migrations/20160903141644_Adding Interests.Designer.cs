using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Asset1.Domain.Entities;

namespace Asset1.Migrations
{
    [DbContext(typeof(PeopleContext))]
    [Migration("20160903141644_Adding Interests")]
    partial class AddingInterests
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Asset1.Domain.Entities.Interests", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Activity");

                    b.Property<int?>("PersonId");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.ToTable("Interests");
                });

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

                    b.Property<int?>("AddressId");

                    b.Property<int>("Age");

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<int>("Gender");

                    b.Property<string>("LastName");

                    b.Property<string>("Phone");

                    b.Property<int?>("PictureId");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

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

            modelBuilder.Entity("Asset1.Domain.Entities.Interests", b =>
                {
                    b.HasOne("Asset1.Domain.Entities.Person")
                        .WithMany("Interests")
                        .HasForeignKey("PersonId");
                });

            modelBuilder.Entity("Asset1.Domain.Entities.Person", b =>
                {
                    b.HasOne("Asset1.Domain.Entities.Location", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId");

                    b.HasOne("Asset1.Domain.Entities.Picture", "Picture")
                        .WithMany()
                        .HasForeignKey("PictureId");
                });
        }
    }
}
