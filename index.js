var express=require("express");
var app=express();
var bodyParser = require('body-parser');
var Publishable_Key = 'PUBLISHER_KEY';
var Secret_Key = 'SECRET_KEY';
const stripe = require('stripe')(Secret_Key);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use("/assets",express.static("assets"));
app.set("view engine","ejs");

app.get('/',function (req,res){
    res.render('home', {
        key: Publishable_Key
    })
});

app.post('/payment', function(req, res){

    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gourav Hammad',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: 'Indore',
            state: 'Madhya Pradesh',
            country: 'India',
        }
    })
        .then((customer) => {

            return stripe.charges.create({
                amount: 2500,     // Charging Rs 25
                description: 'Web Development Product',
                currency: 'USD',
                customer: customer.id
            });
        })
        .then((charge) => {
            res.send("Success") ; // If no error occurs
        })
        .catch((err) => {
            res.send(err)       // If some error occurs
        });
})

app.listen(3000,function (){
    console.log("listening at 3000")
})
