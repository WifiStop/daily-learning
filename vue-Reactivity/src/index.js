import { reactive,computed } from './public/reactivity'
let product = reactive({ price: 5, quantity: 2 })

let salePrice = computed(()=>{
  return product.price * 0.9
})
let total = computed(()=>{
  return salePrice.value * product.quantity
})
console.log(total.value,salePrice.value)
product.quantity = 3;
console.log(total.value,salePrice.value)
product.price = 10
console.log(total.value,salePrice.value)
