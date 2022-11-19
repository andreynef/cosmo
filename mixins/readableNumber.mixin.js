
export default{
  methods: {
    readableNumber(value,numbersAfterDot){
      if (typeof(value) !== 'number'){
        return `не число`
      }
      if(typeof(numbersAfterDot)==='number' && numbersAfterDot){
        return +value.toFixed(numbersAfterDot)
      }
      if(Math.abs(value) <0.01){
        // if(typeof(numbersAfterDot)==='string' && numbersAfterDot==='spark'){
        //   return +value.toFixed(6)
        // }
        return +value.toExponential(2)
      }
      if(Math.abs(value) >=0.01 && Math.abs(value) <1){
        return +value.toFixed(3)
      }
      if(Math.abs(value) >=1 && Math.abs(value) <100){
        return +value.toFixed(2)
      }
      if(Math.abs(value) >=10){
        if(typeof(numbersAfterDot)==='string' && numbersAfterDot==='spark'){
          return +value.toFixed(1)
        }
        const n =  Math.round(value)
        return new Intl.NumberFormat().format(n);
      }
      else return value
    },
  },
}
export function readableNumber(value,numbersAfterDot){
  if (typeof(value) !== 'number'){
    return `не число`
  }
  if(typeof(numbersAfterDot)==='number' && numbersAfterDot){
    return +value.toFixed(numbersAfterDot)
  }
  if(Math.abs(value) <0.01){
    // if(typeof(numbersAfterDot)==='string' && numbersAfterDot==='spark'){
    //   return +value.toFixed(6)
    // }
    return +value.toExponential(2)
  }
  if(Math.abs(value) >=0.01 && Math.abs(value) <1){
    return +value.toFixed(3)
  }
  if(Math.abs(value) >=1 && Math.abs(value) <10){
    return +value.toFixed(2)
  }
  if(Math.abs(value) >=10){
    if(typeof(numbersAfterDot)==='string' && numbersAfterDot==='spark'){
      return +value.toFixed(1)
    }
    const n =  Math.round(value)
    return new Intl.NumberFormat().format(n);
  }
  else return value
}
