import React from 'react'
import "./input.css"
import axios from "axios"
import { useEffect,useState } from 'react'


const Input = () => {

    const [product, setProduct] = useState([])
    const [price, setprice] = useState(0)
    const [category, setcategory] = useState(" ")
    
    
 
    useEffect(() => {
      getalldata()
      }, [])
    
    const getalldata = async() => {
         var response  = await axios.get("https://dummyjson.com/products").then((res) => { return res.data})
         setProduct(response.products)
    }
    console.log(product)
 var categorydata =[]
   for(let i=0; i<product.length; i++){
    categorydata.push(product[i].category)
   }
 console.log(categorydata)
 let uniqueChars = [...new Set(categorydata)];

 console.log(uniqueChars);


 const lesspricehandler = () => {
  var lesserprice = product.filter((item) => { return item.price < price})
  setProduct(lesserprice)
  lesspricehandler()
}

 const greaterpricehandler = () => {
    var greaterprice = product.filter((item) => { return item.price > price})
    setProduct(greaterprice)
    greaterpricehandler()
 }

const changecategory = () => {
var filtercategory  = product.filter((item) => { return item.category == category})
 setProduct(filtercategory)
 setcategory(" ")
}


  return (
    <>
    <div>
        <div>
        <label>Enter the amount</label>
        <input type="number" placeholder="enter your price" onChange={(e)=>setprice(e.target.value)} value={price} /> <br />
        <button className='btn btn-success mt-2'onClick={lesspricehandler}>Less than the amount</button> <space />
        <button className='btn btn-success mt-2'onClick={greaterpricehandler}>Greater than the amount</button>
        </div>
        <div>
        <label className='mt-3'>Category  </label>
        <select name="cars" id="cars" onChange={(e)=>setcategory(e.target.value)}>
            {
              uniqueChars.map((item,index) => (
                <option value={item} key={index}>{item}</option>
                ))  
            }
 
</select> <space></space>
<button className='btn btn-success mt-3' value={category} onClick={changecategory}>Search</button>
</div>
    </div>
    <div className='container'>
       
       {
        product.map((item,key) => (
            <div className='box' index={key}>
            <img className='pic__image' src={item.images[0]} alt="pic" />
            <h4>{item.title}</h4>
            <h5>{item.description}</h5>
            <button className='btn btn-primary'>{item.price}</button>
          </div>
        ))
       }
             
        
        
  
    
    </div>
    </>
  )
}

export default Input