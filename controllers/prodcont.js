const productmodel = require("../models/productmodel");

const ProductController = {
    Get: async (req, res) => {
        try {
          const result = await productmodel.find();
          res.send({
            isSuccessful: true,
            data: result
          });
        } catch (error) {
          res.status(500).send({
            isSuccessful: false,
            data: null,
            message: 'Server Error'
          });
        }
      },
    
    // GetById : ("/:id" , (request , response)=>{
    //     let id = request.params.id;
    //     let obj = products.find((x)=> x.id == id);
    //     if( !obj){
    //         response.send(
    //             {
    //                 isSuccessful: false,
    //                 data : null,
    //                 message :"No Product Found"
    //             });
    //     }else{
    //         response.send(
    //             {
    //                 isSuccessful: true,
    //                 data : obj,
    //                 message :"Product Found successfully"
    //             })
    //     }
    // }),

    Post : (request , response)=>{
        const body = request.body;
        const obj = {
            name : body.name,
            description: body.description,
            price : body.price,
            category : body.category
        }

        const ProdObj = new productmodel(obj);
        ProdObj.save()
        .then((result) => {
            res.status(201).send({
                isSuccessfull : true,
                data: result
            });
        })
        .catch((err) => {
            res.status(400).send({
                isSuccessfull : false,
                data : null
            })
        })
    },

    Put : ("/:id" , (request , response) =>{
        let id = request.params.id;
        const body = request.body;
    
        let i = products.findIndex((x)=> x.id == id);
        if(i > -1) {
            products[i].name = body.name;
            products[i].price = body.price;
            response.send({
                isSuccessfull : true,
                data : products[i],
                message : "record product successfully"
            })
        }else {
            response.send({
                isSuccessfull : false,
                data : null,
                message : "no product found"
            })
    
        }
    }),

    Del : ('/:id' ,  (request , response) =>{
        let id = request.params.id;
        const body = request.body;
    
        let i = products.findIndex((x)=> x.id == id);
        if(i > -1) {
            products[i].name = body.name;
            products[i].age = body.age;
            response.send({
                isSuccessfull : true,
                data : products[i],
                message : "record product successfully"
            })
        }else {
            response.send({
                isSuccessfull : false,
                data : null,
                message : "no product found"
            })
    
        }
})    

};

module.exports = ProductController;