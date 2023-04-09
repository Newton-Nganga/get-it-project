
const Counties=["Baringo","Bomet" ,"Bungoma" ,"Busia ","Elgeyo Marakwet" 
    ,"Embu ","Garissa ","Homa-Bay ","Isiolo ","Kajiado ","Kakamega ","Kericho ","Kiambu ","Kilifi ","Kirinyaga "
    ,"Kisii" ,"Kisumu ","Kitui" ,"Kwale" ,"Laikipia","Lamu ","Machakos "
    ,"Makueni" ,"Mandera" ,"Meru ","Migori ","Marsabit","Mombasa ","Muranga","Nairobi ","Nakuru "
    ,"Nandi","Narok" ,"Nyamira","Nyandarua" 
    ,"Nyeri ","Samburu ","Siaya" ,"Taita Taveta ","Tana-River ","Tharaka Nithi ","Trans Nzoia",
    "Turkana ","Uasin Gishu ","Vihiga ","Wajir ","West Pokot"]


const Categories =["Househelps","Hairdressers","Carpenters","Pharmacy","Transporter","Plumber"]
    const Validate=(values)=>{
        const Yup_email =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const errors={};
        if(!values.fName){
          errors.fName='Your first name is required'
        }
        if(!values.lName){
          errors.location='Your last name is required'
        }
        if(!values.location){
          errors.location='Your location is required'
        }
        if(!values.category){
          errors.category ='please select a category '
        }
        if(!values.age){
          errors.age='Your first age is required'
        }else if(values.age < 18  || values.age >90){
          errors.age ='Enter a valid age between 18-90 years'
        }
        if(!values.gender){
          errors.gender="Select your gender"
        }
        if(!values.email){
          errors.email="Your email is required"
        }else if(!Yup_email.test(values.email)){
          errors.email="Your email is invalid!"
        }else if(values.email !== values.email.toLowerCase()){
          errors.email = "The email can only be in lowercase"
        }
        if(!values.phone){
          errors.phone="Your phone is required"
        }else if(values.phone.length < 10){
          errors.phone="Your phone number is invalid!"
        }
        if((values.whatsapp) && (values.whatsapp.length < 10)){
          errors.whatsapp="Your whatsapp number is invalid!"        
        }
        if(!values.bio){
          errors.bio ='Your bio is important fill it'
        }else if(values.bio<20){
          errors.bio ='Your bio is too short'
        }
        else if(values.bio >50){
          errors.bio ='Your bio is too long'
        }
        return errors;
       }

export {Validate,Counties,Categories}