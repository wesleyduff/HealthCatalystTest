define('go_go_gadget', [

],
function(){
    
    'use strict';
    var Utilities = {

        /* ----- BUILDER ----------------------- 
       * -------------------------------------
       * -- Builder should build out any items the composer will need to calculate
       * --------------------------------------
       * ---- BUILDER METHODS  
       * -- [ Address, Gender, Interests, picture ]
       * --------------------------------------
       */
        Builder: {

            //-- Builder for addresses 
            /* ----------------------
             * --    params    -----
             *   location : sets this to an object if undefined
             *   sateOptions : Should be a valid US state for now
             */
            Address: function (location, state) {
                var _address,
                location = location || {},
                state = state || 'TX';

                _address = {
                    City: location.city,
                    State: state,
                    Street: location.street,
                    PostalCode: location.postalcode
                };

                return _address;

            },

            //-- Builder for Gender 
            /* ----------------------
             * --    params    -----
             *   title : checks the title, user supplied and figures out the gender
             */
            Gender: function (title) {
                var gender;
                switch (title) {
                    case 'Mr':
                        gender = "Male"
                        break;
                    default:
                        gender = "Female"
                        break;
                };
                return gender;
            },

            //-- Builder for Interests 
            /* ----------------------
             * --    params    -----
             *   _interests : A comma delimted string. 
             *   == Example :  
             *   "test, test2, test3" or "test" or "" or undefined
             */
            Interests: function (_interests) {
                var returnArray = [],
                    interests;
                if (_interests !== undefined && _interests.indexOf(',') !== -1) {
                    interests = _interests.split(',');
                    for (var i = 0; i < interests.length; i++) {
                        interests[i] = interests[i].trim();
                        returnArray.push({ Activity: interests[i] });
                    }
                } else if (_interests !== undefined && _interests.length > 0) {
                    returnArray.push({
                        Activity:
                            (function (n) {
                                if (typeof (n) === "string")
                                   return n.trim().replace(',', '');
                            })(_interests)
                    });
                } else {
                    returnArray.push({ Activity: 'I currently do not have any interests.'});
                }

                return returnArray;
            },

            /* -- Build out the picture object 
             * -----
             * NOTE * API takes 
             * - Large, medium and small.
             * ------
             * We are only using the large for this application.
             */
            Picture: function (pic, gender) {
                if (arguments.length !== 2) {
                    pic = undefined,
                    gender = "Male";
                }
                return pic !== undefined && pic !== '' && arguments.length === 2 ? { Large: pic } : gender === 'Female' ? { Large: '/img/woman.png' } : { Large: '/img/man.png' };
               
            }
        },


        /* ----- COMPOSER ----------------------- 
         * -------------------------------------
         * -- Composer should return viewModels to be sent to the backend for a 
         * -- METHOD POST
         * --------------------------------------
         * ---- VIEW MODELS 
         * -- [ PersonViewModel ]
         * --------------------------------------
         */
        Compose: {

            //-- Builder for addresses 
            // ------------------------
            // --    PARAMS    --------
            //  -- [ _person ] : Object
            //  -- [ state ]: String   //  ---- EXAMPLE : TX
            //  -- [ title ] : string  //  ---- EXAMPLE : Mr, Mrs, Miss
            // ------------------------------------
            // --   C# POCO  : PersonViewModel 
            /*  public class PersonViewModel
                {
                    public int Id { get; set; }
                    public Gender Gender { get; set; }
                    public ICollection<Interests> Interests { get; set; }

                    [Required]
                    [StringLength(50, MinimumLength = 2)]
                    public string FirstName { get; set; }

                    [Required]
                    [StringLength(50, MinimumLength = 2)]
                    public string LastName { get; set; }

                    public string FullName
                    {
                        get
                        {
                            var returnString = new StringBuilder();
                            if (this.FirstName != null && this.LastName != null)
                            {
                                returnString.Append(this.FirstName + ' ' + this.LastName);
                            }
                            else
                            {
                                returnString.Append("Full Name Missing");
                            }
                            return returnString.ToString();
                        }
                    }
        
                    public Location Address { get; set; }
                    public int Age { get; set; }
                    [Required]
                    [EmailAddress]
                    public string Email { get; set; }
                    [Phone]
                    public string Phone { get; set; }
                    public Picture Picture { get; set; }
                    public DateTime DateCreated { get; set; }
                }
             */

            PersonViewModel: function (_person, state, title) {
                var personViewModel;

                var _person = _person || {}
                state = state || '',
                title = title || 'Mr';

                //Match ViewModel before sending and Build : Only needed for the post
                //Would split this out to its own method if we were updating people too.
                //this should be broken out into the app_config
                // -- then we can pull that in and do testing on plan javascript objects without needing to pullin the 
                //-- controller etc... 
                personViewModel = {
                    Title: title,
                    FirstName: _person.firstName,
                    LastName: _person.lastName,
                    //using Builder
                    Gender: Utilities.Builder.Gender(title),
                    Email: _person.email,
                    Phone: _person.phone,
                    Age: _person.age,
                    // using Builder
                    Address: Utilities.Builder.Address(_person.location, state),
                    // using Builder
                    Interests: Utilities.Builder.Interests(_person.interests),
                    // using Builder
                    Picture: Utilities.Builder.Picture(_person.largePic, Utilities.Builder.Gender(title))
                };

                return personViewModel;
            }

        }
    };

    return Utilities;

});